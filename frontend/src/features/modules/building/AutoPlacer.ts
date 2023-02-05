import { items } from "../../../data/moomoo/items";
import { NaturalObject, PlayerBuilding } from "../../../data/type/GameObject";
import { util } from "../../../data/type/MoomooUtil";
import { Player } from "../../../data/type/Player";
import { core } from "../../../main";
import MathUtil from "../../../util/MathUtil";
import Module from "../Module";

enum State {
    IDLE,
    WINDMILLS,
    TRAP_ENEMY,
    SPIKE_TRAPPED,
    
}

function combineAllowAngles(angles1: [number, number][], angles2: [number, number][]) {
    const longer = angles1.length > angles2.length ? angles1 : angles2;
    const shorter = longer === angles1 ? angles2 : angles1;
    const result: [number, number][] = [];

    if (shorter.length === 0) return longer;

    let comparedAgainist: [number, number];
    for (let i = 0; i < longer.length; i++) {
        const currentItem = longer[i];
        comparedAgainist = shorter.shift()!;

        if (comparedAgainist) {
            result.push([
                comparedAgainist[0] > currentItem[0] ? comparedAgainist[0] : currentItem[0],
                comparedAgainist[1] < currentItem[1] ? comparedAgainist[1] : currentItem[1]
            ]);
        } else {
            result.push([currentItem[0], currentItem[1]]);
        }
    }

    return result;
}

function translateAllowAngles(placeableAngles: [number, number][], stepDeg: number) {
    let singleAngles = [];
    for (let i = 0; i < 360; i += stepDeg) {
        const rad = i * (Math.PI / 180);
        for (let allow of placeableAngles) {
            if (rad > allow[0] && rad < allow[1]) {
                singleAngles.push(rad);
                continue;
            }
        }
    }
    return singleAngles;
}

export default class AutoPlacer extends Module {

    private targetsTrappable: Set<Player>;
    private targetsTrapSpikable: Set<Player>;

    private debugAngles: number[] = [];

    private state: State;
    private toggled: boolean;

    constructor() {
        super();
        this.state = State.WINDMILLS;
        this.toggled = true;
        this.targetsTrappable = new Set();
        this.targetsTrapSpikable = new Set();
    }

    calcState() {
        this.targetsTrappable.clear();
        this.targetsTrapSpikable.clear();

        const myPlayer = core.playerManager.myPlayer;
        const enemies = core.playerManager.playerList.slice(1).filter(x => x.visible);

        const trapItem = items.list[15];
        const spikeItem = items.list[myPlayer.inventory.items[2]];
        
        if (enemies.length === 0) this.state = State.IDLE;

        for (let i = 0; i < enemies.length; i++) {
            const enemy = enemies[i];
            const distance = MathUtil.getDistance(enemy.serverPos, myPlayer.serverPos);

            const nextDistance = MathUtil.getDistance(enemy.serverPos.clone().add(enemy.velocity), myPlayer.serverPos);
            const trappingDistance = myPlayer.scale + enemy.scale + trapItem.scale + trapItem.scale * trapItem.colDiv! + trapItem.placeOffset!;

            if (distance <= trappingDistance && nextDistance <= trappingDistance && !enemy.state.isTrapped) {
                this.state = State.TRAP_ENEMY;
                this.targetsTrappable.add(enemy);
            }
            
            if (enemy.state.isTrapped) {
                if (MathUtil.getDistance(enemy.state.data.trap!.position, myPlayer.serverPos) - myPlayer.scale - trapItem.scale - spikeItem.scale * 2 - (spikeItem.placeOffset ?? 0) <= 0) {
                    this.state = State.SPIKE_TRAPPED;
                    this.targetsTrapSpikable.add(enemy);
                }
            }
        }

        if (this.state === State.IDLE) this.state = State.WINDMILLS;
    }

