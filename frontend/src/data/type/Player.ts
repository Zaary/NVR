import { util } from "../type/MoomooUtil";
import accessories from "../moomoo/accessories";
import config from "../moomoo/config";
import hats from "../moomoo/hats";
import { items } from "../moomoo/items";

class Player {
    serverPosX: number;
    serverPosY: number;
    clientPosX: number;
    clientPosY: number;

    public id: string;
    public sid: number;
    public name: string;
    public team: string | null;
    public tmpScore: number;
    public skinIndex: number;
    public tailIndex: number;
    public hitTime: number;
    public skins: { [key: string]: 1 };
    public tails: { [key: string]: 1 };
    public dt: number;
    public points: number;
    public hidden: boolean;
    public itemCounts: { [key: string]: number };
    public isPlayer: boolean;
    public pps: number;
    public moveDir: undefined | number;
    public skinRot: number;
    public lastPing: number;
    public iconIndex: number;
    public skinColor: number;

    public skin: any;
    public tail: any;

    public timerCount: number = 0;
    public tmpRatio: number = 0;
    public animIndex: number = 0;
    public healCol: number = 0;

    public active: boolean = false;
	public alive: boolean = false;
	public lockMove: boolean = false;
	public lockDir: boolean = false;
	public isLeader: boolean = false;
	public minimapCounter: number = 0;
	public chatCountdown: number = 0;
	public shameCount: number = 0;
	public shameTimer: number = 0;
	public sentTo: { [key: number]: 1 } = {};
	public gathering: number = 0;
	public autoGather: number = 0;
	public animTime: number = 0;
	public animSpeed: number = 0;
	public mouseState: number = 0;
	public buildIndex: number = -1;
	public weaponIndex: number = 0;
	public weaponVariant: number = 0;
	public dmgOverTime: {
        dmg?: number,
        doer?: Player,
        time?: number
    } = {};
	public noMovTimer: number = 0;
	public maxXP: number = 300;
	public XP: number = 0;
	public age: number = 1;
	public kills: number = 0;
	public upgrAge: number = 2;
	public upgradePoints: number = 0;
	public x: number = 0;
    public y: number = 0;
	public zIndex: number = 0;
	public xVel: number = 0;
	public yVel: number = 0;
	public slowMult: number = 1;
	public dir: number = 0;
	public dirPlus: number = 0;
	public targetDir: number = 0;
	public targetAngle: number = 0;
	public maxHealth: number = 100;
	public health: number = this.maxHealth;
	public scale: number = config.playerScale;
	public speed: number = config.playerSpeed;
	public items: number[] = [0, 3, 6, 10];
	public weapons: number[] = [0];
	public shootCount: number = 0;
	public weaponXP: number[] = [];
	public reloads: { [key: number]: number } = {};
    public resources: { [key: string]: number } = {};
	public visible: boolean = false;
    forcePos: any;
    x2: number | undefined;
    y2: number | undefined;
    d2: number | undefined;
    t2: any;
    t1: any;
    x1: any;
    y1: any;
    lastTickPosX: number;
    lastTickPosY: number;
    serverDir: any;
    
    constructor(id: string, sid: number) {
        this.id = id;
        this.sid = sid;
        this.name = "";
        this.team = null;
        this.tmpScore = 0;
        this.skinIndex = 0;
        this.tailIndex = 0;
        this.hitTime = 0;
        this.tails = {};
        for (var i = 0; i < accessories.length; ++i) {
            if (accessories[i].price <= 0)
                this.tails[accessories[i].id] = 1;
        }
        this.skins = {};
        for (var i = 0; i < hats.length; ++i) {
            if (hats[i].price <= 0)
                this.skins[hats[i].id] = 1;
        }
        this.points = 0;
        this.dt = 0;
        this.hidden = false;
        this.itemCounts = {};
        this.isPlayer = true;
        this.pps = 0;
        this.moveDir = undefined;
        this.skinRot = 0;
        this.lastPing = 0;
        this.iconIndex = 0;
        this.skinColor = 0;

		this.serverPosX = 0;
		this.serverPosY = 0;
		this.clientPosX = 0;
		this.clientPosY = 0;
		this.lastTickPosX = 0;
		this.lastTickPosY = 0;
    }

