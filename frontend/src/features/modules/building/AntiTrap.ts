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

    public isFirstHit: boolean;

    private currentTrap: PlayerBuilding | null;
    private willTrapBreakNextTick: boolean;
    private aimPacketsBlocker: number;

    private lastWeapon: number | null;

    constructor() {
        super();

        this.isFirstHit = false;

        this.currentTrap = null;
        this.willTrapBreakNextTick = false;
        this.aimPacketsBlocker = -1;

        this.lastWeapon = null;
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

    onTick(tickIndex: number): void {
        const myPlayer = core.playerManager.myPlayer;
        if (!myPlayer.alive) return;
        
        if (myPlayer.state.isTrapped && this.trap === null) {
            this.initializeTrap(myPlayer.state.data.trap!);
        } else if ((!myPlayer.state.isTrapped && this.trap !== null) || this.willTrapBreakNextTick) {
            this.setTrapBroken();
        } else if (this.currentTrap !== null) {
            if (this.isFirstHit) this.isFirstHit = false;

            const tankGear = hats.find(x => x.id === 40)!;
            const angle = MathUtil.getDirection(myPlayer.serverPos, this.currentTrap.position);
            const primaryWeapon = <MeleeWeapon> myPlayer.inventory.getWeapon(WeaponSlot.PRIMARY)!;
            let bestWeapon = <MeleeWeapon> myPlayer.inventory.findBestWeapon(Inventory.WeaponFinders.BUILDING_BREAK)!;
            let usePrimaryAttack = false;

            if (!this.willTrapBreakNextTick && this.currentTrap.health > 0 && myPlayer.inventory.reloads[primaryWeapon.id] === 0 && this.currentTrap!.health <= primaryWeapon.stats.dmg * primaryWeapon.stats.buildingDmgMultiplier * (myPlayer.ownedHats.includes(40) ? tankGear.bDmg! : 1)) {
                bestWeapon = primaryWeapon;
                usePrimaryAttack = true;
                this.willTrapBreakNextTick = true;
                //console.log("hitting with retarded wep!!");
            }
    
            if ((myPlayer.nextAttack === tickIndex - 1 || myPlayer.inventory.reloads[bestWeapon.id] <= core.tickEngine.timeToNextTick) || usePrimaryAttack) {
                core.scheduleAction(ActionType.HAT, ActionPriority.AUTOBREAK, tickIndex, [40]);
                core.scheduleAction(ActionType.WEAPON, ActionPriority.AUTOBREAK, tickIndex, [bestWeapon.id, true]);
                core.scheduleAction(ActionType.ATTACK, ActionPriority.AUTOBREAK, tickIndex, [1, angle]);
                core.scheduleAction(ActionType.ATTACK, ActionPriority.AUTOBREAK, tickIndex, [0, null]);
                core.lockBundleDirection(ActionPriority.ANTITRAP, angle);
                //core.scheduleAction(ActionType.ATTACK, ActionPriority.AUTOBREAK, tickIndex + 1, [0, null]);

                //console.log("anti trap check", this.currentTrap!.health, bestWeapon.stats.dmg * bestWeapon.stats.buildingDmgMultiplier * (myPlayer.ownedHats.includes(40) ? tankGear.bDmg! : 1))
                if (this.currentTrap!.health <= bestWeapon.stats.dmg * bestWeapon.stats.buildingDmgMultiplier * (myPlayer.ownedHats.includes(40) ? tankGear.bDmg! : 1)) {
                    this.willTrapBreakNextTick = true;
                }
            } else {
                core.scheduleAction(ActionType.WEAPON, ActionPriority.AUTOBREAK, tickIndex, [bestWeapon.id, true]);
                core.unlockBundleDirection(ActionPriority.ANTITRAP);
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

        this.lastWeapon = myPlayer.inventory.heldItem.id;

        const tankGear = hats.find(x => x.id === 40)!;

        const angle = MathUtil.getDirection(myPlayer.serverPos, trap.position);

        const antiAngle = MathUtil.getDirection(this.currentTrap.position, myPlayer.serverPos);
        const cartAngle = MathUtil.polarToCartesian(antiAngle);
        const spikeItem = items.list[myPlayer.inventory.items[2]];
        const arcs = core.objectManager.findPlacementArcs([myPlayer.serverPos, myPlayer.scale], spikeItem);

        this.isFirstHit = true;

        if (arcs.length > 0) {
            const closestAllowArc = arcs.sort((a, b) => Math.min(MathUtil.getAngleDist(a[0], antiAngle), MathUtil.getAngleDist(a[1], antiAngle)) - Math.min(MathUtil.getAngleDist(b[0], antiAngle), MathUtil.getAngleDist(b[1], antiAngle)))[0];
            const [arcStart, arcEnd] = [MathUtil.polarToCartesian(closestAllowArc[0]), MathUtil.polarToCartesian(closestAllowArc[1])];
            if (cartAngle > arcStart && cartAngle < arcEnd) {
                core.interactionEngine.safePlacement(spikeItem, antiAngle);
            } else {
                core.interactionEngine.safePlacement(spikeItem, MathUtil.cartesianToPolar(MathUtil.middleOfCartesianArc([arcStart, arcEnd])));
            }
        }

        const bestWeapon = myPlayer.inventory.findBestWeapon(Inventory.WeaponFinders.BUILDING_BREAK)!;
        const currentWeapon = <MeleeWeapon> myPlayer.inventory.heldItem;
        const lastHeldItemId = currentWeapon.id;

        //if (this.aimPacketsBlocker === -1) this.aimPacketsBlocker = core.createPacketBlock(PacketType.SET_ANGLE);

        if (myPlayer.inventory.reloads[bestWeapon.id] <= (currentWeapon === bestWeapon ? core.tickEngine.timeToNextTick : 0)) {
            const ti = core.tickEngine.tickIndex + 1;
            const pt = core.tickEngine.tickIndex + core.tickEngine.getPingTicks();
            if (core.isHighestPriority(ActionPriority.AUTOBREAK, ti)) {
                if (core.tickEngine.ping < core.tickEngine.timeToNextTick) {
                    if (!(myPlayer.inventory.heldItem instanceof Weapon) || bestWeapon.id !== myPlayer.inventory.heldItem.id) connection.send(new Packet(PacketType.SELECT_ITEM, [bestWeapon.id, true]));
                    if (myPlayer.ownedHats.includes(40) && core.lastActionState.hat !== 40) connection.send(new Packet(PacketType.BUY_AND_EQUIP, [0, 40, 0]));
                    if (!myPlayer.isAttacking) connection.send(new Packet(PacketType.ATTACK, [1, angle]));
                    core.scheduleBlockerAction(ActionType.WEAPON, ActionPriority.ANTITRAP, pt);
                    core.scheduleBlockerAction(ActionType.HAT, ActionPriority.ANTITRAP, pt);
                } else {
                    if (!(myPlayer.inventory.heldItem instanceof Weapon) || bestWeapon.id !== myPlayer.inventory.heldItem.id) core.scheduleAction(ActionType.WEAPON, ActionPriority.ANTITRAP, pt, [bestWeapon.id, true]);
                    if (myPlayer.ownedHats.includes(40) && core.lastActionState.hat !== 40) core.scheduleAction(ActionType.HAT, ActionPriority.ANTITRAP, pt, [40]);
                    if (!myPlayer.isAttacking) core.scheduleAction(ActionType.ATTACK, ActionPriority.ANTITRAP, pt, [1, angle]);
                }
                core.lockBundleDirection(ActionPriority.ANTITRAP, angle);
            }
        }
    }

    setTrapBroken() {
        if (this.currentTrap === null) return;

        this.currentTrap = null;
        this.willTrapBreakNextTick = false;

        //if (this.aimPacketsBlocker > -1) core.removePacketBlock(PacketType.SET_ANGLE, this.aimPacketsBlocker);

        core.unlockBundleDirection(ActionPriority.ANTITRAP);

        const myPlayer = core.playerManager.myPlayer;

        if (!core.mstate.mouseHeld) connection.send(new Packet(PacketType.ATTACK, [0, null]));

        if (core.isHighestPriority(ActionPriority.AUTOBREAK, core.tickEngine.tickIndex + 1)) {
            if (this.lastWeapon && (!(myPlayer.inventory.heldItem instanceof Weapon) || this.lastWeapon !== myPlayer.inventory.heldItem.id)) connection.send(new Packet(PacketType.SELECT_ITEM, [this.lastWeapon, true]));
        }
    }

    get isBreaking() {
        return this.currentTrap != null;
    }

    get trap() {
        return this.currentTrap;
    }

    get getterIsFirstHit() {
        return this.currentTrap !== null && this.isFirstHit;
    }
}