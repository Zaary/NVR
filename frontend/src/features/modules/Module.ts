import { Action } from "../../core/Action";
import { PlayerBuilding } from "../../data/type/GameObject";
import { Player } from "../../data/type/Player";
import EventPacket from "../../event/EventPacket";

export default abstract class Module {
    onUpdate(delta: number): void {};
    onPreTick(tickIndex: number): void {};
    onTick(tickIndex: number): void {};
    onPostTick(tickIndex: number): void {};
    onKeydown(keyCode: number) {};
    onKeyup(keyCode: number) {};
    onPacketReceive(event: EventPacket) {};
    onPacketSend(event: EventPacket) {};
    onRender(delta: number) {};
    onActionRun(action: Action) {};
    onBuildingHit(player: Player, building: PlayerBuilding, damage: number) {};
    onBuildingBreak(building: PlayerBuilding) {};
    onPlayerUpdate(player: Player) {};
}