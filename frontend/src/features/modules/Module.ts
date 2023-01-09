import { Action } from "../../core/Action";
import EventPacket from "../../event/EventPacket";

export default abstract class Module {
    onUpdate(delta: number): void {};
    onUnsafeTick(tickIndex: number): void {};
    onTick(tickIndex: number): void {};
    onKeydown(keyCode: number) {};
    onKeyup(keyCode: number) {};
    onPacketReceive(event: EventPacket) {};
    onRender(delta: number) {};
    onActionRun(action: Action) {};
}