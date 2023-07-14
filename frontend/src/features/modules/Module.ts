import { Action } from "../../core/Action";
import { PlayerBuilding } from "../../data/type/GameObject";
import { Player } from "../../data/type/Player";
import { ProjectileItem } from "../../data/type/Projectile";
import EventPacket from "../../event/EventPacket";
import Vector from "../../util/type/Vector";

export default abstract class Module {

    protected toggled: boolean;

    constructor() {
        this.toggled = true;
    }

    onRespawn(): void {};
    onUpdate(delta: number): void {};
    onPreTick(tickIndex: number): void {};
    onTick(tickIndex: number, schedulableTick: number): void {};
    onPostTick(tickIndex: number): void {};
    onKeydown(keyCode: number) {};
    onKeyup(keyCode: number) {};
    onPacketReceive(event: EventPacket) {};
    onPacketSend(event: EventPacket) {};
    onRender(delta: number) {};
    onActionRun(action: Action) {};
    onPreBuildingHit(player: Player, building: PlayerBuilding, tickIndex: number, potentialBreak: boolean) {};
    onBuildingBreak(building: PlayerBuilding) {};
    onPlayerUpdate(player: Player) {};
    onProjectileEarlyDespawn(projectileItem: ProjectileItem, spawnPosition: Vector, direction: number) {};

    isToggled() {
        return this.toggled;
    }
}