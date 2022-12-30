import { currentPlayer } from "../../../core/Core";
import { Item, items } from "../../../data/moomoo/items";
import { core } from "../../../main";
import { connection } from "../../../socket/Connection";
import { Packet } from "../../../socket/packets/Packet";
import { PacketType } from "../../../socket/packets/PacketType";
import Module from "../Module";

enum PlacerType {
    SPIKE,
    TRAP,
    WINDMILL
}

class Placer {

    private active: boolean;
    private type: PlacerType;
    private placingObject: { id: number };

    constructor(type: PlacerType) {
        this.active = false;
        this.type = type;

        switch (type) {
            case PlacerType.SPIKE:
                this.placingObject = items.groups[2]
                break;
            case PlacerType.TRAP:
                this.placingObject = items.groups[5];
                break;
            case PlacerType.WINDMILL:
                this.placingObject = items.groups[3];
                break;
        }
    } // bro wants to qhold :skull:

    setStatus(active: boolean) {
        this.active = active;
    }

    isActive() {
        return this.active;
    }
    
    run(tickIndex: number) {
        const canPlace = core.interactionEngine.checkPlacementSpace(currentPlayer!, items.list[1], 0); // ill test with walls for now
        if (canPlace) {
            connection.send(new Packet(PacketType.SELECT_ITEM, [3, false]));
            connection.send(new Packet(PacketType.ATTACK, [1, 0]));
            connection.send(new Packet(PacketType.ATTACK, [0, 0]));
            connection.send(new Packet(PacketType.SELECT_ITEM, [0, true]));
        }
    }
}

export default class ItemPlacer extends Module {

    private placers: Map<number, Placer>;
    private activePlacer: Placer | null;

    constructor() {
        super();
        this.placers = new Map();
        this.activePlacer = null;

        this.placers.set(86, new Placer(PlacerType.SPIKE));
        this.placers.set(70, new Placer(PlacerType.TRAP));
        this.placers.set(78, new Placer(PlacerType.WINDMILL));
    }

    onUnsafeTick(tickIndex: number): void {
        
    }

    onUpdate(delta: number): void {
        if (this.activePlacer && currentPlayer) this.activePlacer.run(0);
    }

    onKeydown(keyCode: number): void {
        const placer = this.placers.get(keyCode);
        placer?.setStatus(true);
        if (!this.activePlacer && placer) {
            this.activePlacer = placer;
        }
    }

    onKeyup(keyCode: number): void {
        this.placers.get(keyCode)?.setStatus(false);
        this.activePlacer = null;
        for (const placer of this.placers.values()) {
            if (placer.isActive()) {
                this.activePlacer = placer;
                break;
            }
        }
    }
}