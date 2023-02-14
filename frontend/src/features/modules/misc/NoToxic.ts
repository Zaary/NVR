import EventPacket from "../../../event/EventPacket";
import { core } from "../../../main";
import { PacketType } from "../../../socket/packets/PacketType";
import Module from "../Module";

export default class NoToxic extends Module {

    constructor() {
        super();
    }

    onPacketReceive(event: EventPacket): void {
        const packet = event.getPacket();

        if (packet.type === PacketType.CHAT && packet.data[0] !== core.playerManager.myPlayer.sid) {
            const message = packet.data[1];

            if (
                   /\b[ei]+z+(?:[iy]+)?\b/i.test(message) // ez
                || /\b(u\s+suck|you\s+suck|so\s+bad|(?:ur)?(?:so|ur)\sbad|noob|loser)\b/i.test(message) // other
            ) {
                event.setData([packet.data[0], this.createReplacement()]);
            }
        }
    }

    createReplacement() {
        return "I'm very bad in this game.";
    }
}