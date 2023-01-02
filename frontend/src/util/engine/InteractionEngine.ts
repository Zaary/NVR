import { EventEmitter } from "tsee";
import { Core } from "../../core/Core";
import { Item, items } from "../../data/moomoo/items";
import { GameObject } from "../../data/type/GameObject";
import { connection } from "../../socket/Connection";
import { Packet } from "../../socket/packets/Packet";
import { PacketType } from "../../socket/packets/PacketType";

export default class InteractionEngine extends EventEmitter {

    private core: Core;

    constructor(core: Core) {
        super();
        this.core = core;
    }

    safePlacement(item: Item, angle: number) {
        const canPlace = this.core.objectManager.canPlaceObject([this.core.playerManager.myPlayer.serverPos, 35, angle], item, true);
        
        if (canPlace) {
            this.core.objectManager.addPlacementAttempt([this.core.playerManager.myPlayer.serverPos, 35, angle], item);
            connection.send(new Packet(PacketType.SELECT_ITEM, [item.id, false]));
            connection.send(new Packet(PacketType.ATTACK, [1, angle]));
            connection.send(new Packet(PacketType.ATTACK, [0, angle]));
            connection.send(new Packet(PacketType.SELECT_ITEM, [this.core.playerManager.myPlayer.inventory.weapons[0], true]));
        }
    }
}