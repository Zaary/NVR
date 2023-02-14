import { Action } from "../../../core/Action";
import { ActionPriority, ActionType } from "../../../core/ActionType";
import hats from "../../../data/moomoo/hats";
import { Item, items } from "../../../data/moomoo/items";
import { NaturalObject, PlayerBuilding } from "../../../data/type/GameObject";
import { Inventory } from "../../../data/type/Player";
import { MeleeWeapon, Weapon, WeaponSlot } from "../../../data/type/Weapon";
import { core } from "../../../main";
import { connection } from "../../../socket/Connection";
import { Packet } from "../../../socket/packets/Packet";
import { PacketType } from "../../../socket/packets/PacketType";
import MathUtil from "../../../util/MathUtil";
import Module from "../Module";

export default class AntiTrap extends Module {

    private currentTrap: PlayerBuilding | null;
    private willTrapBreakNextTick: boolean;

    constructor() {
        super();
        this.currentTrap = null;
        this.willTrapBreakNextTick = false;
    }

    /*activate(tickIndex = core.tickEngine.getNextPredictableTick(), isNotSync?: boolean) {
        const myPlayer = core.playerManager.myPlayer;
        if (!myPlayer.alive) return;

        if (!this.currentTrap) {
            this.currentTrap = myPlayer.state.data.trap!;
            const antiAngle = MathUtil.getDirection(this.currentTrap.position, myPlayer.serverPos);
            const item = items.list[myPlayer.inventory.items[2]];

            const splitPlacement = core.objectManager.tryToSplitPlacement([myPlayer.serverPos, myPlayer.scale], antiAngle, item);
            if (splitPlacement !== null) {
                core.interactionEngine.safePlacement(item, splitPlacement[0]);
                core.interactionEngine.safePlacement(item, splitPlacement[1]);
            } else {
                core.interactionEngine.safePlacement(item, antiAngle);
            }
        }

        if (this.packetBlockerId === undefined) this.packetBlockerId = core.createPacketBlock(PacketType.SET_ANGLE);

            let weapon = <MeleeWeapon> myPlayer.inventory.findBestWeapon(Inventory.WeaponFinders.BUILDING_BREAK);
            const primary = <MeleeWeapon> myPlayer.inventory.getWeapon(WeaponSlot.PRIMARY);
            const reload = myPlayer.inventory.reloads[weapon!.id];

            if (tickIndex === myPlayer.nextAttack - 1 || reload <= core.tickEngine.timeToNextTick) {
                if (weapon !== primary && myPlayer.inventory.reloads[primary!.id] <= core.tickEngine.timeToNextTick && this.currentTrap.health > 0 && this.currentTrap.health - primary.stats.dmg * primary.stats.buildingDmgMultiplier * (myPlayer.ownedHats.includes(40) ? hats.find(x => x.id === 40)!.bDmg! : 1) <= 0) {
                    weapon = primary;
                }
                const trapAngle = MathUtil.getDirection(myPlayer.serverPos, this.currentTrap!.position);
                if (!isNotSync && myPlayer.ownedHats.includes(40)) core.scheduleAction(ActionType.HAT, ActionPriority.ANTITRAP, tickIndex, [40]);
                core.scheduleAction(ActionType.WEAPON, ActionPriority.ANTITRAP, tickIndex, [weapon?.id]);
                if (!myPlayer.isAttacking || core.lastActionState.attack === 0 || MathUtil.getAngleDist(core.lastActionState.aim, trapAngle) > Number.EPSILON) core.scheduleAction(ActionType.ATTACK, ActionPriority.ANTITRAP, tickIndex, [1, trapAngle]);
                //core.scheduleAction(ActionType.HAT, ActionPriority.ANTITRAP, tickIndex, [40]);
            } else {
                // else reload the weapon
                core.scheduleAction(ActionType.WEAPON, ActionPriority.ANTITRAP, tickIndex, [weapon?.id]);
                core.scheduleAction(ActionType.HAT, ActionPriority.ANTITRAP, tickIndex, [20]);
            }
            this.wasBreaking = true;
    }

    deactivate() {
        core.cleanActions(ActionPriority.ANTITRAP);
        this.stopAttackActionId = core.scheduleAction(ActionType.ATTACK, ActionPriority.ANTITRAP, core.tickEngine.getNextPredictableTick(), [+core.mstate.mouseHeld]);
        this.currentTrap = null;
        core.scheduleAction(ActionType.WEAPON, ActionPriority.ANTITRAP, core.tickEngine.getNextPredictableTick(), [core.playerManager.myPlayer.inventory.getWeapon(WeaponSlot.PRIMARY)!.id]);
        if (this.packetBlockerId !== undefined) {
            core.removePacketBlock(PacketType.SET_ANGLE, this.packetBlockerId);
            this.packetBlockerId = undefined;
        }
    }

    onActionRun(action: Action): void {
        if (action.id === this.stopAttackActionId) {
            this.stopAttackActionId = undefined;
            this.wasBreaking = false;
        }
    }*/

