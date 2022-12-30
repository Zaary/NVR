import { currentPlayer } from "../../../core/Core";
import EventPacket from "../../../event/EventPacket";
import { core } from "../../../main";
import { connection } from "../../../socket/Connection";
import { Packet } from "../../../socket/packets/Packet";
import { PacketType } from "../../../socket/packets/PacketType";
import Module from "../Module";

export default class Autoheal extends Module {

    private damageTick: number = 0;
    private lastHealth: number;

    constructor() {
        super();
        this.lastHealth = 100;
    }
    
    onUpdate(delta: number): void {

    }

    onUnsafeTick(tickIndex: number): void {
        if (!currentPlayer) return;

        if (this.lastHealth < 100 && tickIndex - this.damageTick > 2) {
            const foodType = 0;//currentPlayer.items[0];
            const healsUp = foodType == 0 ? 20 : 40;

            for (let i = 0; i < Math.ceil((100 - this.lastHealth) / healsUp); i++) {
                connection.send(new Packet(PacketType.SELECT_ITEM, [foodType, false]));
                connection.send(new Packet(PacketType.ATTACK, [1, 0]));
                connection.send(new Packet(PacketType.ATTACK, [0, 0]));
                connection.send(new Packet(PacketType.SELECT_ITEM, [0, true]));
            }

            this.damageTick = Infinity;
        }
    }

    onPacketReceive(event: EventPacket): void {
        if (!currentPlayer) return;
        const packet = event.getPacket();

        if (packet.type === PacketType.HEALTH_UPDATE) {
            const [sid, health] = packet.data;
            if (sid === currentPlayer.sid) {
                if (health < this.lastHealth) this.damageTick = core.tickEngine.tickIndex;
                this.lastHealth = health;
            }
        }
    }

    // ...

}