	// SPAWN:
	spawn(moofoll?: boolean) {
		this.active = true;
		this.alive = true;
		this.lockMove = false;
		this.lockDir = false;
		this.minimapCounter = 0;
		this.chatCountdown = 0;
		this.shameCount = 0;
		this.shameTimer = 0;
		this.sentTo = {};
		this.gathering = 0;
		this.autoGather = 0;
		this.animTime = 0;
		this.animSpeed = 0;
		this.mouseState = 0;
		this.buildIndex = -1;
		this.weaponIndex = 0;
		this.weaponVariant = 0;
		this.dmgOverTime = {};
		this.noMovTimer = 0;
		this.maxXP = 300;
		this.XP = 0;
		this.age = 1;
		this.kills = 0;
		this.upgrAge = 2;
		this.upgradePoints = 0;
		this.x = 0;
		this.y = 0;
		this.zIndex = 0;
		this.xVel = 0;
		this.yVel = 0;
		this.slowMult = 1;
		this.dir = 0;
		this.dirPlus = 0;
		this.targetDir = 0;
		this.targetAngle = 0;
		this.maxHealth = 100;
		this.health = this.maxHealth;
		this.scale = config.playerScale;
		this.speed = config.playerSpeed;
        this.resources = {};
		this.resetMoveDir();
		this.resetResources(moofoll);
		this.items = [0, 3, 6, 10];
		this.weapons = [0];
		this.shootCount = 0;
		this.weaponXP = [];
		this.reloads = {};
	};

	// RESET MOVE DIR:
	resetMoveDir() {
		this.moveDir = undefined;
	};

	// RESET RESOURCES:
	resetResources(moofoll?: boolean) {
		for (var i = 0; i < config.resourceTypes.length; ++i) {
			this.resources[config.resourceTypes[i]] = moofoll?100:0;
		}
	};

	// ADD ITEM:
	addItem(id: number) {
		var tmpItem = items.list[id];
		if (tmpItem) {
			for (var i = 0; i < this.items.length; ++i) {
				if (items.list[this.items[i]].group == tmpItem.group) {
					if (this.buildIndex == this.items[i])
						this.buildIndex = id;
					this.items[i] = id;
					return true;
				}
			}
			this.items.push(id);
			return true;
		}
		return false;
	};

	// SET USER DATA:
	setUserData(data: any) {
		if (data) {
			// SET INITIAL NAME:
			this.name = "unknown";

			// VALIDATE NAME:
			var name = data.name + "";
			name = name.slice(0, config.maxNameLength);
			name = name.replace(/[^\w:\(\)\/? -]+/gmi, " ");  // USE SPACE SO WE CAN CHECK PROFANITY
			name = name.replace(/[^\x00-\x7F]/g, " ");
			name = name.trim();

			// CHECK IF IS PROFANE:
			var isProfane = false;
			/*var convertedName = name.toLowerCase().replace(/\s/g, "").replace(/1/g, "i").replace(/0/g, "o").replace(/5/g, "s");
			
            for (var word of langFilter.list) {
				if (convertedName.indexOf(word) != -1) {
					isProfane = true;
					break;
				}
			}*/

			if (name.length > 0 && !isProfane) {
				this.name = name;
			}

			// SKIN:
			this.skinColor = 0;
			if (config.skinColors[data.skin])
				this.skinColor = data.skin;
		}
	};

	// GET DATA TO SEND:
	getData() {
		return [
			this.id,
			this.sid,
			this.name,
			util.fixTo(this.x, 2),
			util.fixTo(this.y, 2),
			util.fixTo(this.dir, 3),
			this.health,
			this.maxHealth,
			this.scale,
			this.skinColor
		];
	};

	// SET DATA:
	setData(data: any) {
		this.id = data[0];
		this.sid = data[1];
		this.name = data[2];
		this.x = data[3];
		this.y = data[4];
		this.dir = data[5];
		this.health = data[6];
		this.maxHealth = data[7];
		this.scale = data[8];
		this.skinColor = data[9];
	};

