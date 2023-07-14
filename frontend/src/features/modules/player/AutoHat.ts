import { ActionPriority, ActionType } from "../../../core/ActionType";
import config from "../../../data/moomoo/config";
import { PlayerBuilding } from "../../../data/type/GameObject";
import { Inventory } from "../../../data/type/Player";
import { MeleeWeapon, Weapon, Weapons } from "../../../data/type/Weapon";
import EventPacket from "../../../event/EventPacket";
import { core } from "../../../main";
import { connection } from "../../../socket/Connection";
import { Packet } from "../../../socket/packets/Packet";
import { PacketType } from "../../../socket/packets/PacketType";
import MathUtil from "../../../util/MathUtil";
import PredictionUtil from "../../../util/PredictionUtil";
import AntiTrap from "../building/AntiTrap";
import Module from "../Module";

export default class AutoHat extends Module {

    private skipNextTick: boolean;
    public isPlacing: boolean;

    private skipTick: number;
    private scheduledAutobull: boolean;
    private bundleAttackState: boolean;

    constructor() {
        super();
        this.skipNextTick = false;
        this.isPlacing = false;

        this.skipTick = -1;
        this.scheduledAutobull = false;
        this.bundleAttackState = false;
    }

    onRespawn(): void {
        this.skipNextTick = false;
        this.skipTick = -1;
        this.scheduledAutobull = false;
    }

    private getHat(shouldAutobull: boolean, isTick: boolean) {
        const antiTrap = (<AntiTrap> core.moduleManager.getModule(AntiTrap));
        const myPlayer = core.playerManager.myPlayer;

        let hat = -1;
        let tail = -1;
        let isDefault = true;

        //console.log(tickIndex);
        
        if (shouldAutobull) {

            let playersHit = 0;
            let objectsHit = 0;

            const weapon = <MeleeWeapon> myPlayer.inventory.weaponSelected;
            const grids = core.objectManager.getGridArrays(myPlayer.serverPos.x + myPlayer.velocity.x, myPlayer.serverPos.y + myPlayer.velocity.y, weapon.stats.range);

            for (let i = 0; i < grids.length; i++) {
                const object = grids[i];
                // use object.scale because .getScale returns collision box while .scale is hitbox
                if (MathUtil.getDistance(object.position, PredictionUtil.futurePosition(myPlayer)) - object.scale <= weapon.stats.range + myPlayer.scale) {
                    const gatherAngle = MathUtil.roundTo(MathUtil.getDirection(PredictionUtil.futurePosition(myPlayer), object.position), 1);
                    //const safeSpan = MathUtil.lineSpan(object.position.clone(), myPlayer.serverPos.clone(), myPlayer.serverPos.clone().add(myPlayer.velocity));

                    if (MathUtil.getAngleDist(core.mouseAngle, gatherAngle) <= config.gatherAngle/* + Number.EPSILON*/) {
                        if (object instanceof PlayerBuilding) {
                            objectsHit++;
                        }
                    }
                }
            }

            const players = core.playerManager.getVisibleEnemies();
            for (let i = 0; i < players.length; i++) {
                const player = players[i];
                if (PredictionUtil.futureDistance(myPlayer, player) - player.scale <= weapon.stats.range + myPlayer.scale) {
                    const gatherAngle = MathUtil.roundTo(PredictionUtil.futureDirection(myPlayer, player), 1);

                    //console.log(MathUtil.getAngleDist(core.mouseAngle, gatherAngle), config.gatherAngle + Number.EPSILON);
                    if (MathUtil.getAngleDist(core.mouseAngle, gatherAngle) <= config.gatherAngle/* + Number.EPSILON*/) {
                        playersHit++;
                    }
                }
            }

            if (weapon !== Weapons.GREAT_HAMMER && playersHit > 0) {
                hat = 7;
                tail = 0;
                isDefault = false;
            } else if (antiTrap.isBreaking || objectsHit > 0) {
                //console.log("autohat: TANK");
                hat = 40;
                isDefault = false;
            }

            //hat = 7;
            //tail = 0;
            //console.log("autobull" );
        }/* else if (myPlayer.justStartedAttacking) {
            hat = 7;
            tail = 0;
        }*/









        // biome hats fallback

        if (!myPlayer.ownedHats.includes(hat)) {
            hat = myPlayer.serverPos.y <= config.snowBiomeTop ? 15 : (myPlayer.serverPos.y >= config.mapScale / 2 - config.riverWidth / 2 && myPlayer.serverPos.y <= config.mapScale / 2 + config.riverWidth / 2 ? 31 : 12);
        }

        if (!myPlayer.ownedTails.includes(tail)) {
            tail = 11;
        }

        // fallback to booster hat if current hat is not owned
        if (!myPlayer.ownedHats.includes(hat)) {
            if (hat !== 12 && myPlayer.ownedHats.includes(12)) {
                hat = 12;
            } else {
                // complete fallback hat if booster hat is not owned
                hat = 51;
            }
        }

        return [hat, tail, isDefault];
    }

