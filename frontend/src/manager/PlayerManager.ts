import { ClientPlayer, Player } from "../data/type/Player";
import { MeleeWeapon, RangedWeapon } from "../data/type/Weapon";
import { core } from "../main";
import MathUtil from "../util/MathUtil";
import { SidArray } from "../util/type/SidArray";
import Vector from "../util/type/Vector";

export default class PlayerManager {
    public playerList: SidArray<Player>;
    public myClan: SidArray<Player>;
    public myPlayer: ClientPlayer;

    constructor() {
        this.playerList = new SidArray();
        this.myClan = new SidArray();
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

    tickReset(tickIndex: number) {
        for (let i = 0; i < this.playerList.length; i++) {
            const player = this.playerList[i];

            if (player.nextAttack + 1 === tickIndex) {
                player.nextAttack = 0;
                player.swingStreak = 0;
            }

            player.hasFiredProjectileThisTick = false;
        }
    }

    checkTeam(sid: number, forSid?: number) {
        return false;
    }

    findTarget() {
        return this.playerList.slice(1).sort((a, b) => a.serverPos.clone().subtract(this.myPlayer.serverPos).length() - b.serverPos.clone().subtract(this.myPlayer.serverPos).length())[0];
    }

    getNearby(positon: Vector, distance: number, ignoreTeam = false) {
        return this.playerList.filter((player, index) => /*index !== 0 && */player.visible && (!ignoreTeam || player.team !== this.myPlayer.team) && player.serverPos.clone().subtract(positon).length() <= distance);
    }

    getMeleeThreats() {
        return this.playerList.filter((player, index) => index !== 0 && player.visible && MathUtil.getDistance(player.serverPos.clone().add(player.velocity), this.myPlayer.serverPos.clone().add(this.myPlayer.velocity)) <= Math.max(...player.inventory.weapons.filter(x => x instanceof MeleeWeapon && x !== null).map(x => x!.stats.range)));
    }

    getRangedThreats() {
        return this.playerList.filter((player, index) => index !== 0 && player.visible && MathUtil.getDistance(player.serverPos.clone().add(player.velocity), this.myPlayer.serverPos.clone().add(this.myPlayer.velocity)) <= Math.max(...player.inventory.weapons.filter(x => x instanceof RangedWeapon && x !== null).map(x => x!.stats.range)));
    }

    getVisible() {
        return this.playerList.filter((player, index) => index !== 0 && player.visible);
    }

    getAllVisible() {
        return this.playerList.filter(player => player.visible);
    }

    getVisibleEnemies() {
        return this.playerList.filter((player, index) => index !== 0 && player.visible && (!player.team || player.team !== this.myPlayer.team));
    }

    isAnyoneInSight() {
        return this.getVisible().length > 0;
    }

    getEnemiesInRadius(radius: number) {
        return this.getVisible().filter((player, index) => index !== 0 && player.visible && MathUtil.getDistance(this.myPlayer.serverPos, player.serverPos) <= radius && (!player.team || player.team !== this.myPlayer.team));
    }

    isEnemyInRadius(radius: number) {
        return this.getEnemiesInRadius(radius).length > 0;
    }

    getThreats() {
        return this.getMeleeThreats().concat(this.getRangedThreats());
    }
}