import { items } from "../../../data/moomoo/items";
import { Player } from "../../../data/type/Player";
import { MeleeWeapon, RangedWeapon, Weapon, Weapons, WeaponSlot } from "../../../data/type/Weapon";
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

    private damagePotential: number;

    constructor() {
        super();
        this.damagePotential = 0;
    }

    // if you send a packet in this method, it will arrive right before the tick happens serverside
    onPreTick(tickIndex: number): void {
    }

    // if you send a packet in this method, it will arrive right after the tick happens serverside
    onPostTick(tickIndex: number): void {

        const threats = core.playerManager.getThreats();
        this.damagePotential = 0
        for (let i = 0; i < threats.length; i++) {
            const tempThreat = threats[i];
            if (tempThreat.inventory.weapons[1]) {
                if (tempThreat.inventory.remainingReloadTime(WeaponSlot.SECONDARY) <= core.tickEngine.timeToNextTick) {
                    this.damagePotential += /*tempThreat.inventory.weapons[1].stats.dmg*/50;
                }//can u also do the thing like down there i used old myPlayer access way
            }

            if (tempThreat.inventory.remainingReloadTime(WeaponSlot.PRIMARY) <= core.tickEngine.timeToNextTick) {
                this.damagePotential += tempThreat.inventory.weapons[0].stats.dmg;
            }
        };
        if (this.damagePotential > 100) {
            console.log("Damage Above 100 can be done be aware :<")
            /* Auto Q */
            if (core.tickEngine.ping > 80) {
                const foodType = core.playerManager.myPlayer.inventory.items[0];
                for (let i = 0; i < /*Math.ceil((100 - this.lastHealth) / healsUp)*/3; i++) {
                    //core.interactionEngine.vanillaPlaceItem(items.list[foodType], core.mouseAngle);
                }
            }
        }
    }

    // this method gets called when we receive a player update packet meaning a tick has happened serverside
    onTick(tickIndex: number): void {
        
    }

    // this method gets called every clientside frame
    onUpdate(delta: number): void {
        
    }

    // this method gets fired when we receive a packet from server
    onPacketReceive(event: EventPacket): void {
        const packet = event.getPacket();
        if (packet.type === PacketType.HEALTH_UPDATE) {
            if (core.tickEngine.ping > 80) return; // autoQ will be enough and this may cause clown so yeh
            const [sid, health] = packet.data;
            if (sid === core.playerManager.myPlayer.sid) {
                if (health <= 60 && this.damagePotential >= 100) {
                    const foodType = core.playerManager.myPlayer.inventory.items[0];
                    const healsUp = foodType == 0 ? 20 : 40;
        
                    for (let i = 0; i < /*Math.ceil((100 - this.lastHealth) / healsUp)*/3; i++) {
                        //core.interactionEngine.vanillaPlaceItem(items.list[foodType], core.mouseAngle);
                    }

                    
                    event.cancel();
                }
            }
        }
    }

}