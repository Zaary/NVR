import { ActionPriority, ActionType } from "../../../core/ActionType";
import config from "../../../data/moomoo/config";
import { Inventory } from "../../../data/type/Player";
import { MeleeWeapon } from "../../../data/type/Weapon";
import EventPacket from "../../../event/EventPacket";
import { core } from "../../../main";
import { connection } from "../../../socket/Connection";
import { Packet } from "../../../socket/packets/Packet";
import { PacketType } from "../../../socket/packets/PacketType";
import Module from "../Module";

export default class AutoHat extends Module {

    private skipNextTick: boolean;

    constructor() {
        super();
        this.skipNextTick = false;
    }

    private getHat(shouldAutobull: boolean) {
        const myPlayer = core.playerManager.myPlayer;
        let hat = -1;
        let tail = -1;

        //console.log(tickIndex);
        
        if (shouldAutobull) {
            hat = 7;
            tail = 0;
            console.log("autobull" );
        }/* else if (myPlayer.justStartedAttacking) {
            hat = 7;
            tail = 0;
        }*/









        // biome hats fallback

        if (!myPlayer.ownedHats.includes(hat)) {
            hat = myPlayer.serverPos.y <= config.snowBiomeTop ? 15 : (myPlayer.serverPos.y >= config.mapScale / 2 - config.riverWidth / 2 && myPlayer.serverPos.y <= config.mapScale / 2 + config.riverWidth / 2 ? 31 : 12);
        }

        if (!myPlayer.ownedTails.includes(tail)) {
            tail = 11;
        }

        // fallback to booster hat if current hat is not owned
        if (!myPlayer.ownedHats.includes(hat)) {
            if (hat !== 12 && myPlayer.ownedHats.includes(12)) {
                hat = 12;
            } else {
                // complete fallback hat if booster hat is not owned
                hat = 51;
            }
        }

        return [hat, tail];
    }

    onPreTick(tickIndex: number): void {
        if (this.skipNextTick) {
            this.skipNextTick = false;
            return;
        }

        /*if (this.doAttackNextTick) {
            this.doAttackNextTick = false;
            this.doAttack();
        }*/

        const myPlayer = core.playerManager.myPlayer;

        const shouldAutobull = (myPlayer.isAutoAttacking || myPlayer.isAttacking) && myPlayer.inventory.heldItem instanceof MeleeWeapon && myPlayer.nextAttack === tickIndex;

        const [hat, tail] = this.getHat(shouldAutobull);

        core.scheduleAction(ActionType.HAT, ActionPriority.BIOMEHAT, tickIndex, [hat]);
        core.scheduleAction(ActionType.TAIL, ActionPriority.BIOMEHAT, tickIndex, [tail]);
    }

    onPacketSend(event: EventPacket): void {
        const packet = event.getPacket();
        const myPlayer = core.playerManager.myPlayer;

        if (packet.type === PacketType.ATTACK) {
            if (packet.data[0] && myPlayer.justStartedAttacking) {
                const [hat, tail] = this.getHat(true);
                const attackArriveTick = core.tickEngine.tickIndex + 1;
                if (core.tickEngine.isTickPredictable(attackArriveTick)) {
                    core.scheduleAction(ActionType.HAT, ActionPriority.BIOMEHAT, attackArriveTick, [hat]);
                    core.scheduleAction(ActionType.TAIL, ActionPriority.BIOMEHAT, attackArriveTick, [tail]);
                } else if (core.isHighestPriority(ActionPriority.BIOMEHAT, attackArriveTick)) {
                    connection.send(new Packet(PacketType.BUY_AND_EQUIP, [0, hat, 0]), true);
                    connection.send(new Packet(PacketType.BUY_AND_EQUIP, [0, tail, 1]), true);
                    core.lastActionState.hat = hat;
                    core.lastActionState.tail = tail;
                    connection.send(new Packet(PacketType.ATTACK, [1, packet.data[1]]), true);
                    this.skipNextTick = true;
                    event.cancel();
                }
            }
        }
    }
}