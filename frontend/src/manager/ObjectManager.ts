import { Core } from "../core/Core";
import config from "../data/moomoo/config";
import { Item, items } from "../data/moomoo/items";
import { GameObject, NaturalObject, PlayerBuilding } from "../data/type/GameObject";
import { util } from "../data/type/MoomooUtil";
import { Player } from "../data/type/Player";
import MathUtil from "../util/MathUtil";
import { SidArray } from "../util/type/SidArray";
import Vector from "../util/type/Vector";

class PredictedPlacement extends PlayerBuilding {
    public placedTimestamp: number;
    constructor(position: Vector, dir: number, scale: number, type: number, placedTimestamp: number) {
        super(-1, position, dir, scale, type, -1);
        this.placedTimestamp = placedTimestamp;
    }
}

export default class ObjectManager {

    private core: Core;
    private gameObjects: SidArray<GameObject>;
    private grids: Record<string, any>;
    private updateObjects: GameObject[];

    public predictedPlacements: PredictedPlacement[];

    constructor(core: Core) {
        this.core = core;
        this.gameObjects = new SidArray<GameObject>();
        this.grids = {};
        this.updateObjects = [];

        this.predictedPlacements = [];
    }

    canPlaceObject(source: [Vector, number, number], item: Item, lookupPredictions = false) {
        const [position, scale, angle] = source;

        const placeOffset = scale + item.scale + (item.placeOffset ?? 0);
        const targetPosition = position.clone().directionMove(angle, placeOffset);
        
        return this.isPositionFree(targetPosition, item.scale, lookupPredictions);
    }

    private isPositionFree(placementVector: Vector, scale: number, lookupPredictions = false) {
        const grids = this.getGridArrays(placementVector.x, placementVector.y, scale);
        return grids.flat(1).filter(x => MathUtil.getDistance(x.position, placementVector) <= x.getScale() + scale).length === 0 && (!lookupPredictions || this.predictedPlacements.filter(x => MathUtil.getDistance(x.position, placementVector) <= x.getScale() + scale).length === 0);
    }

    /**
     * @param source[0] position from where the item is placed
     * @param source[1] scale of placing entity
     * @param source[2] angle at which is the item being placed at
     */
    addPlacementAttempt(source: [Vector, number, number], item: Item, timestamp = Date.now()) {
        const [position, scale, angle] = source;

        const placeOffset = scale + item.scale + (item.placeOffset ?? 0);
        const targetPosition = position.clone().directionMove(angle, placeOffset);
        
        if (this.isPositionFree(targetPosition, item.scale)) {
            this.predictedPlacements.push(new PredictedPlacement(targetPosition, angle, item.scale, item.id, timestamp));
        }
    }

    findPlacementAngles(source: [Vector, number], item: Item, ignore: GameObject[] = []) {
        const [position, scale] = source;
        const placeOffset = scale + item.scale + (item.placeOffset ?? 0);
        const grids = this.getGridArrays(position.x, position.y, placeOffset + item.scale).flat(1).filter(x => !ignore.includes(x) && MathUtil.getDistance(position, x.position) <= placeOffset + item.scale);

        let blocks: [number, number][] = [];
        for (let i = 0; i < grids.length; i++) {
            const object = grids[i];
            const tangent = this.findPlacementTangent(source, object, item, 1);
            const straight = MathUtil.getDirection(position, object.position);
            const _bounds = [straight - tangent, straight + tangent];
            blocks.push([Math.min(_bounds[0], _bounds[1]), Math.max(_bounds[0], _bounds[1])]);
        }

        let allows: [number, number][] = [];
        let lastOpener = 0;
        for (let i = 0; i < blocks.length; i++) {
            const block = blocks[i];

            if (lastOpener != block[0]) allows.push([lastOpener, block[0]]);
            lastOpener = block[1];
        }
        allows.push([lastOpener, Math.PI * 2]);

        return allows;
    }

    findPlacementTangent(source: [Vector, number], target: GameObject, item: Item, additionalDistanceFromObject: number) {
        const t = source[1] + item.scale + (item.placeOffset ?? 0)
        const p = target.getScale(true) + item.scale + additionalDistanceFromObject;
        const s = MathUtil.getDistance(source[0], target.position);
        return Math.acos((p ** 2 - s ** 2 - t ** 2) / (-2 * s * t));
    }

