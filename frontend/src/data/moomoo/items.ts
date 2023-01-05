
interface Group {
	id: number;
	name: string;
	layer: number;
	place: boolean;
	limit: number;
}

const groups: Group[] = [{
	id: 0,
	name: "food",
	place: false,
	limit: -1,
	layer: 0
}, {
	id: 1,
	name: "walls",
	place: true,
	limit: 30,
	layer: 0
}, {
	id: 2,
	name: "spikes",
	place: true,
	limit: 15,
	layer: 0
}, {
	id: 3,
	name: "mill",
	place: true,
	limit: 7,
	layer: 1
}, {
	id: 4,
	name: "mine",
	place: true,
	limit: 1,
	layer: 0
}, {
	id: 5,
	name: "trap",
	place: true,
	limit: 6,
	layer: -1
}, {
	id: 6,
	name: "booster",
	place: true,
	limit: 12,
	layer: -1
}, {
	id: 7,
	name: "turret",
	place: true,
	limit: 2,
	layer: 1
}, {
	id: 8,
	name: "watchtower",
	place: true,
	limit: 12,
	layer: 1
}, {
	id: 9,
	name: "buff",
	place: true,
	limit: 4,
	layer: -1
}, {
	id: 10,
	name: "spawn",
	place: true,
	limit: 1,
	layer: -1
}, {
	id: 11,
	name: "sapling",
	place: true,
	limit: 2,
	layer: 0
}, {
	id: 12,
	name: "blocker",
	place: true,
	limit: 3,
	layer: -1
}, {
	id: 13,
	name: "teleporter",
	place: true,
	limit: 2,
	layer: -1
}];

const projectiles = [{
	indx: 0,
	layer: 0,
	src: "arrow_1",
	dmg: 25,
	speed: 1.6,
	scale: 103,
	range: 1000
}, {
	indx: 1,
	layer: 1,
	dmg: 25,
	scale: 20
}, {
	indx: 0,
	layer: 0,
	src: "arrow_1",
	dmg: 35,
	speed: 2.5,
	scale: 103,
	range: 1200
}, {
	indx: 0,
	layer: 0,
	src: "arrow_1",
	dmg: 30,
	speed: 2,
	scale: 103,
	range: 1200
}, {
	indx: 1,
	layer: 1,
	dmg: 16,
	scale: 20
}, {
	indx: 0,
	layer: 0,
	src: "bullet_1",
	dmg: 50,
	speed: 3.6,
	scale: 160,
	range: 1400
}];


interface Item {
	id: number;
	age?: number;
	group: Group,
	name: string;
	desc: string;
	req: (string | number)[];
	//consume?: (doer: any) => any;
	scale: number;
	holdOffset: number;
	projDmg?: boolean;
	health?: number;
	placeOffset?: number;
	pre?: number;
	dmg?: number;
	spritePadding?: number;
	pDmg?: number;
	turnSpeed?: number;
	pps?: number;
	iconLineMult?: number;
	type?: number;
	colDiv?: number;
	trap?: boolean;
	ignoreCollision?: boolean;
	hideFromEnemy?: boolean;
	boostSpeed?: number;
	doUpdate?: boolean;
	projectile?: number;
	shootIndex?: number;
	zIndex?: number;
	shootRange?: number;
	shootRate?: number;
	healCol?: number;
	spawnPoint?: boolean;
	blocker?: number;
	teleport?: boolean;
}

