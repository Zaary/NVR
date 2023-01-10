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

    private pingQueue: number[];
    private lastPing: number;
    public ping: number;
    private firstPinged: boolean;
    private firstPonged: boolean;
    private lastTick: number;

    private predictionTick: number;
    private emittedPredictionPreTick: number;
    private emittedPredictionPostTick: number;

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
        this.emittedPredictionPreTick = -1;
        this.emittedPredictionPostTick = -1;

        this.pings = [];
        this.deltas = [];

        connection.on("packetsend", (event: EventPacket) => {
            if (event.getPacket().type == PacketType.PING) {
                if (!this.firstPonged && this.firstPinged) return;
                if (!this.firstPinged) this.firstPinged = true;

                this.pingQueue.push(Date.now());
                this.lastPing = Date.now();
            }
        });

        connection.on("packetreceive", (event: EventPacket) => {
            const packet = event.getPacket();
            
            if (packet.type == PacketType.PING) {
                if (!this.firstPonged) this.firstPonged = true;

                const shift = this.pingQueue.shift()!;
                if (!shift) return;

                this.ping = (Date.now() - shift) / 2;

                if (this.pings.length > 5) {
                    this.pings.pop();
                    this.pings.push(this.ping);
                    this.pings.shift();
                } else {
                    this.pings.push(this.ping);
                }

                this.emit("ping", this.ping);
            } else if (packet.type == PacketType.PLAYER_UPDATE) {
                this.tickIndex++;

                this.lastTick = Date.now() - this.ping;
                if (this.serverLag > 0) this.emit("serverlag", this.serverLag);

                core.objectManager.resetWiggles(this.tickIndex);

                this.emit("tick", this.tickIndex);
            }
        });

        core.on("update", (delta: number) => {
            const now = Date.now();
            if (this.pings.length >= 5 && this.pingQueue.length > 0) this.pings[5] = (now - this.lastPing) / 2;

            this.deltas.push(delta);
            if (this.deltas.length >= 8) this.deltas.shift();

            const maxDelta = Math.max(...this.deltas);
            const avgDelta = MathUtil.averageOfArray(this.deltas);
            const maxPing = Math.max(...this.pings);
            const avgPing = MathUtil.averageOfArray(this.pings);

            const safeDelta = maxDelta > avgDelta * 1.3 ? avgDelta : maxDelta;
            const safePing = maxPing > avgPing * 1.8 ? avgPing : maxPing;

            const safe = safePing * 1.35 + safeDelta * 1.2;

            this.predictionTick = this.tickIndex + safe / (1000 / config.serverUpdateRate);

            // emit pre-tick at 60% of the current tick passed
            if (this.predictionTick >= this.emittedPredictionPreTick + 0.6) {
                const value = Math.ceil(this.predictionTick);
                this.emit("pretick", value);
                this.emittedPredictionPreTick = value;
            }

            // emit post-tick at 4% of the current tick passed
            if (this.predictionTick >= this.emittedPredictionPostTick + 0.04) {
                const value = Math.floor(this.predictionTick);
                this.emit("posttick", value);
                this.emittedPredictionPostTick = value;
            }

            // clean all predicted buildings if we didnt receive confirming placement packet
            // use a while loop since we are splicing inside of it
            const predictedPlacements = core.objectManager.predictedPlacements;
            let i = predictedPlacements.length;
            while (i--) {
                if (now - predictedPlacements[i].placedTimestamp > safePing * 2 + safeDelta + (1000 / config.serverUpdateRate)) {
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

    get timeToNextTick() {
        return Date.now() - this.lastTick - this.ping;
    }

    get serverLag(): number {
        return Math.max(Date.now() - this.lastTick + (1000 / config.serverUpdateRate), 0);
    }
}

export { TickEngine }