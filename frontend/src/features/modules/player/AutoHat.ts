import { ActionPriority, ActionType } from "../../../core/ActionType";
import config from "../../../data/moomoo/config";
import { Inventory } from "../../../data/type/Player";
import { core } from "../../../main";
import Module from "../Module";

export default class AutoHat extends Module {
    constructor() {
        super();
    }

    onPreTick(tickIndex: number): void {
        const myPlayer = core.playerManager.myPlayer;
        let biomeHat = myPlayer.serverPos.y <= config.snowBiomeTop ? 15 : (myPlayer.serverPos.y >= config.mapScale / 2 - config.riverWidth / 2 && myPlayer.serverPos.y <= config.mapScale / 2 + config.riverWidth / 2 ? 31 : 12);
        
        if (!myPlayer.ownedHats.includes(biomeHat)) {
            if (biomeHat !== 12 && myPlayer.ownedHats.includes(12)) {
                biomeHat = 12
            } else {
                biomeHat = 51;
            }
        }

        core.scheduleAction(ActionType.HAT, ActionPriority.BIOMEHAT, tickIndex, [biomeHat]);
        //core.scheduleAction(ActionType.WEAPON, ActionPriority.BIOMEHAT, tickIndex, [myPlayer.inventory.findBestWeapon(Inventory.WeaponFinders.MOVEMENT_SPEED)?.id]);
    }
}