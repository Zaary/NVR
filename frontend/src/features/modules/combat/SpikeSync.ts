import { ActionPriority, ActionType } from "../../../core/ActionType";
import hats from "../../../data/moomoo/hats";
import { PlayerBuilding } from "../../../data/type/GameObject";
import { Inventory, Player } from "../../../data/type/Player";
import { MeleeWeapon } from "../../../data/type/Weapon";
import { core } from "../../../main";
import { connection } from "../../../socket/Connection";
import { Packet } from "../../../socket/packets/Packet";
import { PacketType } from "../../../socket/packets/PacketType";
import MathUtil from "../../../util/MathUtil";
import Vector from "../../../util/type/Vector";
import Module from "../Module";

export default class SpikeSync extends Module {

    constructor() {
        super();
    }

    onPlayerUpdate(player: Player): void {
        const myPlayer = core.playerManager.myPlayer;
        if (player === myPlayer || core.playerManager.checkTeam(player.sid) || player.state.isTrapped) return;

        const position = player.serverPos.clone().add(player.velocity);
        const straightAngle = MathUtil.getDirection(myPlayer.serverPos.clone().add(myPlayer.velocity), position);

        const hat = hats.find(x => x.id === player.skinIndex);
        const tail = hats.find(x => x.id === player.tailIndex);
        
        const bestWeapon = <MeleeWeapon> myPlayer.inventory.findBestWeapon(Inventory.WeaponFinders.DAMAGE)!;

        if (myPlayer.inventory.reloads[bestWeapon.id] > core.tickEngine.timeToNextTick) return;
        
        const damageReduction = (hat?.dmgMult ?? 1) * (tail?.dmgMult ?? 1);
        const damageMultiplication = myPlayer.ownedHats.includes(7) ? 1.5 : 1;
        const outputDamage = bestWeapon.stats.dmg * damageMultiplication * damageReduction;

        const outputKnockbackStrength = (0.3 * 1) + (bestWeapon.stats.knockback);
        const outputKnockback = new Vector(Math.cos(straightAngle) * outputKnockbackStrength, Math.sin(straightAngle) * outputKnockbackStrength);

        const attackTick = core.tickEngine.tickIndex - 1;

        const buildings = core.objectManager.getGridArrays(position.x, position.y, player.scale + outputKnockbackStrength);
        for (let i = 0; i < buildings.length; i++) {
            const building = buildings[i];

            if (!(building instanceof PlayerBuilding) || core.playerManager.checkTeam(building.owner.sid) || building.stats.dmg === undefined) continue;

            const playerDist = MathUtil.getDistance(position, myPlayer.serverPos.clone().add(myPlayer.velocity));
            const objectDist = MathUtil.getDistance(building.position, position.clone().add(outputKnockback));

            if (playerDist <= bestWeapon.stats.range + 35 * 2 && objectDist <= player.scale + building.getScale()) {
                const buildingDamage = building.stats.dmg * damageReduction;

                if (outputDamage + buildingDamage >= player.maxHealth) {
                    connection.send(new Packet(PacketType.CHAT, ["spike sync: " + player.name]));
                    if (core.tickEngine.isTickPredictable(attackTick)) {
                        if (myPlayer.inventory.heldItem !== bestWeapon) core.scheduleAction(ActionType.WEAPON, ActionPriority.SPIKESYNC, attackTick, [bestWeapon.id, true]);
                        if (myPlayer.ownedHats.includes(7)) core.scheduleAction(ActionType.HAT, ActionPriority.SPIKESYNC, attackTick, [7]);
                        core.scheduleAction(ActionType.TAIL, ActionPriority.SPIKESYNC, attackTick, [0]);
                        core.scheduleAction(ActionType.ATTACK, ActionPriority.SPIKESYNC, attackTick, [1, straightAngle]);
                        core.scheduleAction(ActionType.ATTACK, ActionPriority.SPIKESYNC, attackTick, [0, straightAngle]);
                    } else if (core.isHighestPriority(ActionPriority.SPIKESYNC, attackTick)) {
                        if (myPlayer.inventory.heldItem !== bestWeapon) connection.send(new Packet(PacketType.SELECT_ITEM, [bestWeapon.id, true]));
                        if (myPlayer.ownedHats.includes(7)) connection.send(new Packet(PacketType.BUY_AND_EQUIP, [0, 7, 0]));
                        connection.send(new Packet(PacketType.BUY_AND_EQUIP, [0, 0, 1]));
                        connection.send(new Packet(PacketType.ATTACK, [1, straightAngle]));
                        connection.send(new Packet(PacketType.ATTACK, [0, straightAngle]));
                    }
                    break;
                }
            }
        }
    }
        
}