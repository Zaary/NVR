import { ActionPriority, ActionType } from "../../../core/ActionType";
import { items } from "../../../data/moomoo/items";
import { Player } from "../../../data/type/Player";
import { WeaponSlot } from "../../../data/type/Weapon";
import EventPacket from "../../../event/EventPacket";
import { core } from "../../../main";
import { connection } from "../../../socket/Connection";
import { Packet } from "../../../socket/packets/Packet";
import { PacketType } from "../../../socket/packets/PacketType";
import MathUtil from "../../../util/MathUtil";
import { TickEngine } from "../../../util/engine/TickEngine";
import Module from "../Module";
import PredictionUtil from "../../../util/PredictionUtil";

export default class BullTick extends Module {

    private canMidfightBulltick: boolean;
    private mfbFlags: number;
    public isBulltickAvailable: boolean;
    public canBulltick: boolean;

    constructor() {
        super();
        this.canMidfightBulltick = false;
        this.mfbFlags = 0;
        this.isBulltickAvailable = false;
        this.canBulltick = false;
    }

    onPlayerUpdate(player: Player): void {
        const myPlayer = core.playerManager.myPlayer;
        
        const weapon = player.inventory.weaponSelected;

        
        const isSafe = player.inventory.remainingReloadTime(WeaponSlot.PRIMARY) > myPlayer.shame.whenSafeHeal(core.tickEngine.ping) + TickEngine.TICK_DELTA
            || PredictionUtil.futureDistance(myPlayer, player) > weapon.stats.range;

        // TODO: implement DoT tracker to know when will we get healed from bull
        const willGetAttacked = (core.tickEngine.getFirstSchedulableTick() - player.nextAttack) <= core.tickEngine.toTicks(myPlayer.shame.whenSafeHeal(core.tickEngine.ping))

        if (willGetAttacked || !isSafe) this.mfbFlags++;
    }
    
    onTick(tickIndex: number, schedulableTick: number): void {
        const myPlayer = core.playerManager.myPlayer;

        this.canMidfightBulltick = this.mfbFlags === 0;
        this.mfbFlags = 0;

        this.isBulltickAvailable = myPlayer.alive
                            && myPlayer.health >= 100
                            && myPlayer.ownedHats.includes(7);

        this.canBulltick = this.isBulltickAvailable
                            && myPlayer.shame.points > 0
                            && (core.playerManager.isEnemyInRadius(600) ? (this.canMidfightBulltick && myPlayer.shame.points >= 3) : true);

        if (this.canBulltick) {
            core.scheduleAction(ActionType.HAT, ActionPriority.BULLTICK, schedulableTick, [7]);
            connection.send(new Packet(PacketType.CHAT, ["bt,s=" + myPlayer.shame.points]));
        }

        this.canMidfightBulltick = false;
    }
}