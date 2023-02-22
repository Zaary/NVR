import { ProjectileItem, Projectiles } from "./Projectile";

enum WeaponType {
    TOOL_HAMMER,
    HAND_AXE,
    GREAT_AXE,
    SHORT_SWORD,
    KATANA,
    POLEARM,
    BAT,
    DAGGERS,
    STICK,
    HUNTING_BOW,
    GREAT_HAMMER,
    SHIELD,
    CROSSBOW,
    REPEATER_CROSSBOW,
    MC_GRABBY,
    MUSKET
}

enum WeaponSlot {
    PRIMARY,
    SECONDARY
}

interface WeaponStats {
	dmg: number; // tEmPoRaRy!!!!!!!!!!!!!!!
	range: number;
	speedMultiplier: number;
	reloadTime: number;
}

interface MeleeWeaponStats extends WeaponStats {
    dmg: number;
	buildingDmgMultiplier: number;
    range: number;
	knockback: number;
}

interface RangedWeaponStats extends WeaponStats {
    dmg: number; // temporary, rework to projectiles later
    //reloadTime: number;
}

class Weapon {

	public id: number;
	public slot: WeaponSlot;
	public type: WeaponType;
	public stats: WeaponStats;

	constructor(id: number, slot: WeaponSlot, type: WeaponType, stats: WeaponStats) {
		this.id = id;
		this.slot = slot;
		this.type = type;
		this.stats = stats;
	}
}

class MeleeWeapon extends Weapon {
    public stats: MeleeWeaponStats;

    constructor(id: number, slot: WeaponSlot, type: WeaponType, stats: MeleeWeaponStats) {
        super(id, slot, type, stats);
        this.stats = stats;
    }
}

class RangedWeapon extends Weapon {
	public projectile: ProjectileItem;
    public stats: RangedWeaponStats;

    constructor(id: number, slot: WeaponSlot, type: WeaponType, projectile: ProjectileItem, stats: RangedWeaponStats) {
        super(id, slot, type, stats);
		this.projectile = projectile;
        this.stats = stats;
    }
}

const weaponPreMap = new Map([
	[0, null],
	[1, null],
	[2, null],
	[3, null],
	[4, 3], // sword => katana
	[5, null],
	[6, null],
	[7, null],
	[8, null],
	[9, null],
	[10, null],
	[11, null],
	[12, 9], // bow => crossbow
	[13, 12], // crossbow => repeater crossbow
	[14, null],
	[15, 12] // crossbow => musket
]);

