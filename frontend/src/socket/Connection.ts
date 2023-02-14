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

    sendWMeta(packet: Packet, meta: any[]) {
        if (this.socket && this.socket.readyState == 1) {
            this.socket.sendWMeta(packetFactory.serializePacket(packet), meta);
        }
    }

    send(packet: Packet, force?: boolean) {
        if (this.socket && this.socket.readyState == 1) {
            this.socket.send(packetFactory.serializePacket(packet), force);
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
                const event = new EventPacket(packetFactory.deserializePacket(buffer, Side.ClientBound, Date.now()));
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
            }
        });
    }

    send(data: string | ArrayBufferLike | Blob | ArrayBufferView, force?: boolean): void {
        if (force) return super.send(data);

        const event = new EventPacket(packetFactory.deserializePacket(<ArrayBuffer> data, Side.ServerBound, Date.now()));
        connection.emit("packetsend", event);

        if (!event.isCanceled()) {
            connection.emit("packetsendp", event.getPacket());
            super.send(packetFactory.serializePacket(event.getPacket()));

            if (event.callback) event.callback();
        }
    }

    sendWMeta(data: string | ArrayBufferLike | Blob | ArrayBufferView, meta: any): void {
        const event = new EventPacket(packetFactory.deserializePacket(<ArrayBuffer> data, Side.ServerBound, Date.now()));
        connection.emit("packetsend", event, meta);

        if (!event.isCanceled()) {
            connection.emit("packetsendp", event.getPacket());
            super.send(packetFactory.serializePacket(event.getPacket()));

            if (event.callback) event.callback();
        }
    }
}

function inject() {
    const originalWebSocket = WebSocket;

    Object.defineProperty(window, "WebSocket", {
        get() {
            const caller = ErrorStackParser.parse(new Error())[1];
    
            const allowedFunctions = ["Object.connect", "connect"]

            const fileName = /(?:(?:http|https):\/\/(?:sandbox\.|dev\.)?moomoo\.io\/(?:bundle\.js| line 1 > injectedScript line \d+ > Function)|\(unknown source\)\)|:\d+)/g;
            const functionName = /Object\.connect|connect/g

            if (!caller.fileName || !caller.functionName || !fileName.test(caller.fileName) || !functionName.test(caller.functionName)) {
                logger.warn("accessing WebSocket from unkown source:", caller);
                return originalWebSocket;
            }
            return Injection;
        },
        set(a) {
            console.log("set:", new Error().stack, a);
        }
    });
}

export { connection, inject }