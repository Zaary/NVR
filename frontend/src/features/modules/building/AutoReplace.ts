import hats from "../../../data/moomoo/hats";
import { Item, items } from "../../../data/moomoo/items";
import { GameObject, PlayerBuilding } from "../../../data/type/GameObject";
import { Player } from "../../../data/type/Player";
import { MeleeWeapon } from "../../../data/type/Weapon";
import EventPacket from "../../../event/EventPacket";
import { core } from "../../../main";
import { connection } from "../../../socket/Connection";
import { Packet } from "../../../socket/packets/Packet";
import { PacketType } from "../../../socket/packets/PacketType";
import { TickEngine } from "../../../util/engine/TickEngine";
import MathUtil from "../../../util/MathUtil";
import { SidArray } from "../../../util/type/SidArray";
import Module from "../Module";

interface BuildData {
    item: Item;
    angle: number;
    tick: number;
    isPost: boolean;
}

export default class AutoReplace extends Module {

    private shouldReplace: [PlayerBuilding, number, number][];

    constructor() {
        super();
        this.shouldReplace = [];
    }

    replace(building: PlayerBuilding, forceSingle?: boolean) {
        const myPlayer = core.playerManager.myPlayer;

        const buildingAngle = MathUtil.getDirection(myPlayer.serverPos, building.position);
        const spikeItem = items.list[myPlayer.inventory.items[2]];
        const trapItem = items.list[15];

        // find target player and item to place
        const enemyPlayer = core.playerManager.getVisibleEnemies().sort((a, b) => MathUtil.getDistance(a.serverPos, building.position) - MathUtil.getDistance(b.serverPos, building.position))[0];

        if (enemyPlayer && MathUtil.getDistance(enemyPlayer.serverPos, myPlayer.serverPos) <= 850 && MathUtil.getDistance(myPlayer.serverPos, building.position) <= building.getScale() + myPlayer.scale + 220) {
            const playerToBuilding = MathUtil.getDistance(enemyPlayer.serverPos.clone().add(enemyPlayer.velocity), building.position);
            const item = (playerToBuilding < enemyPlayer.scale + spikeItem.scale * 1.03 + myPlayer.scale + (spikeItem.placeOffset ?? 0)) ? spikeItem : trapItem;

            // calculate angle
            const arcs = core.objectManager.findPlacementArcs([myPlayer.serverPos, myPlayer.scale], item, [building]);
            if (arcs.length === 0) return;
            const closestAllowArc = arcs.sort((a, b) => Math.min(MathUtil.getAngleDist(a[0], buildingAngle), MathUtil.getAngleDist(a[1], buildingAngle)) - Math.min(MathUtil.getAngleDist(b[0], buildingAngle), MathUtil.getAngleDist(b[1], buildingAngle)))[0];
            const splitTangent = core.objectManager.findSplitTangent(myPlayer.scale, item) + 0.25;

            const start = MathUtil.polarToCartesian(closestAllowArc[0]);
            const end = MathUtil.polarToCartesian(closestAllowArc[1]);
            const arcSpan = start > end ? end + Math.PI * 2 - start : end - start;

            const buildingCount = Math.min(Math.floor((arcSpan + splitTangent) / splitTangent), 3);
        
            const enemyAngleCart = MathUtil.polarToCartesian(MathUtil.getDirection(myPlayer.serverPos, enemyPlayer.serverPos));

            if (buildingCount === 1 || start + end === Math.PI * 2 || forceSingle) {
                core.interactionEngine.safePlacementIgnoring(item, enemyAngleCart >= start && enemyAngleCart <= end ? MathUtil.cartesianToPolar(enemyAngleCart) : buildingAngle, building);
            } else {
                const middle = MathUtil.middleOfCartesianArc([start, end]);

                if (buildingCount % 2 === 0) {
                    for (let i = 0; i < buildingCount / 2; i++) {
                        core.interactionEngine.safePlacementIgnoring(item, MathUtil.cartesianToPolar(MathUtil.clampCartesian(middle + splitTangent / 2 + splitTangent * i)), building);
                        core.interactionEngine.safePlacementIgnoring(item, MathUtil.cartesianToPolar(MathUtil.clampCartesian(middle - splitTangent / 2 - splitTangent * i)), building);
                    }
                } else {
                    core.interactionEngine.safePlacementIgnoring(item, MathUtil.cartesianToPolar(middle), building);
                    for (let i = 0; i < (buildingCount - 1) / 2; i++) {
                        core.interactionEngine.safePlacementIgnoring(item, MathUtil.cartesianToPolar(MathUtil.clampCartesian(middle + splitTangent * (i + 1))), building);
                        core.interactionEngine.safePlacementIgnoring(item, MathUtil.cartesianToPolar(MathUtil.clampCartesian(middle - splitTangent * (i + 1))), building);
                    }
                }
            }
        }
    }

