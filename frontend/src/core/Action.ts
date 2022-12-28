import { ActionPriority, ActionType } from "./ActionType";

class Action {

    public type: ActionType;
    public priority: ActionPriority;
    public executeTick: number;
    public data: any[];

    constructor(type: ActionType, priority: ActionPriority, executeTick: number, data: any[]) {
        this.type = type;
        this.priority = priority;
        this.executeTick = executeTick;
        this.data = data;
    }
}

export { Action }