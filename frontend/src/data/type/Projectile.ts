import Vector from "../../util/type/Vector";

class ProjectileItem {

}

const projectileItems: ProjectileItem[] = [
    
]

class Projectile {

    private sid: number;
    private creationTick: number;
    private sentPosition: Vector;
    private position: Vector;
    private direction: number;
    private maxRange: number;
    private distanceLeft: number;
    private speed: number;
    private item: ProjectileItem;
    private layer: number;

    constructor(position: Vector, direction: number, maxRange: number, speed: number, type: number, layer: number, sid: number, creationTick: number) {
        this.sid = sid;
        this.creationTick = creationTick;
        this.sentPosition = position;
        this.position = position;
        this.direction = direction;
        this.distanceLeft = maxRange;
        this.maxRange = maxRange;
        this.speed = speed;
        this.item = projectileItems[type];
        this.layer = layer;
    }

    tick(delta: number) {
        const speed = this.speed * delta;
        this.distanceLeft -= speed;
        this.position.directionMove(this.direction, speed);

    }
}

export { Projectile }