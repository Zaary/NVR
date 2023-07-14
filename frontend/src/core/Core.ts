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
import NVRLoader from "../loader/NVRLoader";
import BuildingVisualisationModule from "../render/BuildingVisualisationModule";
import { items } from "../data/moomoo/items";
import ProjectileManager from "../manager/ProjectileManager";
import { Weapon } from "../data/type/Weapon";
import StringUtil from "../util/StringUtil";

interface MState {
    mouseHeld: boolean;
}

const logger = new Logger("core");
const sym = Symbol();

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

    public static get ENDPOINT() {
        return "https://pleasingringedexpertise.gg69gamer.repl.co";
    }

    public static get VER() {
        return new (class extends String { uformat() { return this.replace(/\./g, "_") } })("1.0.0");
    }

    public static get AUTHORS() {
        return ["Zaary", "Splex"];
    }

    private cid: number;

    public loaded: boolean;

    public mstate: MState;

    private lastUpdate: number;
    public lastActionState: {
        hat: number;
        tail: number;
        attack: number;
        aim: number;
        weapon: [number, boolean];
    };
    private scheduledActions: Action[];
    private actionIdCounter = 0;
    private packetBlockIdCounter = 0;
    private packetBlocks: Record<number, number[]>;

    public bundleAPI: API;

    public moduleManager: ModuleManager;
    public objectManager: ObjectManager;
    public projectileManager: ProjectileManager;
    public playerManager: PlayerManager;
    public renderManager: RenderManager | null;

    public tickEngine: TickEngine;
    public packetEngine: PacketCountEngine;
    public interactionEngine: InteractionEngine;

    public mouseAngle: number;

    private bundleDir: [ActionPriority, number] | null;

    constructor(cid: number, callback: (cb2: (code: string) => [Function, number[]]) => void) {
        super();

        // for loader verify
        this.cid = cid;

        Object.defineProperty(window, "core", {
            value: this
        });

        logger.info(`launched StarLit core version ${Core.VER} by ${Core.AUTHORS.join(", ")}`);

        this.bundleAPI = new API(this);

        this.loaded = false;

        this.mstate = {
            mouseHeld: false
        }

        this.lastUpdate = Date.now();
        this.scheduledActions = [];
        this.lastActionState = {
            hat: 0,
            tail: 0,
            attack: 0,
            aim: 0,
            weapon: [0, true]
        }

        this.packetBlocks = {};

        // initialize modules first so engines can hook into them
        this.moduleManager = new ModuleManager();

        this.objectManager = new ObjectManager(this);
        this.playerManager = new PlayerManager();
        this.projectileManager = new ProjectileManager(this);

        this.renderManager = null;
        

        this.tickEngine = new TickEngine(this);
        this.packetEngine = new PacketCountEngine(this);
        this.interactionEngine = new InteractionEngine(this);

        this.mouseAngle = 0;

        this.bundleDir = null;

        const argstr = StringUtil.randomString(40);
        callback((c: any) => {
            const func: Function = new Function(argstr, "cid", `with(${argstr}){${c}}`);

            const lcrcsub = `with(${argstr}){}`.length;
            const ccrcsub = `with(${argstr}){}`.split("").reduce((previous: number, current: string) => previous + current.charCodeAt(0), 0);

            const toStr = func.toString();
            const body = toStr.substring(toStr.indexOf("{") + 1, toStr.lastIndexOf("}")).replace(/\n/g, "");

            const lcrc = body.length - lcrcsub;
            const ccrc = body.split("").reduce((previous: number, current: string) => previous + current.charCodeAt(0), 0) - ccrcsub;
            return [func.bind(this), [lcrc, ccrc]];
        });
    }

    lockBundleDirection(priority: ActionPriority, dir: number) {
        if (this.bundleDir === null || priority >= this.bundleDir[0]) {
            this.bundleDir = [priority, dir];
            this.bundleAPI.values.set("attackdir", dir);
        }
    }

    unlockBundleDirection(priority: ActionPriority) {
        if (this.bundleDir !== null && priority >= this.bundleDir[0]) {
            this.bundleDir = null;
            this.bundleAPI.values.delete("attackdir");
        }
    }

    onApiCallback(name: string, args: any, callback: () => any) {
        switch (name) {
            case "iosend": {
                connection.bundleSend(args[0], args[1]);
                break;
            }
        }
    }

    sd() {
        NVRLoader.stop();
    }

    patchBundle(src: string, promise: Promise<void>) {
        BundleProxy.loadBundle(src, this.bundleAPI, promise);
    }

    async initializeRenderer(canvas: HTMLCanvasElement) {
        this.renderManager = new RenderManager(this, canvas, 1920, 1080);
        
        //await this.renderManager.createRenderer("background", HoverInfoModule, this);
        await this.renderManager.createRenderer("buildingVisualisation", BuildingVisualisationModule, this);

        await this.renderManager.createInterfaceRenderer("packetCount", PacketCountModule, this);
        await this.renderManager.createInterfaceRenderer("packetGraph", PacketGraphModule, this);
        
        this.renderManager.createRenderHook();

        this.renderManager.on("mousemove", event => {
            this.mouseAngle = MathUtil.getDirection(new Vector(window.innerWidth / 2, window.innerHeight / 2), new Vector(event.clientX, event.clientY));
        });

        this.renderManager.on("mousedown", event => {
            this.mstate.mouseHeld = true;
        });

        this.renderManager.on("mouseup", event => {
            this.mstate.mouseHeld = false;
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

    private attachLastActionStateListener() {
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
                if (typeof packet.data[1] === "number") this.lastActionState.aim = packet.data[1];
            } else if (packet.type === PacketType.SET_ANGLE) {
                this.lastActionState.aim = packet.data[0];
            } else if (packet.type === PacketType.SELECT_ITEM) {
                this.lastActionState.weapon = [packet.data[0], packet.data[1]];
            }
        });
    }

    private cleanActions(tick: number) {
        // clean actions
        let i = this.scheduledActions.length - 1;
        while (i >= 0) {
            const action = this.scheduledActions[i];
            if (action.executeTick < tick) this.scheduledActions.splice(i, 1);
            i--;
        }
    }

    private runTickActions(tick: number) {
        this.runUppermostActions(ActionType.HAT, tick);
        this.runUppermostActions(ActionType.TAIL, tick);
        this.runUppermostActions(ActionType.WEAPON, tick); // important to switch weapon before attack
        this.runUppermostActions(ActionType.ATTACK, tick);
    }

    runUppermostActions(action: ActionType, tick: number) {
        // filter and sort by highest priority
        const filtered = this.scheduledActions.filter(a => a.type == action && a.executeTick == tick && (() => {
            if (a.data !== undefined) {
                if (a.type === ActionType.HAT && !this.playerManager.myPlayer.ownedHats.includes(a.data[0])) return false;
                if (a.type === ActionType.TAIL && !this.playerManager.myPlayer.ownedTails.includes(a.data[0])) return false;
                if (a.type === ActionType.WEAPON && (a.data[1] ? !this.playerManager.myPlayer.inventory.hasWeapon(a.data[0]) : this.playerManager.myPlayer.inventory.items[items.list[a.data[0]].group.id] !== a.data[0])) return false;
            }
            return true;
        })());

        const maxPriority = Math.max(...filtered.map(x => x.priority));

        //const sorted = filtered.sort((a, b) => b.priority - a.priority);

        const final = filtered.filter(x => x.priority === maxPriority);

        //console.log(final);

        if (final.length > 0/*sorted.length > 0*/) {
            // run action

            //const action = final[0];
            for (let i = 0; i < final.length; i++) {
                this.runAction(final[i]/*sorted[0]*/);
            }

            // remove action from the list (not needed since we clear all actions on tick begin)
            /*const index = this.scheduledActions.indexOf(action);
            if (index > -1) {
                this.scheduledActions.splice(index, 1);
            }*/
        }
    }

    runAction(action: Action) {
        if (action.data === undefined) return;
        
        switch (action.type) {
            case ActionType.HAT:
                if (action.data[0] === this.lastActionState.hat) return;
                connection.send(new Packet(PacketType.BUY_AND_EQUIP, [0, action.data[0], 0]));
                this.lastActionState.hat = action.data[0];
                break;
            case ActionType.TAIL:
                if (action.data[0] === this.lastActionState.tail) return;
                connection.send(new Packet(PacketType.BUY_AND_EQUIP, [0, action.data[0], 1]));
                this.lastActionState.tail = action.data[0];
                break;
            case ActionType.ATTACK:
                if (action.data[0] === this.lastActionState.attack && action.data[1] === this.lastActionState.aim) return;
                connection.send(new Packet(PacketType.ATTACK, action.data), action.force);
                this.lastActionState.attack = action.data[0];
                this.lastActionState.aim = action.data[1];
                break;
            case ActionType.WEAPON:
                if (action.data[0] === this.lastActionState.weapon[0] && action.data[1] === this.lastActionState.weapon[1]) return;
                connection.send(new Packet(PacketType.SELECT_ITEM, [action.data[0], action.data[1]]));
                this.lastActionState.weapon = [action.data[0], action.data[1]];
            default:
                return;
        }

        this.moduleManager.onActionRun(action);
    }

    scheduleBlockerAction(action: ActionType, pririoty: ActionPriority, tick: number) {
        this.scheduledActions.push(new Action(this.actionIdCounter++, action, pririoty, tick, undefined, false));
    }

    scheduleAction(action: ActionType, priority: ActionPriority, tick: number = this.tickEngine.tickIndex + 1, data: any[], force?: boolean): number {
        const ac = new Action(this.actionIdCounter++, action, priority, tick, data, force ? true : false);
        this.scheduledActions.push(ac);
        return ac.id;
    }

    runImmediateAction(action: ActionType, priority: ActionPriority, data: any[]) {
        this.runAction(new Action(this.actionIdCounter++, action, priority, -1, data, false));
    }

    cancelScheduledAction(type: ActionType, maxPriority: ActionPriority, tick: number, includeTicksBefore = false) {
        let i = this.scheduledActions.length - 1;
        while (i >= 0) {
            const action = this.scheduledActions[i];
            if (action.type === type && (includeTicksBefore ? action.executeTick <= tick : action.executeTick === tick) && action.priority <= maxPriority) {
                this.scheduledActions.splice(i, 1);
            }
            i--;
        }
    }

    isHighestPriority(priority: ActionPriority, tick: number) {
        return this.scheduledActions.filter(x => x.priority > priority && x.executeTick === tick).length === 0;
    }
}

export { Core, target, setTarget/*, pathfinder*/, sym }