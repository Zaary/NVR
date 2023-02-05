import { items } from "../data/moomoo/items";
import { GameObject, PlayerBuilding } from "../data/type/GameObject";
import { ClientPlayer, Player } from "../data/type/Player";
//import { playerUtil } from "../util/PlayerUtil";
import { Packet } from "./packets/Packet";
import { PacketType } from "./packets/PacketType";
import { core } from "../main";
import Vector from "../util/type/Vector";
import PlayerManager from "../manager/PlayerManager";
import { MeleeWeapon, Weapon, weaponList, WeaponSlot } from "../data/type/Weapon";
import MathUtil from "../util/MathUtil";
import { util } from "../data/type/MoomooUtil";
import { TickEngine, TickRoundType } from "../util/engine/TickEngine";
import Logger from "../util/Logger";
import { ActionPriority, ActionType } from "../core/ActionType";
import AutoHat from "../features/modules/player/AutoHat";
import { connection } from "./Connection";

const logger = new Logger("packethandler");

let lastPath = 0;

function processIn(packet: Packet) {
    switch (packet.type) {
        case PacketType.PLAYER_ADD:
            const playerData = packet.data[0];
            core.playerManager.spawnPlayer(playerData[0], playerData[1], playerData[2], new Vector(playerData[3], playerData[4]), playerData[5], playerData[6], playerData[7], playerData[8], playerData[9], packet.data[1]);
            break;
        case PacketType.PLAYER_UPDATE:
            for (let i = 0; i < core.playerManager.playerList.length; i++) {
                core.playerManager.playerList[i].visible = false;
            }
            
            for (let i = 0; i < packet.data[0].length / 13; i++) {
                const playerData = packet.data[0].slice(i * 13, i * 13 + 13);
                const player = core.playerManager.playerList.findBySid(playerData[0]);
                
                if (player) {
                    if (player === core.playerManager.myPlayer) {
                        //if (playerData[10] === 0) console.log("disequip at tick:", core.tickEngine.tickIndex);
                    }
                    if (player === core.playerManager.myPlayer) {
                        //console.log("check tick:", core.tickEngine.tickIndex, "current hat:", playerData[9]);
                        //if (window[core.tickEngine.tickIndex] !== playerData[9]) console.log("fail");
                    }

                    /*player.dt = 0;

                    player.t1 = (player.t2 === undefined) ? Date.now() : player.t2;
                    player.t2 = Date.now();

                    player.x1 = player.x;
                    player.y1 = player.y;

                    player.x2 = playerData[1];
                    player.y2 = playerData[2];*/

                    //player.lastPositionTimestamp = player.positionTimestamp; // t1
                    //player.positionTimestamp = Date.now(); // t2
                    //player.clientPosX = player.x; // x1
                    //player.clientPosY = player.y; // y1
                    //player.lastDir = player.serverDir; // d1

                    //player.lastTickPosX = player.serverPosX;
                    //player.lastTickPosY = player.serverPosY;

                    /*player.clientPosition.set(player.renderPosition);

                    player.serverPosition.set(
                        playerData[1],
                        playerData[2]
                    );*/

                    player.updatePlayer(core.objectManager, playerData[1], playerData[2], playerData[3], playerData[4], playerData[5], playerData[6], playerData[7], playerData[8], playerData[9], playerData[10], playerData[11], playerData[12]);

                    //player.lerpPos = new Vector(player.renderPos.x, player.renderPos.y) // clientPos
                    //player.lastDir = player.serverDir; // d1

                    //player.lastTickPosX = player.serverPosX;
                    //player.lastTickPosY = player.serverPosY;

                    //player.serverPos = new Vector(playerData[1], playerData[2]) // serverPos

                    //player.serverPosX = playerData[1]; // x2
                    //player.serverPosY = playerData[2]; // y2

                    //player.serverDir = info[3]; // d2
                    //player.dt = 0; // dt

                    //player.dir = playerData[3];
                    /*player.buildIndex = playerData[4];
                    player.weaponIndex = playerData[5];
                    player.weaponVariant = playerData[6];
                    player.team = playerData[7];
                    player.isLeader = playerData[8];
                    player.skinIndex = playerData[9];
                    player.tailIndex = playerData[10];
                    player.iconIndex = playerData[11];
                    player.zIndex = playerData[12];*/
                    player.visible = true;
                }
            }

            /*setTarget(playerUtil.findTarget(players));
            if (target && currentPlayer && Date.now() - lastPath > 500) {
                lastPath = Date.now();
                pathfinder.path({ x: currentPlayer.x, y: currentPlayer.y }, { x: currentPlayer.x, y: currentPlayer.y }, { x: target.x, y: target.y});
                // @ts-ignore
                //if (window.path) connection.send(new Packet(PacketType.CHAT, [`pathing:vertx=${window.path.length},thr=${Math.floor(Math.random()*16).toString(16).slice(1,3)},t=${target.sid}`]));
            }*/
            break;
        case PacketType.LOAD_GAME_OBJ:
            for (let i = 0; i < packet.data[0].length / 8; i++) {
                const data = packet.data[0].slice(i * 8, i * 8 + 8);
                // type (data[5]) is null for player buildings but set for natural objects
                // id (data[6]) is null for natural objects but is set for player buildings
                // owner sid (data[7]) is -1 for natural objects otherwise is set.
                core.objectManager.add(...(<[number, number, number, number, number, number, any, any]> data));
            }
            break;
        case PacketType.REMOVE_GAME_OBJ:
            core.objectManager.disableBySid(packet.data[0]);
            break;
        case PacketType.REMOVE_ALL_OBJ:
            core.objectManager.removeAllItems(packet.data[0]);
            break;
        case PacketType.WIGGLE:
            // first argument is ID and second argument is direction
            // however packet content is [direction, ID]

            // use tickIndex + 1 because wiggle packet is sent before player update
            // so tickIndex is not updated yet
            core.objectManager.wiggleObject(packet.data[1], packet.data[0], core.tickEngine.tickIndex + 1);
            break;
        case PacketType.UPDATE_ITEMS:
            if (packet.data[1]) {
                core.playerManager.myPlayer.inventory.setWeapons(packet.data[0]);
            } else {
                core.playerManager.myPlayer.inventory.setItems(packet.data[0]);
            }
            break;
        case PacketType.DEATH:
            core.playerManager.myPlayer.alive = false;
            core.playerManager.myPlayer.inventory.reset();
            break;
        case PacketType.UPDATE_STORE: {
            if (!packet.data[2]) {
                if (!packet.data[0]) core.playerManager.myPlayer.ownedHats.push(packet.data[1]);
            } else {
                if (!packet.data[0]) core.playerManager.myPlayer.ownedTails.push(packet.data[1]);
            }
            break;
        }
        case PacketType.GATHER_ANIM: {
            const player = core.playerManager.playerList.findBySid(packet.data[0]);
            if (!player) return;

            // set reload
            player.inventory.resetReload(player.inventory.heldItem instanceof MeleeWeapon ? player.inventory.heldItem : player.inventory.weapons[0]);
            player.inventory.updateReloads(core.tickEngine.ping);

            // damage objects
            const weapon = <MeleeWeapon> player.inventory.weaponSelected;
            const grids = core.objectManager.getGridArrays(player.serverPos.x, player.serverPos.y, weapon.stats.range + player.velocity.length() * 2).flat(1);

            for (let i = 0; i < grids.length; i++) {
                const object = grids[i];
                // use object.scale because .getScale returns collision box while .scale is hitbox
                if (MathUtil.getDistance(object.position, player.lastTickServerPos) - object.scale <= weapon.stats.range + player.velocity.length() * 2) {
                    for (const wiggle of object.wiggles) {
                        const gatherAngle = MathUtil.roundTo(MathUtil.getDirection(player.serverPos, object.position), 1);
                        const safeSpan = MathUtil.lineSpan(object.position.clone(), player.lastTickServerPos.clone(), player.serverPos.clone().add(player.velocity));

                        if (true/*MathUtil.getAngleDist(wiggle[0], gatherAngle) <= safeSpan + Number.EPSILON*/) {
                            if (object instanceof PlayerBuilding) {
                                // damage the building depending on the player's weapon damage
                                const damage = weapon.stats.dmg * weapon.stats.buildingDmgMultiplier;
                                object.health -= damage;

                                core.moduleManager.onBuildingHit(player, object, damage);
                            }

                            // remove the wiggle as its confirmed by gather packet
                            object.wiggles.splice(object.wiggles.indexOf(wiggle), 1);
                        } else {
                            // this should NOT happen and if it does, there is a 99% chance it is a bug
                        }
                    }
                }
            }

            
            if (player === core.playerManager.myPlayer) (<ClientPlayer> player).justStartedAttacking = false;


            player.nextAttack = core.tickEngine.getTickIndex(Date.now() - core.tickEngine.ping * 2 + player.inventory.weaponSelected.stats.reloadTime) + 1;
            player.swingStreak++;
            console.log("current tick:", core.tickEngine.tickIndex, "scheduled next:", player.nextAttack);
            break;
        }
        case PacketType.HEALTH_UPDATE: {
            const player = core.playerManager.playerList.findBySid(packet.data[0])!;
            const newHealth = packet.data[1];
            const delta = newHealth - player.health;
            const tracker = player.shame;

            if (delta < 0) {
                tracker.lastDamage = core.tickEngine.roundToTick(Date.now() - core.tickEngine.ping, TickRoundType.ROUND);
                if (Date.now() + core.tickEngine.ping - tracker.lastDamage <= 120) {
                    if (tracker.points++ >= 8) {
                        tracker.isClowned = true;
                        tracker.timer = 30 * 1000;
                        tracker.points = 0;
                    }
                }
            }

            if (player === core.playerManager.myPlayer) {
                const player = core.playerManager.myPlayer;
                const lastPacketHealth = player.packetHealth;
                player.packetHealth = newHealth;

                if (newHealth < lastPacketHealth) {
                    player.health -= lastPacketHealth - player.packetHealth;
                }

                if (player.packetHealth > player.health) {
                    logger.warn(core.playerManager.myPlayer.health, "health was not in sync: " + player.health + " -> " + newHealth + ", packet-health: " + player.packetHealth);
                    player.health = player.packetHealth;
                }
            } else {
                player.health = newHealth;
            }
            break;
        }
    }
}