	// UPDATE:
	update(delta: number) {
		if (!this.alive) return;

	    // SHAME SHAME SHAME:
		if (this.shameTimer > 0) {
			this.shameTimer -= delta;
			if (this.shameTimer <= 0) {
				this.shameTimer = 0;
				this.shameCount = 0;
			}
		}

		// REGENS AND AUTO:
		this.timerCount -= delta;
		if (this.timerCount <= 0) {
			var regenAmount = (this.skin && this.skin.healthRegen?this.skin.healthRegen:0) +
				(this.tail && this.tail.healthRegen?this.tail.healthRegen:0);
			if (regenAmount) {
				this.changeHealth(regenAmount, this);
			} if (this.dmgOverTime.dmg) {
				this.changeHealth(-this.dmgOverTime.dmg, <any>this.dmgOverTime.doer);
				(<number>this.dmgOverTime.time) -= 1;
				if (<number>this.dmgOverTime.time <= 0) {
					(<number>this.dmgOverTime.dmg) = 0;
                }
			} if (this.healCol) {
				this.changeHealth(this.healCol, this);
			}
			this.timerCount = 1000;
		}

		// CHECK KILL:
		if (!this.alive)
			return;

		// SLOWER:
		if (this.slowMult < 1) {
			this.slowMult += 0.0008 * delta;
			if (this.slowMult > 1)
				this.slowMult = 1;
		}

		// MOVE:
		this.noMovTimer += delta;
		if (this.xVel || this.yVel) this.noMovTimer = 0;
		if (this.lockMove) {
			this.xVel = 0;
			this.yVel = 0;
		} else {
			var spdMult = ((this.buildIndex>=0)?0.5:1) * (items.weapons[this.weaponIndex].spdMult||1) *
				(this.skin?(this.skin.spdMult||1):1) * (this.tail?(this.tail.spdMult||1):1) * (this.y<=config.snowBiomeTop?
				((this.skin&&this.skin.coldM)?1:config.snowSpeed):1) * this.slowMult;
			if (!this.zIndex && this.y >= (config.mapScale / 2) - (config.riverWidth / 2) &&
				this.y <= (config.mapScale / 2) + (config.riverWidth / 2)) {
				if (this.skin && this.skin.watrImm) {
					spdMult *= 0.75;
					this.xVel += config.waterCurrent * 0.4 * delta;
				} else {
					spdMult *= 0.33;
					this.xVel += config.waterCurrent * delta;
				}
			}
			var xVel = (this.moveDir!=undefined) ? Math.cos(this.moveDir):0;
			var yVel = (this.moveDir!=undefined) ? Math.sin(this.moveDir):0;
			var length = Math.sqrt(xVel * xVel + yVel * yVel);
			if (length != 0) {
				xVel /= length;
				yVel /= length;
			}
			if (xVel) this.xVel += xVel * this.speed * spdMult * delta;
			if (yVel) this.yVel += yVel * this.speed * spdMult * delta;
		}

		// OBJECT COLL:
		this.zIndex = 0;
		this.lockMove = false;
		this.healCol = 0;
		var tmpList;
		var tmpSpeed = util.getDistance(0, 0, this.xVel * delta, this.yVel * delta);
		var depth = Math.min(4, Math.max(1, Math.round(tmpSpeed / 40)));
		var tMlt = 1 / depth;
		/*for (var i = 0; i < depth; ++i) {
			if (this.xVel)
				this.x += (this.xVel * delta) * tMlt;
			if (this.yVel)
				this.y += (this.yVel * delta) * tMlt;
			tmpList = objectManager.getGridArrays(this.x, this.y, this.scale);
			for (var x = 0; x < tmpList.length; ++x) {
				for (var y = 0; y < tmpList[x].length; ++y) {
					if (tmpList[x][y].active)
						objectManager.checkCollision(this, tmpList[x][y], tMlt);
				}
			}
		}

		// PLAYER COLLISIONS:
		var tmpIndx = players.indexOf(this);
		for (var i = tmpIndx + 1; i < players.length; ++i) {
			if (players[i] != this && players[i].alive)
				objectManager.checkCollision(this, players[i]);
		}*/

		// DECEL:
		if (this.xVel) {
			this.xVel *= Math.pow(config.playerDecel, delta);
			if (this.xVel <= 0.01 && this.xVel >= -0.01) this.xVel = 0;
		} if (this.yVel) {
			this.yVel *= Math.pow(config.playerDecel, delta);
			if (this.yVel <= 0.01 && this.yVel >= -0.01) this.yVel = 0;
		}

		// MAP BOUNDARIES:
		if (this.x - this.scale < 0) {
			this.x = this.scale;
		} else if (this.x + this.scale > config.mapScale) {
			this.x = config.mapScale - this.scale;
		} if (this.y - this.scale < 0) {
			this.y = this.scale;
		} else if (this.y + this.scale > config.mapScale) {
			this.y = config.mapScale - this.scale;
		}

		// USE WEAPON OR TOOL:
		if (this.buildIndex < 0) {
			if (this.reloads[this.weaponIndex] > 0) {
				this.reloads[this.weaponIndex] -= delta;
				this.gathering = this.mouseState;
			} else if (this.gathering || this.autoGather) {
				var worked = true;
				if (items.weapons[this.weaponIndex].gather != undefined) {
					this.gather();
				} else if (items.weapons[this.weaponIndex].projectile != undefined &&
					this.hasRes(items.weapons[this.weaponIndex], (this.skin?this.skin.projCost:0))) {
					this.useRes(items.weapons[this.weaponIndex], (this.skin?this.skin.projCost:0));
					this.noMovTimer = 0;
					var tmpIndx = items.weapons[this.weaponIndex].projectile;
					var projOffset = this.scale * 2;
					var aMlt = (this.skin&&this.skin.aMlt)?this.skin.aMlt:1;
					if (items.weapons[this.weaponIndex].rec) {
						this.xVel -= <any>items.weapons[<number>this?.weaponIndex].rec * Math.cos(this.dir);
						this.yVel -= <any>items.weapons[<number>this?.weaponIndex].rec * Math.sin(this.dir);
					}
					/*projectileManager.addProjectile(this.x+(projOffset*mathCOS(this.dir)),
						this.y+(projOffset*mathSIN(this.dir)), this.dir, items.projectiles[tmpIndx].range*aMlt,
						items.projectiles[tmpIndx].speed*aMlt, tmpIndx, this, null, this.zIndex);*/
				} else {
					worked = false;
				}
				this.gathering = this.mouseState;
				if (worked) {
					this.reloads[this.weaponIndex] = <any>items.weapons[<number>this?.weaponIndex].speed * (this.skin ? (this.skin.atkSpd || 1) : 1);
				}
			}
		}

	};

