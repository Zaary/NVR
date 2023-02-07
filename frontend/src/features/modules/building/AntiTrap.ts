import { Action } from "../../../core/Action";
import { ActionPriority, ActionType } from "../../../core/ActionType";
import { Item } from "../../../data/moomoo/items";
import { NaturalObject, PlayerBuilding } from "../../../data/type/GameObject";
import { Inventory } from "../../../data/type/Player";
import { core } from "../../../main";
import { PacketType } from "../../../socket/packets/PacketType";
import MathUtil from "../../../util/MathUtil";
import Module from "../Module";

export default class AntiTrap extends Module {

    private wasBreaking: boolean;
    private stopAttackActionId: number | undefined;
    private packetBlockerId: number | undefined;
    private currentTrap: PlayerBuilding | null;

    constructor() {
        super();
        this.wasBreaking = false;
        this.stopAttackActionId = undefined;
        this.packetBlockerId = undefined;
        this.currentTrap = null;
    }

    onPreTick(tickIndex: number): void {
        const myPlayer = core.playerManager.myPlayer;
        if (!myPlayer.alive) return;
        
        if (myPlayer.state.isTrapped) {
            if (!this.currentTrap) {
                this.currentTrap = myPlayer.state.data.trap!;
            }

            if (this.currentTrap) {
                if (this.packetBlockerId === undefined) this.packetBlockerId = core.createPacketBlock(PacketType.SET_ANGLE);

                const weapon = myPlayer.inventory.findBestWeapon(Inventory.WeaponFinders.BUILDING_BREAK);
                const reload = myPlayer.inventory.reloads[weapon!.id];
                if (reload <= core.tickEngine.timeToNextTick) {
                    const trapAngle = MathUtil.getDirection(myPlayer.serverPos, this.currentTrap.position);
                    core.scheduleAction(ActionType.WEAPON, ActionPriority.ANTITRAP, tickIndex, [weapon?.id]);
                    core.scheduleAction(ActionType.ATTACK, ActionPriority.ANTITRAP, tickIndex, [1, trapAngle]);
                    //core.scheduleAction(ActionType.HAT, ActionPriority.ANTITRAP, tickIndex, [40]);
                } else {
                    // else reload the weapon
                    core.scheduleAction(ActionType.WEAPON, ActionPriority.ANTITRAP, tickIndex, [weapon?.id]);
                    core.scheduleAction(ActionType.HAT, ActionPriority.ANTITRAP, tickIndex, [20]);
                }
                this.wasBreaking = true;
            }
        } else if (this.wasBreaking) {
            this.stopAttackActionId = core.scheduleAction(ActionType.ATTACK, ActionPriority.ANTITRAP, tickIndex, [+core.mstate.mouseHeld]);
            this.currentTrap = null;

            if (this.packetBlockerId !== undefined) {
                core.removePacketBlock(PacketType.SET_ANGLE, this.packetBlockerId);
                this.packetBlockerId = undefined;
            }
        }
    }

    onActionRun(action: Action): void {
        if (action.id === this.stopAttackActionId) {
            this.stopAttackActionId = undefined;
            this.wasBreaking = false;
        }
    }

    isTrapped() {
        return core.playerManager.myPlayer.state.isTrapped;
    }
}