    onPreTick(tickIndex: number): void {
        const myPlayer = core.playerManager.myPlayer;
        if (!myPlayer.alive) return;
        
        if (myPlayer.state.isTrapped && this.trap === null) {
            this.initializeTrap(myPlayer.state.data.trap!);
        } else if (!myPlayer.state.isTrapped && this.trap !== null) {
            this.setTrapBroken();
        } else if (this.currentTrap !== null) {

            const tankGear = hats.find(x => x.id === 40)!;
            const angle = MathUtil.getDirection(myPlayer.serverPos, this.currentTrap.position);
            const primaryWeapon = <MeleeWeapon> myPlayer.inventory.getWeapon(WeaponSlot.PRIMARY)!;
            let bestWeapon = <MeleeWeapon> myPlayer.inventory.findBestWeapon(Inventory.WeaponFinders.BUILDING_BREAK)!;
            let usePrimaryAttack = false;

            if (!this.willTrapBreakNextTick && this.currentTrap.health > 0 && myPlayer.inventory.reloads[primaryWeapon.id] === 0 && this.currentTrap!.health <= primaryWeapon.stats.dmg * primaryWeapon.stats.buildingDmgMultiplier * (myPlayer.ownedHats.includes(40) ? tankGear.bDmg! : 1)) {
                bestWeapon = primaryWeapon;
                usePrimaryAttack = true;
                this.willTrapBreakNextTick = true;
                console.log("hitting with retarded wep!!");
            }
    
            if ((myPlayer.nextAttack === tickIndex - 1 || myPlayer.inventory.reloads[bestWeapon.id] <= core.tickEngine.timeToNextTick) || usePrimaryAttack) {
                //core.scheduleAction(ActionType.HAT, ActionPriority.AUTOBREAK, tickIndex, [40]);
                core.scheduleAction(ActionType.WEAPON, ActionPriority.AUTOBREAK, tickIndex, [bestWeapon.id, true]);
                if (!usePrimaryAttack) core.scheduleAction(ActionType.ATTACK, ActionPriority.AUTOBREAK, tickIndex, [1, angle]);
                //core.scheduleAction(ActionType.ATTACK, ActionPriority.AUTOBREAK, tickIndex + 1, [0, null]);

                console.log("anti trap check", this.currentTrap!.health, bestWeapon.stats.dmg * bestWeapon.stats.buildingDmgMultiplier * (myPlayer.ownedHats.includes(40) ? tankGear.bDmg! : 1))
                if (this.currentTrap!.health <= bestWeapon.stats.dmg * bestWeapon.stats.buildingDmgMultiplier * (myPlayer.ownedHats.includes(40) ? tankGear.bDmg! : 1)) {
                    this.willTrapBreakNextTick = true;
                }
            } else {
                core.scheduleAction(ActionType.WEAPON, ActionPriority.AUTOBREAK, tickIndex, [bestWeapon.id, true]);
            }
            
            /*if (myPlayer.nextAttack === tickIndex - 1) {
                core.scheduleAction(ActionType.WEAPON, ActionPriority.AUTOBREAK, tickIndex, [bestWeapon.id, true]);
                core.scheduleAction(ActionType.ATTACK, ActionPriority.AUTOBREAK, tickIndex, [1, angle]);
            }*/
        }
    }