    // SET OBJECT GRIDS
    setObjectGrids(obj: GameObject) {
        let tmpX, tmpY;
        let tmpS = config.mapScale / config.colGrid;

        var objX = Math.min(config.mapScale, Math.max(0, obj.position.x));
        var objY = Math.min(config.mapScale, Math.max(0, obj.position.y));
        for (var x = 0; x < config.colGrid; ++x) {
            tmpX = x * tmpS;
            for (var y = 0; y < config.colGrid; ++y) {
                tmpY = y * tmpS;
                if (objX + obj.scale >= tmpX && objX - obj.scale <= tmpX + tmpS &&
                    objY + obj.scale >= tmpY && objY - obj.scale <= tmpY + tmpS) {
                    if (!this.grids[x + "_" + y])
                        this.grids[x + "_" + y] = [];
                    this.grids[x + "_" + y].push(obj);
                    obj.gridLocations.push(x + "_" + y);
                }
            }
        }
    };

    // REMOVE OBJECT FROM GRID:
    removeObjGrid(obj: any) {
        var tmpIndx;
        for (var i = 0; i < obj.gridLocations.length; ++i) {
            tmpIndx = this.grids[obj.gridLocations[i]].indexOf(obj);
            if (tmpIndx >= 0) {
                this.grids[obj.gridLocations[i]].splice(tmpIndx, 1);
            }
        }
    };

    // DISABLE OBJ:
    disableObj(obj: GameObject) {
        this.gameObjects.remove(obj);
        this.removeObjGrid(obj);
        /*if (server) {
            if (obj.owner && obj.pps) obj.owner.pps -= obj.pps;*/
            //this.removeObjGrid(obj);

            if (obj instanceof PlayerBuilding) {
                const predictIndex = this.predictedPlacements.indexOf(this.predictedPlacements.find(o => o.sid === obj.sid)!);
                if (predictIndex > -1) {
                    this.predictedPlacements.splice(predictIndex, 1);
                }
                var tmpIndx = this.updateObjects.indexOf(obj);
                if (tmpIndx >= 0) {
                    this.updateObjects.splice(tmpIndx, 1);
                }

                this.core.moduleManager.onBuildingBreak(obj);
            }
        /*}*/
    };

    // HIT OBJECT:
    /*hitObj(tmpObj: any, tmpDir: number) {
        for (var p = 0; p < players.length; ++p) {
            if (players[p].active) {
                if (tmpObj.sentTo[players[p].id]) {*/
                    /*if (!tmpObj.active) server.send(players[p].id, "12", tmpObj.sid);
                    else if (players[p].canSee(tmpObj))
                        server.send(players[p].id, "8", UTILS.fixTo(tmpDir, 1), tmpObj.sid);*/
                /*} if (!tmpObj.active && tmpObj.owner == players[p])
                    players[p].changeItemCount(tmpObj.group.id, -1);
            }
        }
    };*/

    // GET GRID ARRAY
    getGridArrays(xPos: number, yPos: number, s: number): GameObject[][] {
        let tmpX, tmpY, tmpArray = [], tmpGrid;

        let tmpS = config.mapScale / config.colGrid;

        tmpX = Math.floor(xPos / tmpS);
        tmpY = Math.floor(yPos / tmpS);
        tmpArray.length = 0;
        try {
            if (this.grids[tmpX + "_" + tmpY])
                tmpArray.push(this.grids[tmpX + "_" + tmpY]);
            if (xPos + s >= (tmpX + 1) * tmpS) { // RIGHT
                tmpGrid = this.grids[(tmpX + 1) + "_" + tmpY];
                if (tmpGrid) tmpArray.push(tmpGrid);
                if (tmpY && yPos - s <= tmpY * tmpS) { // TOP RIGHT
                    tmpGrid = this.grids[(tmpX + 1) + "_" + (tmpY - 1)];
                    if (tmpGrid) tmpArray.push(tmpGrid);
                } else if (yPos + s >= (tmpY + 1) * tmpS) { // BOTTOM RIGHT
                    tmpGrid = this.grids[(tmpX + 1) + "_" + (tmpY + 1)];
                    if (tmpGrid) tmpArray.push(tmpGrid);
                }
            } if (tmpX && xPos - s <= tmpX * tmpS) { // LEFT
                tmpGrid = this.grids[(tmpX - 1) + "_" + tmpY];
                if (tmpGrid) tmpArray.push(tmpGrid);
                if (tmpY && yPos - s <= tmpY * tmpS) { // TOP LEFT
                    tmpGrid = this.grids[(tmpX - 1) + "_" + (tmpY - 1)];
                    if (tmpGrid) tmpArray.push(tmpGrid);
                } else if (yPos + s >= (tmpY + 1) * tmpS) { // BOTTOM LEFT
                    tmpGrid = this.grids[(tmpX - 1) + "_" + (tmpY + 1)];
                    if (tmpGrid) tmpArray.push(tmpGrid);
                }
            } if (yPos + s >= (tmpY + 1) * tmpS) { // BOTTOM
                tmpGrid = this.grids[tmpX + "_" + (tmpY + 1)];
                if (tmpGrid) tmpArray.push(tmpGrid);
            } if (tmpY && yPos - s <= tmpY * tmpS) { // TOP
                tmpGrid = this.grids[tmpX + "_" + (tmpY - 1)];
                if (tmpGrid) tmpArray.push(tmpGrid);
            }
        } catch (e) {}
        return tmpArray;
    };

