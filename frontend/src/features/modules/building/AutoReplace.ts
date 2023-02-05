import { Item, items } from "../../../data/moomoo/items";
import { PlayerBuilding } from "../../../data/type/GameObject";
import { Player } from "../../../data/type/Player";
import { MeleeWeapon } from "../../../data/type/Weapon";
import EventPacket from "../../../event/EventPacket";
import { core } from "../../../main";
import { connection } from "../../../socket/Connection";
import { Packet } from "../../../socket/packets/Packet";
import { PacketType } from "../../../socket/packets/PacketType";
import MathUtil from "../../../util/MathUtil";
import Module from "../Module";

interface BuildData {
    item: Item;
    angle: number;
    tick: number;
    isPost: boolean;
}

export default class AutoReplace extends Module {

    private predictedBreaks: Map<number, [Player, PlayerBuilding][]>;
    private spamming: boolean;
    private buildData: BuildData | null;
    private placeLimiter: number;
    private lastBreak: number;

    constructor() {
        super();
        this.predictedBreaks = new Map;
        this.spamming = false;
        this.buildData = null;
        this.placeLimiter = 0;
        this.lastBreak = -1;
    } 

    tryToPlace() {
        if (this.placeLimiter % 4 == 0) {
            core.interactionEngine.vanillaPlaceItem(this.buildData!.item, this.buildData!.angle);
        }
    }

    onUpdate(delta: number): void {
        if (this.buildData !== null && this.buildData.isPost) {
            this.tryToPlace();
        }
    }

    onPreTick(tickIndex: number): void {
        if (this.buildData !== null && this.buildData.tick + 1 === tickIndex) {
            this.buildData = null;
            this.placeLimiter = 0;
            console.log("deleting build data");
        }

        const myPlayer = core.playerManager.myPlayer;
        const spikeItem = items.list[myPlayer.inventory.items[2]];
        const trapItem = items.list[15];

        // check for players which weapon will attack at the next tick
        const players = core.playerManager.getNearby(myPlayer.serverPos, 500, false);
        for (let i = 0; i < players.length; i++) {
            const player = players[i];
            if (player.swingStreak > 1 && player.nextAttack === tickIndex) {
                const weapon = <MeleeWeapon> player.inventory.weaponSelected;
                const grids = core.objectManager.getGridArrays(player.serverPos.x, player.serverPos.y, weapon.stats.range + player.velocity.length() * 2).flat(1);
                for (let i = 0; i < grids.length; i++) {
                    const object = grids[i];
                    if (object instanceof PlayerBuilding && object.health - weapon.stats.dmg * 2 <= 0) {
                        if (MathUtil.getDistance(object.position, player.serverPos) - object.scale <= weapon.stats.range + player.velocity.length() * 2) {
                            const buildingAngle = MathUtil.getDirection(player.serverPos, object.position);
                            const gatherAngle = MathUtil.roundTo(MathUtil.getDirection(player.serverPos, object.position), 1);
                            const safeSpan = MathUtil.lineSpan(object.position.clone(), player.lastTickServerPos.clone(), player.serverPos.clone().add(player.velocity));
                            if (MathUtil.getAngleDist(buildingAngle, gatherAngle) <= safeSpan + Number.EPSILON) {
                                if (!this.predictedBreaks.has(tickIndex)) this.predictedBreaks.set(tickIndex, []);
                                this.predictedBreaks.get(tickIndex)!.push([player, object]);
                            }
                        }
                    }
                }
            }
        }
        

        const predictedBreaks = this.predictedBreaks.get(tickIndex);
        if (!predictedBreaks || predictedBreaks.length === 0 || this.buildData !== null) return;

        for (let i = 0; i < predictedBreaks.length; i++) {
            const [breaker, building] = predictedBreaks[i];
            const buildingAngle = MathUtil.getDirection(myPlayer.serverPos, building.position);

            const nearbyPlayer = breaker === myPlayer ? core.playerManager.getNearby(myPlayer.serverPos, 500, false)[0] : breaker;

            if (nearbyPlayer && core.playerManager.isAnyoneInRadius(500)) {
                const playerToBuilding = MathUtil.getDistance(nearbyPlayer.serverPos.clone().add(breaker.velocity), building.position);
                console.log(nearbyPlayer);

                if (playerToBuilding < nearbyPlayer.scale + building.scale + spikeItem.scale * 2 + myPlayer.scale + (spikeItem.placeOffset ?? 0)) {
                    const angles = core.objectManager.findPlacementAngles([myPlayer.serverPos, myPlayer.scale], spikeItem, [building]);
                    const bestangle = angles.sort((a, b) => Math.min(MathUtil.getAngleDist(a[0], buildingAngle), MathUtil.getAngleDist(a[1], buildingAngle)) - Math.min(MathUtil.getAngleDist(b[0], buildingAngle), MathUtil.getAngleDist(b[1], buildingAngle)))[0];
                    this.buildData = {
                        item: spikeItem,
                        angle: buildingAngle > bestangle[0] && buildingAngle < bestangle[1] ? buildingAngle : (MathUtil.getAngleDist(bestangle[0], buildingAngle) > MathUtil.getAngleDist(bestangle[1], buildingAngle) ? bestangle[1] : bestangle[0]),
                        tick: tickIndex,
                        isPost: false
                    }
                } else {
                    const angles = core.objectManager.findPlacementAngles([myPlayer.serverPos, myPlayer.scale], trapItem, [building]);
                    const bestangle = angles.sort((a, b) => Math.min(MathUtil.getAngleDist(a[0], buildingAngle), MathUtil.getAngleDist(a[1], buildingAngle)) - Math.min(MathUtil.getAngleDist(b[0], buildingAngle), MathUtil.getAngleDist(b[1], buildingAngle)))[0];
                    this.buildData = {
                        item: trapItem,
                        angle: buildingAngle > bestangle[0] && buildingAngle < bestangle[1] ? buildingAngle : (MathUtil.getAngleDist(bestangle[0], buildingAngle) > MathUtil.getAngleDist(bestangle[1], buildingAngle) ? bestangle[1] : bestangle[0]),
                        tick: tickIndex,
                        isPost: false
                    }
                }
                this.lastBreak = building.sid;
                this.tryToPlace();
            }
        }

        this.predictedBreaks.delete(tickIndex);
    }