let isAttackScheduled = -1;

function processOut(packet: Packet) {
    switch (packet.type) {
        case PacketType.ATTACK: {
            const myPlayer = core.playerManager.myPlayer;
            const nextPredictableTick = core.tickEngine.getNextPredictableTick();
            let wasHeal = false;

            if (packet.data[0] === 1) {
                const heldItem = myPlayer.inventory.heldItem;
                if (!(heldItem instanceof Weapon)) {
                    if (heldItem.group.id === 0 && myPlayer.health < 100) {
                        myPlayer.shame.lastDamage = -1;
                        myPlayer.health = Math.min(myPlayer.health + heldItem.healAmount!, 100);
                        myPlayer.inventory.heldItem = myPlayer.inventory.weaponSelected;
                        wasHeal = true;
                    }
                }
            } else {
                if (!core.tickEngine.isTickPredictable(core.tickEngine.getTickIndex(Date.now() + myPlayer.inventory.reloads[myPlayer.inventory.weaponSelected.id]))) {
                    myPlayer.swingStreak = 0;
                }
                /*if (isAttackScheduled > -1) {
                    core.scheduleAction(ActionType.ATTACK, ActionPriority.BIOMEHAT, isAttackScheduled + 1, [0, packet.data[1]], true);
                    isAttackScheduled = -1;
                }*/
            }

            if (!wasHeal && packet.data[0] === 1 && myPlayer.inventory.heldItem instanceof Weapon && (myPlayer.swingStreak === 0 || myPlayer.inventory.reloads[myPlayer.inventory.weaponSelected.id] - core.tickEngine.ping <= 0)) {
                //const [hat, tail] = .computeHat(core.tickEngine.tickIndex);
                
                
                //myPlayer.nextAttack = core.tickEngine.getTickIndex(Date.now() - core.tickEngine.ping + myPlayer.inventory.reloads[myPlayer.inventory.weaponSelected.id]);
                /*if (!core.tickEngine.isTickPredictable(core.tickEngine.tickIndex + 1)) {
                    core.scheduleAction(ActionType.ATTACK, ActionPriority.BIOMEHAT, nextPredictableTick, [1, packet.data[1]], true);
                    isAttackScheduled = nextPredictableTick;
                }*/
                myPlayer.justStartedAttacking = true;
                myPlayer.inventory.resetReload(myPlayer.inventory.heldItem);
                //return false;
            }

            myPlayer.isAttacking = packet.data[0];
            break;
        }
        case PacketType.SELECT_ITEM: {
            const myPlayer = core.playerManager.myPlayer;
            const lastHeld = `${myPlayer.inventory.heldItem instanceof Weapon}_${myPlayer.inventory.heldItem.id}`;
            if (packet.data[1]) {
                myPlayer.inventory.heldItem = weaponList[packet.data[0]];
            } else {
                if (`${packet.data[1]}_${packet.data[0]}` === lastHeld) {
                    myPlayer.inventory.heldItem = myPlayer.inventory.weaponSelected;
                } else {
                    myPlayer.inventory.heldItem = items.list[packet.data[0]];
                }
            }
            break;
        }
        case PacketType.AUTO_ATK: {
            const myPlayer = core.playerManager.myPlayer;
            myPlayer.isAutoAttacking = !myPlayer.isAutoAttacking;
            if (myPlayer.isAutoAttacking && myPlayer.inventory.heldItem instanceof Weapon && myPlayer.inventory.reloads[myPlayer.inventory.heldItem.id] === 0) {
                //myPlayer.justStartedAttacking = true;
            }
            break;
        }
    }
    return true;
}

const PacketHandler = { processIn, processOut };

export { PacketHandler }
/*

var tmpSpeed = UTILS.getDistance(0, 0, this.xVel * delta, this.yVel * delta);
                var depth = Math.min(4, Math.max(1, Math.round(tmpSpeed / 40)));
                var tMlt = 1 / depth;
                for (var i = 0; i < depth; ++i) {
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

                */