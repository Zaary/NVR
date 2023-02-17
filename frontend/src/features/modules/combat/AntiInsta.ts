import { ActionPriority, ActionType } from "../../../core/ActionType";
import accessories from "../../../data/moomoo/accessories";
import config from "../../../data/moomoo/config";
import hats from "../../../data/moomoo/hats";
import { items } from "../../../data/moomoo/items";
import { Player } from "../../../data/type/Player";
import { Projectile, projectileList, Projectiles } from "../../../data/type/Projectile";
import { MeleeWeapon, RangedWeapon, WeaponSlot } from "../../../data/type/Weapon";
import EventPacket from "../../../event/EventPacket";
import { core } from "../../../main";
import { connection } from "../../../socket/Connection";
import { Packet } from "../../../socket/packets/Packet";
import { PacketType } from "../../../socket/packets/PacketType";
import MathUtil from "../../../util/MathUtil";
import Module from "../Module";

export default class AntiInsta extends Module {

    private totalDamageDealt: number;
    private totalPotentialDamage: number;

    constructor() {
        super();
        this.totalDamageDealt = 0;
        this.totalPotentialDamage = 0;
    }

    onPlayerUpdate(player: Player): void {
        const myPlayer = core.playerManager.myPlayer;
        if (player === myPlayer || core.playerManager.checkTeam(player.sid)) return;

        const hat = hats.find(x => x.id === player.skinIndex);
        const tail = hats.find(x => x.id === player.tailIndex);
        const weapon = player.inventory.weaponSelected;
        
        const straightAngle = MathUtil.getDirection(myPlayer.serverPos, player.serverPos);

        // current tick damage
        if (player.inventory.turretGearReload <= core.tickEngine.timeToNextTick) {
            const projectile = Projectiles.TURRET_BULLET;
            if (!Projectile.willBeTicked(projectile, myPlayer.serverPos, myPlayer.scale * 2, player.serverPos)) {
                this.totalDamageDealt += projectile.stats.dmg;
            }
        }
        if (weapon instanceof MeleeWeapon && player.hasAttackedThisTick) {
            if (MathUtil.getAngleDist(straightAngle, player.serverDir) <= config.gatherAngle) {
                const damage = weapon.stats.dmg * (hat?.dmgMultO ?? 1) * (tail?.dmgMultO ?? 1);
                this.totalDamageDealt += damage;
            }
        } else if (weapon instanceof RangedWeapon && player.hasFiredProjectileThisTick) {
            const projectile = weapon.projectile;
            const damage = projectile.stats.dmg;

            if (!Projectile.willBeTicked(projectile, myPlayer.serverPos, myPlayer.scale * 3, player.serverPos)) {
                this.totalDamageDealt += damage;
            }
        }

        // next tick potential
        const primary = player.inventory.getWeapon(WeaponSlot.PRIMARY)!;
        const secondary = player.inventory.getWeapon(WeaponSlot.SECONDARY);
        
        if (!player.hasAttackedThisTick && player.reloads[primary.id] <= (weapon === primary ? core.tickEngine.timeToNextTick : 0)) {
            const damage = primary.stats.dmg * 1.5; // assume bull helmet usage
            this.totalPotentialDamage += damage;
        } else if (secondary && !((secondary instanceof MeleeWeapon ? player.hasAttackedThisTick : player.hasFiredProjectileThisTick)) && player.reloads[secondary.id] <= (weapon === secondary ? core.tickEngine.timeToNextTick : 0)) {
            if (secondary instanceof MeleeWeapon) {
                const damage = secondary.stats.dmg * 1.5; // assume bull helmet usage
                this.totalPotentialDamage += damage;
            } else if (secondary instanceof RangedWeapon) {
                const projectile = secondary.projectile;
                const damage = projectile.stats.dmg;
    
                if (!Projectile.willBeTicked(projectile, myPlayer.serverPos, myPlayer.scale * 3, player.serverPos)) {
                    this.totalPotentialDamage += damage;
                }
            }
        }
    }

    onPacketReceive(event: EventPacket): void {
        const packet = event.getPacket();

        if (packet.type === PacketType.PLAYER_UPDATE) {
            const myPlayer = core.playerManager.myPlayer
 
            const projectiles = core.projectileManager.getDangerousProjectiles(core.tickEngine.tickIndex + 1);
            const projectileDamage = projectiles.reduce((ac: number, val: Projectile) => ac + projectileList[val.type].stats.dmg, 0);
            const potentialDamage = this.totalPotentialDamage + projectileDamage;

            const currentDamageReduction = (myPlayer.skinIndex === 6 ? 0.75 : 0) + (0);

            const newHealth = Math.min(myPlayer.health, myPlayer.maxHealth - potentialDamage * currentDamageReduction);

            if (newHealth - potentialDamage <= 0) {
                const tick = core.tickEngine.tickIndex + 1;
                if (newHealth - potentialDamage * 0.75 > 0 && myPlayer.ownedHats.includes(6)) {
                    // soldier will save us
                    if (core.tickEngine.isTickPredictable(tick)) {
                        core.scheduleAction(ActionType.HAT, ActionPriority.ANTIINSTA, tick, [6]);
                    } else {
                        connection.send(new Packet(PacketType.BUY_AND_EQUIP, [0, 6, 0]), true);
                        core.lastActionState.hat = 6;
                    }
                } else {
                    // healing to full will save us
                    const foodType = core.playerManager.myPlayer.inventory.items[0];
                    const healsUp = foodType == 0 ? 20 : 40;

                    const times = Math.ceil((myPlayer.maxHealth - myPlayer.health) / healsUp);

                    for (let i = 0; i < times; i++) {
                        core.interactionEngine.vanillaUseFoodItem(items.list[foodType], i === times - 1);
                    }

                    if (myPlayer.maxHealth - potentialDamage < 0 && myPlayer.ownedHats.includes(6)) {
                        // equip soldier because even healing to full wont save us
                        if (core.tickEngine.isTickPredictable(tick)) {
                            core.scheduleAction(ActionType.HAT, ActionPriority.ANTIINSTA, tick, [6]);
                        } else {
                            connection.send(new Packet(PacketType.BUY_AND_EQUIP, [0, 6, 0]), true);
                            core.lastActionState.hat = 6;
                        }
                    }
                }
            }

            this.totalDamageDealt = 0;
            this.totalPotentialDamage = 0;
        }
    }

}