    onUpdate(tickIndex: number): void {
        if (!this.toggled) return;

        const myPlayer = core.playerManager.myPlayer;

        if (!myPlayer.alive) return;
        
        this.calcState();

        switch (this.state) {
            case State.WINDMILLS: {
                return;
                const windmillItem = items.list[core.playerManager.myPlayer.inventory.items[3]];

                const placeableangles = core.objectManager.findPlacementAngles([core.playerManager.myPlayer.serverPos, core.playerManager.myPlayer.scale], windmillItem);
                const backdir = (MathUtil.getDirection(core.playerManager.myPlayer.lerpPos, core.playerManager.myPlayer.serverPos) + Math.PI) % (Math.PI * 2);

                const singleAngles = translateAllowAngles(placeableangles, 3);

                const angles = singleAngles.filter(angle => util.getAngleDist(backdir, angle) <= Math.PI / 2.8);

                for (let i = 0; i < angles.length; i++) {
                    core.interactionEngine.safePlacement(windmillItem, angles[i]);
                    //InteractUtil.place(<number> inventory.get(InventoryItem.WINDMILL), angles[i], true);
                }

                break;
            }
            case State.TRAP_ENEMY: {
                // TODO: use ping & tick based predicted position instead of last received positions (sometimes causes it to place trap on old enemy position)
                const trapItem = items.list[15];
                for (let iterator = this.targetsTrappable.values(), iteration = null, value = (iteration = iterator.next()).value; !iteration.done; value = (iteration = iterator.next()).value) {
                    const target = value;
                    const targetDir = MathUtil.getDirection(myPlayer.serverPos, target.serverPos);
                    const trappingDistance = myPlayer.scale + target.scale + trapItem.scale + trapItem.scale * trapItem.colDiv! + trapItem.placeOffset!;
                    const angles = translateAllowAngles(core.objectManager.findPlacementAngles([core.playerManager.myPlayer.serverPos, core.playerManager.myPlayer.scale], trapItem), 3);
                    const placeAngles = angles.filter(angle => MathUtil.getAngleDist(angle, targetDir) <= Math.sin(trappingDistance / (target.scale + trapItem.scale * trapItem.colDiv!)));

                    core.interactionEngine.safePlacement(trapItem, targetDir);
                    for (let i = 0; i < placeAngles.length; i++) {
                        core.interactionEngine.safePlacement(trapItem, placeAngles[i]);
                    }
                }
                break;
            }
            case State.SPIKE_TRAPPED: {
                const trapItem = items.list[15];
                const spikeItem = items.list[core.playerManager.myPlayer.inventory.items[2]];
                for (let iterator = this.targetsTrapSpikable.values(), iteration = null, value = (iteration = iterator.next()).value; !iteration.done; value = (iteration = iterator.next()).value) {
                    const target = value;

                    const trap = target.state.data.trap;

                    if (trap) {
                        const tangentAngle = core.objectManager.findPlacementTangent([myPlayer.serverPos, myPlayer.scale], trap, spikeItem, 5);
                        const straightAngle = MathUtil.getDirection(myPlayer.serverPos, trap.position);
                        const targetAngle = MathUtil.getDirection(myPlayer.serverPos, target.serverPos);
                        const angle1 = straightAngle + tangentAngle;
                        const angle2 = straightAngle - tangentAngle;
                        const closestAngle = MathUtil.getAngleDist(angle1, targetAngle) > MathUtil.getAngleDist(angle2, targetAngle) ? angle2 : angle1;
                        core.interactionEngine.safePlacement(spikeItem, closestAngle);
                    }
                }
                break;
            }
        }
    }

    onKeydown(keyCode: number): void {
        /*if (keyCode == 82) {
            this.toggled = !this.toggled;
        }*/
    }

    onKeyup(keyCode: number): void {}

    /*onRender(delta: number): void {
        const ctx = core.renderManager?.context!;
        const myPos = core.renderManager?.mapToContext(core.renderManager.cameraPosition, core.playerManager.myPlayer.renderPos)!;
        
        for (let i = 0; i < this.debugAngles.length; i++) {
            const a = this.debugAngles[i];
            ctx.strokeStyle = "black";
            ctx.beginPath();
            ctx.moveTo(myPos.x, myPos.y);
            ctx.lineTo(myPos.x + Math.cos(a) * 30, myPos.y + Math.sin(a) * 30);
            ctx.stroke();
        }
    }*/
}