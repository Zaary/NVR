import { util } from "../type/MoomooUtil";
import accessories, { Accessory } from "../moomoo/accessories";
import config from "../moomoo/config";
import hats, { Hat } from "../moomoo/hats";
import { Item, items } from "../moomoo/items";
import Vector from "../../util/type/Vector";
import { MeleeWeapon, RangedWeapon, Weapon, weaponList, Weapons, WeaponSlot } from "./Weapon";
import MathUtil from "../../util/MathUtil";
import MovementProcessor from "../../util/processor/MovementProcessor";
import ObjectManager from "../../manager/ObjectManager";
import { GameObject, NaturalObject, PlayerBuilding } from "./GameObject";
import { Core } from "../../core/Core";
import { Projectile } from "./Projectile";
import { SidArray } from "../../util/type/SidArray";

enum WeaponFinder {
	BUILDING_BREAK,
	MOVEMENT_SPEED,
	DAMAGE
}

class Inventory {

	public static WeaponFinders = WeaponFinder;

	private player: Player;

	public weapons: [MeleeWeapon, Weapon | null];
	public weaponVariants: [number, number | null];
	public reloads: Record<number, number>;

	public items: number[];

	public heldItem: Weapon | Item;
	public weaponSelected: Weapon;

	public turretGearReload: number;

	constructor(player: Player) {
		this.player = player;
		this.weapons = [Weapons.TOOL_HAMMER, null];
		this.weaponVariants = [0, null];
		this.reloads = Object.fromEntries(new Array(weaponList.length).fill(undefined).map((_x, i) => [i, 0]));
		this.items = [0, 3, 6, 10];
		this.heldItem = Weapons.TOOL_HAMMER;
		this.weaponSelected = Weapons.TOOL_HAMMER;
		this.turretGearReload = 0;
	}
	
	reset() {
		this.weapons = [Weapons.TOOL_HAMMER, null];
		this.weaponVariants = [0, null];
		this.reloads = Object.fromEntries(new Array(weaponList.length).fill(undefined).map((_x, i) => [i, 0]));;
		this.items = [0, 3, 6, 10];
		this.heldItem = Weapons.TOOL_HAMMER;
		this.weaponSelected = Weapons.TOOL_HAMMER;
	}

	setWeapons(weapons: number[]) {
		this.weapons = [<MeleeWeapon> weaponList[weapons[0]], weaponList[weapons[1]]];
	}

	setItems(items: number[]) {
		this.items = items;
	}

	resetReload(item: Weapon) {
		this.reloads[item.id] = item.stats.reloadTime;
	}

	resetAllRangedReloads() {
		this.reloads[Weapons.HUNTING_BOW.id] = Weapons.HUNTING_BOW.stats.reloadTime;
		this.reloads[Weapons.CROSSBOW.id] = Weapons.CROSSBOW.stats.reloadTime;
		this.reloads[Weapons.REPEATER_CROSSBOW.id] = Weapons.REPEATER_CROSSBOW.stats.reloadTime;
		this.reloads[Weapons.MUSKET.id] = Weapons.MUSKET.stats.reloadTime;
	}

	updateReloads(delta: number) {
		if (!(this.heldItem instanceof Weapon)) return;
		const id = this.heldItem.id;

		if (this.reloads[id] > 0) {
			this.reloads[id] -= delta;
			if (this.reloads[id] <= 0) this.reloads[id] = 0;
		}

		this.turretGearReload -= delta;
	}

	remainingReloadTime(slot: WeaponSlot) {
		return this.reloads[this.weapons[slot]?.id!];
	}

	findBestWeapon(finder: WeaponFinder) {
		switch (finder) {
			case WeaponFinder.BUILDING_BREAK:
				return (<MeleeWeapon[]> this.weapons.flat(1).filter(x => x !== null && x instanceof MeleeWeapon)).sort((a: MeleeWeapon, b: MeleeWeapon) => b.stats.dmg * b.stats.buildingDmgMultiplier - a.stats.dmg * a.stats.buildingDmgMultiplier)[0];
			case WeaponFinder.MOVEMENT_SPEED:
				return this.weapons.flat(1).filter(x => x !== null).sort((a, b) => b!.stats.speedMultiplier - a!.stats.speedMultiplier)[0];
			case WeaponFinder.DAMAGE:
				return this.weapons[0];
		}
	}

