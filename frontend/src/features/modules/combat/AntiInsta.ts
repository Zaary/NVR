import { ActionPriority, ActionType } from "../../../core/ActionType";
import accessories from "../../../data/moomoo/accessories";
import config from "../../../data/moomoo/config";
import hats from "../../../data/moomoo/hats";
import { items } from "../../../data/moomoo/items";
import { PlayerBuilding } from "../../../data/type/GameObject";
import { Player } from "../../../data/type/Player";
import { Projectile, ProjectileItem, projectileList, Projectiles } from "../../../data/type/Projectile";
import { MeleeWeapon, RangedWeapon, Weapon, Weapons, WeaponSlot } from "../../../data/type/Weapon";
import EventPacket from "../../../event/EventPacket";
import { core } from "../../../main";
import { connection } from "../../../socket/Connection";
import { Packet } from "../../../socket/packets/Packet";
import { PacketType } from "../../../socket/packets/PacketType";
import { TickEngine, TickRoundType } from "../../../util/engine/TickEngine";
import MathUtil from "../../../util/MathUtil";
import RecognitionUtil from "../../../util/RecognitionUtil";
import Vector from "../../../util/type/Vector";
import Module from "../Module";

export default class AntiInsta extends Module {

    private meleePlayersCount: number;
    private totalDamageDealt: number;
    private totalPotentialDamage: number;
    private totalPotentialRangedDamage: number;
    private totalPotentialTurretGearDamage: number;

    private hasCountedTurretGear: boolean;
    private hasCountedRanged: boolean;

    constructor() {
        super();
        this.meleePlayersCount = 0;
        this.totalDamageDealt = 0;
        this.totalPotentialDamage = 0;
        this.totalPotentialRangedDamage = 0;
        this.totalPotentialTurretGearDamage = 0;
        this.hasCountedTurretGear = false;
        this.hasCountedRanged = false;
    }

