import { ActionPriority, ActionType } from "../../../core/ActionType";
import hats from "../../../data/moomoo/hats";
import { PlayerBuilding } from "../../../data/type/GameObject";
import { Inventory, Player } from "../../../data/type/Player";
import { MeleeWeapon } from "../../../data/type/Weapon";
import EventPacket from "../../../event/EventPacket";
import { core } from "../../../main";
import { connection } from "../../../socket/Connection";
import { Packet } from "../../../socket/packets/Packet";
import { PacketType } from "../../../socket/packets/PacketType";
import { TickEngine } from "../../../util/engine/TickEngine";
import MathUtil from "../../../util/MathUtil";
import PredictionUtil from "../../../util/PredictionUtil";
import Vector from "../../../util/type/Vector";
import Module from "../Module";

export default class SpikeSync extends Module {

    private hasTriggered: boolean;

    private debugColPositions: Vector[];
    private debugDeathPositions: Vector[];
    private debugUnreachablePositions: Vector[];

    constructor() {
        super();
        this.hasTriggered = false;
        this.debugColPositions = [];
        this.debugDeathPositions = [];
        this.debugUnreachablePositions = [];
    }

    onRespawn(): void {
        this.hasTriggered = false;
        this.debugColPositions = [];
        this.debugDeathPositions = [];
        this.debugUnreachablePositions = [];
    }

    onTick(tickIndex: number, schedulableTick: number): void {
        const players = core.playerManager.getVisibleEnemies();

        this.debugColPositions = [];
        this.debugDeathPositions = [];
        this.debugUnreachablePositions = [];

        for (let i = 0; i < players.length; i++) {
            const player = players[i];
            this.checkPlayer(player, tickIndex, schedulableTick);
        }
    }

    checkPlayer(player: Player, tickIndex: number, schedulableTick: number): void {
        const myPlayer = core.playerManager.myPlayer;
        const checkTick = schedulableTick + 1;

        if (player === myPlayer || core.playerManager.checkTeam(player.sid) || player.state.isTrapped) return;

        const position = PredictionUtil.futurePosition(player, checkTick);
        const straightAngle = MathUtil.getDirection(PredictionUtil.futurePosition(myPlayer, checkTick), position);

        const hat = player.hatTracker.currentHat;
        const tail = player.hatTracker.currentTail;
        
        const bestWeapon = <MeleeWeapon> myPlayer.inventory.findBestWeapon(Inventory.WeaponFinders.DAMAGE)!;

        if (myPlayer.inventory.reloads[bestWeapon.id] > core.tickEngine.timeToNextTick) return;
        
        const damageReduction = (hat?.dmgMult ?? 1);/* uncomment if tails get damage reduction stat in future updates * (tail?.dmgMult ?? 1);*/
        const damageMultiplication = myPlayer.ownedHats.includes(7) ? 1.5 : 1;
        const outputDamage = bestWeapon.stats.dmg * damageMultiplication * damageReduction;

        const outputKnockbackStrength = ((0.3 * 1) + (bestWeapon.stats.knockback)) * TickEngine.TICK_DELTA;
        const knockbackPos = position.clone().directionMove(straightAngle, outputKnockbackStrength);

        const buildings = core.objectManager.getGridArrays(position.x, position.y, player.scale + outputKnockbackStrength);
        let buildingDmg = 0;

        const playerDist = MathUtil.getDistance(position, PredictionUtil.futurePosition(myPlayer, checkTick));

        for (let i = 0; i < buildings.length; i++) {
            const building = buildings[i];

            if (!(building instanceof PlayerBuilding) || core.playerManager.checkTeam(building.owner.sid) || building.stats.dmg === undefined) continue;

            const objectMinDist = MathUtil.getDistance(building.position, position);
            const objectMaxDist = MathUtil.getDistance(building.position, knockbackPos);

            // for rendering debug hitbox
            //pred.set(position.clone().directionMove(straightAngle, outputKnockbackStrength));

            if (objectMinDist <= player.scale + building.getScale() || objectMaxDist <= player.scale + building.getScale()) {
                buildingDmg += building.stats.dmg;
            }
        }

        const isCloseEnough = playerDist <= bestWeapon.stats.range + 35 * 2;
        const isDamageEnough = outputDamage + buildingDmg >= player.maxHealth;

        if (isDamageEnough) {
            if (isCloseEnough) {
                this.debugDeathPositions.push(knockbackPos);
            } else {
                this.debugUnreachablePositions.push(knockbackPos);
            }
        } else if (buildingDmg > 0) {
            this.debugColPositions.push(knockbackPos);
        }

        if (isCloseEnough && isDamageEnough) {
            //connection.send(new Packet(PacketType.CHAT, ["spike sync: " + player.name]));
            this.hasTriggered = true;
            //core.lockBundleDirection(ActionPriority.SPIKESYNC, straightAngle);
            if (myPlayer.inventory.heldItem !== bestWeapon) core.scheduleAction(ActionType.WEAPON, ActionPriority.SPIKESYNC, schedulableTick, [bestWeapon.id, true]);
            if (myPlayer.ownedHats.includes(7)) core.scheduleAction(ActionType.HAT, ActionPriority.SPIKESYNC, schedulableTick, [7]);
            console.log(straightAngle);
            core.scheduleAction(ActionType.TAIL, ActionPriority.SPIKESYNC, schedulableTick, [0]);
            core.scheduleAction(ActionType.ATTACK, ActionPriority.SPIKESYNC, schedulableTick, [1, straightAngle]);
            core.scheduleAction(ActionType.ATTACK, ActionPriority.SPIKESYNC, schedulableTick, [0, null]);
        }
    }