	getWeapon(slot: WeaponSlot) {
		return this.weapons[slot];
	}

	getWeaponVariant(slot: WeaponSlot) {
		return this.weaponVariants[slot];
	}

	hasWeapon(weapon: number | Weapon) {
		const wep = typeof weapon === "number" ? weaponList[weapon] : weapon;
		return this.weapons[0].id === wep.id || (this.weapons[1] && this.weapons[1].id === wep.id);
	}

	fireTurretGear(pingDelta: number) {
		this.turretGearReload = 3000 - pingDelta;
	}
}

interface State {
	isTrapped: boolean;
	buildIndex: number;

	data: {
		trap: PlayerBuilding | undefined
	}
}

class ShameTracker {

	public points: number;
	public timer: number;
	public isClowned: boolean;
	public lastDamage: number;

	constructor() {
		this.points = 0;
		this.timer = 0;
		this.isClowned = false;
		this.lastDamage = -1;
	}

	isSafeHeal(ping: number, std: number) {
		return Date.now() + ping - std - this.lastDamage > 120;
	}

	whenSafeHeal(ping: number) {
		return 120 - (Date.now() + ping - this.lastDamage);
	}
}

class HatTracker {

	private static BUFFER_LENGTH = config.serverUpdateRate * 3; // track from previous 3 seconds

	public currentHat: Hat | null;
	public currentTail: Accessory | null;
	private hatBuffer: number[];
	private tailBuffer: number[];

	constructor() {
		this.currentHat = null;
		this.currentTail = null;
		this.hatBuffer = [];
		this.tailBuffer = [];
	}

	push(hat: number, tail: number) {
		this.hatBuffer.push(hat);
		if (this.hatBuffer.length >= HatTracker.BUFFER_LENGTH) this.hatBuffer.shift();
		this.tailBuffer.push(tail);
		if (this.tailBuffer.length >= HatTracker.BUFFER_LENGTH) this.tailBuffer.shift();
	}

	isFull() {
		return this.hatBuffer.length + this.tailBuffer.length >= HatTracker.BUFFER_LENGTH * 2;
	}

	// these calculations are fine: array.length - lastIndexOf(lastElement) = 1
	getLastSeenHat(hat: number) {
		const lastIndex = this.hatBuffer.lastIndexOf(hat);
		return lastIndex === -1 ? -1 : HatTracker.BUFFER_LENGTH - lastIndex;
	}

	getLastSeenTail(tail: number) {
		const lastIndex = this.tailBuffer.lastIndexOf(tail);
		return lastIndex === -1 ? -1 : HatTracker.BUFFER_LENGTH - lastIndex;
	}
}

class Player {
	
    public id: string;
    public sid: number;
    public name: string;
    public team: string | null;

    /*public hat: Hat;
    public tail: Accessory;*/

	//public isLeader: boolean = false;
	
	//public serverPosition: Vector; // x2, y2
	//public clientPosition: Vector; // x1, y1
	//public renderPosition: Vector; // x, y

	public serverPos: Vector;
	public lastTickServerPos: Vector;
	public renderPos: Vector;
	public lerpPos: Vector;

	public velocity: Vector;

	public movementProcessor: MovementProcessor;

	public hasAttackedThisTick: boolean;
	public _attackedThisTickTempVariable: boolean;
	
	public hasFiredProjectileThisTick: boolean;
	public _firedThisTickTempVariable: boolean;
	public lastProjectileFired: Projectile | null;
	
	/*public zIndex: number = 0;
	public xVel: number = 0;
	public yVel: number = 0;*/

	public dir: number = 0;
	public serverDir: number;

	public maxHealth: number = 100;
	public health: number = this.maxHealth;
	
	public shame: ShameTracker;
	public hatTracker: HatTracker;

	public skinColor: number;

	public skinIndex: number;
	public tailIndex: number;

	public scale: number = config.playerScale;
	public speed: number = config.playerSpeed;

	public inventory: Inventory;

	public state: State;

	public nextAttack: number;
	public swingStreak: number;

	public seenHats: Set<number>;
	public seenTails: Set<number>;
    
