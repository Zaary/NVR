import { ActionPriority, ActionType } from "./ActionType";

class Action {

    public id: number;
    public type: ActionType;
    public priority: ActionPriority;
    public executeTick: number;
    public data: any[] | undefined;
    public force: boolean;

    constructor(id: number, type: ActionType, priority: ActionPriority, executeTick: number, data: any[] | undefined, force: boolean) {
        this.id = id;
        this.type = type;
        this.priority = priority;
        this.executeTick = executeTick;
        this.data = data;
        this.force = force;
    }
}

export { Action }