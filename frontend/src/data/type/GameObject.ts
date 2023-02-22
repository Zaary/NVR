import { SidArray } from "../../util/type/SidArray";
import Vector from "../../util/type/Vector";
import { Item, items } from "../moomoo/items";
import { Projectile } from "./Projectile";

class GameObject {
    // base properties
    public sid: number;
    public type: number;
    public position: Vector;
    public dir: number = 0;
    public scale: number = 0;

    public wiggle: Vector;

    // for object manager
    public wiggles: [number, number][] = [];
    public gridLocations: any[] = [];
    
    constructor(sid: number, type: number, position: Vector, dir: number, scale: number) {
        this.sid = sid;
        this.type = type;
        this.position = position;
        this.dir = dir;
        this.scale = scale;

        this.wiggle = new Vector(0, 0);
    }

    update(delta: number) {
        if (!this.wiggle.isNull()) {
            this.wiggle.multiply(Math.pow(0.99, delta));
        }
    }

    getScale(fullScale = false): number {
        return this instanceof NaturalObject ? ((this.type === 0 || this.type === 1) ? this.scale * 0.36 : this.scale) : this.scale * (fullScale ? 1 : items.list[this.type].colDiv ?? 1);
    }

    getPlaceColScale(): number {
        return this instanceof NaturalObject && (this.type === 0 || this.type === 1) ? this.scale * 0.36 : this.scale;
    }
}

class NaturalObject extends GameObject {

    public type: number;

    constructor(sid: number, position: Vector, dir: number, scale: number, type: number) {
        super(sid, type, position, dir, scale);
        this.type = type;
    }
}

interface PBMetaData {
    wasPlacementSighted: boolean;
    shouldUpdate: boolean;
}

class PlayerBuilding extends GameObject {
    public stats: Item;
    public owner: { sid: number };

    public meta: PBMetaData;
    public health: number;

    public ownedProjectiles: SidArray<Projectile>;

    constructor(sid: number, position: Vector, dir: number, scale: number, type: number, owner: number, placementSighted: boolean) {
        super(sid, type, position, dir, scale);
        this.stats = items.list[type];
        this.owner = { sid: owner };

        this.meta = {
            wasPlacementSighted: placementSighted,
            shouldUpdate: this.stats.group.id === 3 // group 3 is windmills
        }
        this.health = this.stats.health ?? 1;

        this.ownedProjectiles = new SidArray();
    }

    update(delta: number) {
        super.update(delta);
        
        if (this.stats.turnSpeed) {
            this.dir += this.stats.turnSpeed * delta;
        }
    }
}

export { GameObject, NaturalObject, PlayerBuilding }