	public visible: boolean = false;
    forcePos: any;

	public lastUpdate: number;
    
    lastTickPosX: number;
    lastTickPosY: number;

	dt: any;

	public ownedProjectiles: SidArray<Projectile>;
    
    constructor(id: string, sid: number, name: string, position: Vector, dir: number, health: number, maxHealth: number, scale: number, skinColor: number) {
        this.id = id;
        this.sid = sid;
		this.name = name;
		this.serverPos = new Vector;
		this.lastTickServerPos = new Vector;
		this.renderPos = position;
		this.lerpPos = new Vector;
		this.velocity = new Vector;
		this.serverDir = dir;
		this.dir = dir;
		this.health = health;
		this.maxHealth = maxHealth;
		this.shame = new ShameTracker();
		this.hatTracker = new HatTracker();
		this.scale = scale;
		this.skinColor = skinColor;
		this.skinIndex = 0;
		this.tailIndex = 0;

        this.team = null;
		
		this.lastTickPosX = 0;
		this.lastTickPosY = 0;

		this.inventory = new Inventory(this);

		this.movementProcessor = new MovementProcessor(this);

		this.hasAttackedThisTick = false;
		this._attackedThisTickTempVariable = false;

		this.hasFiredProjectileThisTick = false;
		this._firedThisTickTempVariable = false;
		this.lastProjectileFired = null;

		this.state = {
			isTrapped: false,
			buildIndex: -1,

			data: {
				trap: undefined
			}
		}

		this.nextAttack = 0;
		this.swingStreak = 0;

		this.seenHats = new Set();
		this.seenTails = new Set();
		
		this.ownedProjectiles = new SidArray();

		this.lastUpdate = 0;
    }

	updatePlayer(core: Core, x: number, y: number, dir: number, buildIndex: number, weaponIndex: number, _weaponVariant: number, _team: string, _isLeader: boolean, _skinIndex: number, _tailIndex: number, _iconIndex: boolean, _zIndex: number) {
		this.lerpPos = this.renderPos.clone();
		this.lastTickServerPos = this.serverPos.clone();
		this.serverPos = new Vector(x, y);
		this.velocity = this.serverPos.clone().subtract(this.lastTickServerPos);
		//this.dir = dir;
		this.serverDir = this.dir = dir;
		this.state.buildIndex = buildIndex;

		this.skinIndex = _skinIndex;
		this.tailIndex = _tailIndex;

		// perf TODO: remake this so it doesnt use .find (very expensive to iterate the entire arr)
		this.hatTracker.currentHat = hats.find(x => x.id === _skinIndex) ?? null;
		this.hatTracker.currentTail = accessories.find(x => x.id === _tailIndex) ?? null;

		this.hatTracker.push(_skinIndex, _tailIndex);

		this.seenHats.add(_skinIndex);
		this.seenTails.add(_tailIndex);

		const holdsWeapon = buildIndex === -1;
		
		this.inventory.weaponSelected = weaponList[weaponIndex];

		if (this.sid !== core.playerManager.myPlayer.sid) {
			this.inventory.heldItem = holdsWeapon ? weaponList[weaponIndex] : items.list[buildIndex];

			if (holdsWeapon) {
				(<Weapon> this.inventory.weapons[this.inventory.weaponSelected.id < 9 ? WeaponSlot.PRIMARY : WeaponSlot.SECONDARY]) = this.inventory.weaponSelected;
			}
		}

		if (holdsWeapon) {
			this.inventory.weaponVariants[this.inventory.weaponSelected.id < 9 ? WeaponSlot.PRIMARY : WeaponSlot.SECONDARY] = _weaponVariant;
		}

		/*if (this.lastUpdate > 0) {
			const now = Date.now();
			this.inventory.updateReloads(now - this.lastUpdate);
			this.lastUpdate = now;
		}*/

                    /*player.buildIndex = playerData[4];
                    player.weaponIndex = playerData[5];
                    player.weaponVariant = playerData[6];
                    player.team = playerData[7];
                    player.isLeader = playerData[8];
                    player.skinIndex = playerData[9];
                    player.tailIndex = playerData[10];
                    player.iconIndex = playerData[11];
                    player.zIndex = playerData[12];*/
                    //player.visible = true;

		//this.movementProcessor.update(this.dt);
		this.dt = 0;

		this.state.isTrapped = false;
		this.state.data.trap = undefined;

		// damage objects
		const weapon = <MeleeWeapon> this.inventory.weaponSelected;
		const hittableObjects = core.objectManager.getGridArrays(x, y, weapon.stats.range);

		for (let i = 0; i < hittableObjects.length; i++) {
			const object = hittableObjects[i];
			// use object.scale because .getScale returns collision box while .scale is hitbox
			if (MathUtil.getDistance(object.position, this.serverPos) - object.scale <= weapon.stats.range) {
				for (const wiggle of object.wiggles) {
					const gatherAngle = MathUtil.getDirection(this.serverPos, object.position);

					if (object instanceof PlayerBuilding && MathUtil.getAngleDist(wiggle[0], MathUtil.roundTo(gatherAngle, 1)) === 0) {
						// damage the building depending on the player's weapon damage

						if (weapon instanceof MeleeWeapon) {
							const hatMultiplier = hats.find(x => x.id === this.skinIndex)?.bDmg ?? 1;
							const damage = weapon.stats.dmg * weapon.stats.buildingDmgMultiplier * hatMultiplier;
							object.health -= damage;
							//console.log("hit building " + object.stats.name + " new health:", object.health, "angles;", wiggle[0], MathUtil.roundTo(gatherAngle, 1));
						} else {
							//console.warn("detected hit while holding ranged weapon");
						}
						//core.moduleManager.onBuildingHit(player, object, damage);

						// remove the wiggle as its confirmed by player update and gather
						object.wiggles.splice(object.wiggles.indexOf(wiggle), 1);
					} else {
						// this should NOT happen
					}
				}
			}
		}

		// objects
		const grids = core.objectManager.getGridArrays(this.serverPos.x, this.serverPos.y, this.scale + this.velocity.length() * 2);
		for (let i = 0; i < grids.length; i++) {
			const object = grids[i];
			if (object instanceof NaturalObject) continue;

			const isCollision = MathUtil.getDistance(this.serverPos, object.position) < this.scale + object.getScale();

			if (object.type === 15 && isCollision && (<PlayerBuilding> object).owner.sid !== this.sid) this.state.isTrapped = true, this.state.data.trap = <PlayerBuilding> object;
		}
	}