	// ADD WEAPON XP:
	addWeaponXP(amnt: number) {
		if (!this.weaponXP[this.weaponIndex])
			this.weaponXP[this.weaponIndex] = 0;
		this.weaponXP[this.weaponIndex] += amnt;
	};

	// EARN XP:
	earnXP(amount: number) {
		if (this.age < config.maxAge) {
			this.XP += amount;
			if (this.XP >= this.maxXP) {
				if (this.age < config.maxAge) {
					this.age++;
					this.XP = 0;
					this.maxXP *= 1.2;
				} else {
					this.XP = this.maxXP;
				}
				this.upgradePoints++;
				//server.send(this.id, "16", this.upgradePoints, this.upgrAge);
				//server.send(this.id, "15", this.XP, util.fixTo(this.maxXP, 1), this.age);
			} else {
				//server.send(this.id, "15", this.XP);
			}
		}
	};

	// CHANGE HEALTH:
	changeHealth(amount: number, doer: Player) {
		if (amount > 0 && this.health >= this.maxHealth)
			return false
		if (amount < 0 && this.skin)
			amount *= this.skin.dmgMult||1;
		if (amount < 0 && this.tail)
			amount *= this.tail.dmgMult||1;
		if (amount < 0)
			this.hitTime = Date.now();
		this.health += amount;
		if (this.health > this.maxHealth) {
			amount -= (this.health - this.maxHealth);
			this.health = this.maxHealth;
		}
		if (this.health <= 0)
			this.kill(doer);
		/*for (var i = 0; i < players.length; ++i) {
			if (this.sentTo[players[i].id])
				server.send(players[i].id, "h", this.sid, Math.round(this.health));
		}
		if (doer && doer.canSee(this) && !(doer == this && amount < 0)) {
			server.send(doer.id, "t", Math.round(this.x),
				Math.round(this.y), Math.round(-amount), 1);
		}*/
		return true;
	};

