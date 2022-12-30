import EventEmitter from "events";
import { Core } from "../../core/Core";
import config from "../../data/moomoo/config";
import EventPacket from "../../event/EventPacket";
import { connection } from "../../socket/Connection";
import { Packet } from "../../socket/packets/Packet";
import { PacketType } from "../../socket/packets/PacketType";

class TickEngine extends EventEmitter {

    public tickIndex: number;
    private pingQueue: number[];
    public ping: number;
    private lastTick: number;
    private nextTick: number;
    private lastEmittedUnsafe: number;

    constructor(core: Core) {
        super();
        this.tickIndex = 0;
        this.pingQueue = [];
        this.ping = 0;
        this.lastTick = 0;
        this.nextTick = 0;
        this.lastEmittedUnsafe = -1;

        connection.on("packetsend", (event: EventPacket) => {
            if (event.getPacket().type == PacketType.PING) {
                this.pingQueue.push(Date.now());
            }
        });

        connection.on("packetreceive", (event: EventPacket) => {
            const packet = event.getPacket();
            
            if (packet.type == PacketType.PING) {
                const shift = this.pingQueue.shift()!;
                this.ping = (Date.now() - shift) / 2;
                this.emit("ping", this.ping);
            } else if (packet.type == PacketType.PLAYER_UPDATE) {
                this.lastTick = Date.now() - this.ping;
                if (this.serverLag > 0) this.emit("serverlag", this.serverLag);

                this.nextTick = this.lastTick + (1000 / config.serverUpdateRate);
                this.emit("tick", ++this.tickIndex);
            }
        });

        core.on("update", (delta: number) => {
            if (this.lastEmittedUnsafe === this.tickIndex) return;
            if (Date.now() + this.ping * 1.5 + this.serverLag + delta * 1.3 >= this.nextTick) {
                this.emit("unsafetick", this.tickIndex + 1);
                this.lastEmittedUnsafe = this.tickIndex;
            }
        });
    }

    tick() {
        this.lastTick = Date.now();
    }

    get serverLag(): number {
        return Math.max(Date.now() - this.nextTick, 0);
    }
}

export { TickEngine }