    // ADD NEW:
    add(sid: number, x: number, y: number, dir: number, s: number, type: number, data: any, owner: any) {
        let tmpObj;

        if (owner !== -1) { 
            const predicted = this.predictedPlacements.find(obj => MathUtil.getDistance(obj.position, new Vector(x, y)) < 8 && obj.stats.id === data);
            if (predicted) {
                // building prediction succeeded, remove item from predictions
                this.predictedPlacements.splice(this.predictedPlacements.indexOf(predicted), 1);
            }
        }

        // remove old object with the same sid
        if (tmpObj = this.gameObjects.findBySid(sid) !== null) {
            this.gameObjects.remove(tmpObj);
            tmpObj = null;
        }

        // as we dont use object activity, this makes no sense
        /*if (!tmpObj) {
            // find first inactive object and replace it with current one
            for (var i = 0; i < this.gameObjects.length; ++i) {
                if (!this.gameObjects[i].active) {
                    tmpObj = this.gameObjects[i];
                    break;
                }
            }
        }*/
        
        // otherwise create a new object and push it into objects
        if (!tmpObj) {
            if (owner === -1) {
                tmpObj = new NaturalObject(sid, new Vector(x, y), dir, s, type);
            } else {
                tmpObj = new PlayerBuilding(sid, new Vector(x, y), dir, s, data, owner);
            }

            this.gameObjects.push(tmpObj);
        }

        /*tmpObj.sid = sid;
        tmpObj.init(x, y, dir, s, type, data, owner);*/
        
        // server function
        this.setObjectGrids(tmpObj);
        
        this.updateObjects.push(tmpObj);
    };

    // DISABLE BY SID:
    disableBySid(sid: number) {
        for (var i = 0; i < this.gameObjects.length; ++i) {
            if (this.gameObjects[i].sid === sid) {
                this.disableObj(this.gameObjects[i]);
                break;
            }
        }
    };

    // REMOVE ALL FROM PLAYER:
    removeAllItems(sid: number) {
        for (var i = 0; i < this.gameObjects.length; ++i) {
            const object = this.gameObjects[i];
            if (object instanceof PlayerBuilding && object.owner.sid === sid) {
                this.disableObj(object);
            }
        }
        /*if (server) {
            server.broadcast("13", sid);
        }*/
    };

    // FETCH SPAWN OBJECT:
    fetchSpawnObj(sid: number) {
        let tmpObj;
        var tmpLoc = null;
        for (var i = 0; i < this.gameObjects.length; ++i) {
            tmpObj = this.gameObjects[i];
            /*if (tmpObj.active && tmpObj.owner && tmpObj.owner.sid == sid && tmpObj.spawnPoint) {
                tmpLoc = [tmpObj.x, tmpObj.y];
                this.disableObj(tmpObj);*/
                /*server.broadcast("12", tmpObj.sid);
                if (tmpObj.owner) {
                     tmpObj.owner.changeItemCount(tmpObj.group.id, -1);
                }*/
            /*    break;
            }*/
        }
        return tmpLoc;
    };

    // CHECK IF PLACABLE:
    checkItemLocation(x: number, y: number, s: number, sM: number, indx: number, ignoreWater: boolean, placer: any) {
        /*for (var i = 0; i < this.gameObjects.length; ++i) {
            var blockS = (this.gameObjects[i].blocker?
                this.gameObjects[i].blocker:this.gameObjects[i].getScale(sM, this.gameObjects[i].isItem));
            if (this.gameObjects[i].active && util.getDistance(x, y, this.gameObjects[i].x,
                this.gameObjects[i].y) < (s + blockS))
                return false;
        }

        for (const object of this.getGridArrays(x, y, 500).flat(1)) {
            const block = object.blocker ? object.blocker : object.getScale(sM, object.isItem);

        }
        
        if (!ignoreWater && indx != 18 && y >= (config.mapScale / 2) - (config.riverWidth / 2) && y <=
            (config.mapScale / 2) + (config.riverWidth / 2)) {
            return false;
        }*/
        return true;
    };

    // ADD PROJECTILE:

