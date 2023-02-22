// top = lowest priority
// bottom = highest priority
// (because enums starts indexing from 0 and for us, higher index = higher priority)

enum ActionPriority {
    COMPATIBILITY,
    BIOMEHAT,
    ANTITRAP,
    AUTOBREAK,
    ANTIBULL,
    SPIKESYNC,
    ANTIINSTA,
    
    FORCED
}

enum ActionType {
    HAT,
    TAIL,
    ATTACK,
    WEAPON
}

export { ActionPriority, ActionType }