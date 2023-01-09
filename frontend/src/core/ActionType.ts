// top = lowest priority
// bottom = highest priority
// (because enums starts indexing from 0 and for us, higher index = higher priority)

enum ActionPriority {
    BIOMEHAT,
    AUTOBREAK,
    AUTOHEAL,
    ANTIBULL,
    ANTIINSTA
}

enum ActionType {
    HAT,
    TAIL,
    ATTACK,
    WEAPON
}

export { ActionPriority, ActionType }