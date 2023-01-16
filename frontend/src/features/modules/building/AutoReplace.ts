import { Item, items } from "../../../data/moomoo/items";
import { PlayerBuilding } from "../../../data/type/GameObject";
import { Player } from "../../../data/type/Player";
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

    constructor() {
        super();
        this.predictedBreaks = new Map;
        this.spamming = false;
        this.buildData = null;
        this.placeLimiter = 0;
    }

    onUpdate(delta: number): void {
        if (this.buildData !== null) {
            if (this.placeLimiter++ % 4 == 0) core.interactionEngine.vanillaPlaceItem(this.buildData.item, this.buildData.angle);
        }
    }

    onPreTick(tickIndex: number): void {
        const myPlayer = core.playerManager.myPlayer;
        const spikeItem = items.list[myPlayer.inventory.items[2]];
        const trapItem = items.list[15];

        const predictedBreaks = this.predictedBreaks.get(tickIndex);
        if (!predictedBreaks || predictedBreaks.length === 0 || this.buildData !== null) return;

        for (let i = 0; i < predictedBreaks.length; i++) {
            const [breaker, building] = predictedBreaks[i];
            const buildingAngle = MathUtil.getDirection(myPlayer.serverPos, building.position);
            
            const nearbyPlayer = core.playerManager.getNearby(building.position, 220, true)[0];

            if (nearbyPlayer) {
                const playerToBuilding = MathUtil.getDistance(nearbyPlayer.serverPos.clone().add(breaker.velocity), building.position);

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

                connection.send(new Packet(PacketType.CHAT, ["replacing [" + this.buildData.item.name + "]"]));
            }
        }

        this.predictedBreaks.delete(tickIndex);
    }

    onPostTick(tickIndex: number): void {
        if (this.buildData !== null && this.buildData.tick === tickIndex) {
            this.buildData = null;
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
}