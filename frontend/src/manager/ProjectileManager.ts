import { Core, target } from "../core/Core";
import { items } from "../data/moomoo/items";
import { PlayerBuilding } from "../data/type/GameObject";
import { Player } from "../data/type/Player";
import { Projectile, projectileList, Projectiles } from "../data/type/Projectile";
import { SidArray } from "../util/type/SidArray";
import Vector from "../util/type/Vector";

export default class ProjectileManager {

    private core: Core;
    private projectileList: SidArray<Projectile>;
    private scheduledSpawns: [position: Vector, direction: number, range: number, speed: number, type: number, layer: number, sid: number][];

    constructor(core: Core) {
        this.core = core;
        this.projectileList = new SidArray();
        this.scheduledSpawns = [];
    }

    scheduleSpawn(position: Vector, direction: number, range: number, speed: number, type: number, layer: number, sid: number) {
        this.scheduledSpawns.push([position, direction, range, speed, type, layer, sid]);
    }

    tickSpawnAllScheduled(tick: number) {
        let i = this.scheduledSpawns.length - 1;
        while (i >= 0) {
            const data = this.scheduledSpawns[i];
            this.add(tick, ...data);
            this.scheduledSpawns.splice(i, 1);
            i--;
        }
    }

    add(spawnTick: number, position: Vector, direction: number, range: number, speed: number, type: number, layer: number, sid: number) {
        let tmpObj;
        
        if ((tmpObj = this.projectileList.findBySid(sid)) !== null) {
            this.projectileList.remove(tmpObj);
            tmpObj = null;
        }

        if (!tmpObj) {
            const item = projectileList[type];
            
            let owner: Player | PlayerBuilding | null = null;
            let bestDistance = Infinity;

            // check for shooting player
            let playerSpawnOffset = 35 * 2;
            const playerSpawnLocation = item === Projectiles.TURRET_BULLET ? position : position.subtract(Math.cos(direction) * playerSpawnOffset, Math.sin(direction) * playerSpawnOffset);

            const players = this.core.playerManager.getAllVisible();
            for (let i = 0; i < players.length; i++) {
                const player = players[i];
                
                // TODO: change adding player.velocity to prediction engine
                const dist = player.serverPos.clone().add(player.velocity).subtract(playerSpawnLocation).length();
                if (dist < 10 && dist < bestDistance) {
                    owner = player;
                    bestDistance = dist;
                }
            }

            const turretObject = items.list[17];
            const objects = this.core.objectManager.getGridArrays(position.x, position.y, turretObject.scale);
            for (let i = 0; i < objects.length; i++) {
                const object = objects[i];
                if (object.type !== 17) continue;

                const dist = object.position.clone().subtract(position).length();
                if (dist < 10 && dist < bestDistance) {
                    owner = <PlayerBuilding> object;
                    bestDistance = dist;
                }
            }

            tmpObj = new Projectile(type, sid, position, spawnTick, direction, range, speed, layer, item.stats.scale, owner);
            this.projectileList.push(tmpObj);

            if (owner) {
                owner.ownedProjectiles.push(tmpObj);
                if (owner instanceof Player) owner.hasFiredProjectileThisTick = true;
            }
            //const enemy = this.core.playerManager.getVisibleEnemies()[0];
            //console.log("projectile spawned, will hit enemy in " + tmpObj.getTimeToHitTarget(enemy.serverPos, enemy.scale));
        }
    }

    remove(sid: number, range: number) {
        if (this.projectileList.hasSid(sid)) {
            console.log("projectile removed naturally");
            const projectile = this.projectileList.findBySid(sid)!;
            if (projectile.owner) projectile.owner.ownedProjectiles.remove(projectile);
            this.projectileList.remove(projectile);
        } else {
            console.log("projectile removed after spawning");
            let i = this.scheduledSpawns.length - 1;
            while (i >= 0) {
                const projectile = this.scheduledSpawns[i];
                if (projectile[6] === sid) {
                    
                    this.scheduledSpawns.splice(i, 1);
                    break;
                }
                i--;
            }
        }
    }

    getDangerousProjectiles(tickIndex: number) {
        const myPlayer = this.core.playerManager.myPlayer;

        let projectiles: /*[number, */Projectile/*]*/[] = [];
        for (let i = 0; i < this.projectileList.length; i++) {
            const projectile = this.projectileList[i];

            if (projectile.owner && this.core.playerManager.checkTeam(projectile.owner instanceof Player ? projectile.owner.sid : projectile.owner.owner.sid)) continue;
            
            const hitTime = projectile.getTicksToHitTarget(myPlayer.serverPos, myPlayer.scale);
            
            if (hitTime - projectile.getTicksExisted(tickIndex) === 0) {
                projectiles.push(/*[hitTime, */projectile/*]*/);
            }
        }

        return projectiles;
    }
}