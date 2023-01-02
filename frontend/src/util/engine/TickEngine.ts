import { EventEmitter } from "tsee";
import { Core } from "../../core/Core";
import config from "../../data/moomoo/config";
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
}> {

    public tickIndex: number;

    private pingQueue: number[];
    private lastPing: number;
    public ping: number;
    private firstPinged: boolean;
    private firstPonged: boolean;
    private lastTick: number;

    private predictionTick: number;
    private emittedPredictionTick: number;

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
        this.emittedPredictionTick = -1;

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

            this.predictionTick = this.tickIndex + Math.ceil(safe / (1000 / config.serverUpdateRate));
            

            if (this.predictionTick > this.emittedPredictionTick) {
                this.emit("pretick", this.predictionTick);
                this.emittedPredictionTick = this.predictionTick;
            }

            // clean all predicted buildings if we didnt receive confirming placement packet
            // use a while loop since we are splicing inside of it
            const predictedPlacements = core.objectManager.predictedPlacements;
            let i = predictedPlacements.length;
            while (i--) {
                if (now - predictedPlacements[i].placedTimestamp > safePing * 2 + safeDelta + (1000 / config.serverUpdateRate)) {
                    predictedPlacements.splice(i, 1);
                }
            }
        });
    }

    tick() {
        this.lastTick = Date.now();
    }

    get serverLag(): number {
        return Math.max(Date.now() - this.lastTick + (1000 / config.serverUpdateRate), 0);
    }
}

export { TickEngine }