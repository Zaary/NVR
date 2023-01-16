import { Player } from "../../data/type/Player";
import { Weapon } from "../../data/type/Weapon";
import MathUtil from "../MathUtil";
import Vector from "../type/Vector";

// dont use this, its just copy paste from my very old mod, needs veeery big adjustments

export default class MovementProcessor {

    private player: Player;

    private lockMove: boolean;
    private slowMult: number;

    static CONFIG = {
        playerDecel: 0.993,
        snowBiomeTop: 2400,
        snowSpeed: 0.75,
        mapScale: 14400,
        riverHeight: 724,
        waterPush: 0.0011,
        playerSpeed: 0.0016,
    }

    constructor(player: Player) {
        this.player = player;

        this.lockMove = false;
        this.slowMult = 1;
    }

    private possibleMoveDirectionsKeyboard() {
        return [0, 45, 90, 135, 180, 225, 270, 315].map(/*MathHelper.degToRad*/x => x * (Math.PI / 180));
    }

    public update(delta: number) {
        this.predict(delta, undefined, this.player.serverPos);
    }

    /*possibleMoves(delta, x, y, xVel, yVel) {
        const possible = [];

        const directions = this.#possibleMoveDirectionsKeyboard();
        for (let i = 0, length = directions.length; i < length; i++) {
            possible.push(this.predict(delta, directions[i], x, y, xVel, yVel));
        }

        return possible;
    }*/

    deepPredict(msForward: number, precision: number, movementDir: number) {
        let lastResult: {
            position: Vector | undefined;
            velocity: Vector | undefined;
        } = {
            position: undefined,
            velocity: undefined
        }

        for (let i = 0; i < msForward; i += precision) {
            lastResult = this.predict(precision, movementDir, lastResult.position, lastResult.velocity);
        }

        return lastResult;
    }

    predict(delta: number, movementDir?: number, startingPos?: Vector, startingVelocity?: Vector) {
        const position = startingPos ?? this.player.serverPos;

        const velocity = startingVelocity ?? (this.player.serverPos.clone().subtract(this.player.lastTickServerPos));

        movementDir = movementDir ?? MathUtil.getDirection(this.player.lastTickServerPos, this.player.serverPos);

        // slower
        if (this.slowMult < 1) {
            this.slowMult += 0.0008 * delta;
            if (this.slowMult > 1) {
                this.slowMult = 1;
            }
        }

        // move
        if (this.lockMove) {
            velocity.set(0, 0);
        } else {
            // base speed multiplier
            let speedMult = (this.player.inventory.heldItem instanceof Weapon ? 1 : 0.5) * (this.player.inventory.weaponSelected.stats.speedMultiplier)/* * (this.player.hat.spdMult || 1) * (this.player.tail.spdMult || 1) * (this.isInSnow() ? (this.player.hat.coldM || MovementProcessor.snowSpeed) : 1)*/ * this.slowMult;

            // apply water slowdown & boost
            if (/*!this.player.zIndex && */this.isInWater()) {
                /*if (this.player.hat.watrImm) {
                    speedMult *= 0.75;
                    this.xVel += MovementProcessor.CONFIG.waterPush * 0.4 * delta;
                } else {*/
                    speedMult *= 0.33;
                    velocity.x += MovementProcessor.CONFIG.waterPush * delta;
                /*}*/
            }


            let inputxVel = Math.cos(movementDir);
            let inputyVel = Math.sin(movementDir);

            const length = Math.sqrt(inputxVel * inputxVel + inputyVel * inputyVel);
            if (length != 0) {
                inputxVel /= length;
                inputyVel /= length;
            }

            velocity.x += inputxVel * speedMult * delta * MovementProcessor.CONFIG.playerSpeed;
            velocity.y += inputyVel * speedMult * delta * MovementProcessor.CONFIG.playerSpeed;

        }

        // TODO: Object Collision
        // TODO: Player Collision

        // decel
        velocity.multiply(Math.pow(MovementProcessor.CONFIG.playerDecel, delta));

        position.add(velocity);

        console.log(position);

        return {
            position,
            velocity
        }
    }

    /*gather() {
        this.slowMult -= this.player.weapons.primary.hitSlow || .3;
        if (this.slowMult < 0) {
            this.slowMult = 0;
        }
    }*/

    isInSnow() {
        return this.player.serverPos.y <= MovementProcessor.CONFIG.snowBiomeTop;
    }
    
    isInWater() {
        return this.player.serverPos.y >= (MovementProcessor.CONFIG.mapScale / 2) - (MovementProcessor.CONFIG.riverHeight / 2) && this.player.serverPos.y <= (MovementProcessor.CONFIG.mapScale / 2) + (MovementProcessor.CONFIG.riverHeight / 2);
    }
}