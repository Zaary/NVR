import { items } from "../../../data/moomoo/items";
import { util } from "../../../data/type/MoomooUtil";
import { Player } from "../../../data/type/Player";
import { core } from "../../../main";
import MathUtil from "../../../util/MathUtil";
import Module from "../Module";

enum State {
    IDLE,
    WINDMILLS,
    TRAP_ENEMY
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

    private targetsTrappable: Player[];

    private state: State;
    private toggled: boolean;

    constructor() {
        super();
        this.state = State.WINDMILLS;
        this.toggled = false;
        this.targetsTrappable = [];
    }

    onUnsafeTick(tickIndex: number): void {
    }

    calcState() {
        this.targetsTrappable = [];

        const myPlayer = core.playerManager.myPlayer;
        const enemies = core.playerManager.playerList.slice(1).filter(x => x.visible);

        const trapItem = items.list[15];
        
        if (enemies.length === 0) this.state = State.IDLE;

        for (let i = 0; i < enemies.length; i++) {
            const enemy = enemies[i];
            const distance = MathUtil.getDistance(enemy.serverPos, myPlayer.serverPos);

            const nextDistance = MathUtil.getDistance(enemy.serverPos.clone().add(enemy.velocity), myPlayer.serverPos);
            const trappingDistance = myPlayer.scale + enemy.scale + trapItem.scale + trapItem.scale * trapItem.colDiv! + trapItem.placeOffset!;

            if (distance <= trappingDistance) {
                if (enemy.state.isTrapped) {
                    // plac pikes ig
                    this.state = State.IDLE;
                } else if (nextDistance <= trappingDistance) {
                    this.state = State.TRAP_ENEMY;
                }

                this.targetsTrappable.push(enemy);
            }
        }

        if (this.state === State.IDLE) this.state = State.WINDMILLS;
    }

    onUpdate(delta: number): void {
        if (!this.toggled) return;

        const myPlayer = core.playerManager.myPlayer;
        
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
                for (let i = 0; i < this.targetsTrappable.length; i++) {
                    const target = this.targetsTrappable[i];
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
        }
    }

    onKeydown(keyCode: number): void {
        if (keyCode == 82) {
            this.toggled = !this.toggled;
        }
    }

    onKeyup(keyCode: number): void {
    }
}