const Weapons = { // important: keep the order to access weapon objects using their IDs
    TOOL_HAMMER: new MeleeWeapon(0, WeaponSlot.PRIMARY, WeaponType.TOOL_HAMMER, { dmg: 25, buildingDmgMultiplier: 1, range: 65, reloadTime: 300, speedMultiplier: 1, knockback: 0}),
    HAND_AXE: new MeleeWeapon(1, WeaponSlot.PRIMARY, WeaponType.HAND_AXE, { dmg: 30, buildingDmgMultiplier: 1, range: 70, reloadTime: 400, speedMultiplier: 1, knockback: 0 }),
    GREAT_AXE: new MeleeWeapon(2, WeaponSlot.PRIMARY, WeaponType.GREAT_AXE, { dmg: 35, buildingDmgMultiplier: 1, range: 75, reloadTime: 400, speedMultiplier: 1, knockback: 0 }),
    SHORT_SWORD: new MeleeWeapon(3, WeaponSlot.PRIMARY, WeaponType.SHORT_SWORD, { dmg: 35, buildingDmgMultiplier: 1, range: 110, reloadTime: 300, speedMultiplier: 0.85, knockback: 0 }),
    KATANA: new MeleeWeapon(4, WeaponSlot.PRIMARY, WeaponType.KATANA, { dmg: 40, buildingDmgMultiplier: 1, range: 118, reloadTime: 300, speedMultiplier: 0.8, knockback: 0 }),
    POLEARM: new MeleeWeapon(5, WeaponSlot.PRIMARY, WeaponType.POLEARM, { dmg: 45, buildingDmgMultiplier: 1, range: 142, reloadTime: 700, speedMultiplier: 0.82, knockback: 0.2 }),
    BAT: new MeleeWeapon(6, WeaponSlot.PRIMARY, WeaponType.BAT, { dmg: 20, buildingDmgMultiplier: 1, range: 110, reloadTime: 300, speedMultiplier: 1, knockback: 0.7 }),
    DAGGERS: new MeleeWeapon(7, WeaponSlot.PRIMARY, WeaponType.DAGGERS, { dmg: 20, buildingDmgMultiplier: 1, range: 65, reloadTime: 100, speedMultiplier: 1.13, knockback: 0.1 }),
    STICK: new MeleeWeapon(8, WeaponSlot.PRIMARY, WeaponType.STICK, { dmg: 1, buildingDmgMultiplier: 1, range: 70, reloadTime: 400, speedMultiplier: 1, knockback: 0 }),
    HUNTING_BOW: new RangedWeapon(9, WeaponSlot.SECONDARY, WeaponType.HUNTING_BOW, Projectiles.BOW_ARROW, { range: 1000, speedMultiplier: 0.75, reloadTime: 600, dmg: 25 }),
    GREAT_HAMMER: new MeleeWeapon(10, WeaponSlot.SECONDARY, WeaponType.GREAT_HAMMER, { dmg: 10, buildingDmgMultiplier: 7.5, range: 75, reloadTime: 400, speedMultiplier: 1, knockback: 0 }),
    SHIELD: new MeleeWeapon(11, WeaponSlot.SECONDARY, WeaponType.SHIELD, { dmg: 0, buildingDmgMultiplier: 1, range: 0, reloadTime: 0, speedMultiplier: 0.7, knockback: 0 }),
    CROSSBOW: new RangedWeapon(12, WeaponSlot.SECONDARY, WeaponType.CROSSBOW, Projectiles.CROSSBOW_ARROW, { range: 1200, speedMultiplier: 0.7, reloadTime: 700, dmg: 30 }),
    REPEATER_CROSSBOW: new RangedWeapon(13, WeaponSlot.SECONDARY, WeaponType.REPEATER_CROSSBOW, Projectiles.REPEATER_CROSSBOW_ARROW, { range: 1200, speedMultiplier: 0.7, reloadTime: 230, dmg: 25 }),
    MC_GRABBY: new MeleeWeapon(14, WeaponSlot.SECONDARY, WeaponType.MC_GRABBY, { dmg: 0, buildingDmgMultiplier: 1, range: 125, reloadTime: 700, speedMultiplier: 1.05, knockback: 0.2 }),
    MUSKET: new RangedWeapon(15, WeaponSlot.SECONDARY, WeaponType.MUSKET, Projectiles.MUSKET_BULLET, { range: 1400, speedMultiplier: 0.6, reloadTime: 1500, dmg: 50 })
}

const weaponList = Object.values(Weapons);

