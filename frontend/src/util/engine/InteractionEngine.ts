import { EventEmitter } from "tsee";
import { Core } from "../../core/Core";
import { Item } from "../../data/moomoo/items";
import { GameObject } from "../../data/type/GameObject";
import Player from "../../data/type/Player";


export default class InteractionEngine extends EventEmitter {

    private core: Core;

    constructor(core: Core) {
        super();
        this.core = core;
    }

    checkPlacementSpace(player: Player, object: Item, angle: number) {
        const offset: number = player.scale + object.scale + (object.placeOffset ?? 0);
        const placeX: number = player.x + offset * Math.cos(angle);
        const placeY: number = player.y + offset * Math.sin(angle);
        return this.core.objectManager.checkItemLocation(placeX, placeY, object.scale, 0.6, object.id, false, player);
    }
}