    onPacketSend(event: EventPacket): void {
        if (this.hasTriggered && !event.isBundle) {
            if (event.getPacket().type === PacketType.ATTACK && event.getPacket().data[0]) {
                this.hasTriggered = false;
                //core.unlockBundleDirection(ActionPriority.SPIKESYNC);
            }
        }
    }

    private drawKnockbackPos(vector: Vector) {
        const vec = core.renderManager?.mapToContext(core.renderManager.cameraPosition, vector)!;
        core.renderManager?.context.moveTo(vec.x, vec.y);
        core.renderManager?.context.beginPath();
        core.renderManager?.context.arc(vec.x, vec.y, 35, 0, Math.PI * 2);
        core.renderManager?.context.closePath();
        core.renderManager!.context.globalAlpha! = 0.3;
        core.renderManager?.context.fill();
        core.renderManager!.context.globalAlpha! = 1;
        core.renderManager?.context.stroke();
    }

    onRender(delta: number): void {
        core.renderManager!.context.fillStyle! = "#00e1ff";
        core.renderManager!.context.lineWidth! = 3;

        for (let i = 0; i < this.debugColPositions.length; i++) {
            this.drawKnockbackPos(this.debugColPositions[i]);
        }

        core.renderManager!.context.fillStyle! = "#ff0000";
        for (let i = 0; i < this.debugDeathPositions.length; i++) {
            this.drawKnockbackPos(this.debugDeathPositions[i]);
        }

        core.renderManager!.context.fillStyle! = "#6e00ff";
        for (let i = 0; i < this.debugUnreachablePositions.length; i++) {
            this.drawKnockbackPos(this.debugUnreachablePositions[i]);
        }
    }
}
/*
if (predictionFix) {
            const [hat, tail] = this.getHat(true, true);
            console.log("fix", hat, tail);
            core.cancelScheduledAction(ActionType.HAT, ActionPriority.BIOMEHAT, myPlayer.nextAttack - 1);
            core.cancelScheduledAction(ActionType.TAIL, ActionPriority.BIOMEHAT, myPlayer.nextAttack - 1);
            core.runImmediateAction(ActionType.HAT, priority, [hat]);
            core.runImmediateAction(ActionType.TAIL, priority, [tail]);
        }

        core.scheduleAction(ActionType.HAT, priority, schedulableTick, [hat]);
        core.scheduleAction(ActionType.TAIL, priority, schedulableTick, [tail]);
        */