import config from "../../../data/moomoo/config";
import hats from "../../../data/moomoo/hats";
import accessories from "../../../data/moomoo/accessories";
import { Inventory, Player } from "../../../data/type/Player";
import { MeleeWeapon } from "../../../data/type/Weapon";
import { core } from "../../../main";
import { ActionType, ActionPriority } from "../../../core/ActionType";
import MathUtil from "../../../util/MathUtil";
import Module from "../Module";
import { connection } from "../../../socket/Connection";
import { Packet } from "../../../socket/packets/Packet";
import { PacketType } from "../../../socket/packets/PacketType";

export default class AntiBull extends Module {

    constructor() {
        super();
    }

    onPlayerUpdate(player: Player): void {
        const myPlayer = core.playerManager.myPlayer;
        if (player === myPlayer || core.playerManager.checkTeam(player.sid)) return;

        const hat = hats.find(x => x.id === player.skinIndex);
        const tail = hats.find(x => x.id === player.tailIndex);
        const weapon = player.inventory.weaponSelected;

        const hatReflectionMultiplier = myPlayer.skinIndex === 11 ? hats[37].dmg! : 0;
        const tailReflectionMultiplier = myPlayer.tailIndex === 21 ? accessories[20].dmg! : 0;
        const incommingDamage = weapon.stats.dmg * (hat?.dmgMultO ?? 1) * (tail?.dmgMultO ?? 1);
        const reflectedDamage = incommingDamage * hatReflectionMultiplier + incommingDamage * tailReflectionMultiplier;

        const myHatMultiplier = myPlayer.ownedHats.includes(7) ? hats[30].dmgMultO! : 1;
        const myWeapon = <MeleeWeapon> myPlayer.inventory.findBestWeapon(Inventory.WeaponFinders.DAMAGE);
        
        const straightAngle = MathUtil.getDirection(player.serverPos, myPlayer.serverPos);
        const angleToEnemy = MathUtil.getDirection(myPlayer.serverPos, player.serverPos);
return;
        // attack back if enemy attacked with us having spike gear on
        if (
            weapon instanceof MeleeWeapon
            && player.hasAttackedThisTick
            && MathUtil.getDistance(myPlayer.serverPos.clone().add(myPlayer.velocity), player.serverPos.clone().add(player.velocity)) <= myWeapon.stats.range + 35 * 2
            && myPlayer.inventory.reloads[myWeapon.id] <= (myPlayer.inventory.heldItem === myWeapon ? core.tickEngine.timeToNextTick : 0)
        ) {
            if (MathUtil.getAngleDist(straightAngle, player.serverDir) <= config.gatherAngle) {
                if (reflectedDamage + myWeapon.stats.dmg * myHatMultiplier >= 100) {
                    const attackTick = core.tickEngine.tickIndex - 1;
                    if (core.tickEngine.isTickPredictable(attackTick)) {
                        if (myPlayer.inventory.heldItem !== myWeapon) core.scheduleAction(ActionType.WEAPON, ActionPriority.ANTIBULL, attackTick, [myWeapon.id, true]);
                        if (myPlayer.ownedHats.includes(7)) core.scheduleAction(ActionType.HAT, ActionPriority.ANTIBULL, attackTick, [7]);
                        core.scheduleAction(ActionType.TAIL, ActionPriority.ANTIBULL, attackTick, [0]);
                        core.scheduleAction(ActionType.ATTACK, ActionPriority.ANTIBULL, attackTick, [1, angleToEnemy]);
                    } else if (core.isHighestPriority(ActionPriority.ANTIBULL, attackTick)) {
                        if (myPlayer.inventory.heldItem !== myWeapon) connection.send(new Packet(PacketType.SELECT_ITEM, [myWeapon.id, true]));
                        if (myPlayer.ownedHats.includes(7)) connection.send(new Packet(PacketType.BUY_AND_EQUIP, [0, 7, 0]));
                        connection.send(new Packet(PacketType.BUY_AND_EQUIP, [0, 0, 1]));
                        connection.send(new Packet(PacketType.ATTACK, [1, angleToEnemy]));
                    }
                }
            }
        }

        // equip spike gear + cx if player will attack next tick
        if (
            player.nextAttack - 1 === core.tickEngine.tickIndex
            && MathUtil.getDistance(myPlayer.serverPos.clone().add(myPlayer.velocity), player.serverPos.clone().add(player.velocity)) <= weapon.stats.range + 35 * 2
            && core.tickEngine.tickIn(myPlayer.inventory.reloads[myWeapon.id] - (myPlayer.inventory.heldItem === myWeapon ? core.tickEngine.timeToNextTick : 0)) <= player.nextAttack
        ) {
            const attackTick = player.nextAttack;
            if (core.tickEngine.isTickPredictable(attackTick)) {
                if (myPlayer.ownedHats.includes(11)) core.scheduleAction(ActionType.HAT, ActionPriority.ANTIBULL, attackTick, [11]);
                if (myPlayer.ownedTails.includes(21)) core.scheduleAction(ActionType.TAIL, ActionPriority.ANTIBULL, attackTick, [21]);
                core.scheduleAction(ActionType.ATTACK, ActionPriority.ANTIBULL, attackTick, [0, null]);
            } else if (core.isHighestPriority(ActionPriority.ANTIBULL, attackTick)) {
                if (myPlayer.ownedHats.includes(11)) connection.send(new Packet(PacketType.BUY_AND_EQUIP, [0, 11, 0]));
                if (myPlayer.ownedTails.includes(21)) connection.send(new Packet(PacketType.BUY_AND_EQUIP, [0, 21, 1]));
            }
        }
    }
}