	// KILL:
	kill(doer: Player) {
		/*if (doer && doer.alive) {
			doer.kills++;
			if (doer.skin && doer.skin.goldSteal) scoreCallback(doer, Math.round(this.points / 2));
			else scoreCallback(doer, Math.round(this.age*100*((doer.skin&&doer.skin.kScrM)?doer.skin.kScrM:1)));
			server.send(doer.id, "9", "kills", doer.kills, 1);
		}
		this.alive = false;
		server.send(this.id, "11");
		iconCallback();*/
	};

	// ADD RESOURCE:
	addResource(type: number, amount: number, auto: boolean = false) {
		if (!auto && amount > 0)
			this.addWeaponXP(amount);
		/*if (type == 3) {
			scoreCallback(this, amount, true);
		} else */{
			this.resources[config.resourceTypes[type]] += amount;
			//server.send(this.id, "9", config.resourceTypes[type], this[config.resourceTypes[type]], 1);
		}
	};

	// CHANGE ITEM COUNT:
	changeItemCount(index: number, value: number) {
		this.itemCounts[index] = this.itemCounts[index]||0;
		this.itemCounts[index] += value;
		//server.send(this.id, "14", index, this.itemCounts[index]);
	};

	// BUILD:
	buildItem(item: any) {
		var tmpS = (this.scale + item.scale + (item.placeOffset||0));
		var tmpX = this.x + (tmpS * Math.cos(this.dir));
		var tmpY = this.y + (tmpS * Math.sin(this.dir));
		if (this.canBuild(item) && !(item.consume && (this.skin && this.skin.noEat))
		 	/*&& (item.consume || objectManager.checkItemLocation(tmpX, tmpY, item.scale,
			0.6, item.id, false, this))*/) {
			var worked = false;
			if (item.consume) {
				if (this.hitTime) {
					var timeSinceHit = Date.now() - this.hitTime;
					this.hitTime = 0;
					if (timeSinceHit <= 120) {
						this.shameCount++;
						if (this.shameCount >= 8) {
							this.shameTimer = 30000;
							this.shameCount = 0;
						}
					} else {
						this.shameCount -= 2;
						if (this.shameCount <= 0) {
							this.shameCount = 0;
						}
					}
				}
				if (this.shameTimer <= 0)
					worked = item.consume(this);
			} else {
				worked = true;
				if (item.group.limit) {
					this.changeItemCount(item.group.id, 1);
				}
				if (item.pps)
					this.pps += item.pps;
				/*objectManager.add(objectManager.objects.length, tmpX, tmpY, this.dir, item.scale,
					item.type, item, false, this);*/
			}
			if (worked) {
				this.useRes(item);
				this.buildIndex = -1;
			}
		}
	};

	// HAS RESOURCES:
	hasRes(item: any, mult?: number) {
		for (var i = 0; i < item.req.length;) {
			if (this.resources[item.req[i]] < Math.round(item.req[i + 1] * (mult||1)))
				return false;
			i += 2;
		}
		return true;
	};

	// USE RESOURCES:
	useRes(item: any, mult?: number) {
		if (config.inSandbox)
			return;
		for (var i = 0; i < item.req.length;) {
			this.addResource(config.resourceTypes.indexOf(item.req[i]), -Math.round(item.req[i+1]*(mult||1)));
			i+=2;
		}
	};

	// CAN BUILD:
	canBuild(item: any) {
		if (config.inSandbox)
			return true;
		if (item.group.limit && this.itemCounts[item.group.id] >= item.group.limit)
			return false;
		return this.hasRes(item);
	};

