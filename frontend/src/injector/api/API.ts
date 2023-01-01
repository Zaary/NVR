import { EventEmitter } from "tsee";
import Logger from "../../util/Logger";
import IContextAPI from "../IContextAPI";

const logger = new Logger(window.console, "nvr-api");

export default class API extends EventEmitter<{
    refPropertySet: (name: string, property: string | symbol, value: any) => void;
    functionReg: (name: string, func: Function) => void;
}> implements IContextAPI {

    public references: Record<string, any>;
    public functions: Record<string, Function>;

    constructor() {
        super();
        // @ts-ignore
        window.nvrapi = this;//hloo
        this.references = {};
        this.functions = {};
    }

    registerFunction(name: string, value: Function): void {
        this.functions[name] = value;
        logger.log("registered function:", name, value);
        this.emit("functionReg", name, value)
    }

    registerReference(name: string, value: any, proxify = false): any {
        this.references[name] = value;
        logger.log("registered reference:", name);
        
        return proxify ? this.createProxyFor(name, value) : value;
    }

    private createProxyFor(name: string, object: any): any {
        switch (typeof object) {
            case "object":
                return this.createObjectProxy(name, object);
            default:
                return object;
        }
    }

    private createObjectProxy(name: string, object: Object) {
        const _ = this;
        return new Proxy(object, {
            set(target, p, newValue, receiver) {
                _.emit("refPropertySet", name, p, newValue);
                return Reflect.set(target, p, newValue, receiver);
            },
        });
    }
}