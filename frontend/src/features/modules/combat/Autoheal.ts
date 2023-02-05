import { items } from "../../../data/moomoo/items";
import EventPacket from "../../../event/EventPacket";
import { core } from "../../../main";
import { connection } from "../../../socket/Connection";
import { Packet } from "../../../socket/packets/Packet";
import { PacketType } from "../../../socket/packets/PacketType";
import Module from "../Module";

export default class Autoheal extends Module {

    private hasFoodInHand: boolean;

    constructor() {
        super();
        this.hasFoodInHand = false;
    }
    
    onUpdate(delta: number): void {
        const myPlayer = core.playerManager.myPlayer;
        
        if (myPlayer.alive && myPlayer.health < 100 && myPlayer.shame.isSafeHeal(core.tickEngine.ping) && this.hasFoodInHand === false) {
            const foodType = core.playerManager.myPlayer.inventory.items[0];
            const healsUp = foodType == 0 ? 20 : 40;

            for (let i = 0; i < Math.ceil((myPlayer.maxHealth - myPlayer.health) / healsUp); i++) {
                core.interactionEngine.vanillaPlaceItem(items.list[foodType], core.mouseAngle);
            }
        }
    }

    onPacketSend(event: EventPacket): void {
        const myPlayer = core.playerManager.myPlayer;
        if (!myPlayer) return;

        const packet = event.getPacket();

        if (packet.type == PacketType.SELECT_ITEM) {
            if (packet.data[0] === myPlayer.inventory.items[0] && packet.data[1] !== true) {
                this.hasFoodInHand = !this.hasFoodInHand;
            } else {
                this.hasFoodInHand = false;
            }
        } else if (packet.type === PacketType.ATTACK) {
            if (this.hasFoodInHand && myPlayer.health < 100) {
                this.hasFoodInHand = false;
            }
        }
    }

    onPacketReceive(event: EventPacket): void {
        /*const packet = event.getPacket();

        if (packet.type === PacketType.HEALTH_UPDATE) {
            const [sid, health] = packet.data;
            if (sid === core.playerManager.myPlayer.sid) {
               // if (health < this.lastHealth) this.damageTime = Date.now() - core.tickEngine.ping;
                
            }
        }*/
    }

    // ...

}