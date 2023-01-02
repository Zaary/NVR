import { ClientPlayer, Player } from "../data/type/Player";
import { core } from "../main";
import { SidArray } from "../util/type/SidArray";
import Vector from "../util/type/Vector";

export default class PlayerManager {
    public playerList: SidArray<Player>;
    public myPlayer: ClientPlayer;

    constructor() {
        this.playerList = new SidArray();
        this.myPlayer = new ClientPlayer("", -1, "", new Vector, 0, 0, 0, 0, 0);
    }

    spawnPlayer(id: string, sid: number, name: string, position: Vector, dir: number, health: number, maxHealth: number, scale: number, skinColor: number, isMyPlayer: boolean): Player {
        let player = this.playerList.findBySid(sid);
        if (player) {
            player.updateData(id, sid, name, position, dir, health, maxHealth, scale, skinColor);
        } else {
            player = new Player(id, sid, name, position, dir, health, maxHealth, scale, skinColor);
            this.playerList.push(player);
        }

        if (isMyPlayer) {
            this.myPlayer = player;
            player.visible = true;
        }

        return player;
    }
}