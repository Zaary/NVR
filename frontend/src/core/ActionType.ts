// top = highest priority
// bottom = lowest priority

enum ActionPriority {
    ANTIINSTA,
    ANTIBULL,
    AUTOHEAL,
    AUTOBREAK,
    AUTOPLACE
}

enum ActionType {
    HAT,
    TAIL,
    ATTACK
}

export { ActionPriority, ActionType }