	// GATHER:
	gather() {

		// SHOW:
		this.noMovTimer = 0;

		// SLOW MOVEMENT:
		this.slowMult -= (items.weapons[this.weaponIndex].hitSlow||0.3);
		if (this.slowMult < 0)
			this.slowMult = 0;

		// VARIANT DMG:
		var tmpVariant = config.fetchVariant(this);
		var applyPoison = tmpVariant?.poison;
		var variantDmg = tmpVariant?.val;

		// CHECK IF HIT GAME OBJECT:
		/*var hitObjs = {};
		var tmpDist, tmpDir, tmpObj, hitSomething;
		var tmpList = objectManager.getGridArrays(this.x, this.y, items.weapons[this.weaponIndex].range);
		for (var t = 0; t < tmpList.length; ++t) {
			for (var i = 0; i < tmpList[t].length; ++i) {
				tmpObj = tmpList[t][i];
				if (tmpObj.active && !tmpObj.dontGather && !hitObjs[tmpObj.sid] && tmpObj.visibleToPlayer(this)) {
					tmpDist = util.getDistance(this.x, this.y, tmpObj.x, tmpObj.y) - tmpObj.scale;
					if (tmpDist <= items.weapons[this.weaponIndex].range) {
						tmpDir = util.getDirection(tmpObj.x, tmpObj.y, this.x, this.y);
						if (util.getAngleDist(tmpDir, this.dir) <= config.gatherAngle) {
							hitObjs[tmpObj.sid] = 1;
							if (tmpObj.health) {
								if (tmpObj.changeHealth(-items.weapons[this.weaponIndex].dmg*(variantDmg)*
									(items.weapons[this.weaponIndex].sDmg||1)*(this.skin&&this.skin.bDmg?this.skin.bDmg:1), this)) {
									for (var x = 0; x < tmpObj.req.length;) {
										this.addResource(config.resourceTypes.indexOf(tmpObj.req[x]), tmpObj.req[x+1]);
										x+=2;
									}
									objectManager.disableObj(tmpObj);
								}
							} else {
								this.earnXP(4*items.weapons[this.weaponIndex].gather);
								var count = items.weapons[this.weaponIndex].gather+(tmpObj.type==3?4:0);
								if (this.skin && this.skin.extraGold) {
									this.addResource(3, 1);
								} this.addResource(tmpObj.type, count);
							}
							hitSomething = true;
							objectManager.hitObj(tmpObj, tmpDir);
						}
					}
				}
			}
		}*/

		// CHECK IF HIT PLAYER:
		/*for (var i = 0; i < players.length + ais.length; ++i) {
			tmpObj = players[i]||ais[i-players.length];
			if (tmpObj != this && tmpObj.alive && !(tmpObj.team && tmpObj.team == this.team)) {
				tmpDist = util.getDistance(this.x, this.y, tmpObj.x, tmpObj.y) - (tmpObj.scale * 1.8);
				if (tmpDist <= items.weapons[this.weaponIndex].range) {
					tmpDir = util.getDirection(tmpObj.x, tmpObj.y, this.x, this.y);
					if (util.getAngleDist(tmpDir, this.dir) <= config.gatherAngle) {

						// STEAL RESOURCES:
						var stealCount = items.weapons[this.weaponIndex].steal;
						if (stealCount && tmpObj.addResource) {
							stealCount = Math.min((tmpObj.points||0), stealCount);
							this.addResource(3, stealCount);
							tmpObj.addResource(3, -stealCount);
						}

						// MELEE HIT PLAYER:
						var dmgMlt = variantDmg;
						if (tmpObj.weaponIndex != undefined && items.weapons[tmpObj.weaponIndex].shield &&
							util.getAngleDist(tmpDir+Math.PI, tmpObj.dir) <= config.shieldAngle) {
							dmgMlt = items.weapons[tmpObj.weaponIndex].shield;
						}
						var dmgVal = items.weapons[this.weaponIndex].dmg *
							(this.skin && this.skin.dmgMultO?this.skin.dmgMultO:1) *
							(this.tail && this.tail.dmgMultO?this.tail.dmgMultO:1);
						var tmpSpd = (0.3 * (tmpObj.weightM||1)) + (items.weapons[this.weaponIndex].knock||0);
						tmpObj.xVel += tmpSpd * mathCOS(tmpDir);
						tmpObj.yVel += tmpSpd * mathSIN(tmpDir);
						if (this.skin && this.skin.healD)
							this.changeHealth(dmgVal * dmgMlt * this.skin.healD, this);
						if (this.tail && this.tail.healD)
							this.changeHealth(dmgVal * dmgMlt * this.tail.healD, this);
						if (tmpObj.skin && tmpObj.skin.dmg && dmgMlt == 1)
							this.changeHealth(-dmgVal * tmpObj.skin.dmg, tmpObj);
						if (tmpObj.tail && tmpObj.tail.dmg && dmgMlt == 1)
							this.changeHealth(-dmgVal * tmpObj.tail.dmg, tmpObj);
						if (tmpObj.dmgOverTime && this.skin && this.skin.poisonDmg &&
							!(tmpObj.skin && tmpObj.skin.poisonRes)) {
							tmpObj.dmgOverTime.dmg = this.skin.poisonDmg;
							tmpObj.dmgOverTime.time = this.skin.poisonTime||1;
							tmpObj.dmgOverTime.doer = this;
						} if (tmpObj.dmgOverTime && applyPoison &&
							!(tmpObj.skin && tmpObj.skin.poisonRes)) {
							tmpObj.dmgOverTime.dmg = 5;
							tmpObj.dmgOverTime.time = 5;
							tmpObj.dmgOverTime.doer = this;
						} if (tmpObj.skin && tmpObj.skin.dmgK) {
							this.xVel -= tmpObj.skin.dmgK * mathCOS(tmpDir);
							this.yVel -= tmpObj.skin.dmgK * mathSIN(tmpDir);
						} tmpObj.changeHealth(-dmgVal * dmgMlt, this, this);

					}
				}
			}
		}*/

		// SEND FOR ANIMATION:
		//this.sendAnimation(hitSomething?1:0);
	};

