import { EventEmitter } from "tsee";
import { ActionPriority, ActionType } from "../../core/ActionType";
import { Core } from "../../core/Core";
import { Item, items } from "../../data/moomoo/items";
import { GameObject } from "../../data/type/GameObject";
import { Weapon } from "../../data/type/Weapon";
import AntiTrap from "../../features/modules/building/AntiTrap";
import AutoHat from "../../features/modules/player/AutoHat";
import { connection } from "../../socket/Connection";
import { Packet } from "../../socket/packets/Packet";
import { PacketType } from "../../socket/packets/PacketType";

export default class InteractionEngine extends EventEmitter {

    private core: Core;
    private autoHatModule: AutoHat;
    private antiTrapModule: AntiTrap;

    constructor(core: Core) {
        super();
        this.core = core;
        this.autoHatModule = <AutoHat> core.moduleManager.getModule(AutoHat);
        this.antiTrapModule = <AntiTrap> core.moduleManager.getModule(AntiTrap);
    }

    safePlacement(item: Item, angle: number) {
        const canPlace = this.core.objectManager.canPlaceObject([this.core.playerManager.myPlayer.serverPos, 35, angle], item, true);
        
        if (canPlace) {
            this.core.objectManager.addPlacementAttempt([this.core.playerManager.myPlayer.serverPos, 35, angle], item);
            this.vanillaPlaceItem(item, angle);
        }
    }

    safePlacementIgnoring(item: Item, angle: number, ignore: GameObject) {
        const canPlace = this.core.objectManager.canPlaceObject([this.core.playerManager.myPlayer.serverPos, 35, angle], item, true, [ignore.sid]);
        
        if (canPlace) {
            this.core.objectManager.addPlacementAttempt([this.core.playerManager.myPlayer.serverPos, 35, angle], item);
            this.vanillaPlaceItem(item, angle, [ignore.sid]);
        }
    }

    vanillaPlacementAddingPrediction(item: Item, angle: number) {
        this.core.objectManager.addPlacementAttempt([this.core.playerManager.myPlayer.serverPos, 35, angle], item);
        this.vanillaPlaceItem(item, angle);
    }

    vanillaUseFoodItem(item: Item, isLastHeal?: boolean) {
        const myPlayer = this.core.playerManager.myPlayer;
        const wasAttacking = myPlayer.isAttacking;
        const oldAngle = myPlayer.dir;
        const lastHeldWasWeapon = myPlayer.inventory.heldItem instanceof Weapon;
        const lastHeldItem = myPlayer.inventory.heldItem.id;

        if (lastHeldWasWeapon || lastHeldItem !== item.id) {
            connection.send(new Packet(PacketType.SELECT_ITEM, [item.id, false]));
        }
        connection.send(new Packet(PacketType.ATTACK, [1, null]));
        if (isLastHeal && (wasAttacking || this.core.mstate.mouseHeld) || this.antiTrapModule.isBreaking) connection.send(new Packet(PacketType.ATTACK, [1, oldAngle]));
    }
    
    vanillaPlaceItem(item: Item, angle: number, ignoredSids?: number[]) {
        const myPlayer = this.core.playerManager.myPlayer;
        const wasAttacking = myPlayer.isAttacking;
        const oldAngle = myPlayer.dir;
        const lastHeld = myPlayer.inventory.heldItem.id;
        const lastHeldWasWeapon = myPlayer.inventory.heldItem instanceof Weapon;

        this.autoHatModule.isPlacing = true;

        if (lastHeldWasWeapon || lastHeld !== item.id) {
            console.log(lastHeld, lastHeldWasWeapon);
            connection.send(new Packet(PacketType.SELECT_ITEM, [item.id, false]));
        }

        connection.sendWMeta(new Packet(PacketType.ATTACK, [1, angle]), [[], (wasBlocked: boolean) => {
            //if (wasBlocked) {
                connection.send(new Packet(PacketType.SELECT_ITEM, [lastHeld, lastHeldWasWeapon]));
                this.autoHatModule.isPlacing = false;
            //}

            console.log(wasAttacking, this.core.mstate.mouseHeld);
            if (wasAttacking || this.core.mstate.mouseHeld || this.antiTrapModule.isBreaking) {
                connection.send(new Packet(PacketType.ATTACK, [1, oldAngle]));
            } else if (this.core.lastActionState.attack === 1) {
                connection.send(new Packet(PacketType.ATTACK, [0, oldAngle]));
            }
        }]);

        /*const wasAttacking = myPlayer.isAttacking;
        const lastHeldWasWeapon = myPlayer.inventory.heldItem instanceof Weapon;
        const lastHeldItem = myPlayer.inventory.heldItem.id;
        const oldAngle = myPlayer.serverDir;

        if (lastHeldWasWeapon || lastHeldItem !== item.id) {
            //console.log(lastHeldItem + " !== " + item.id, "switching to", item.id);
            connection.send(new Packet(PacketType.SELECT_ITEM, [item.id, false]));
        }
        
        connection.sendWMeta(new Packet(PacketType.ATTACK, [1, angle]), [ignoredSids, (isBlocked: boolean) => {
            if ((isBlocked && lastHeldWasWeapon) || (lastHeldItem !== myPlayer.inventory.heldItem.id && lastHeldWasWeapon !== myPlayer.inventory.heldItem instanceof Weapon)) connection.send(new Packet(PacketType.SELECT_ITEM, [lastHeldItem, isBlocked ? true : lastHeldWasWeapon]));
        }]);

        connection.send(new Packet(PacketType.ATTACK, [+(wasAttacking || this.core.mstate.mouseHeld), oldAngle]));*/
        //this.core.scheduleAction(ActionType.ATTACK, ActionPriority.COMPATIBILITY, this.core.tickEngine.getNextPredictableTick(), [+(wasAttacking || this.core.mstate.mouseHeld), oldAngle])
        //connection.send(new Packet(PacketType.ATTACK, [+(wasAttacking || this.core.mstate.mouseHeld), oldAngle]));
        //connection.send(new Packet(PacketType.SET_ANGLE, [oldAngle]));
        // TODO: switch to last item instead of primary weapon
    }
}