import { core } from "../../main";
import { TickEngine } from "../../util/engine/TickEngine";
import MathUtil from "../../util/MathUtil";
import Vector from "../../util/type/Vector";
import { PlayerBuilding } from "./GameObject";
import { Player } from "./Player";


/*
exports.projectiles = [{
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
*/

interface ProjectileStats {
    //public layer: number;
    scale: number;
    range: number;
    speed: number;
    dmg: number;
}

class ProjectileItem {

    public type: number;
    public stats: ProjectileStats;

    constructor(type: number, stats: ProjectileStats) {
        this.type = type;
        this.stats = stats;
    }
}

const Projectiles = {
    BOW_ARROW: new ProjectileItem(0, { scale: 103, range: 1000, speed: 1.6, dmg: 25 }),
    TURRET_BULLET: new ProjectileItem(1, { scale: 20, range: 700, speed: 3.6, dmg: 25 }),
    CROSSBOW_ARROW: new ProjectileItem(2, { scale: 103, range: 1200, speed: 2.5, dmg: 35 }),
    REPEATER_CROSSBOW_ARROW: new ProjectileItem(3, {scale: 103, range: 1200, speed: 2, dmg: 30 }),
    UNKNOWN_PROJECTILE: new ProjectileItem(4, { scale: 20, range: 700, speed: 3.6, dmg: 16 }),
    MUSKET_BULLET: new ProjectileItem(5, { scale: 160, range: 1400, speed: 3.6, dmg: 50 })
}

const projectileList = Object.values(Projectiles);

class Projectile {

    public type: number;
    public sid: number;

    public spawnPos: Vector;
	public spawnTick: number;

    public dir: number;
    public range: number;
    public speed: number;
    public layer: number;
	public scale: number;

	public owner: Player | PlayerBuilding | null;

    constructor(type: number, sid: number, spawnPosition: Vector, spawnTick: number, dir: number, range: number, speed: number, layer: number, scale: number, owner: Player | PlayerBuilding | null) {
        this.type = type;
        this.sid = sid;
        this.spawnPos = spawnPosition;
		this.spawnTick = spawnTick;
        this.dir = dir;
        this.range = range;
        this.speed = speed;
        this.layer = layer;
		this.scale = scale;

		this.owner = owner;
		
		console.log("a projectile spawned:", projectileList[type], "owner:", this.owner);
    }

	static willBeTicked(projectileItem: ProjectileItem, source: Vector, sourceScale: number, destination: Vector) {
		const dist = Math.max(0, MathUtil.getDistance(source, destination) - sourceScale);
		if (dist > projectileItem.stats.range) return false;
		return dist === 0 || dist / projectileItem.stats.speed > TickEngine.TICK_DELTA;
	}

	public getTicksExisted(currentTick: number) {
		return currentTick - this.spawnTick;
	}

	public getDistanceTraveled(ticksFromSpawn: number) {
		return this.spawnPos.clone().directionMove(this.dir, this.speed * ticksFromSpawn * TickEngine.TICK_DELTA);
	}

	public canHit(targetPos: Vector, targetScale: number) {
		return MathUtil.lineInRectMooMoo(
			targetPos.x - targetScale,
			targetPos.y - targetScale,
			targetPos.x + targetScale,
			targetPos.y + targetScale,
			this.spawnPos.x,
			this.spawnPos.y,
			this.spawnPos.x + Math.cos(this.dir) * (this.range + this.speed),
			this.spawnPos.y + Math.sin(this.dir) * (this.range + this.speed)
		);
	}

	public getTimeToHitTarget(targetPos: Vector, targetScale: number): number {
		const distanceToTarget = this.spawnPos.clone().subtract(targetPos).length();
		if (!this.canHit(targetPos, targetScale)) return -1;
		return distanceToTarget / this.speed;
	}

	public getTicksToHitTarget(targetPos: Vector, targetScale: number) {
		const ms = this.getTimeToHitTarget(targetPos, targetScale);
		return ms > -1 ? Math.ceil(ms / TickEngine.TICK_DELTA) : -1;
	}
}

export { Projectiles, projectileList, Projectile, ProjectileItem }