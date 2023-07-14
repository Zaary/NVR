import { items } from "../../../data/moomoo/items";
import EventPacket from "../../../event/EventPacket";
import { core } from "../../../main";
import { connection } from "../../../socket/Connection";
import { Packet } from "../../../socket/packets/Packet";
import { PacketType } from "../../../socket/packets/PacketType";
import Module from "../Module";

export default class Autoheal extends Module {

    constructor() {
        super();
    }
    
    onUpdate(delta: number): void {
        const myPlayer = core.playerManager.myPlayer;
        
        if (myPlayer.alive && myPlayer.health < 100 && myPlayer.shame.isSafeHeal(core.tickEngine.ping, core.tickEngine.pingStd)) {
            const foodType = core.playerManager.myPlayer.inventory.items[0];
            const healsUp = foodType == 0 ? 20 : 40;

            const times = Math.ceil((myPlayer.maxHealth - myPlayer.health) / healsUp);

            for (let i = 0; i < times; i++) {
                core.interactionEngine.vanillaUseFoodItem(items.list[foodType], i === times - 1);
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