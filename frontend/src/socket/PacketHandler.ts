import { items } from "../data/moomoo/items";
import { GameObject } from "../data/type/GameObject";
import Player from "../data/type/Player";
import { buildings, currentPlayer/*, pathfinder*/, players, setCurrentPlayer, setTarget, target } from "../core/Core";
//import { playerUtil } from "../util/PlayerUtil";
import { Packet } from "./packets/Packet";
import { PacketType } from "./packets/PacketType";
import { core } from "../main";

let lastPath = 0;

function process(packet: Packet) {
    switch (packet.type) {
        case PacketType.PLAYER_ADD:
            const player = new Player(packet.data[0][0], packet.data[0][1]);
            players.removeBySid(player.sid);

            player.spawn();
            player.visible = false;
            player.x2 = undefined;
            player.y2 = undefined;
            player.setData(packet.data[0]);
            
            if (packet.data[1]) {
                player.visible = true;
                setCurrentPlayer(player);
                core.renderManager?.cameraPosition.set(player.x, player.y);
                core.renderManager?.staticCamera.set(player.x, player.y);
            }

            players.push(player);
            break;
        case PacketType.PLAYER_UPDATE:
            for (let i = 0; i < players.length; i++) {
                players[i].visible = false;
            }
            
            for (let i = 0; i < packet.data[0].length / 13; i++) {
                const playerData = packet.data[0].slice(i * 13, i * 13 + 13);
                const player = players.findBySid(playerData[0]);

                if (player) {
                    /*player.dt = 0;

                    player.t1 = (player.t2 === undefined) ? Date.now() : player.t2;
                    player.t2 = Date.now();

                    player.x1 = player.x;
                    player.y1 = player.y;

                    player.x2 = playerData[1];
                    player.y2 = playerData[2];*/

                    //player.lastPositionTimestamp = player.positionTimestamp; // t1
                    //player.positionTimestamp = Date.now(); // t2
                    player.clientPosX = player.x; // x1
                    player.clientPosY = player.y; // y1
                    //player.lastDir = player.serverDir; // d1

                    player.lastTickPosX = player.serverPosX;
                    player.lastTickPosY = player.serverPosY;

                    player.serverPosX = playerData[1]; // x2
                    player.serverPosY = playerData[2]; // y2

                    //player.serverDir = info[3]; // d2
                    player.dt = 0; // dt

                    player.dir = playerData[3];
                    player.buildIndex = playerData[4];
                    player.weaponIndex = playerData[5];
                    player.weaponVariant = playerData[6];
                    player.team = playerData[7];
                    player.isLeader = playerData[8];
                    player.skinIndex = playerData[9];
                    player.tailIndex = playerData[10];
                    player.iconIndex = playerData[11];
                    player.zIndex = playerData[12];
                    player.visible = true;
                }
            }

            /*setTarget(playerUtil.findTarget(players));
            if (target && currentPlayer && Date.now() - lastPath > 500) {
                lastPath = Date.now();
                pathfinder.path({ x: currentPlayer.x, y: currentPlayer.y }, { x: currentPlayer.x, y: currentPlayer.y }, { x: target.x, y: target.y});
                // @ts-ignore
                //if (window.path) connection.send(new Packet(PacketType.CHAT, [`pathing:vertx=${window.path.length},thr=${Math.floor(Math.random()*16).toString(16).slice(1,3)},t=${target.sid}`]));
            }*/
            break;
        case PacketType.LOAD_GAME_OBJ:
            for (let i = 0; i < packet.data[0].length / 8; i++) {
                const data = packet.data[0].slice(i * 8, i * 8 + 8);
                // type (data[5]) is null for player buildings but set for natural objects
                // id (data[6]) is null for natural objects but is set for player buildings
                // owner sid (data[7]) is -1 for natural objects otherwise is set.
                core.objectManager.add(...(<[number, number, number, number, number, number, any, any]> data));
            }
            break;
        case PacketType.REMOVE_GAME_OBJ:
            core.objectManager.disableBySid(packet.data[0]);
            break;
        case PacketType.REMOVE_ALL_OBJ:
            core.objectManager.removeAllItems(packet.data[0]);
            break;
        case PacketType.WIGGLE:
            // first argument is ID and second argument is direction
            // however packet content is [direction, ID]
            core.objectManager.wiggleObject(packet.data[1], packet.data[0]);
            break;
    }
}

const PacketHandler = { process };

export { PacketHandler }
/*

var tmpSpeed = UTILS.getDistance(0, 0, this.xVel * delta, this.yVel * delta);
                var depth = Math.min(4, Math.max(1, Math.round(tmpSpeed / 40)));
                var tMlt = 1 / depth;
                for (var i = 0; i < depth; ++i) {
                    if (this.xVel)
                        this.x += (this.xVel * delta) * tMlt;
                    if (this.yVel)
                        this.y += (this.yVel * delta) * tMlt;
                    tmpList = objectManager.getGridArrays(this.x, this.y, this.scale);
                    for (var x = 0; x < tmpList.length; ++x) {
                        for (var y = 0; y < tmpList[x].length; ++y) {
                            if (tmpList[x][y].active)
                                objectManager.checkCollision(this, tmpList[x][y], tMlt);
                        }
                    }
                }

                */