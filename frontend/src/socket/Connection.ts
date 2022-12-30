import ErrorStackParser from "error-stack-parser";
import EventEmitter from "events";
import EventPacket from "../event/EventPacket";
import Logger from "../util/Logger";
import { Packet, Side } from "./packets/Packet";
import { PacketFactory } from "./packets/PacketFactory";
import { PacketType } from "./packets/PacketType";

const logger = new Logger("connection");

let connection: Connection;
const packetFactory = PacketFactory.getInstance();
let was = false;
class Connection extends EventEmitter {

    public socket: Injection | null;
    public defaultReceiver: ((event: MessageEvent) => void) | null;

    constructor() {
        super();
        this.socket = null;
        this.defaultReceiver = null;
    }

    injectSocket(socket: Injection) {
        this.socket = socket;
    }

    send(packet: Packet, allow?: boolean) {
        if (this.socket && this.socket.readyState == 1) {
            this.socket[allow ? "ss" : "send"](packetFactory.serializePacket(packet), true);
        }
    }
};

connection = new Connection();

class Injection extends WebSocket {
    constructor(url: string | URL, protocols?: string | string[]) {
        super(url, protocols);

        if (connection.socket) return;

        // initialize connection and message handler
        connection.injectSocket(this);
        
        this.addEventListener("open", function() {
            logger.info("connection injected");
            connection.emit("ready");
        });
        this.addEventListener("close", function(event: CloseEvent) {
            logger.info("connection closed");
            connection.emit("close", event.reason);
        })

        this.addEventListener("message", function({ data: buffer }: { data: ArrayBuffer }) {
            try {
                const event = new EventPacket(packetFactory.deserializePacket(buffer, Side.Client, Date.now()));
                connection.emit("packetreceive", event);

                if (event.isCanceled()) return;

                const serialized = packetFactory.serializePacket(event.getPacket());

                if (connection.defaultReceiver) {
                    connection.defaultReceiver(new Proxy(new MessageEvent(""), {
                        get(target, property, receiver) {
                            if (property === "data") return serialized;
                            if (property === "name") return undefined;
                            return (<MessageEvent & Record<string | symbol, any>> target)[property];
                        }
                    }));
                } else {
                    logger.warn("default receiver is null! this should not happen!");
                }
            } catch (err) {
                logger.error(err);
            }
        })

        Object.defineProperty(this, "onmessage", {
            get() {
                return null;
            },
            set(func) {
                connection.defaultReceiver = func;
                console.log("default receiver");
            }
        });
    }

    send(data: string | ArrayBufferLike | Blob | ArrayBufferView, isInj: boolean = false): void {
        const event = new EventPacket(packetFactory.deserializePacket(<ArrayBuffer> data, Side.Server, Date.now()));
        connection.emit("packetsend", event);

        if (event.isCanceled()) return;
        
        super.send(packetFactory.serializePacket(event.getPacket()));
    }

    ss(data: string | ArrayBufferLike | Blob | ArrayBufferView): void {
        super.send(data);
    }
}

const originalWebSocket = WebSocket;

Object.defineProperty(window, "WebSocket", {
    get() {
        const caller = ErrorStackParser.parse(new Error())[1];
        if (!caller.fileName || !(/(?:(?:http|https):\/\/(?:sandbox\.|dev\.)?moomoo\.io\/bundle\.js|\(unknown source\)\))/g.test(caller.fileName)) || caller.functionName != "Object.connect") {
            logger.warn("accessing WebSocket from unkown source:", caller);
            return originalWebSocket;
        }
        return Injection;
    },
    set(a) {
        console.log("set:", new Error().stack, a);
    }
});

//window.WebSocket = Injection;

export { connection }