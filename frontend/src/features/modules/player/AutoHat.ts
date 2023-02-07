import { ActionPriority, ActionType } from "../../../core/ActionType";
import config from "../../../data/moomoo/config";
import { PlayerBuilding } from "../../../data/type/GameObject";
import { Inventory } from "../../../data/type/Player";
import { MeleeWeapon, Weapon, Weapons } from "../../../data/type/Weapon";
import EventPacket from "../../../event/EventPacket";
import { core } from "../../../main";
import { connection } from "../../../socket/Connection";
import { Packet } from "../../../socket/packets/Packet";
import { PacketType } from "../../../socket/packets/PacketType";
import MathUtil from "../../../util/MathUtil";
import AntiTrap from "../building/AntiTrap";
import Module from "../Module";

export default class AutoHat extends Module {

    private skipNextTick: boolean;

    constructor() {
        super();
        this.skipNextTick = false;
    }

    private getHat(shouldAutobull: boolean) {
        const antiTrap = (<AntiTrap> core.moduleManager.getModule(AntiTrap));
        const myPlayer = core.playerManager.myPlayer;

        let hat = -1;
        let tail = -1;

        //console.log(tickIndex);
        
        if (shouldAutobull) {

            let playersHit = 0;
            let objectsHit = 0;

            const weapon = <MeleeWeapon> myPlayer.inventory.weaponSelected;
            const grids = core.objectManager.getGridArrays(myPlayer.serverPos.x, myPlayer.serverPos.y, weapon.stats.range + myPlayer.velocity.length() * 2).flat(1);

            for (let i = 0; i < grids.length; i++) {
                const object = grids[i];
                // use object.scale because .getScale returns collision box while .scale is hitbox
                if (MathUtil.getDistance(object.position, myPlayer.lastTickServerPos) - object.scale <= weapon.stats.range + myPlayer.velocity.length() * 2) {
                    const gatherAngle = MathUtil.roundTo(MathUtil.getDirection(myPlayer.serverPos, object.position), 1);
                    const safeSpan = MathUtil.lineSpan(object.position.clone(), myPlayer.lastTickServerPos.clone(), myPlayer.serverPos.clone().add(myPlayer.velocity));

                    if (MathUtil.getAngleDist(core.mouseAngle, gatherAngle) <= config.gatherAngle + Number.EPSILON) {
                        if (object instanceof PlayerBuilding) {
                            objectsHit++;
                        }
                    }
                }
            }

            const players = core.playerManager.getVisibleEnemies();
            for (let i = 0; i < players.length; i++) {
                const player = players[i];
                if (MathUtil.getDistance(player.serverPos, myPlayer.lastTickServerPos) - player.scale <= weapon.stats.range + myPlayer.velocity.length() * 2) {
                    const gatherAngle = MathUtil.roundTo(MathUtil.getDirection(myPlayer.serverPos, player.serverPos), 1);

                    if (MathUtil.getAngleDist(core.mouseAngle, gatherAngle) <= config.gatherAngle + Number.EPSILON) {
                        playersHit++;
                    }
                }
            }

            if (weapon !== Weapons.GREAT_HAMMER && playersHit > 0) {
                hat = 7;
                tail = 0;
            } else if (antiTrap.isTrapped() || objectsHit > 0) {
                hat = 40;
            }

            //hat = 7;
            //tail = 0;
            //console.log("autobull" );
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
        const antiTrap = (<AntiTrap> core.moduleManager.getModule(AntiTrap));

        if (packet.type === PacketType.ATTACK) {
            if (packet.data[0] && myPlayer.justStartedAttacking) {
                const [hat, tail] = this.getHat(true);
                const attackArriveTick = core.tickEngine.tickIndex + 1;
                if (core.tickEngine.isTickPredictable(attackArriveTick)) {
                    core.scheduleAction(ActionType.HAT, ActionPriority.BIOMEHAT, attackArriveTick, [hat]);
                    core.scheduleAction(ActionType.TAIL, ActionPriority.BIOMEHAT, attackArriveTick, [tail]);
                } else if (core.isHighestPriority(ActionPriority.BIOMEHAT, attackArriveTick)/* && !antiTrap.isTrapped()*/) {
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