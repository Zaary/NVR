import { items } from "../../../data/moomoo/items";
import { PlayerBuilding } from "../../../data/type/GameObject";
import { Player } from "../../../data/type/Player";
import { core } from "../../../main";
import MathUtil from "../../../util/MathUtil";
import Module from "../Module";

export default class AutoReplace extends Module {

    private predictedBreaks: [Player, PlayerBuilding][];

    constructor() {
        super();
        this.predictedBreaks = [];
    }

    onPostTick(tickIndex: number): void {
        const myPlayer = core.playerManager.myPlayer;
        const spikeItem = items.list[myPlayer.inventory.items[2]];
        const trapItem = items.list[15];

        for (let i = 0; i < this.predictedBreaks.length; i++) {
            const [breaker, building] = this.predictedBreaks[i];
            const buildingAngle = MathUtil.getDirection(myPlayer.serverPos, building.position);

            const breakerToBuilding = MathUtil.getDistance(breaker.serverPos.clone().add(breaker.velocity), building.position);

            if (breakerToBuilding < breaker.scale + building.scale + spikeItem.scale * 2) {
                const angles = core.objectManager.findPlacementAngles([myPlayer.serverPos, myPlayer.scale], spikeItem);
                const bestangle = angles.sort((a, b) => Math.min(MathUtil.getAngleDist(a[0], buildingAngle), MathUtil.getAngleDist(a[1], buildingAngle)) - Math.min(MathUtil.getAngleDist(b[0], buildingAngle), MathUtil.getAngleDist(b[1], buildingAngle)))[0];
                core.interactionEngine.vanillaPlaceItem(spikeItem, buildingAngle > bestangle[0] && buildingAngle < bestangle[1] ? buildingAngle : (MathUtil.getAngleDist(bestangle[0], buildingAngle) > MathUtil.getAngleDist(bestangle[1], buildingAngle) ? bestangle[1] : bestangle[0]));
            } else {
                const angles = core.objectManager.findPlacementAngles([myPlayer.serverPos, myPlayer.scale], trapItem);
                const bestangle = angles.sort((a, b) => Math.min(MathUtil.getAngleDist(a[0], buildingAngle), MathUtil.getAngleDist(a[1], buildingAngle)) - Math.min(MathUtil.getAngleDist(b[0], buildingAngle), MathUtil.getAngleDist(b[1], buildingAngle)))[0];
                core.interactionEngine.vanillaPlaceItem(trapItem, buildingAngle > bestangle[0] && buildingAngle < bestangle[1] ? buildingAngle : (MathUtil.getAngleDist(bestangle[0], buildingAngle) > MathUtil.getAngleDist(bestangle[1], buildingAngle) ? bestangle[1] : bestangle[0]));
            }
        }


        this.predictedBreaks = [];
    }

    onBuildingHit(player: Player, building: PlayerBuilding, damage: number): void {
        if (building.health <= damage) {
            this.predictedBreaks.push([player, building]);
        }
    }
}