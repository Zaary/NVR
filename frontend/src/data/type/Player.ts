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

enum WeaponFinder {
	BUILDING_BREAK,
	MOVEMENT_SPEED,
	DAMAGE
}

class Inventory {

	public static WeaponFinders = WeaponFinder;

	private player: Player;

	public weapons: [MeleeWeapon, Weapon | null];
	public reloads: Record<number, number>;

	public items: number[];

	public heldItem: Weapon | Item;
	public weaponSelected: Weapon;

	constructor(player: Player) {
		this.player = player;
		this.weapons = [Weapons.TOOL_HAMMER, null];
		this.reloads = Object.fromEntries(new Array(weaponList.length).fill(undefined).map((_x, i) => [i, 0]));
		this.items = [0, 3, 6, 10];
		this.heldItem = Weapons.TOOL_HAMMER;
		this.weaponSelected = Weapons.TOOL_HAMMER;
	}
	
	reset() {
		this.weapons = [Weapons.TOOL_HAMMER, null];
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

	updateReloads(delta: number) {
		if (!(this.heldItem instanceof Weapon)) return;
		const id = this.heldItem.id;

		if (this.reloads[id] > 0) {
			this.reloads[id] -= delta;
			if (this.reloads[id] <= 0) this.reloads[id] = 0;
		}
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

	hasWeapon(weapon: number | Weapon) {
		const wep = typeof weapon === "number" ? weaponList[weapon] : weapon;
		return this.weapons[0].id === wep.id || (this.weapons[1] && this.weapons[1].id === wep.id);
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

	isSafeHeal(ping: number) {
		return Date.now() + ping - this.lastDamage > 120;
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

	public hitBuildingsLastTick: PlayerBuilding[];
	public hasAttackedThisTick: boolean;
	public _attackedThisTickTempVariable: boolean;
	
	/*public zIndex: number = 0;
	public xVel: number = 0;
	public yVel: number = 0;*/

	public dir: number = 0;

	public maxHealth: number = 100;
	public health: number = this.maxHealth;
	
	public shame: ShameTracker;

	public skinColor: number;

	public skinIndex: number;
	public tailIndex: number;

	public scale: number = config.playerScale;
	public speed: number = config.playerSpeed;

	public inventory: Inventory;

	public reloads: { [key: number]: number } = {};

	public state: State;

	public nextAttack: number;
	public swingStreak: number;
    
	public visible: boolean = false;
    forcePos: any;
    
    lastTickPosX: number;
    lastTickPosY: number;
    serverDir: any;

	dt: any;
    
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
		this.scale = scale;
		this.skinColor = skinColor;
		this.skinIndex = 0;
		this.tailIndex = 0;

        this.team = null;
		
		this.lastTickPosX = 0;
		this.lastTickPosY = 0;

		this.inventory = new Inventory(this);

		this.movementProcessor = new MovementProcessor(this);

		this.hitBuildingsLastTick = [];
		this.hasAttackedThisTick = false;
		this._attackedThisTickTempVariable = false;

		this.state = {
			isTrapped: false,
			buildIndex: -1,

			data: {
				trap: undefined
			}
		}

		this.nextAttack = 0;
		this.swingStreak = 0;
    }

	updatePlayer(objectManager: ObjectManager, x: number, y: number, dir: number, buildIndex: number, weaponIndex: number, _weaponVariant: number, _team: string, _isLeader: boolean, _skinIndex: number, _tailIndex: number, _iconIndex: boolean, _zIndex: number) {
		this.lerpPos = this.renderPos.clone();
		this.lastTickServerPos = this.serverPos.clone();
		this.serverPos = new Vector(x, y);
		this.velocity = this.serverPos.clone().subtract(this.lastTickServerPos);
		//this.dir = dir;
		this.serverDir = this.dir = dir;
		this.state.buildIndex = buildIndex;

		this.skinIndex = _skinIndex;
		this.tailIndex = _tailIndex;

		const holdsWeapon = buildIndex === -1;
		//this.inventory.heldItem = holdsWeapon ? weaponList[weaponIndex] : items.list[buildIndex];
		this.inventory.weaponSelected = weaponList[weaponIndex];

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

		// objects
		const grids = objectManager.getGridArrays(this.serverPos.x, this.serverPos.y, this.scale + this.velocity.length() * 2);
		for (let i = 0; i < grids.length; i++) {
			const object = grids[i];
			if (object instanceof NaturalObject) continue;

			const isCollision = MathUtil.getDistance(this.serverPos, object.position) < this.scale + object.getScale();

			if (object.type === 15 && isCollision && (<PlayerBuilding> object).owner.sid !== this.sid) this.state.isTrapped = true, this.state.data.trap = <PlayerBuilding> object;
		}

		// update health of hitted buildings
		for (let i = 0; i < this.hitBuildingsLastTick.length; i++) {
			const building = this.hitBuildingsLastTick[i];
			
			const weapon = this.inventory.weaponSelected;
			if (weapon instanceof MeleeWeapon) {
				const hatMultiplier = hats.find(x => x.id === this.skinIndex)?.bDmg ?? 1;
				const damage = weapon.stats.dmg * weapon.stats.buildingDmgMultiplier * hatMultiplier;
        		building.health -= damage;
				console.log("building " + building.stats.name + " new health:", building.health);
			} else {
				console.warn("detected hit while holding ranged weapon");
			}
		}
		this.hitBuildingsLastTick = [];
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

	public ownedHats: number[];
	public ownedTails: number[];

	constructor(id: string, sid: number, name: string, position: Vector, dir: number, health: number, maxHealth: number, scale: number, skinColor: number) {
		super(id, sid, name, position, dir, health, maxHealth, scale, skinColor);
		this.alive = false;
		this.packetHealth = this.maxHealth;
		this.isAttacking = false;
		this.isAutoAttacking = false;
		this.justStartedAttacking = false;
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