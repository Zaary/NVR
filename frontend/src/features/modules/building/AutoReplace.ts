import { Item, items } from "../../../data/moomoo/items";
import { PlayerBuilding } from "../../../data/type/GameObject";
import { Player } from "../../../data/type/Player";
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
        if (this.placeLimiter++ % 2 == 0 && core.playerManager.isAnyoneInSight()) {
            core.interactionEngine.vanillaPlaceItem(this.buildData!.item, this.buildData!.angle);
        }
    }

    onUpdate(delta: number): void {
        if (this.buildData !== null) {
            this.tryToPlace();
        }
    }

    onPreTick(tickIndex: number): void {
        if (this.buildData !== null && this.buildData.tick + 1 === tickIndex) {
            this.buildData = null;
            console.log("deleting build data");
        }

        const myPlayer = core.playerManager.myPlayer;
        const spikeItem = items.list[myPlayer.inventory.items[2]];
        const trapItem = items.list[15];

        const predictedBreaks = this.predictedBreaks.get(tickIndex);
        if (!predictedBreaks || predictedBreaks.length === 0 || this.buildData !== null) return;

        for (let i = 0; i < predictedBreaks.length; i++) {
            const [breaker, building] = predictedBreaks[i];
            const buildingAngle = MathUtil.getDirection(myPlayer.serverPos, building.position);

            const nearbyPlayer = breaker === myPlayer ? core.playerManager.getNearby(myPlayer.serverPos, 500, false)[0] : breaker;

            if (nearbyPlayer) {
                const playerToBuilding = MathUtil.getDistance(nearbyPlayer.serverPos.clone().add(breaker.velocity), building.position);
                console.log(nearbyPlayer);

                if (playerToBuilding < nearbyPlayer.scale + building.scale + spikeItem.scale * 2 + myPlayer.scale + (spikeItem.placeOffset ?? 0)) {
                    const angles = core.objectManager.findPlacementAngles([myPlayer.serverPos, myPlayer.scale], spikeItem, [building]);
                    const bestangle = angles.sort((a, b) => Math.min(MathUtil.getAngleDist(a[0], buildingAngle), MathUtil.getAngleDist(a[1], buildingAngle)) - Math.min(MathUtil.getAngleDist(b[0], buildingAngle), MathUtil.getAngleDist(b[1], buildingAngle)))[0];
                    this.buildData = {
                        item: spikeItem,
                        angle: buildingAngle > bestangle[0] && buildingAngle < bestangle[1] ? buildingAngle : (MathUtil.getAngleDist(bestangle[0], buildingAngle) > MathUtil.getAngleDist(bestangle[1], buildingAngle) ? bestangle[1] : bestangle[0]),
                        tick: tickIndex
                    }
                } else {
                    const angles = core.objectManager.findPlacementAngles([myPlayer.serverPos, myPlayer.scale], trapItem, [building]);
                    const bestangle = angles.sort((a, b) => Math.min(MathUtil.getAngleDist(a[0], buildingAngle), MathUtil.getAngleDist(a[1], buildingAngle)) - Math.min(MathUtil.getAngleDist(b[0], buildingAngle), MathUtil.getAngleDist(b[1], buildingAngle)))[0];
                    this.buildData = {
                        item: trapItem,
                        angle: buildingAngle > bestangle[0] && buildingAngle < bestangle[1] ? buildingAngle : (MathUtil.getAngleDist(bestangle[0], buildingAngle) > MathUtil.getAngleDist(bestangle[1], buildingAngle) ? bestangle[1] : bestangle[0]),
                        tick: tickIndex
                    }
                }
                this.lastBreak = building.sid;
                this.tryToPlace();
            }
        }

        this.predictedBreaks.delete(tickIndex);
    }

    onPostTick(tickIndex: number): void {
        if (this.buildData !== null) this.tryToPlace();
    }

    onBuildingHit(player: Player, building: PlayerBuilding, damage: number): void {
        if (building.health <= damage * 2) {
            // +1 because after the weapon is reloaded in one tick, it only can gather in the tick after it
            const tick = core.tickEngine.tickIn(player.inventory.reloads[player.inventory.weaponSelected.id]) + 1;
            if (!this.predictedBreaks.has(tick)) this.predictedBreaks.set(tick, []);
            this.predictedBreaks.get(tick)!.push([player, building]);
        }
    }

    onBuildingBreak(building: PlayerBuilding): void {
        const angle = MathUtil.getDirection(core.playerManager.myPlayer.serverPos, building.position);
        const trapItem = items.list[15];
        if (this.buildData === null && this.lastBreak !== building.sid && MathUtil.getDistance(core.playerManager.myPlayer.serverPos, building.position) < 180) {
            this.buildData = {
                item: trapItem,
                angle: angle,
                tick: -1
            }
            this.placeLimiter = 0;
            this.tryToPlace();
            this.buildData = null;
        }
    }
}