    onTick(tickIndex: number, schedulableTick: number): void {
        /*if (this.skipNextTick) {
            console.log(">> SKIPPED TICK ", tickIndex);
            this.skipNextTick = false;
            return;
        }*/

        /*if (this.doAttackNextTick) {
            this.doAttackNextTick = false;
            this.doAttack();
        }*/

        if (schedulableTick < this.skipTick) return;

        const myPlayer = core.playerManager.myPlayer;
        const pingTicks = core.tickEngine.getPingTicks();
        
        const willAttack = !this.isPlacing && this.bundleAttackState && (myPlayer.isAutoAttacking || myPlayer.isAttacking) && myPlayer.inventory.heldItem instanceof MeleeWeapon;
        let shouldAutobull = willAttack && myPlayer.nextAttack - 1 === schedulableTick;
        if (shouldAutobull) this.scheduledAutobull = false;
        //this.hasAutobulled = false;

        let predictionFix = false;

        // this should theoretically only apply to daggers because they attack so quickly the prediction is already ahead of them so it wont exec
        if (
            myPlayer.nextAttack !== 0
            && myPlayer.nextAttack <= schedulableTick
            && !this.scheduledAutobull
            && willAttack
            && !shouldAutobull
        ) {
            if (tickIndex + pingTicks === myPlayer.nextAttack - 1) {
                predictionFix = true;
            }
        }

        if (shouldAutobull) this.scheduledAutobull = true;

        const [hat, tail, isDefault] = this.getHat(shouldAutobull, true);
        const priority = isDefault ? ActionPriority.BIOMEHAT : ActionPriority.AUTOHAT;

        if (predictionFix && core.isHighestPriority(ActionPriority.AUTOHAT, myPlayer.nextAttack - 1)) {
            const [hat, tail] = this.getHat(true, true);
            console.log("fix", hat, tail);
            core.cancelScheduledAction(ActionType.HAT, ActionPriority.BIOMEHAT, myPlayer.nextAttack - 1);
            core.cancelScheduledAction(ActionType.TAIL, ActionPriority.BIOMEHAT, myPlayer.nextAttack - 1);
            core.runImmediateAction(ActionType.HAT, priority, [hat]);
            core.runImmediateAction(ActionType.TAIL, priority, [tail]);
        }

        core.scheduleAction(ActionType.HAT, priority, schedulableTick, [hat]);
        core.scheduleAction(ActionType.TAIL, priority, schedulableTick, [tail]);
    }

    onPacketSend(event: EventPacket): void {
        if (event.isCanceled()) return;

        const packet = event.getPacket();
        const myPlayer = core.playerManager.myPlayer;

        if (event.isBundle && packet.type === PacketType.ATTACK) {
            this.bundleAttackState = packet.data[0] === 1;
            if (!this.isPlacing && myPlayer.inventory.heldItem instanceof MeleeWeapon) {
                if (packet.data[0] && myPlayer.justStartedAttacking) {
                    const [hat, tail, isSwingBased] = this.getHat(true, false);
                    const pingTicks = core.tickEngine.getPingTicks();
                    const attackTick = core.tickEngine.getFirstSchedulableTick();
                    
                    //if (core.isHighestPriority(ActionPriority.AUTOHAT, core.tickEngine.tickIndex + core.tickEngine.getPingTicks())) {
                        core.runImmediateAction(ActionType.HAT, ActionPriority.AUTOHAT, [hat]);
                        core.runImmediateAction(ActionType.TAIL, ActionPriority.AUTOHAT, [tail]);
                        //this.skipNextTick = true;
                        core.cancelScheduledAction(ActionType.HAT, ActionPriority.BIOMEHAT, attackTick - 1, true);
                        core.cancelScheduledAction(ActionType.TAIL, ActionPriority.BIOMEHAT, attackTick - 1, true);
                        this.skipTick = attackTick;
                    //}
                    //if (core.tickEngine.isTickPredictable(attackArriveTick)) {
                        
                    /*} else if (core.isHighestPriority(ActionPriority.BIOMEHAT, attackArriveTick)) {
                        if (core.lastActionState.hat !== hat) {
                            connection.send(new Packet(PacketType.BUY_AND_EQUIP, [0, hat, 0]), true);
                            core.lastActionState.hat = hat;
                        }
                        if (core.lastActionState.tail !== tail) {
                            connection.send(new Packet(PacketType.BUY_AND_EQUIP, [0, tail, 1]), true);
                            core.lastActionState.tail = tail;
                        }
                        core.lastActionState.attack = 1;
                        core.lastActionState.aim = packet.data[1];
                        connection.send(new Packet(PacketType.ATTACK, [1, packet.data[1]]), true);
                        this.skipNextTick = true;
                        //console.log("REWRITING HIT SUYPER OMG SUCK MY DICK");
                        event.cancel();
                    }*/
                }
            }
        }
    }
}