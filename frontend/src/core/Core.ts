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
    public static AUTHORS = ["Zaary", "Splex"];

    private lastUpdate: number;
    private lastActionState: {
        hat: number;
        tail: number;
        attack: number;
        aim: number;
        weapon: number;
    };
    private scheduledActions: Action[];
    private actionIdCounter = 0;
    private packetBlockIdCounter = 0;
    private packetBlocks: Record<number, number[]>;

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
        this.lastActionState = {
            hat: 0,
            tail: 0,
            attack: 0,
            aim: 0,
            weapon: 0
        }

        this.packetBlocks = {};

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
            this.runUppermostAction(ActionType.HAT, tick);
            this.runUppermostAction(ActionType.TAIL, tick);
            this.runUppermostAction(ActionType.WEAPON, tick); // important to switch weapon before attack
            this.runUppermostAction(ActionType.ATTACK, tick);
            this.scheduledActions = [];
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

        // listen for packet send (post) - after its impossible to cancel
        connection.on("packetsendp", (packet: Packet) => {
            if (packet.type === PacketType.BUY_AND_EQUIP) {
                if (packet.data[0] === 0) {
                    if (!packet.data[2]) {
                        this.lastActionState.hat = packet.data[1];
                    } else {
                        this.lastActionState.tail = packet.data[1];
                    }
                }
            } else if (packet.type === PacketType.ATTACK) {
                this.lastActionState.attack = packet.data[0];
                this.lastActionState.aim = packet.data[1];
            } else if (packet.type === PacketType.SET_ANGLE) {
                this.lastActionState.aim = packet.data[0];
            } else if (packet.type === PacketType.SELECT_ITEM) {
                if (packet.data[1]) {
                    this.lastActionState.weapon = packet.data[0];
                }
            }
        });

        // cancels aim packets because it only spams packets
        // and messes up autobreak aim (kinda lazy solution)
        // should be fixed explicitly in the future and
        // remove the packet cancelling
        connection.on("packetsend", (event: EventPacket) => {
            const packet = event.getPacket();
            //console.log(packet);
            if (this.packetBlocks.hasOwnProperty(packet.type)) {
                if (this.packetBlocks[packet.type].length > 0) {
                    event.cancel();
                    return;
                }
            }

            PacketHandler.processOut(event.getPacket());
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
        
        //await this.renderManager.createRenderer("background", HoverInfoModule, this);
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
        
        this.playerManager.update(delta);
        this.objectManager.update(delta);
        this.moduleManager.onUpdate(delta);
    }

    createPacketBlock(type: PacketType) {
        const id = this.packetBlockIdCounter++;
        if (!this.packetBlocks.hasOwnProperty(type)) {
            this.packetBlocks[type] = [];
        }
        this.packetBlocks[type].push(id);
        return id;
    }

    removePacketBlock(type: PacketType, id: number) {
        const index = this.packetBlocks[type].indexOf(id);
        if (index > -1) this.packetBlocks[type].splice(index, 1);
    }

    runUppermostAction(action: ActionType, tick: number) {
        // filter and sort by highest priority
        const sorted = this.scheduledActions.filter(a => a.type == action && a.executeTick == tick && (() => {
            if (a.type === ActionType.HAT && !this.playerManager.myPlayer.ownedHats.includes(a.data[0])) return false;
            if (a.type === ActionType.TAIL && !this.playerManager.myPlayer.ownedTails.includes(a.data[0])) return false;
            if (a.type === ActionType.WEAPON && !this.playerManager.myPlayer.inventory.hasWeapon(a.data[0])) return false;
            return true;
        })()).sort((a, b) => b.priority - a.priority);
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
                if (action.data[0] === this.lastActionState.hat) return;
                connection.send(new Packet(PacketType.BUY_AND_EQUIP, [0, action.data[0], 0]));
                break;
            case ActionType.TAIL:
                if (action.data[0] === this.lastActionState.tail) return;
                connection.send(new Packet(PacketType.BUY_AND_EQUIP, [0, action.data[0], 1]));
                break;
            case ActionType.ATTACK:
                if (action.data[0] === this.lastActionState.attack && action.data[1] === this.lastActionState.aim) return;
                connection.send(new Packet(PacketType.ATTACK, action.data));
                break;
            case ActionType.WEAPON:
                if (action.data[0] === this.lastActionState.weapon) return;
                connection.send(new Packet(PacketType.SELECT_ITEM, [action.data[0], true]));
            default:
                return;
        }

        this.moduleManager.onActionRun(action);
    }

    scheduleAction(action: ActionType, priority: ActionPriority, tick: number = this.tickEngine.tickIndex + 1, data: any[]): number {
        const ac = new Action(this.actionIdCounter++, action, priority, tick, data);
        this.scheduledActions.push(ac);
        return ac.id;
    }
}

export { Core, target, setTarget/*, pathfinder*/ }