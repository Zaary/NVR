import { ClientPlayer, Player } from "../data/type/Player";
import { MeleeWeapon, RangedWeapon } from "../data/type/Weapon";
import { core } from "../main";
import MathUtil from "../util/MathUtil";
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
            if (isMyPlayer) {
                player = new ClientPlayer(id, sid, name, position, dir, health, maxHealth, scale, skinColor);
                this.playerList.unshift(player);
            } else {
                player = new Player(id, sid, name, position, dir, health, maxHealth, scale, skinColor);
                this.playerList.push(player);
            }
        }

        if (isMyPlayer) {
            this.myPlayer = <ClientPlayer> player;
            this.myPlayer.alive = true;
            this.myPlayer.visible = true;
        }

        return player;
    }

    update(delta: number) {
        for (let i = 0; i < this.playerList.length; i++) {
            this.playerList[i].inventory.updateReloads(delta);
        }
    }

    findTarget() {
        return this.playerList.slice(1).sort((a, b) => a.serverPos.clone().subtract(this.myPlayer.serverPos).length() - b.serverPos.clone().subtract(this.myPlayer.serverPos).length())[0];
    }

    getNearby(positon: Vector, distance: number, ignoreTeam = false) {
        return this.playerList.filter(player => player !== this.myPlayer && (!ignoreTeam || player.team !== this.myPlayer.team) && player.serverPos.clone().subtract(positon).length() <= distance);
    }

    getMeleeThreats() {
        return this.playerList.filter(player => MathUtil.getDistance(player.serverPos.clone().add(player.velocity), this.myPlayer.serverPos.clone().add(this.myPlayer.velocity)) <= Math.max(...player.inventory.weapons.filter(x => x instanceof MeleeWeapon && x !== null).map(x => x!.stats.range)));
    }

    getRangedThreats() {
        return this.playerList.filter(player => MathUtil.getDistance(player.serverPos.clone().add(player.velocity), this.myPlayer.serverPos.clone().add(this.myPlayer.velocity)) <= Math.max(...player.inventory.weapons.filter(x => x instanceof RangedWeapon && x !== null).map(x => x!.stats.range)));
    }
}