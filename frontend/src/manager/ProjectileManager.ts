import { Projectile } from "../data/type/Projectile";
import Vector from "../util/type/Vector";

export default class ProjectileManager {

    private projectileList: Projectile[];

    constructor() {
        this.projectileList = [];
    }

    // x, y, dir, range, speed, indx, layer, sid
    spawnProjectile(position: Vector, direction: number, range: number, speed: number, type: number, layer: number, sid: number) {
        
    }
}