    onPostTick(tickIndex: number): void {
        if (this.buildData !== null) {
            this.buildData.isPost = true;
            this.tryToPlace();
        }
    }

    onBuildingHit(player: Player, building: PlayerBuilding, damage: number): void {
        if (building.health <= damage) {
            // +1 because after the weapon is reloaded in one tick, it only can gather in the tick after it
            const tick = core.tickEngine.tickIn(player.inventory.reloads[player.inventory.weaponSelected.id]) + 1;
            if (!this.predictedBreaks.has(tick)) this.predictedBreaks.set(tick, []);
            this.predictedBreaks.get(tick)!.push([player, building]);
        }
    }

    onPacketSend(event: EventPacket): void {
        const packet = event.getPacket();
        if (packet.type === PacketType.ATTACK && packet.data[0] === 1) {
            const myPlayer = core.playerManager.myPlayer;

            
        }
    }

    onBuildingBreak(building: PlayerBuilding): void {
        const angle = MathUtil.getDirection(core.playerManager.myPlayer.serverPos, building.position);
        const trapItem = items.list[15];
        if (this.buildData === null && this.lastBreak !== building.sid && MathUtil.getDistance(core.playerManager.myPlayer.serverPos, building.position) < 180 && core.playerManager.isAnyoneInRadius(500)) {
            this.buildData = {
                item: trapItem,
                angle: angle,
                tick: -1,
                isPost: true
            }
            this.placeLimiter = 0;
            this.tryToPlace();
            this.buildData = null;
        }
    }
}