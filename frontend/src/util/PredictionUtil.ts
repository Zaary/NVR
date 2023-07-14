import config from "../data/moomoo/config";
import { GameObject, PlayerBuilding } from "../data/type/GameObject";
import { Player } from "../data/type/Player";
import { core } from "../main";
import { TickEngine } from "./engine/TickEngine";
import MathUtil from "./MathUtil";
import Vector from "./type/Vector";

function futureDistance(p1: Player, p2: Player, atTick = core.tickEngine.getFirstSchedulableTick()) {
    return MathUtil.getDistance(futurePosition(p1, atTick), futurePosition(p2, atTick));
}

function futureDirection(from: Player, to: Player, atTick = core.tickEngine.getFirstSchedulableTick()) {
    return MathUtil.getDirection(futurePosition(from, atTick), futurePosition(to, atTick));
}

function futurePosition(p: Player, atTick = core.tickEngine.getFirstSchedulableTick(), checkSpikes = false) {
    // fut TODO: account for snow biome slowdown
    // fut TODO: use physics simulation to predict collisions in more further future (but it loses point as time goes further)

    

    const ticks = atTick - core.tickEngine.tickIndex;
    const speed = config.playerSpeed * (p.hatTracker.currentHat?.spdMult ?? 1) * (p.hatTracker.currentTail?.spdMult ?? 1) * TickEngine.TICK_DELTA;
    // -speed for when player counterstrafes all the ticks
    return p.serverPos.clone().add(p.velocity.clone().move(-speed).multiply(ticks));
}

function simulatePhysics(p: Player, tickCount: number) {
    const velocityLength = p.velocity.length();
    const collisionDepth = Math.min(4, Math.max(1, Math.round(velocityLength / 40)));
    const multiplier = 1 / collisionDepth;

    const velocity = p.velocity.clone().multiply(TickEngine.TICK_DELTA).multiply(multiplier);
    const predictedPos = p.serverPos.clone();
    
    for (let i = 0; i < collisionDepth; i++) {
        predictedPos.add(velocity);
        const objects = core.objectManager.getGridArrays(predictedPos.x, predictedPos.y, p.scale);

        for (let j = 0; j < objects.length; j++) {
            const object = objects[j];
            if (!(object instanceof PlayerBuilding) || !object.stats.dmg) continue;
            solveCollision(p, objects[j], predictedPos);
        }
    }
}

function solveCollision(p: Player, object: GameObject, posVec: Vector, velVec: Vector) {
    const collisionDist = p.scale + object.getScale();
    const dist = MathUtil.getDistance(posVec, object.position);
    const straightAngle = MathUtil.getDirection(object.position, posVec);

    if (dist >= collisionDist) return;

    // first stage (applies to any object)
    posVec.set(object.position.clone().directionMove(straightAngle, collisionDist));
    velVec.multiply(0.75);
    
    // applies only to spikes
    velVec.directionMove(straightAngle, 1.5);
}

export default {
    futureDistance,
    futureDirection,
    futurePosition
}