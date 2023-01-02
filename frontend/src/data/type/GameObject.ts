import Vector from "../../util/type/Vector";
import { Item, items } from "../moomoo/items";

class GameObject {
    // base properties
    public sid: number;
    public position: Vector;
    public dir: number = 0;
    public scale: number = 0;

    public wiggle: Vector;

    // for object manager
    public gridLocations: any[] = [];
    
    constructor(sid: number, position: Vector, dir: number, scale: number) {
        this.sid = sid;
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

    getScale() {
        return (this instanceof NaturalObject && this.type === 0) ? this.scale * 0.6 : this.scale;
    }
}

class NaturalObject extends GameObject {

    public type: number;

    constructor(sid: number, position: Vector, dir: number, scale: number, type: number) {
        super(sid, position, dir, scale);
        this.type = type;
    }
}

interface PBMetaData {
    shouldUpdate: boolean;
}

class PlayerBuilding extends GameObject {
    public stats: Item;
    public owner: { sid: number };

    public meta: PBMetaData;
    public health: number;

    constructor(sid: number, position: Vector, dir: number, scale: number, type: number, owner: number) {
        super(sid, position, dir, scale);
        this.stats = items.list[type];
        this.owner = { sid: owner };

        this.meta = {
            shouldUpdate: this.stats.group.id === 3 // group 3 is windmills
        }
        this.health = this.stats.health ?? 1;
    }

    update(delta: number) {
        super.update(delta);
        
        if (this.stats.turnSpeed) {
            this.dir += this.stats.turnSpeed * delta;
        }
    }
}

export { GameObject, NaturalObject, PlayerBuilding }