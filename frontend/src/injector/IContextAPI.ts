export default interface IContextAPI {
    registerReference(name: string, value: any): void;
    registerFunction(name: string, value: Function): void;
    linkPrimitive(initialValue: any): any;
}