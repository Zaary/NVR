import { Packet, Side } from "./Packet";
import { PacketType } from "./PacketType";

import msgpack from "msgpack-lite";

interface Mapping {
  value: string;
  side: Side;
}

type ReverseMapping = { value: string, type: PacketType, side: Side };

interface PacketTypeMapping {
    [key: string]: Mapping;
}

/**
 * A mapping of PacketTypes to their serialized counterparts
 */

let packetTypeMapping: PacketTypeMapping = {};
packetTypeMapping[PacketType.ATTACK] = { value: "c", side: Side.ServerBound };
packetTypeMapping[PacketType.AUTO_ATK] = { value: "7", side: Side.ServerBound };
packetTypeMapping[PacketType.CLAN_ACC_JOIN] = { value: "11", side: Side.ServerBound };
packetTypeMapping[PacketType.CLAN_CREATE] = { value: "8", side: Side.ServerBound };
packetTypeMapping[PacketType.CLAN_KICK] = { value: "12", side: Side.ServerBound };
packetTypeMapping[PacketType.CLAN_REQ_JOIN] = { value: "10", side: Side.ServerBound };
packetTypeMapping[PacketType.BUY_AND_EQUIP] = { value: "13c", side: Side.ServerBound };
packetTypeMapping[PacketType.LEAVE_CLAN] = { value: "9", side: Side.ServerBound };
packetTypeMapping[PacketType.PLAYER_MOVE] = { value: "33", side: Side.ServerBound };
packetTypeMapping[PacketType.SELECT_ITEM] = { value: "5", side: Side.ServerBound };
packetTypeMapping[PacketType.SELECT_UPGRADE] = { value: "6", side: Side.ServerBound };
packetTypeMapping[PacketType.SET_ANGLE] = { value: "2", side: Side.ServerBound };
packetTypeMapping[PacketType.CLAN_NOTIFY_SERVER] = { value: "14", side: Side.ServerBound };
packetTypeMapping[PacketType.SPAWN] = { value: "sp", side: Side.ServerBound };
packetTypeMapping[PacketType.WINDOW_FOCUS] = { value: "rmd", side: Side.ServerBound };

packetTypeMapping[PacketType.CHAT] = { value: "ch", side: Side.BiDirectional };
packetTypeMapping[PacketType.PING] = { value: "pp", side: Side.BiDirectional };


packetTypeMapping[PacketType.DEATH] = { value: "11", side: Side.ClientBound };
packetTypeMapping[PacketType.CLAN_LIST] = { value: "id", side: Side.ClientBound };
packetTypeMapping[PacketType.CLAN_ADD] = { value: "ac", side: Side.ClientBound };
packetTypeMapping[PacketType.CLAN_DEL] = { value: "ad", side: Side.ClientBound };
packetTypeMapping[PacketType.DISCONN] = { value: "d", side: Side.ClientBound };
packetTypeMapping[PacketType.GATHER_ANIM] = { value: "7", side: Side.ClientBound };
packetTypeMapping[PacketType.HEALTH_UPDATE] = { value: "h", side: Side.ClientBound };
//packetTypeMapping[PacketType.ITEM_BUY] = { value: "13", side: Side.Client };
packetTypeMapping[PacketType.LEADERBOARD_UPDATE] = { value: "5", side: Side.ClientBound };
packetTypeMapping[PacketType.LOAD_GAME_OBJ] = { value: "6", side: Side.ClientBound };
packetTypeMapping[PacketType.MINIMAP] = { value: "mm", side: Side.ClientBound };
packetTypeMapping[PacketType.ANIMALS_UPDATE] = { value: "a", side: Side.ClientBound };
packetTypeMapping[PacketType.PLAYER_REMOVE] = { value: "4", side: Side.ClientBound };
packetTypeMapping[PacketType.PLAYER_SET_CLAN] = { value: "st", side: Side.ClientBound };
packetTypeMapping[PacketType.PLAYER_START] = { value: "1", side: Side.ClientBound };
packetTypeMapping[PacketType.PLAYER_UPDATE] = { value: "33", side: Side.ClientBound };
packetTypeMapping[PacketType.SET_CLAN_PLAYERS] = { value: "sa", side: Side.ClientBound };
packetTypeMapping[PacketType.UPDATE_AGE] = { value: "15", side: Side.ClientBound };
packetTypeMapping[PacketType.CLAN_NOTIFY_CLIENT] = { value: "p", side: Side.ClientBound };
packetTypeMapping[PacketType.UPDATE_PLACE_LIMIT] = { value: "14", side: Side.ClientBound };
packetTypeMapping[PacketType.UPDATE_ITEMS] = { value: "17", side: Side.ClientBound };
packetTypeMapping[PacketType.UPDATE_STORE] = { value: "us", side: Side.ClientBound };
packetTypeMapping[PacketType.UPGRADES] = { value: "16", side: Side.ClientBound };
packetTypeMapping[PacketType.WIGGLE] = { value: "8", side: Side.ClientBound };
packetTypeMapping[PacketType.PLAYER_ADD] = { value: "2", side: Side.ClientBound };
// packetTypeMapping[PacketType.PLAYER_ATTACK] = { value: "2", side: Side.Client };
packetTypeMapping[PacketType.UPDATE_STATS] = { value: "9", side: Side.ClientBound };
packetTypeMapping[PacketType.IO_INIT] = { value: "io-init", side: Side.ClientBound };
packetTypeMapping[PacketType.DAMAGE_TEXT] = { value: "t", side: Side.ClientBound };
packetTypeMapping[PacketType.JOIN_REQUEST] = { value: "an", side: Side.ClientBound };
packetTypeMapping[PacketType.REMOVE_GAME_OBJ] = { value: "12", side: Side.ClientBound };
packetTypeMapping[PacketType.REMOVE_ALL_OBJ] = { value: "13", side: Side.ClientBound }
packetTypeMapping[PacketType.ADD_PROJECTILE] = { value: "18", side: Side.ClientBound };
packetTypeMapping[PacketType.UPDATE_PROJECTILES] = { value: "19", side: Side.ClientBound };
packetTypeMapping[PacketType.TURRET_SHOOT] = { value: "sp", side: Side.ClientBound };
packetTypeMapping[PacketType.ANIMAL_ANIMATION] = { value: "aa", side: Side.ClientBound };