    initializeTrap(trap: PlayerBuilding) {
        this.currentTrap = trap;
        this.willTrapBreakNextTick = false;

        const myPlayer = core.playerManager.myPlayer;

        const tankGear = hats.find(x => x.id === 40)!;

        const angle = MathUtil.getDirection(myPlayer.serverPos, trap.position);

        const bestWeapon = myPlayer.inventory.findBestWeapon(Inventory.WeaponFinders.BUILDING_BREAK)!;
        const currentWeapon = <MeleeWeapon> myPlayer.inventory.heldItem;
        const lastHeldItemId = currentWeapon.id;

        if (core.tickEngine.isTickPredictable(core.tickEngine.tickIndex + 1)) {
            const predictableTick = core.tickEngine.tickIndex + 1;
            let scheduledWeapon = bestWeapon;

            if (myPlayer.inventory.heldItem !== bestWeapon && (myPlayer.inventory.heldItem instanceof MeleeWeapon && trap.health > currentWeapon.stats.dmg * currentWeapon.stats.buildingDmgMultiplier * (myPlayer.ownedHats.includes(40) ? tankGear.bDmg! : 1))) {
                core.scheduleAction(ActionType.WEAPON, ActionPriority.AUTOBREAK, predictableTick, [bestWeapon.id, true]);
            } else if (myPlayer.inventory.heldItem !== bestWeapon) {
                scheduledWeapon = currentWeapon;
            }

            if (myPlayer.inventory.reloads[scheduledWeapon.id] <= (lastHeldItemId === scheduledWeapon.id ? core.tickEngine.timeToNextTick : 0)) {
                core.scheduleAction(ActionType.ATTACK, ActionPriority.AUTOBREAK, predictableTick, [1, angle]);
                myPlayer.nextAttack = predictableTick + 1;
            } else {
                myPlayer.nextAttack = core.tickEngine.tickIn(myPlayer.inventory.reloads[scheduledWeapon.id]) + (lastHeldItemId === scheduledWeapon.id ? 1 : 2);
            }
        } else {
            if (core.isHighestPriority(ActionPriority.AUTOBREAK, core.tickEngine.tickIndex)) {
                // if currently held weapon doesn't break the building by one hit, switch to best weapon
                if (myPlayer.inventory.heldItem !== bestWeapon && (myPlayer.inventory.heldItem instanceof MeleeWeapon && trap.health > currentWeapon.stats.dmg * currentWeapon.stats.buildingDmgMultiplier * (myPlayer.ownedHats.includes(40) ? tankGear.bDmg! : 1))) {
                    connection.send(new Packet(PacketType.SELECT_ITEM, [bestWeapon.id, true]));
                }
                if (myPlayer.inventory.reloads[myPlayer.inventory.heldItem.id] <= (lastHeldItemId === myPlayer.inventory.heldItem.id ? core.tickEngine.timeToNextTick : 0)) {
                    connection.send(new Packet(PacketType.ATTACK, [1, angle]));
                } else {
                    myPlayer.nextAttack = core.tickEngine.tickIn(myPlayer.inventory.reloads[myPlayer.inventory.heldItem.id]) + (lastHeldItemId === myPlayer.inventory.heldItem.id ? 1 : 2);
                }
            }
        }
    }

    setTrapBroken() {
        this.currentTrap = null;
        this.willTrapBreakNextTick = false;

        const myPlayer = core.playerManager.myPlayer;
        const bestWeapon = myPlayer.inventory.findBestWeapon(Inventory.WeaponFinders.DAMAGE)!;

        if (core.tickEngine.isTickPredictable(core.tickEngine.tickIndex + 1)) {
            const predictableTick = core.tickEngine.tickIndex + 1;
            core.scheduleAction(ActionType.WEAPON, ActionPriority.AUTOBREAK, predictableTick, [bestWeapon.id, true]);
            core.scheduleAction(ActionType.ATTACK, ActionPriority.AUTOBREAK, predictableTick, [0, null]);
        } else {
            if (core.isHighestPriority(ActionPriority.AUTOBREAK, core.tickEngine.tickIndex)) {
                if (myPlayer.inventory.heldItem !== bestWeapon) connection.send(new Packet(PacketType.SELECT_ITEM, [bestWeapon.id, true]));
                connection.send(new Packet(PacketType.ATTACK, [0, null]));
            }
        }
    }

    get isBreaking() {
        return this.currentTrap != null;
    }

    get trap() {
        return this.currentTrap;
    }
}