	updateData(id: string, sid: number, name: string, position: Vector, dir: number, health: number, maxHealth: number, scale: number, skinColor: number) {
		this.id = id;
		this.sid = sid;
		this.name = name;
		this.serverPos = position;
		//this.dir = dir;
		this.serverDir = this.dir = dir;
		this.health = health;
		this.maxHealth = maxHealth;
		this.scale = scale;
		this.skinColor = skinColor;
	};
}

class ClientPlayer extends Player {
	public alive: boolean;

	public packetHealth: number;

	public isAttacking: boolean;
	public isAutoAttacking: boolean;
	public justStartedAttacking: boolean;
	public isAttackingWhileBlocked: boolean;

	public ownedHats: number[];
	public ownedTails: number[];

	constructor(id: string, sid: number, name: string, position: Vector, dir: number, health: number, maxHealth: number, scale: number, skinColor: number) {
		super(id, sid, name, position, dir, health, maxHealth, scale, skinColor);
		this.alive = false;
		this.packetHealth = this.maxHealth;
		this.isAttacking = false;
		this.isAutoAttacking = false;
		this.justStartedAttacking = false;
		this.isAttackingWhileBlocked = false;
		this.ownedHats = hats.filter(x => x.price === 0).map(x => x.id);
		this.ownedTails = accessories.filter(x => x.price === 0).map(x => x.id);

		this.ownedHats.push(0);
		this.ownedTails.push(0);
	}

	updateData(id: string, sid: number, name: string, position: Vector, dir: number, health: number, maxHealth: number, scale: number, skinColor: number): void {
		super.updateData(id, sid, name, position, dir, health, maxHealth, scale, skinColor);
		this.packetHealth = maxHealth;
		this.isAutoAttacking = false;
		this.isAttacking = false;
	}
}

export { Player, ClientPlayer, Inventory };