    // todo: add projectile manager

    /*addProjectile(x: number, y: number, dir: number, range: number, indx: number) {
        var tmpData = items.projectiles[indx];
        var tmpProj;
        for (var i = 0; i < items.projectiles.length; ++i) {
            if (!projectiles[i].active) {
                tmpProj = projectiles[i];
                break;
            }
        }
        if (!tmpProj) {
            tmpProj = new Projectile(players, UTILS);
            projectiles.push(tmpProj);
        }
        tmpProj.init(indx, x, y, dir, tmpData.speed, range, tmpData.scale);
    };*/

    // CHECK PLAYER COLLISION:
    /*checkCollision(player: Player, other: any, delta: number) {
        delta = delta||1;
        var dx = player.x - other.x;
        var dy = player.y - other.y;
        var tmpLen = player.scale + other.scale;
        if (Math.abs(dx) <= tmpLen || Math.abs(dy) <= tmpLen) {
            tmpLen = player.scale + (other.getScale ? other.getScale() : other.scale);
            var tmpInt = Math.sqrt(dx * dx + dy * dy) - tmpLen;
            if (tmpInt <= 0) {
                if (!other.ignoreCollision) {
                    var tmpDir = util.getDirection(player.x, player.y, other.x, other.y);
                    var tmpDist = util.getDistance(player.x, player.y, other.x, other.y);
                    if (other.isPlayer) {
                        tmpInt = (tmpInt * -1) / 2;
                        player.x += (tmpInt * Math.cos(tmpDir));
                        player.y += (tmpInt * Math.sin(tmpDir));
                        other.x -= (tmpInt * Math.cos(tmpDir));
                        other.y -= (tmpInt * Math.sin(tmpDir));
                    } else {
                        player.x = other.x + (tmpLen * Math.cos(tmpDir));
                        player.y = other.y + (tmpLen * Math.sin(tmpDir));
                        player.xVel *= 0.75;
                        player.yVel *= 0.75;
                    }
                    if (other.dmg && other.owner != player && !(other.owner &&
                        other.owner.team && other.owner.team == player.team)) {
                        player.changeHealth(-other.dmg, other.owner/*, other*//*);
                        var tmpSpd = 1.5 * (other.weightM||1);
                        player.xVel += tmpSpd * Math.cos(tmpDir);
                        player.yVel += tmpSpd * Math.sin(tmpDir);
                        if (other.pDmg && !(player.skin && player.skin.poisonRes)) {
                            player.dmgOverTime.dmg = other.pDmg;
                            player.dmgOverTime.time = 5;
                            player.dmgOverTime.doer = other.owner;
                        }*/
                        /*if (player.colDmg && other.health) {
                            if (other.changeHealth(-player.colDmg)) this.disableObj(other);
                            this.hitObj(other, UTILS.getDirection(player.x, player.y, other.x, other.y));
                        }*/
                    /*}
                } else if (other.trap/* && !player.noTrap*//* && other.owner != player && !(other.owner &&
                    other.owner.team && other.owner.team == player.team)) {
                    player.lockMove = true;
                    other.hideFromEnemy = false;
                } else if (other.boostSpeed) {
                    player.xVel += (delta * other.boostSpeed * (other.weightM||1)) * Math.cos(other.dir);
                    player.yVel += (delta * other.boostSpeed * (other.weightM||1)) * Math.sin(other.dir);
                } else if (other.healCol) {
                    player.healCol = other.healCol;
                } else if (other.teleport) {
                    player.x = util.randInt(0, config.mapScale);
                    player.y = util.randInt(0, config.mapScale);
                }
                if (other.zIndex > player.zIndex) player.zIndex = other.zIndex;
                return true;
            }
        }
        return false;
    }*/

    wiggleObject(sid: number, dir: number, tickIndex: number) {
        const object = this.gameObjects.findBySid(sid);
        if (object) {
                object.wiggle.add(new Vector(
                    config.gatherWiggle * Math.cos(dir),
                    config.gatherWiggle * Math.sin(dir)
                ));
                object.wiggles.push([dir, tickIndex]);
        }
    }

    resetWiggles(tickIndex: number) {
        for (let i = 0; i < this.gameObjects.length; i++) {
            const wiggles = this.gameObjects[i].wiggles;

            let j = wiggles.length;
            while (j--) {
                const wiggle = wiggles[j];
                if (tickIndex >= wiggle[1] + 1) {
                    wiggles.splice(j, 1);
                }
            }
        }
    }

    update(delta: number) {
        for (let i = 0; i < this.updateObjects.length; i++) {
            this.updateObjects[i].update(delta);
        }
    }
}