    onPlayerUpdate(player: Player): void {
        const myPlayer = core.playerManager.myPlayer;
        if (player === myPlayer || core.playerManager.checkTeam(player.sid)) return;

        //console.log("ticking update:", player.name);

        const hat = hats.find(x => x.id === player.skinIndex);
        const tail = hats.find(x => x.id === player.tailIndex);
        const weapon = player.inventory.weaponSelected;
        const variant = player.inventory.getWeaponVariant(weapon.id < 9 ? WeaponSlot.PRIMARY : WeaponSlot.SECONDARY)!;
        
        const straightAngle = MathUtil.getDirection(player.serverPos, myPlayer.serverPos);

        const autohealWouldHealIn = Math.max(0, myPlayer.shame.whenSafeHeal(0)) + core.tickEngine.timeToNextTick + core.tickEngine.pingStd;
        const autohealTickRounded = core.tickEngine.roundToTick(autohealWouldHealIn, TickRoundType.FLOOR);

        // current tick damage
        if (player.inventory.turretGearReload <= core.tickEngine.timeToNextTick) {
            const projectile = Projectiles.TURRET_BULLET;
            if (Projectile.canHit(projectile, player.serverPos, straightAngle, myPlayer.serverPos, myPlayer.scale) && !this.hasCountedTurretGear) {
                this.hasCountedTurretGear = true;
                if (player.skinIndex === 53 && (MathUtil.getDistance(myPlayer.serverPos, player.serverPos) - myPlayer.scale) / projectile.stats.speed <= autohealWouldHealIn) {
                    this.totalDamageDealt += projectile.stats.dmg;
                } else {
                    this.totalPotentialTurretGearDamage += projectile.stats.dmg;
                }
            }
        }

        if (weapon instanceof MeleeWeapon && player.hasAttackedThisTick && MathUtil.getDistance(myPlayer.serverPos, player.serverPos) <= weapon.stats.range + 35 * 2) {
            //console.log("melee attacked this tick");
            if (MathUtil.getAngleDist(straightAngle, player.serverDir) <= config.gatherAngle) {
                const damage = weapon.stats.dmg * config.weaponVariants[variant].val * (hat?.dmgMultO ?? 1) * (tail?.dmgMultO ?? 1);
                this.totalDamageDealt += damage;
                this.meleePlayersCount++;
                console.log("melee this tick", damage);
            }
        } else if (weapon instanceof RangedWeapon && player.hasFiredProjectileThisTick) {
            const projectile = weapon.projectile;
            const damage = projectile.stats.dmg;

            if (Projectile.canHit(projectile, player.serverPos, player.serverDir, myPlayer.serverPos, myPlayer.scale) && (MathUtil.getDistance(myPlayer.serverPos, player.serverPos) - player.scale * 2 - myPlayer.scale) / projectile.stats.speed <= autohealWouldHealIn) {
                this.totalDamageDealt += damage;
                console.log("ranged this tick");
            }
        }

        //if (!RecognitionUtil.canInstakill(player)) return;

        // next tick potential
        const primary = player.inventory.getWeapon(WeaponSlot.PRIMARY) ?? Weapons.TOOL_HAMMER; // assume tool hammer
        const primaryVariant = player.inventory.getWeaponVariant(WeaponSlot.PRIMARY) ?? 0;
        const secondary = player.inventory.getWeapon(WeaponSlot.SECONDARY) ?? RecognitionUtil.assumeSecondary(primary.id);

        if (
            !player.hasAttackedThisTick && player.inventory.reloads[primary.id] <= (weapon === primary ? autohealTickRounded : 0)
            && MathUtil.getDistance(player.serverPos.clone().add(player.velocity).directionMove(straightAngle, (player.hasFiredProjectileThisTick && player.lastProjectileFired!.type === Projectiles.MUSKET_BULLET.type ? 0.35 : 0) * -1), myPlayer.serverPos) <= primary.stats.range + 35 * 2
        ) {
            const damage = primary.stats.dmg * config.weaponVariants[primaryVariant].val * 1.5; // assume bull helmet usage
            this.totalPotentialDamage += damage;
            this.meleePlayersCount++;
            console.log("melee primary potential", damage);
        } else if (player.inventory.reloads[secondary.id] <= (weapon === secondary ? autohealTickRounded : 0)) {
            if (secondary instanceof MeleeWeapon && MathUtil.getDistance(myPlayer.serverPos.clone().add(myPlayer.velocity), player.serverPos.clone().add(player.velocity)) <= secondary.stats.range + 35 * 2) {
                const damage = secondary.stats.dmg * config.weaponVariants[primaryVariant].val * 1.5; // assume bull helmet usage
                this.totalPotentialDamage += damage;
                this.meleePlayersCount++;
                console.log("melee secondary potential", damage);
            } else if (secondary instanceof RangedWeapon && !this.hasCountedRanged) {
                this.hasCountedRanged = true;
                const projectile = secondary.projectile;
                const damage = projectile.stats.dmg;

                if ((MathUtil.getDistance(myPlayer.serverPos.clone().add(myPlayer.velocity), player.serverPos.clone().add(player.velocity)) - player.scale * 2 - myPlayer.scale) / projectile.stats.speed <= autohealWouldHealIn) {
                    this.totalPotentialRangedDamage += damage;
                    console.log("ranged secondary potential", damage);
                }
            }
        }
    }

    onProjectileEarlyDespawn(projectileItem: ProjectileItem, spawnPosition: Vector, direction: number): void {
        const myPlayer = core.playerManager.myPlayer;

        const spawnPos = spawnPosition.clone().subtract(Math.cos(direction) * 35 * 2, Math.sin(direction) * 35 * 2);

        const expandedHitbox = myPlayer.scale + myPlayer.velocity.length();

        if (MathUtil.lineInRectMooMoo(myPlayer.serverPos.x + myPlayer.velocity.x - expandedHitbox, myPlayer.serverPos.y + myPlayer.velocity.y - expandedHitbox, myPlayer.serverPos.x + myPlayer.velocity.x + expandedHitbox, myPlayer.serverPos.y + myPlayer.velocity.y + expandedHitbox, spawnPos.x, spawnPos.y, spawnPos.x + Math.cos(direction) * projectileItem.stats.range, spawnPos.y + Math.sin(direction) * projectileItem.stats.range)) {
            this.totalDamageDealt += projectileItem.stats.dmg;
            console.log("early projectile damage caught at 3 am");
        }
    }

    onPreBuildingHit(player: Player, building: PlayerBuilding, tickIndex: number, potentialBreak: boolean): void {
        if (player !== core.playerManager.myPlayer && !core.playerManager.checkTeam(player.sid)) {
            if (building instanceof PlayerBuilding && building.type === 15 && core.playerManager.myPlayer.state.data.trap === building && potentialBreak) {
                if (core.tickEngine.isTickPredictable(tickIndex)) {
                    core.scheduleAction(ActionType.HAT, ActionPriority.ANTIINSTA, tickIndex, [6]);
                } else {
                    connection.send(new Packet(PacketType.BUY_AND_EQUIP, [0, 6, 0]));
                }
            }
        }
    }

