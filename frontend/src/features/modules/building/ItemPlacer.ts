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
    private placingObjectGroup: number;

    constructor(type: PlacerType) {
        this.active = false;
        this.type = type;

        switch (type) {
            case PlacerType.SPIKE:
                this.placingObjectGroup = 2;
                break;
            case PlacerType.TRAP:
                this.placingObjectGroup = 4;
                break;
            case PlacerType.WINDMILL:
                this.placingObjectGroup = 3;
                break;
        }
    }

    setStatus(active: boolean) {
        this.active = active;
    }

    isActive() {
        return this.active;
    }
    
    run(tickIndex: number) {
        const item = items.list[core.playerManager.myPlayer.inventory.items[this.placingObjectGroup]];
        if (!item) return;

        core.interactionEngine.safePlacement(item, core.mouseAngle);
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
        if (this.activePlacer && core.playerManager.myPlayer) this.activePlacer.run(0);
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