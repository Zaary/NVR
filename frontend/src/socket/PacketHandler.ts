import { items } from "../data/moomoo/items";
import { GameObject } from "../data/type/GameObject";
import Player from "../data/type/Player";
import { buildings, currentPlayer/*, pathfinder*/, players, setCurrentPlayer, setTarget, target } from "../core/Core";
//import { playerUtil } from "../util/PlayerUtil";
import { Packet } from "./packets/Packet";
import { PacketType } from "./packets/PacketType";

let lastPath = 0;

function process(packet: Packet) {
    switch (packet.type) {
        case PacketType.PLAYER_ADD:
            const player = new Player(packet.data[0][0], packet.data[0][1]);
            player.spawn();
            player.setData(packet.data[0]);
            players.push(player);
            if (packet.data[1]) {
                setCurrentPlayer(player);
            }
            break;
        case PacketType.PLAYER_UPDATE:
            for (let i = 0; i < players.length; i++) {
                players[i].visible = false;
            }
            
            for (let i = 0; i < packet.data[0].length / 13; i++) {
                const playerData = packet.data[0].slice(i * 13, i * 13 + 13);
                const player = players.findBySid(playerData[0]);
                player.x = playerData[1];
                player.y = playerData[2];
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
                const objectData = packet.data[0].slice(i * 8, i * 8 + 8);
                let object = buildings.findBySid(objectData[0]);
                if (!object) {
                    object = new GameObject(objectData[0]);
                }
                object.init(objectData[1], objectData[2], objectData[3], objectData[4], objectData[5], items.list[objectData[6]], objectData[7] >= 0 ? { sid: objectData[7] } : null);
                buildings.push(object);
                //pathfinder.addObject(object);
            }
            break;
        case PacketType.REMOVE_GAME_OBJ:
            const object = buildings.findBySid(packet.data[0]);
            if (object) {
                buildings.removeBySid(packet.data[0]);
                //pathfinder.removeObject(object);
            }
            break;
        case PacketType.REMOVE_ALL_OBJ:
            for (let i = 0; i < buildings.length; i++) {
                const building = buildings[i] as GameObject;
                if (building.active && building.owner && building.owner.sid == packet.data[0]) {
                    building.active = false;
                    //pathfinder.removeObject(building);
                    // buildings.splice(i, 1), i--;
                }
            }
            break;
    }
}

const PacketHandler = { process };

export { PacketHandler }