const list: Item[] = [{
	id: -1,
	group: groups[0],
	name: "apple",
	desc: "restores 20 health when consumed",
	req: ["food", 10],
	/*consume: function(doer: Player) {
		return doer.changeHealth(20, doer);
	},*/
	scale: 22,
	holdOffset: 15
}, {
	id: -1,
	age: 3,
	group: groups[0],
	name: "cookie",
	desc: "restores 40 health when consumed",
	req: ["food", 15],
	/*consume: function(doer: Player) {
		return doer.changeHealth(40, doer);
	},*/
	scale: 27,
	holdOffset: 15
}, {
	id: -1,
	age: 7,
	group: groups[0],
	name: "cheese",
	desc: "restores 30 health and another 50 over 5 seconds",
	req: ["food", 25],
	/*consume: function(doer: Player) {
		if (doer.changeHealth(30, doer) || doer.health < 100) {
			doer.dmgOverTime.dmg = -10;
			doer.dmgOverTime.doer = doer;
			doer.dmgOverTime.time = 5;
			return true;
		}
		return false;
	},*/
	scale: 27,
	holdOffset: 15
}, {
	id: -1,
	group: groups[1],
	name: "wood wall",
	desc: "provides protection for your village",
	req: ["wood", 10],
	projDmg: true,
	health: 380,
	scale: 50,
	holdOffset: 20,
	placeOffset: -5
}, {
	id: -1,
	age: 3,
	group: groups[1],
	name: "stone wall",
	desc: "provides improved protection for your village",
	req: ["stone", 25],
	health: 900,
	scale: 50,
	holdOffset: 20,
	placeOffset: -5
}, {
	id: -1,
	age: 7,
	pre: 1,
	group: groups[1],
	name: "castle wall",
	desc: "provides powerful protection for your village",
	req: ["stone", 35],
	health: 1500,
	scale: 52,
	holdOffset: 20,
	placeOffset: -5
}, {
	id: -1,
	group: groups[2],
	name: "spikes",
	desc: "damages enemies when they touch them",
	req: ["wood", 20, "stone", 5],
	health: 400,
	dmg: 20,
	scale: 49,
	spritePadding: -23,
	holdOffset: 8,
	placeOffset: -5
}, {
	id: -1,
	age: 5,
	group: groups[2],
	name: "greater spikes",
	desc: "damages enemies when they touch them",
	req: ["wood", 30, "stone", 10],
	health: 500,
	dmg: 35,
	scale: 52,
	spritePadding: -23,
	holdOffset: 8,
	placeOffset: -5
}, {
	id: -1,
	age: 9,
	pre: 1,
	group: groups[2],
	name: "poison spikes",
	desc: "poisons enemies when they touch them",
	req: ["wood", 35, "stone", 15],
	health: 600,
	dmg: 30,
	pDmg: 5,
	scale: 52,
	spritePadding: -23,
	holdOffset: 8,
	placeOffset: -5
}, {
	id: -1,
	age: 9,
	pre: 2,
	group: groups[2],
	name: "spinning spikes",
	desc: "damages enemies when they touch them",
	req: ["wood", 30, "stone", 20],
	health: 500,
	dmg: 45,
	turnSpeed: 0.003,
	scale: 52,
	spritePadding: -23,
	holdOffset: 8,
	placeOffset: -5
}, {
	id: -1,
	group: groups[3],
	name: "windmill",
	desc: "generates gold over time",
	req: ["wood", 50, "stone", 10],
	health: 400,
	pps: 1,
	turnSpeed: 0.0016,
	spritePadding: 25,
	iconLineMult: 12,
	scale: 45,
	holdOffset: 20,
	placeOffset: 5
}, {
	id: -1,
	age: 5,
	pre: 1,
	group: groups[3],
	name: "faster windmill",
	desc: "generates more gold over time",
	req: ["wood", 60, "stone", 20],
	health: 500,
	pps: 1.5,
	turnSpeed: 0.0025,
	spritePadding: 25,
	iconLineMult: 12,
	scale: 47,
	holdOffset: 20,
	placeOffset: 5
}, {
	id: -1,
	age: 8,
	pre: 1,
	group: groups[3],
	name: "power mill",
	desc: "generates more gold over time",
	req: ["wood", 100, "stone", 50],
	health: 800,
	pps: 2,
	turnSpeed: 0.005,
	spritePadding: 25,
	iconLineMult: 12,
	scale: 47,
	holdOffset: 20,
	placeOffset: 5
}, {
	id: -1,
	age: 5,
	group: groups[4],
	type: 2,
	name: "mine",
	desc: "allows you to mine stone",
	req: ["wood", 20, "stone", 100],
	iconLineMult: 12,
	scale: 65,
	holdOffset: 20,
	placeOffset: 0
}, {
	id: -1,
	age: 5,
	group: groups[11],
	type: 0,
	name: "sapling",
	desc: "allows you to farm wood",
	req: ["wood", 150],
	iconLineMult: 12,
	colDiv: 0.5,
	scale: 110,
	holdOffset: 50,
	placeOffset: -15
}, {
	id: -1,
	age: 4,
	group: groups[5],
	name: "pit trap",
	desc: "pit that traps enemies if they walk over it",
	req: ["wood", 30, "stone", 30],
	trap: true,
	ignoreCollision: true,
	hideFromEnemy: true,
	health: 500,
	colDiv: 0.2,
	scale: 50,
	holdOffset: 20,
	placeOffset: -5
}, {
	id: -1,
	age: 4,
	group: groups[6],
	name: "boost pad",
	desc: "provides boost when stepped on",
	req: ["stone", 20, "wood", 5],
	ignoreCollision: true,
	boostSpeed: 1.5,
	health: 150,
	colDiv: 0.7,
	scale: 45,
	holdOffset: 20,
	placeOffset: -5
}, {
	id: -1,
	age: 7,
	group: groups[7],
	doUpdate: true,
	name: "turret",
	desc: "defensive structure that shoots at enemies",
	req: ["wood", 200, "stone", 150],
	health: 800,
	projectile: 1,
	shootRange: 700,
	shootRate: 2200,
	scale: 43,
	holdOffset: 20,
	placeOffset: -5
}, {
	id: -1,
	age: 7,
	group: groups[8],
	name: "platform",
	desc: "platform to shoot over walls and cross over water",
	req: ["wood", 20],
	ignoreCollision: true,
	zIndex: 1,
	health: 300,
	scale: 43,
	holdOffset: 20,
	placeOffset: -5
}, {
	id: -1,
	age: 7,
	group: groups[9],
	name: "healing pad",
	desc: "standing on it will slowly heal you",
	req: ["wood", 30, "food", 10],
	ignoreCollision: true,
	healCol: 15,
	health: 400,
	colDiv: 0.7,
	scale: 45,
	holdOffset: 20,
	placeOffset: -5
}, {
	id: -1,
	age: 9,
	group: groups[10],
	name: "spawn pad",
	desc: "you will spawn here when you die but it will dissapear",
	req: ["wood", 100, "stone", 100],
	health: 400,
	ignoreCollision: true,
	spawnPoint: true,
	scale: 45,
	holdOffset: 20,
	placeOffset: -5
}, {
	id: -1,
	age: 7,
	group: groups[12],
	name: "blocker",
	desc: "blocks building in radius",
	req: ["wood", 30, "stone", 25],
	ignoreCollision: true,
	blocker: 300,
	health: 400,
	colDiv: 0.7,
	scale: 45,
	holdOffset: 20,
	placeOffset: -5
}, {
	id: -1,
	age: 7,
	group: groups[13],
	name: "teleporter",
	desc: "teleports you to a random point on the map",
	req: ["wood", 60, "stone", 60],
	ignoreCollision: true,
	teleport: true,
	health: 200,
	colDiv: 0.7,
	scale: 45,
	holdOffset: 20,
	placeOffset: -5
}];

for (var i = 0; i < list.length; ++i) {
	Object.defineProperty(list[i], "id", { value: i });
	// @ts-ignore
	if (list[i].pre) list[i].pre = i - list[i].pre;
}

const items = { groups, projectiles, list };
export { items, Item };