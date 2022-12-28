import { Packet, PacketData } from "../socket/packets/Packet";
import Event from "./Event";

export default class EventPacket extends Event {

    private packet: Packet;

    constructor(packet: Packet) {
        super();
        this.packet = packet;
    }

    getPacket() {
        return this.packet;
    }

    setPacket(packet: Packet) {
        this.packet = packet;
    }

    setData(data: PacketData) {
        this.packet.data = data;
    }
}