import EventEmitter from "events";
import { Player } from "../data/type/Player";
//import { Pathfinder } from "../pathfinding/Pathfinder";
import { connection } from "../socket/Connection";
import { PacketHandler } from "../socket/PacketHandler";
import { Packet } from "../socket/packets/Packet";
import { PacketType } from "../socket/packets/PacketType";
import Logger from "../util/Logger";
import { SidArray } from "../util/type/SidArray";
import { TickEngine } from "../util/engine/TickEngine";
import { Action } from "./Action";
import { ActionPriority, ActionType } from "./ActionType";
import { PacketCountEngine } from "../util/engine/PacketCountEngine";
import EventPacket from "../event/EventPacket";
import ObjectManager from "../manager/ObjectManager";
import { GameObject } from "../data/type/GameObject";
import RenderManager from "../render/RenderManager";
import HoverInfoModule from "../render/HoverInfoModule";
import PacketCountModule from "../render/interface/PacketCountModule";
import ModuleManager from "../features/ModuleManager";
import InteractionEngine from "../util/engine/InteractionEngine";
import { core } from "../main";
import BundleProxy from "../injector/BundleProxy";
import API from "../injector/api/API";
import PacketGraphModule from "../render/interface/PacketGraphModule";
import PlayerManager from "../manager/PlayerManager";
import MathUtil from "../util/MathUtil";
import Vector from "../util/type/Vector";

const logger = new Logger("core");

let target: Player | null = null;

const players = new SidArray<Player>();
const animals = new SidArray<any>();
const buildings = new SidArray<GameObject>();

/*
const pathfinder = new Pathfinder();

function pathfind(path: any[]) {
    // @ts-ignore
    window.path = path;
}
*/

function setTarget(player: Player | null) {
    target = player;
}

class Core extends EventEmitter {

    public static VER = "1.0";
    public static AUTHORS = ["Zaary"];

    private lastUpdate: number;
    private scheduledActions: Action[];

    public bundleAPI: API;

    public objectManager: ObjectManager;
    public playerManager: PlayerManager;
    public renderManager: RenderManager | null;
    public moduleManager: ModuleManager;

    public tickEngine: TickEngine;
    public packetEngine: PacketCountEngine;
    public interactionEngine: InteractionEngine;

    public mouseAngle: number;

    constructor() {
        super();

        this.bundleAPI = new API();

        logger.info(`launched StarLit core version ${Core.VER} by ${Core.AUTHORS.join(", ")}`);


        this.lastUpdate = Date.now();
        this.scheduledActions = [];

        this.objectManager = new ObjectManager();
        this.playerManager = new PlayerManager();
        this.renderManager = null;
        this.moduleManager = new ModuleManager();

        this.tickEngine = new TickEngine(this);
        this.packetEngine = new PacketCountEngine(this);
        this.interactionEngine = new InteractionEngine(this);

        this.tickEngine.once("ping", this.packetEngine.handlePing.bind(this.packetEngine));

        this.tickEngine.on("pretick", (tick: number) => {
            this.moduleManager.onUnsafeTick(tick);

            // run actions based on priority
            /*this.runUppermostAction(ActionType.HAT, tick);
            this.runUppermostAction(ActionType.TAIL, tick);
            this.runUppermostAction(ActionType.ATTACK, tick);
            connection.send(new Packet(PacketType.CHAT, ["server lag: " + this.tickEngine.serverLag]));*/
        });

        this.tickEngine.on("tick", this.moduleManager.onTick.bind(this.moduleManager));

        this.mouseAngle = 0;

        document.addEventListener("keydown", event => {
            this.emit("keydown", event);
            this.moduleManager.onKeydown(event.keyCode);
        });

        document.addEventListener("keyup", event => {
            this.emit("keyup", event)
            this.moduleManager.onKeyup(event.keyCode);
        });

        // listen for received packets (always process the packet before passing it to modules)
        connection.on("packetreceive", (event: EventPacket) => {
            PacketHandler.processIn(event.getPacket());
            this.moduleManager.onPacketReceive(event);
        });

        setInterval(this.update.bind(this), 1);
    }

    patchBundle(src: string, promise: Promise<void>) {
        BundleProxy.loadBundle(src, this.bundleAPI, promise);
    }

    async initializeRenderer(canvas: HTMLCanvasElement) {
        this.renderManager = new RenderManager(this, canvas, 1920, 1080);
        
        await this.renderManager.createRenderer("background", HoverInfoModule, this);
        await this.renderManager.createInterfaceRenderer("packetCount", PacketCountModule, this);
        await this.renderManager.createInterfaceRenderer("packetGraph", PacketGraphModule, this);
        
        this.renderManager.createRenderHook();

        this.renderManager.on("mousemove", event => {
            this.mouseAngle = MathUtil.getDirection(new Vector(window.innerWidth / 2, window.innerHeight / 2), new Vector(event.clientX, event.clientY));
        });
    }

    update() {
        const now = Date.now();
        const delta = now - this.lastUpdate;
        this.lastUpdate = now;

        // emit event to be used in other modules
        this.emit("update", delta);
        
        this.objectManager.update(delta);
        this.moduleManager.onUpdate(delta);
    }

    runUppermostAction(action: ActionType, tick: number) {
        // filter and sort by highest priority
        const sorted = this.scheduledActions.filter(a => a.type == action && a.executeTick == tick).sort((a, b) => b.priority - a.priority);
        if (sorted.length > 0) {
            // run action
            const action = sorted[0];
            this.runAction(action);

            // remove action from the list
            const index = this.scheduledActions.indexOf(action);
            if (index > -1) {
                this.scheduledActions.splice(index, 1);
            }
        }
    }

    runAction(action: Action) {
        switch (action.type) {
            case ActionType.HAT:
                connection.send(new Packet(PacketType.BUY_AND_EQUIP, [0, action.data[0], 0]));
                break;
            case ActionType.TAIL:
                connection.send(new Packet(PacketType.BUY_AND_EQUIP, [0, action.data[0], 1]));
                break;
            case ActionType.ATTACK:
                connection.send(new Packet(PacketType.ATTACK, action.data));
                break;
        }
    }

    scheduleAction(action: ActionType, priority: ActionPriority, tick: number = this.tickEngine.tickIndex + 1, data: any[]) {
        this.scheduledActions.push(new Action(action, priority, tick, data));
    }
}

export { Core, target, setTarget, players, animals, buildings/*, pathfinder*/ }