const wpdata = [{
	id: 0,
	type: 0,
	name: "tool hammer",
	desc: "tool for gathering all resources",
	src: "hammer_1",
	length: 140,
	width: 140,
	xOff: -3,
	yOff: 18,
	dmg: 25,
	range: 65,
	gather: 1,
	speed: 300
}, {
	id: 1,
	type: 0,
	age: 2,
	name: "hand axe",
	desc: "gathers resources at a higher rate",
	src: "axe_1",
	length: 140,
	width: 140,
	xOff: 3,
	yOff: 24,
	dmg: 30,
	spdMult: 1,
	range: 70,
	gather: 2,
	speed: 400
}, {
	id: 2,
	type: 0,
	age: 8,
	pre: 1,
	name: "great axe",
	desc: "deal more damage and gather more resources",
	src: "great_axe_1",
	length: 140,
	width: 140,
	xOff: -8,
	yOff: 25,
	dmg: 35,
	spdMult: 1,
	range: 75,
	gather: 4,
	speed: 400
}, {
	id: 3,
	type: 0,
	age: 2,
	name: "short sword",
	desc: "increased attack power but slower move speed",
	src: "sword_1",
	iPad: 1.3,
	length: 130,
	width: 210,
	xOff: -8,
	yOff: 46,
	dmg: 35,
	spdMult: 0.85,
	range: 110,
	gather: 1,
	speed: 300
}, {
	id: 4,
	type: 0,
	age: 8,
	pre: 3,
	name: "katana",
	desc: "greater range and damage",
	src: "samurai_1",
	iPad: 1.3,
	length: 130,
	width: 210,
	xOff: -8,
	yOff: 59,
	dmg: 40,
	spdMult: 0.8,
	range: 118,
	gather: 1,
	speed: 300
}, {
	id: 5,
	type: 0,
	age: 2,
	name: "polearm",
	desc: "long range melee weapon",
	src: "spear_1",
	iPad: 1.3,
	length: 130,
	width: 210,
	xOff: -8,
	yOff: 53,
	dmg: 45,
	knock: 0.2,
	spdMult: 0.82,
	range: 142,
	gather: 1,
	speed: 700
}, {
	id: 6,
	type: 0,
	age: 2,
	name: "bat",
	desc: "fast long range melee weapon",
	src: "bat_1",
	iPad: 1.3,
	length: 110,
	width: 180,
	xOff: -8,
	yOff: 53,
	dmg: 20,
	knock: 0.7,
	range: 110,
	gather: 1,
	speed: 300
}, {
	id: 7,
	type: 0,
	age: 2,
	name: "daggers",
	desc: "really fast short range weapon",
	src: "dagger_1",
	iPad: 0.8,
	length: 110,
	width: 110,
	xOff: 18,
	yOff: 0,
	dmg: 20,
	knock: 0.1,
	range: 65,
	gather: 1,
	hitSlow: 0.1,
	spdMult: 1.13,
	speed: 100
}, {
	id: 8,
	type: 0,
	age: 2,
	name: "stick",
	desc: "great for gathering but very weak",
	src: "stick_1",
	length: 140,
	width: 140,
	xOff: 3,
	yOff: 24,
	dmg: 1,
	spdMult: 1,
	range: 70,
	gather: 7,
	speed: 400
}, {
	id: 9,
	type: 1,
	age: 6,
	name: "hunting bow",
	desc: "bow used for ranged combat and hunting",
	src: "bow_1",
	req: ["wood", 4],
	length: 120,
	width: 120,
	xOff: -6,
	yOff: 0,
	projectile: 0,
	spdMult: 0.75,
	speed: 600
}, {
	id: 10,
	type: 1,
	age: 6,
	name: "great hammer",
	desc: "hammer used for destroying structures",
	src: "great_hammer_1",
	length: 140,
	width: 140,
	xOff: -9,
	yOff: 25,
	dmg: 10,
	spdMult: 0.88,
	range: 75,
	sDmg: 7.5,
	gather: 1,
	speed: 400
}, {
	id: 11,
	type: 1,
	age: 6,
	name: "wooden shield",
	desc: "blocks projectiles and reduces melee damage",
	src: "shield_1",
	length: 120,
	width: 120,
	shield: 0.2,
	xOff: 6,
	yOff: 0,
	spdMult: 0.7
}, {
	id: 12,
	type: 1,
	age: 8,
	pre: 9,
	name: "crossbow",
	desc: "deals more damage and has greater range",
	src: "crossbow_1",
	req: ["wood", 5],
	aboveHand: true,
	armS: 0.75,
	length: 120,
	width: 120,
	xOff: -4,
	yOff: 0,
	projectile: 2,
	spdMult: 0.7,
	speed: 700
}, {
	id: 13,
	type: 1,
	age: 9,
	pre: 12,
	name: "repeater crossbow",
	desc: "high firerate crossbow with reduced damage",
	src: "crossbow_2",
	req: ["wood", 10],
	aboveHand: true,
	armS: 0.75,
	length: 120,
	width: 120,
	xOff: -4,
	yOff: 0,
	projectile: 3,
	spdMult: 0.7,
	speed: 230
}, {
	id: 14,
	type: 1,
	age: 6,
	name: "mc grabby",
	desc: "steals resources from enemies",
	src: "grab_1",
	length: 130,
	width: 210,
	xOff: -8,
	yOff: 53,
	dmg: 0,
	steal: 250,
	knock: 0.2,
	spdMult: 1.05,
	range: 125,
	gather: 0,
	speed: 700
}, {
	id: 15,
	type: 1,
	age: 9,
	pre: 12,
	name: "musket",
	desc: "slow firerate but high damage and range",
	src: "musket_1",
	req: ["stone", 10],
	aboveHand: true,
	rec: 0.35,
	armS: 0.6,
	hndS: 0.3,
	hndD: 1.6,
	length: 205,
	width: 205,
	xOff: 25,
	yOff: 0,
	projectile: 5,
	hideProjectile: true,
	spdMult: 0.6,
	speed: 1500
}];

export {
    weaponList,
	weaponPreMap,
    Weapon,
	Weapons,
    MeleeWeapon,
    RangedWeapon,
	WeaponSlot
}