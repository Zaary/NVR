import { EventEmitter } from "tsee";
import { Core } from "../../core/Core";
import EventPacket from "../../event/EventPacket";
import { connection } from "../../socket/Connection";
import { Packet } from "../../socket/packets/Packet";
import { PacketType } from "../../socket/packets/PacketType";

class PacketCountEngine extends EventEmitter {

    private static TIMER_MAX = 60 * 1000;
    private static PACKET_LIMIT = 3000;
    private static AVAILABLE = PacketCountEngine.PACKET_LIMIT - 750;

    private timer: number;
    private packetCount: number;

    constructor(core: Core) {
        super();

        this.timer = PacketCountEngine.TIMER_MAX;
        this.packetCount = 0;

        const start = () => {
            this.timer = PacketCountEngine.TIMER_MAX;
            this.packetCount = 1;

            core.on("update", (delta: number) => {
                this.timer -= delta;
    
                if (this.timer < 0) {
                    const excession = this.timer * -1;
                    this.timer = PacketCountEngine.TIMER_MAX - excession;
                    this.packetCount = 0;
                }
            });
        };

        connection.on("packetsend", (packet: Packet) => {
            this.packetCount++;
        });

        connection.on("packetreceive", (event: EventPacket) => {
            if (event.getPacket().type === PacketType.IO_INIT) start();
        });
    }

    handleFirstPing(ping: number) {
        this.timer -= ping;
    }

    get available() {
        return Math.max(PacketCountEngine.AVAILABLE - this.packetCount, 0);
    }

    get availableTotal() {
        return Math.max(PacketCountEngine.PACKET_LIMIT - this.packetCount, 0);
    }
}

export { PacketCountEngine }