import { EventEmitter } from "tsee";
import { Core } from "../../core/Core";
import config from "../../data/moomoo/config";
import { items } from "../../data/moomoo/items";
import EventPacket from "../../event/EventPacket";
import { connection } from "../../socket/Connection";
import { Packet } from "../../socket/packets/Packet";
import { PacketType } from "../../socket/packets/PacketType";
import MathUtil from "../MathUtil";

export enum TickRoundType {
    ROUND,
    FLOOR,
    CEIL
}

function getStandardDeviation(array: number[]) {
    const n = array.length;
    const mean = array.reduce((a, b) => a + b) / n;
    return Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n);
}

const roundArray = [Math.round, Math.floor, Math.ceil];

class TickEngine extends EventEmitter<{
    ping: (ping: number) => void;
    serverlag: (lag: number) => void;
    tick: (tickIndex: number) => void;
    pretick: (futureTickIndex: number) => void;
    posttick: (tickIndex: number) => void;
}> {

    public tickIndex: number;

    public static TICK_DELTA = 1000 / config.serverUpdateRate;

    public static HAT_LOOP = [51, 50, 28, 29, 30, 36, 37, 38, 44, 35, 42, 43, 49];

    private pingQueue: number[];
    private lastPing: number;
    public ping: number;
    private firstPinged: boolean;
    private firstPonged: boolean;
    private lastTick: number;

    private predictionTick: number;
    private nextPreTick: number;
    private waitingForPostPrediction: number;

    private futureProgress: number;

    private lastPredictedPre: number;
    private lastPredictedPost: number;

    private pings: number[];
    private deltas: number[];

    constructor(core: Core) {
        super();
        this.tickIndex = -1;

        this.pingQueue = [];
        this.lastPing = 0;
        this.ping = 0;
        this.firstPinged = false;
        this.firstPonged = false;
        this.lastTick = 0;

        this.predictionTick = -1;
        this.nextPreTick = 0;
        this.waitingForPostPrediction = 0;

        this.futureProgress = 0;

        this.lastPredictedPre = -1;
        this.lastPredictedPost = -1;

        this.pings = [];
        this.deltas = [];

        let canReceivePing = false;

        connection.on("packetsend", (event: EventPacket) => {
            if (event.getPacket().type == PacketType.PING) {
                if (!canReceivePing) return;

                this.pingQueue.push(Date.now());
                this.lastPing = Date.now();
            }
        });

        connection.on("packetreceive", (event: EventPacket) => {
            const packet = event.getPacket();
            
            if (packet.type == PacketType.PING) {
                //if (!this.firstPonged) this.firstPonged = true;

                const shift = this.pingQueue.shift()!;
                if (!shift) return;

                this.ping = (Date.now() - shift) / 2;

                if (this.pings.length > 5) {
                    this.pings.push(this.ping);
                    this.pings.shift();
                } else {
                    this.pings.push(this.ping);
                }

                this.emit("ping", this.ping);
            } else if (packet.type == PacketType.PLAYER_UPDATE) {
                this.tickIndex++;

                this.lastTick = Date.now() - this.ping;
                this.predictionTick = this.tickIndex * TickEngine.TICK_DELTA - this.ping;
                if (this.serverLag > 0) this.emit("serverlag", this.serverLag);

                core.objectManager.resetWiggles(this.tickIndex);
                core.playerManager.resetSwingStreaks(this.tickIndex);
                this.emit("tick", this.tickIndex);
            } else if (packet.type === PacketType.IO_INIT) {
                canReceivePing = true;
            } else if (packet.type === PacketType.PLAYER_START) {
                this.predictionTick = this.ping;
            }
        });

        core.on("update", (delta: number) => {
            const now = Date.now();
            
            this.deltas.push(delta);
            if (this.deltas.length > 5) this.deltas.shift();

            const maxDelta = Math.max(...this.deltas);
            const maxPing = Math.max(...this.pings);

            if (this.predictionTick === -1) return;
            
            this.predictionTick += delta;

            const offset = getStandardDeviation(this.deltas) + getStandardDeviation(this.pings);
            const futureProgress = 0.8 + (this.predictionTick + delta + this.ping + offset) / TickEngine.TICK_DELTA;
            this.futureProgress = futureProgress;

            // emit 30% before the actual tick
            if (futureProgress >= this.nextPreTick) {
                if (futureProgress - this.nextPreTick >= 1) return this.nextPreTick = Math.ceil(futureProgress);

                if (this.nextPreTick > this.lastPredictedPre) {
                    const predictedTickIndex = this.nextPreTick;

                    this.lastPredictedPre = predictedTickIndex;

                    this.emit("pretick", predictedTickIndex);
                    
                    //const hat = TickEngine.HAT_LOOP[predictedTickIndex % TickEngine.HAT_LOOP.length];
                    //connection.send(new Packet(PacketType.BUY_AND_EQUIP, [0, hat, 0]));
                    //console.log("equip:", hat, "at tick:", predictedTickIndex);

                    this.nextPreTick++;/*Math.ceil(futureProgress);*/
                }
            }

            // emit 30% after the actual tick
            if (futureProgress >= this.waitingForPostPrediction + offset && this.waitingForPostPrediction > this.lastPredictedPost) {
                this.emit("posttick", this.waitingForPostPrediction);
                this.lastPredictedPost = this.waitingForPostPrediction;
                this.waitingForPostPrediction = Math.ceil(futureProgress);
            }

            // clean all predicted buildings if we didnt receive confirming placement packet
            // use a while loop since we are splicing inside of it
            const predictedPlacements = core.objectManager.predictedPlacements;
            let i = predictedPlacements.length;
            while (i--) {
                if (now - predictedPlacements[i].placedTimestamp > this.ping * 2 + maxDelta + TickEngine.TICK_DELTA) {
                    const prediction = predictedPlacements[i];
                    // failed = possibility of a hidden trap therefore we add trap as a prediction for the next 0.6s
                    core.objectManager.addPlacementAttempt([prediction.position, core.playerManager.myPlayer.scale, prediction.dir], items.list[15], Date.now() + 600);
                    predictedPlacements.splice(i, 1);
                }
            }
        });
    }

    tick() {
        this.lastTick = Date.now();
    }

    tickIn(ms: number) {
        return Math.ceil((this.predictionTick + ms) / TickEngine.TICK_DELTA);
    }

    roundToTick(ms: number, type: TickRoundType) {
        return roundArray[type]((this.lastTick % TickEngine.TICK_DELTA + ms) / TickEngine.TICK_DELTA) * TickEngine.TICK_DELTA;
    }

    getTickIndex(ms: number) {
        return this.tickIndex + Math.ceil((ms - this.lastTick) / TickEngine.TICK_DELTA);
    }

    getNextPredictableTick() {
        return Math.round(this.futureProgress) + 1;
    }

    isTickPredictable(tick: number) {
        return tick - this.futureProgress > 1;
    }

    get timeToNextTick() {
        return TickEngine.TICK_DELTA - (Date.now() - this.lastTick) - this.ping;
    }

    get serverLag(): number {
        return Math.max(Date.now() - this.lastTick + TickEngine.TICK_DELTA, 0);
    }
}

export { TickEngine }