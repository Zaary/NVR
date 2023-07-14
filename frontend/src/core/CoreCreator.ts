import NVRLoader from "../loader/NVRLoader";
import { connection } from "../socket/Connection";
import { PacketHandler } from "../socket/PacketHandler";
import { Core } from "./Core";

export default class CoreCreator {
    static create(cid: number) {
        return new Core(cid, (cb2: (code: string) => [Function, number[]]) => {
            
            const dict: Record<string | symbol, any> = {
                "connection": connection,
                "PacketHandler": PacketHandler,
                "NVRLoader": NVRLoader,
                "cid": cid
            }

            const keys = Object.keys(dict);

            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/with
            const namespace = new Proxy({}, {
                has(target, key) {
                    // Avoid trapping global properties like `console`
                    if (key in globalThis) {
                        return false;
                    }
                    // Trap all property lookups
                    if (typeof key === "symbol") return false;
                    return keys.includes(key);
                },
                get(target, p, receiver) {
                    return dict[p];
                },
            });

            const [func, crcData] = cb2(CORE_LOADER_CODE);

            // verify function integrity
            if (CORE_LOADER_LCRC !== crcData[0] || CORE_LOADER_CCRC !== crcData[1]) {
                while(69 * 420 === 28980) { undefined };
            } else {
                // init core
                func(namespace, cid);
            }
        });
    }
}