    onPacketReceive(event: EventPacket): void {
        const packet = event.getPacket();

        if (packet.type === PacketType.PLAYER_UPDATE) {
            const myPlayer = core.playerManager.myPlayer;
 
            const projectiles = core.projectileManager.getDangerousProjectiles(core.tickEngine.tickIndex + 1);
            const projectileDamage = projectiles.length <= 2 ? projectiles.reduce((ac: number, val: Projectile) => ac + projectileList[val.type].stats.dmg, 0) : 0;
            const potentialDamage = this.meleePlayersCount > 1 ? this.totalPotentialDamage + this.totalPotentialTurretGearDamage : this.totalPotentialDamage + this.totalPotentialRangedDamage + this.totalPotentialTurretGearDamage + projectileDamage;

            const currentDamageReduction = (myPlayer.skinIndex === 6 ? 0.75 : 0) + (0);

            //if (this.totalDamageDealt > 0 || potentialDamage > 0) console.log("dealt:", this.totalDamageDealt, "potential:", potentialDamage);
            const newHealth = Math.min(myPlayer.health, myPlayer.maxHealth - potentialDamage * currentDamageReduction);
            //console.log("newhealth:", newHealth, "potential damage:", potentialDamage);

            if (newHealth < 100) console.log("new health:", newHealth, "potential:", potentialDamage);

            if (newHealth - potentialDamage <= 0) {
                const tick = core.tickEngine.tickIndex + 1;
                if (newHealth - potentialDamage + this.totalPotentialTurretGearDamage > 0 && myPlayer.ownedHats.includes(22)) {
                    // emp will save us cuz damage without turret gear isnt killing
                    if (core.tickEngine.isTickPredictable(tick)) {
                        core.scheduleAction(ActionType.HAT, ActionPriority.ANTIINSTA, tick, [22]);
                    } else {
                        connection.send(new Packet(PacketType.BUY_AND_EQUIP, [0, 22, 0]), true);
                        core.lastActionState.hat = 22;
                    }
                } else if (newHealth - potentialDamage * 0.75 > 0 && myPlayer.ownedHats.includes(6)) {
                    // soldier will save us
                    if (core.tickEngine.isTickPredictable(tick)) {
                        core.scheduleAction(ActionType.HAT, ActionPriority.ANTIINSTA, tick, [6]);
                    } else {
                        connection.send(new Packet(PacketType.BUY_AND_EQUIP, [0, 6, 0]));
                        //core.lastActionState.hat = 6;
                    }
                } else {
                    // healing to full will save us
                    const foodType = core.playerManager.myPlayer.inventory.items[0];
                    const healsUp = foodType == 0 ? 20 : 40;

                    const times = Math.ceil((myPlayer.maxHealth - myPlayer.health) / healsUp);

                    for (let i = 0; i < times; i++) {
                        core.interactionEngine.vanillaUseFoodItem(items.list[foodType], i === times - 1);
                    }

                    if (myPlayer.maxHealth - potentialDamage + this.totalPotentialTurretGearDamage > 0 && myPlayer.ownedHats.includes(22)) {
                        // healing to full and emp helmet will save us
                        if (core.tickEngine.isTickPredictable(tick)) {
                            core.scheduleAction(ActionType.HAT, ActionPriority.ANTIINSTA, tick, [22]);
                        } else {
                            connection.send(new Packet(PacketType.BUY_AND_EQUIP, [0, 22, 0]));
                            //core.lastActionState.hat = 22;
                        }
                    } else if ((this.meleePlayersCount > 1 || myPlayer.maxHealth - potentialDamage < 0) && myPlayer.ownedHats.includes(6)) {
                        // equip soldier because even healing to full wont save us
                        if (core.tickEngine.isTickPredictable(tick)) {
                            core.scheduleAction(ActionType.HAT, ActionPriority.ANTIINSTA, tick, [6]);
                        } else {
                            connection.send(new Packet(PacketType.BUY_AND_EQUIP, [0, 6, 0]));
                            //core.lastActionState.hat = 6;
                        }
                    }
                }
            }

            this.meleePlayersCount = 0;
            this.totalDamageDealt = 0;
            this.totalPotentialDamage = 0;
            this.totalPotentialRangedDamage = 0;
            this.totalPotentialTurretGearDamage = 0;
            this.hasCountedTurretGear = false;
            this.hasCountedRanged = false;
        }
    }
}