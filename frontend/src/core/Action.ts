import { ActionPriority, ActionType } from "./ActionType";

class Action {

    public id: number;
    public type: ActionType;
    public priority: ActionPriority;
    public executeTick: number;
    public data: any[];

    constructor(id: number, type: ActionType, priority: ActionPriority, executeTick: number, data: any[]) {
        this.id = id;
        this.type = type;
        this.priority = priority;
        this.executeTick = executeTick;
        this.data = data;
    }
}

export { Action }