    onPostTick(tickIndex: number): void {
        let i = this.shouldReplace.length;
        while (i-- > 0) {
            const [building, timestamp, tick] = this.shouldReplace[i];
            if (tick + 1 === tickIndex) {
                this.replace(building, false);
                this.shouldReplace.splice(i, 1);
            }
        }
    }

    onPlayerUpdate(player: Player): void {
        const myPlayer = core.playerManager.myPlayer;

        const tickIndex = core.tickEngine.tickIndex + 1;

        // check for players which weapon will attack at the next tick
        //const players = core.playerManager.getNearby(myPlayer.serverPos, 800, false);

        if (player.nextAttack === tickIndex) {
            const weapon = <MeleeWeapon> player.inventory.weaponSelected;
            const hatBuildingDmgBoost = hats.find(x => x.id === player.skinIndex)?.bDmg ?? 1;
            const grids = core.objectManager.getGridArrays(player.serverPos.x + player.velocity.x, player.serverPos.y + player.velocity.y, weapon.stats.range);

            for (let i = 0; i < grids.length; i++) {
                const object = grids[i];
                if (object instanceof PlayerBuilding && object.meta.wasPlacementSighted && object.health - (weapon.stats.dmg * weapon.stats.buildingDmgMultiplier * hatBuildingDmgBoost) <= 0) {
                    if (MathUtil.getDistance(object.position, player.serverPos.clone().add(player.velocity)) - object.scale <= weapon.stats.range + player.scale) {
                        this.shouldReplace.push([object, Date.now() + core.tickEngine.timeToNextTick - core.tickEngine.ping, tickIndex]);
                        core.moduleManager.onPreBuildingHit(player, object, tickIndex, !object.meta.wasPlacementSighted || (object.health - (weapon.stats.dmg * weapon.stats.buildingDmgMultiplier * hatBuildingDmgBoost) <= 0));
                    }
                }
            }
        }
    }

    /*onPreTick(tickIndex: number): void {
        const myPlayer = core.playerManager.myPlayer;
        const spikeItem = items.list[myPlayer.inventory.items[2]];
        const trapItem = items.list[15];

        // check for players which weapon will attack at the next tick
        const players = core.playerManager.getNearby(myPlayer.serverPos, 800, false);

        for (let i = 0; i < players.length; i++) {
            const player = players[i];
            if (player.nextAttack === tickIndex) {
                const weapon = <MeleeWeapon> player.inventory.weaponSelected;
                const hatBuildingDmgBoost = hats.find(x => x.id === player.skinIndex)?.bDmg ?? 1;
                const grids = core.objectManager.getGridArrays(player.serverPos.x + player.velocity.x, player.serverPos.y + player.velocity.y, weapon.stats.range);

                for (let i = 0; i < grids.length; i++) {
                    const object = grids[i];
                    if (object instanceof PlayerBuilding && object.meta.wasPlacementSighted && object.health - (weapon.stats.dmg * weapon.stats.buildingDmgMultiplier * hatBuildingDmgBoost) <= 0) {
                        if (MathUtil.getDistance(object.position, player.serverPos.clone().add(player.velocity)) - object.scale <= weapon.stats.range + player.scale) {
                            this.shouldReplace.push([object, Date.now() + core.tickEngine.timeToNextTick - core.tickEngine.ping, tickIndex]);
                            core.moduleManager.onPreBuildingHit(player, object, tickIndex, !object.meta.wasPlacementSighted || (object.health - (weapon.stats.dmg * weapon.stats.buildingDmgMultiplier * hatBuildingDmgBoost) <= 0));
                        }
                    }
                }
            }
        }
    }*/

    onBuildingBreak(building: PlayerBuilding): void {
        if (!building.meta.wasPlacementSighted) {
            this.replace(building, true);
        } else {
            this.replace(building, false);
        }
    }
}