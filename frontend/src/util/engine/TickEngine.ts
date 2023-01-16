import { EventEmitter } from "tsee";
import { Core } from "../../core/Core";
import config from "../../data/moomoo/config";
import { items } from "../../data/moomoo/items";
import EventPacket from "../../event/EventPacket";
import { connection } from "../../socket/Connection";
import { Packet } from "../../socket/packets/Packet";
import { PacketType } from "../../socket/packets/PacketType";
import MathUtil from "../MathUtil";

class TickEngine extends EventEmitter<{
    ping: (ping: number) => void;
    serverlag: (lag: number) => void;
    tick: (tickIndex: number) => void;
    pretick: (futureTickIndex: number) => void;
    posttick: (tickIndex: number) => void;
}> {

    public tickIndex: number;

    public static TICK_DELTA = 1000 / config.serverUpdateRate;

    private pingQueue: number[];
    private lastPing: number;
    public ping: number;
    private firstPinged: boolean;
    private firstPonged: boolean;
    private lastTick: number;

    private predictionTick: number;
    private waitingForPrePrediction: number;
    private waitingForPostPrediction: number;

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
        this.waitingForPrePrediction = -1;
        this.waitingForPostPrediction = -1;

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

                /*if (this.pings.length > 5) {
                    this.pings.pop();
                    this.pings.push(this.ping);
                    this.pings.shift();
                } else {
                    this.pings.push(this.ping);
                }*/

                this.emit("ping", this.ping);
            } else if (packet.type == PacketType.PLAYER_UPDATE) {
                this.tickIndex++;

                this.lastTick = Date.now() - this.ping;
                this.predictionTick = this.tickIndex * TickEngine.TICK_DELTA - this.ping;
                if (this.serverLag > 0) this.emit("serverlag", this.serverLag);

                core.objectManager.resetWiggles(this.tickIndex);
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
            if (this.deltas.length > 8) this.deltas.shift();

            const maxDelta = Math.max(...this.deltas);

            if (this.predictionTick === -1) return;
            
            this.predictionTick += delta;

            const futureProgress = (this.predictionTick + maxDelta + this.ping * 2) / TickEngine.TICK_DELTA;

            // TODO: make offset automatically adjust itself

            // 30%
            const offset = /*0.3*/ this.ping / TickEngine.TICK_DELTA;

            // emit 30% before the actual tick
            if (futureProgress >= this.waitingForPrePrediction - offset) {
                this.emit("pretick", this.waitingForPrePrediction);
                this.waitingForPrePrediction = Math.ceil(futureProgress);
            }

            // emit 30% after the actual tick
            if (futureProgress >= this.waitingForPostPrediction + offset) {
                this.emit("posttick", this.waitingForPostPrediction);
                this.waitingForPostPrediction = Math.ceil(futureProgress);
            }

            // emit pre-tick at 60% of the current tick passed
            /*if (this.predictionTick >= this.emittedPredictionPreTick + 0.65) {
                const value = Math.ceil(this.predictionTick);
                console.log("pre", value, Date.now());
                this.emit("pretick", value);
                this.emittedPredictionPreTick = value;
            }

            // emit post-tick at 20% of the current tick passed
            if (this.predictionTick >= this.emittedPredictionPostTick + 0.35) {
                console.log("post", Math.floor(this.predictionTick), Date.now());
                this.emit("posttick", Math.floor(this.predictionTick));
                this.emittedPredictionPostTick = Math.ceil(this.predictionTick);
            }*/

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

    get timeToNextTick() {
        return TickEngine.TICK_DELTA - (Date.now() - this.lastTick) - this.ping;
    }

    get serverLag(): number {
        return Math.max(Date.now() - this.lastTick + TickEngine.TICK_DELTA, 0);
    }
}

export { TickEngine }