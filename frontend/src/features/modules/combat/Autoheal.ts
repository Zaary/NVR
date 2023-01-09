import { items } from "../../../data/moomoo/items";
import EventPacket from "../../../event/EventPacket";
import { core } from "../../../main";
import { connection } from "../../../socket/Connection";
import { Packet } from "../../../socket/packets/Packet";
import { PacketType } from "../../../socket/packets/PacketType";
import Module from "../Module";

export default class Autoheal extends Module {

    private damageTime: number;
    private lastHealth: number;
    private hasFoodInHand: boolean;

    constructor() {
        super();
        this.damageTime = -1;
        this.lastHealth = 100;
        this.hasFoodInHand = false;
    }
    
    onUpdate(delta: number): void {
        if (core.playerManager.myPlayer.alive && this.lastHealth < 100 && Date.now() - this.damageTime > 120 && this.hasFoodInHand === false) {
            const foodType = core.playerManager.myPlayer.inventory.items[0];
            const healsUp = foodType == 0 ? 20 : 40;

            for (let i = 0; i < Math.ceil((100 - this.lastHealth) / healsUp); i++) {
                core.interactionEngine.vanillaPlaceItem(items.list[foodType], core.mouseAngle);
            }
            this.damageTime = Date.now();
        } // ok
    }

    onPacketSend(event: EventPacket): void {
        if (!core.playerManager.myPlayer) return;
        const packet = event.getPacket();

        if (packet.type == PacketType.SELECT_ITEM) {
            if (packet.data[0] === core.playerManager.myPlayer.inventory.items[0] && packet.data[1] !== true) {
                this.hasFoodInHand = !this.hasFoodInHand;
            } else {
                this.hasFoodInHand = false;
            }
        } else if (packet.type === PacketType.ATTACK) {
            if (this.hasFoodInHand && this.lastHealth < 100) {
                this.damageTime = 1 / 0
                this.hasFoodInHand = false;
            }
        }
    }

    onPacketReceive(event: EventPacket): void {
        if (!core.playerManager.myPlayer) return;
        const packet = event.getPacket();

        if (packet.type === PacketType.HEALTH_UPDATE) {
            const [sid, health] = packet.data;
            if (sid === core.playerManager.myPlayer.sid) {
                if (health < this.lastHealth) this.damageTime = Date.now() - core.tickEngine.ping;
                this.lastHealth = health;
            }
        }
    }

    // ...

}