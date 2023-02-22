import { Player } from "../data/type/Player";
import { weaponPreMap, Weapons, WeaponSlot } from "../data/type/Weapon";

function isLegit(player: Player) {
    return false;
}

function canInstakill(player: Player) {
    return true;
    /*const primary = player.inventory.getWeapon(WeaponSlot.PRIMARY)!;
    const secondary = player.inventory.getWeapon(WeaponSlot.SECONDARY) ?? (primary === Weapons.SHORT_SWORD || primary === Weapons.POLEARM ? Weapons.MUSKET : Weapons.GREAT_HAMMER);

    return (isLegit(player) || (player.seenHats.has(12) && player.seenTails.has(11))) && primary.stats.dmg * 1.5 + secondary.stats.dmg + 25 >= 100;*/
}

function isPossibleCombo(primary: number, secondary: number) {
    const secondaryPre = weaponPreMap.get(secondary);
    if (typeof secondaryPre === "number") {
        return secondaryPre === primary;
    } else {
        return true;
    }
}

function assumeSecondary(primary: number) {
    if (primary === Weapons.POLEARM.id || primary === Weapons.SHORT_SWORD.id) return Weapons.MUSKET;
    return Weapons.GREAT_HAMMER;
}

export default {
    isLegit,
    canInstakill,
    isPossibleCombo,
    assumeSecondary
}