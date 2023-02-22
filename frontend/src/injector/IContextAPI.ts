export default interface IContextAPI {
    registerReference(name: string, value: any): void;
    registerFunction(name: string, value: Function): void;
    linkPrimitive(initialValue: any): any;
    callbackIntercept(name: string, data: any, callback: () => void): any;
    getValue(name: string, defaultValue: any): any;
}