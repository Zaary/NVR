import { MeleeWeapon, Weapon } from "../../../data/type/Weapon";
import EventPacket from "../../../event/EventPacket";
import { core } from "../../../main";
import { PacketType } from "../../../socket/packets/PacketType";
import Module from "../Module";

export default class AntiInsta extends Module {
    constructor() {
        super();
    }

    onPacketReceive(event: EventPacket): void {
        if (!core.playerManager.myPlayer.visible) return;

        const packet = event.getPacket();
        
        if (packet.type === PacketType.PLAYER_UPDATE) {
            const myPlayer = core.playerManager.myPlayer;
            const enemiesInRange = core.playerManager.playerList.filter(player => player.inventory.heldItem instanceof Weapon && myPlayer.serverPos.clone().subtract(player.serverPos).length() <= player.inventory.weaponSelected.stats.range);

            // here u go
        }
    }
}