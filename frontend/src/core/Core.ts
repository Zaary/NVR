import EventEmitter from "events";
import Player from "../data/type/Player";
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

const logger = new Logger("core");

let currentPlayer: Player | null = null;
let target: Player | null = null;

const players = new SidArray();
const animals = new SidArray();
const buildings = new SidArray();

connection.once("ready", function() {
    /*pathfinder.on("path", function(path) {
        pathfind(path);
    });*/

    connection.on("packetreceive", function(event: EventPacket) {
        PacketHandler.process(event.getPacket());
    });
});

/*
const pathfinder = new Pathfinder();

function pathfind(path: any[]) {
    // @ts-ignore
    window.path = path;
}
*/
function setCurrentPlayer(player: Player | null) {
    logger.log("set current player:", player);
    currentPlayer = player;
}

function setTarget(player: Player | null) {
    target = player;
}

class Core extends EventEmitter {

    public static VER = "1.0";
    public static AUTHORS = "Zaary";

    private lastUpdate: number;
    private scheduledActions: Action[];

    private tickEngine: TickEngine;
    private packetEngine: PacketCountEngine;

    constructor() {
        super();

        logger.info(`launched StarLit core version ${Core.VER} by ${Core.AUTHORS}`);

        this.lastUpdate = Date.now();
        this.scheduledActions = [];

        this.tickEngine = new TickEngine(this);
        this.packetEngine = new PacketCountEngine(this);

        this.tickEngine.once("ping", this.packetEngine.handleFirstPing.bind(this.packetEngine));

        this.tickEngine.on("unsafetick", (tick: number) => {
            // run actions based on priority
            /*this.runUppermostAction(ActionType.HAT, tick);
            this.runUppermostAction(ActionType.TAIL, tick);
            this.runUppermostAction(ActionType.ATTACK, tick);
            connection.send(new Packet(PacketType.CHAT, ["server lag: " + this.tickEngine.serverLag]));*/
        });
        
        this.update = this.update.bind(this);
        requestAnimationFrame(this.update);
    }

    update() {
        const now = Date.now();
        const delta = now - this.lastUpdate;
        this.lastUpdate = now;

        // emit event to be used in other modules
        this.emit("update", delta);

        requestAnimationFrame(this.update);
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

export { Core, currentPlayer, target, setCurrentPlayer, setTarget, players, animals, buildings/*, pathfinder*/ }