let reversePacketTypeMapping: ReverseMapping[] = [];

for (let key of Object.keys(packetTypeMapping)) {
    reversePacketTypeMapping.push({ type: parseInt(key) as PacketType, side: packetTypeMapping[key].side, value: packetTypeMapping[key].value })
}

/**
 * Controls serialization of packets in preparation for exchange, and deserialization on the destination
 */
class PacketFactory {
    private static instance: PacketFactory;

    /**
     * Get an instance of PacketFactory
     * @returns {PacketFactory} An instance of PacketFactory
     */
    public static getInstance(): PacketFactory {
        return PacketFactory.instance ? PacketFactory.instance : PacketFactory.instance = new PacketFactory();
    }

    private constructor() { }

    /**
     * Serializes a Packet to an ArrayBuffer suitable for transmission
     * @param packet the packet to serialize
     */
    public serializePacket(packet: Packet): ArrayBuffer {
        if (!Object.values(PacketType).includes(packet.type)) throw new Error("Packet is missing a type.");

        let type: string;

        if (Object.keys(packetTypeMapping).includes(packet.type.toString())) {
            type = packetTypeMapping[packet.type].value;
        } else {
            throw new Error(`Packet type invalid or not implemented: ${PacketType[packet.type]}`);
        }

        try {
            return msgpack.encode([type, packet.data]);
        } catch (error) {
            throw new Error(`msgpack encountered an error: ${error}`);
        }
    }

    /**
     * Deserializes packets for reading
     * @param buffer an ArrayBuffer to deserialize
     * @param side the recieving side of the packet
     */
    public deserializePacket(buffer: ArrayBuffer, side: Side, timeStamp = 0): Packet {
        let array: [string, any[]];

        try {
            array = msgpack.decode(new Uint8Array(buffer));
        } catch (error) {
            throw new Error("Invalid packet");
        }

        //if (side === Side.Client && array[0] !== "33" && array[0] !== "5" && array[0] !== "pp" && array[0] !== "a" && array[0] !== "mm" && array[0] !== "6") console.log(array);

        let packetType: string;
        let mapping = reversePacketTypeMapping.find(mapping => (mapping.side === side || mapping.side === Side.BiDirectional) && mapping.value === array[0]);

        if (mapping) {
            return new Packet(mapping.type, array[1], timeStamp);
        } else {
            throw new Error(`Failed to deserialize packet because of invalid packet type: ${array[0]}`);
        }
    }
}

export { PacketFactory, Side, packetTypeMapping, reversePacketTypeMapping };