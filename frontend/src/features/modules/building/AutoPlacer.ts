/**/

import { items } from "../../../data/moomoo/items";
import { util } from "../../../data/type/MoomooUtil";
import { core } from "../../../main";
import MathUtil from "../../../util/MathUtil";
import Module from "../Module";

enum State {
    WINDMILLS,
    TRAPS_PASSIVE
}

export default class AutoPlacer extends Module {

    private state: State;
    private toggled: boolean;

    constructor() {
        super();
        this.state = State.WINDMILLS;
        this.toggled = false;
    }

    onUnsafeTick(tickIndex: number): void {
    }

    onUpdate(delta: number): void {
        if (!this.toggled) return;

        switch (this.state) {
            case State.WINDMILLS:
                const windmillItem = items.list[core.playerManager.myPlayer.inventory.items[3]];

                const placeableangles = core.objectManager.findPlacementAngles([core.playerManager.myPlayer.serverPos, core.playerManager.myPlayer.scale], windmillItem);
                const backdir = (MathUtil.getDirection(core.playerManager.myPlayer.lerpPos, core.playerManager.myPlayer.serverPos) + Math.PI) % (Math.PI * 2);

                let singleAngles = [];
                for (let i = 0; i < 360; i += 3) {
                    const rad = i * (Math.PI / 180);
                    for (let allow of placeableangles) {
                        if (rad > allow[0] && rad < allow[1]) singleAngles.push(rad);
                    }
                }

                const angles = singleAngles.filter(angle => util.getAngleDist(backdir, angle) <= Math.PI / 2.8);

                for (let i = 0; i < angles.length; i++) {
                    core.interactionEngine.safePlacement(windmillItem, angles[i]);
                    //InteractUtil.place(<number> inventory.get(InventoryItem.WINDMILL), angles[i], true);
                }

                break;
        }
    }

    onKeydown(keyCode: number): void {
        if (keyCode == 82) this.toggled = !this.toggled;
    }

    onKeyup(keyCode: number): void {
    }
}