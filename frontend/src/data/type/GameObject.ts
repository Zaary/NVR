import Vector from "../../util/type/Vector";
import { Item, items } from "../moomoo/items";

class GameObject {
    // base properties
    public sid: number;
    public position: Vector;
    public dir: number = 0;
    public scale: number = 0;

    // for object manager
    public gridLocations: any[] = [];
    
    constructor(sid: number, position: Vector, dir: number, scale: number) {
        this.sid = sid;
        this.position = position;
        this.dir = dir;
        this.scale = scale;
    }
}

class PlayerBuilding extends GameObject {
    public stats: Item;
    public owner: { sid: number };

    public health: number;

    constructor(sid: number, position: Vector, dir: number, scale: number, type: number, owner: number) {
        super(sid, position, dir, scale);
        this.stats = items.list[type];
        this.owner = { sid: owner };

        this.health = this.stats.health ?? 1;
    }
}

export { GameObject, PlayerBuilding }