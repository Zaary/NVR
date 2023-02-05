import { EventEmitter } from "tsee";
import { Core } from "../../core/Core";
import EventPacket from "../../event/EventPacket";
import { connection } from "../../socket/Connection";
import { Packet } from "../../socket/packets/Packet";
import { PacketType } from "../../socket/packets/PacketType";
import Logger from "../Logger";

const logger = new Logger("packet-engine");

class PacketCountEngine extends EventEmitter {

    private static TIMER_MAX = 1 * 1000; // 5400 per minute
    private static SAFETY = 15;
    public static PACKET_LIMIT = 120;
    public static PACKET_LIMIT2 = 5400;
    //private static AVAILABLE = PacketCountEngine.PACKET_LIMIT - 750;

    public stats_pps_graph: number[];

    // 120 packets per second
    public timer: number;
    public packetCount: number;

    // 5400 packets per minute
    public s60Counter: number;
    public packetCount2: number;

    public started: boolean;

    constructor(core: Core) {
        super();

        this.started = false;

        this.timer = PacketCountEngine.TIMER_MAX;
        this.packetCount = 1;
        this.s60Counter = 0;
        this.packetCount2 = 1;

        this.stats_pps_graph = [];

        const start = () => {
            this.timer = PacketCountEngine.TIMER_MAX;
            this.packetCount = 1;
            this.s60Counter = 0;
            this.packetCount2 = 1;

            core.on("update", (delta: number) => {
                if (this.timer - delta <= PacketCountEngine.TIMER_MAX * -0.5) {
                    this.packetCount = 0;
                    this.timer = PacketCountEngine.TIMER_MAX - delta % PacketCountEngine.TIMER_MAX;
                    logger.log(`compensated for delta excession (${delta} ms)`);

                    this.s60Counter += Math.floor(delta / 1000);
                } else {
                    this.timer -= delta;
                }
    
                if (this.timer <= -PacketCountEngine.SAFETY) {
                    const excession = (this.timer * -1) % PacketCountEngine.TIMER_MAX - PacketCountEngine.SAFETY;
                    this.timer = PacketCountEngine.TIMER_MAX - excession;

                    this.stats_pps_graph.push(this.packetCount);
                    if (this.stats_pps_graph.length > 60) this.stats_pps_graph.shift();

                    this.packetCount = 0;
                    this.s60Counter++;
                }

                if (this.s60Counter >= 60) {
                    this.s60Counter -= 60;
                    this.packetCount2 = 0;
                }
            });
        };

        connection.on("packetsend", (event: EventPacket) => {
            if (!this.started) this.started = true, start();
            //if (event.getPacket().type != PacketType.SPAWN) return event.cancel();
            this.packetCount++;
            this.packetCount2++;
        });

        connection.on("ready", (/*event: EventPacket*/) => {
            /*if (event.getPacket().type === PacketType.IO_INIT) *///start();
        });

        connection.on("close", () => {
            console.log("diconnected with pps:", this.packetCount, "ppm:", this.packetCount2);
        });
    }

    handlePing(ping: number) {
        if (ping > PacketCountEngine.SAFETY && ping - PacketCountEngine.SAFETY < 10 && ping < 1e3) {
            PacketCountEngine.SAFETY = ping;
        }
    }

    get availableTotal() {
        return Math.max(PacketCountEngine.PACKET_LIMIT - this.packetCount, 0);
    }
}

export { PacketCountEngine }