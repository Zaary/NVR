import { ActionPriority, ActionType } from "../../../core/ActionType";
import accessories from "../../../data/moomoo/accessories";
import hats from "../../../data/moomoo/hats";
import { items } from "../../../data/moomoo/items";
import { WeaponSlot } from "../../../data/type/Weapon";
import EventPacket from "../../../event/EventPacket";
import { core } from "../../../main";
import { PacketType } from "../../../socket/packets/PacketType";
import MathUtil from "../../../util/MathUtil";
import Module from "../Module";

/*
use `core.tickEngine.tickIndex` to get index of the last tick that has happened

use `core.tickEngine.ping` to get current ping (roundtrip)

use `core.interactionEngine.heal()` to heal 1 time using your current food

use `core.playerManager.myPlayer` to get the player object we are currently controlling
use `core.playerManager.playerList` to get list of all players

player is a class with the following properties:
serverPos: { x: number; y: number } - an object storing the player's current position
health: number - storing current player health
maxHealth: number - storing maximum health of the player

inventory: Inventory - an inventory class instance storing data about the player's inventory

Inventory is a class with the following properties and methods:
reloads: { [key: number]: number } - object mapping weapon ids to current reload state (ms left to fully reload, 0 means reloaded)
weapons: [Weapon, Weapon | null] - a tuple of two items - two weapon slots - being Weapon class instances
heldItem: Weapon | Item - thing the player is currently holding in hand - either Weapon instance or item
weaponSelected: Weapon - last weapon the player had in hand, a Weapon instance

Weapon is a class with the following properties:
slot: number - 0 or 1 being primary and secondary slots
type: WeaponType - weapon ids being WeaponType.POLEARM, WeaponType.KATANA, WeaponType.DAGGERS, WeaponType.MUSKET and WeaponType.GREAT_HAMMER
stats: WeaponStats - statistics of the weapon

WeaponStats is a class with the following properties:
range: number - how far the weapon can reach
speedMultiplier: number - how fast the player speed multiplies with the weapon held
reloadTime: number - how fast the weapon reloads
dmg: number - how much damage the weapon deals on hit
*/

export default class AntiInsta extends Module {

    constructor() {
        super();
    }

    // if you send a packet in this method, it will arrive right before the tick happens serverside
    onPreTick(tickIndex: number): void {
        const myPlayer = core.playerManager.myPlayer;
        const enemies = core.playerManager.getVisibleEnemies();

        let totalDamage = 0;

        for (let i = 0; i < enemies.length; i++) {
            const enemy = enemies[i];
            const hatMultiplier = hats.find(x => x.id === 7)!.dmgMultO!;
            //const tailMultiplier = hats.find(x => x.id === 21)!.dmgMultO ?? 1;
            
            const primaryWeapon = enemy.inventory.getWeapon(WeaponSlot.PRIMARY)!;
            const weaponDamage = primaryWeapon.stats.dmg * hatMultiplier/* * tailMultiplier*/;

            const distance = MathUtil.getDistance(myPlayer.serverPos.clone().add(myPlayer.velocity), enemy.serverPos.clone().add(enemy.velocity));
            let potentialDamage = 0;

            if (distance < primaryWeapon.stats.range + enemy.scale + myPlayer.scale) {
                if (enemy.inventory.reloads[primaryWeapon.id] === 0 || enemy.inventory.reloads[primaryWeapon.id] <= core.tickEngine.timeToNextTick && enemy.inventory.heldItem === primaryWeapon) {
                    potentialDamage = weaponDamage;
                }
            }

            const secondaryWeapon = enemy.inventory.getWeapon(WeaponSlot.SECONDARY);

            if (secondaryWeapon) {
                if (enemy.inventory.reloads[secondaryWeapon.id] === 0 || enemy.inventory.reloads[secondaryWeapon.id] <= core.tickEngine.timeToNextTick && enemy.inventory.heldItem === secondaryWeapon) {
                    potentialDamage = Math.max(potentialDamage, secondaryWeapon.stats.dmg);
                }
            }

            totalDamage += potentialDamage;
        }

        const soldierHat = hats.find(x => x.id === 6)!;

        const survivesWithoutHeal = /*myPlayer.health - totalDamage > 0*/myPlayer.health > 60;
        const survivesAfterHeal = /*myPlayer.maxHealth - totalDamage > 0*/myPlayer.health < 60;

        const ownsSoldierHat = myPlayer.ownedHats.includes(6);
        const ownsSpikeGear = myPlayer.ownedHats.includes(11);
        const ownsCXWings = myPlayer.ownedTails.includes(21);
        const ownsBarbarian = myPlayer.ownedHats.includes(26);

        const survivesWithSoldierHat = myPlayer.health - totalDamage * soldierHat.dmgMult! > 0;
        const survivesWithSoldierHatHealed = myPlayer.maxHealth - totalDamage * soldierHat.dmgMult! > 0;

        const hatDamageReflection = totalDamage * hats.find(x => x.id === 1)!.dmg!;
        const tailDamageReflection = totalDamage * accessories.find(x => x.id === 21)!.dmg!;

        //const damageReflectionIsEnough = (ownsSpikeGear ? hatDamageReflection : 0) + (ownsCXWings ? tailDamageReflection : 0) > 

        /*
            HEAL = 2
            SOLDIER = 4
            KNOCKBACK = 8
            SPIKY = 16
        */

        let action = -1;
        
        if (survivesWithSoldierHat) {
            if (survivesWithoutHeal) {
                action = ownsBarbarian ? 8 : 0;
            } else if (ownsSoldierHat) {
                action = 4;
            }
        }

        if (action === -1) {
            if (survivesWithSoldierHatHealed) {
                if (survivesAfterHeal) {
                    action = ownsBarbarian ? 10 : 2;
                } else if (ownsSoldierHat) {
                    action = 6;
                }
            }
        }

        if ((action & 2) === 2) {
            const foodType = core.playerManager.myPlayer.inventory.items[0];
            const healsUp = foodType == 0 ? 20 : 40;

            for (let i = 0; i < Math.ceil((myPlayer.maxHealth - myPlayer.health) / healsUp); i++) {
                core.interactionEngine.vanillaPlaceItem(items.list[foodType], core.mouseAngle);
            }
        }

        //console.log(action);

        let hat = -1;
        let tail = -1;
        
        if ((action & 4) === 4) {
            hat = 6;
        }

        if ((action & 8) === 8) {
            hat = 26;
        }

        /*if ((action & 16) === 16) {
            if (ownsSpikeGear) hat = 11;
            if (ownsCXWings) tail = 21;
        }*/

        if (hat !== -1) {
            core.scheduleAction(ActionType.HAT, ActionPriority.ANTIINSTA, tickIndex, [hat]);
        }
    }

    onPacketReceive(event: EventPacket): void {
        const packet = event.getPacket();
        if (packet.type === PacketType.HEALTH_UPDATE) {
()            const enemies = core.playerManager.getNearby( , 275, true);
            if (!enemies.length) return;
, 27.getMeleeThreats();            const myPlayer = core.playerManager.myPlayer;
            const HealAt = myPlayer.skinIndex === 6 ? 56.25 : 40
            if (packet.data[0] === myPlayer.sid && packet.data[1] <= HealAt) {
                const foodType = core.playerManager.myPlayer.inventory.items[0];
                const healsUp = foodType == 0 ? 20 : 40;
    
                for (let i = 0; i < Math.ceil((myPlayer.maxHealth - myPlayer.health) / healsUp); i++) {
                    core.interactionEngine.vanillaPlaceItem(items.list[foodType], core.mouseAngle);
                }
            }
        }
    }
}