	// SEND ANIMATION:
	sendAnimation(hit: boolean) {
		/*for (var i = 0; i < players.length; ++i) {
			if (this.sentTo[players[i].id] && this.canSee(players[i])) {
				server.send(players[i].id, "7", this.sid, hit?1:0, this.weaponIndex);
			}
		}*/
	};

	// ANIMATE:
	animate(delta: number) {
		if (this.animTime > 0) {
			this.animTime -= delta;
			if (this.animTime <= 0) {
				this.animTime = 0;
				this.dirPlus = 0;
				this.tmpRatio = 0;
				this.animIndex = 0;
			} else {
				if (this.animIndex == 0) {
					this.tmpRatio += delta / (this.animSpeed * config.hitReturnRatio);
					this.dirPlus = util.lerp(0, this.targetAngle, Math.min(1, this.tmpRatio));
					if (this.tmpRatio >= 1) {
						this.tmpRatio = 1;
						this.animIndex = 1;
					}
				} else {
					this.tmpRatio -= delta / (this.animSpeed * (1 - config.hitReturnRatio));
					this.dirPlus = util.lerp(0, this.targetAngle, Math.max(0, this.tmpRatio));
				}
			}
		}
	};

	// GATHER ANIMATION:
	startAnim(didHit: boolean, index: number) {
		this.animTime = this.animSpeed = <number>items.weapons[index].speed;
		this.targetAngle = (didHit ? -config.hitAngle : -Math.PI);
		this.tmpRatio = 0;
		this.animIndex = 0;
	};

	// CAN SEE:
	canSee(other: Player) {
		if (!other) return false;
		if (other.skin && other.skin.invisTimer && other.noMovTimer
			>= other.skin.invisTimer) return false;
		var dx = Math.abs(other.x - this.x) - other.scale;
		var dy = Math.abs(other.y - this.y) - other.scale;
		return dx <= (config.maxScreenWidth / 2) * 1.3 && dy <= (config.maxScreenHeight / 2) * 1.3;
	};

};

export default Player;