import { ActionPriority, ActionType } from "../../../core/ActionType";
import accessories, { Accessory } from "../../../data/moomoo/accessories";
import config from "../../../data/moomoo/config";
import hats, { Hat } from "../../../data/moomoo/hats";
import { items } from "../../../data/moomoo/items";
import { PlayerBuilding } from "../../../data/type/GameObject";
import { ClientPlayer, Player } from "../../../data/type/Player";
import { Projectile, ProjectileItem, projectileList, Projectiles } from "../../../data/type/Projectile";
import { MeleeWeapon, RangedWeapon, Weapon, Weapons, WeaponSlot } from "../../../data/type/Weapon";
import EventPacket from "../../../event/EventPacket";
import { core } from "../../../main";
import { connection } from "../../../socket/Connection";
import { Packet } from "../../../socket/packets/Packet";
import { PacketType } from "../../../socket/packets/PacketType";
import { TickEngine, TickRoundType } from "../../../util/engine/TickEngine";
import MathUtil from "../../../util/MathUtil";
import RecognitionUtil from "../../../util/RecognitionUtil";
import Vector from "../../../util/type/Vector";
import Module from "../Module";
import BullTick from "./BullTick";

function wasdMovementPushVC(player: Player, hat: Hat | undefined, tail: Accessory | undefined, myPlayer: ClientPlayer) {
    const speed = config.playerSpeed * (hat?.spdMult ?? 1) * (tail?.spdMult ?? 1) * TickEngine.TICK_DELTA;
    const straightAngle = MathUtil.getDirection(player.serverPos, myPlayer.serverPos);
    return player.serverPos.clone().directionMove(straightAngle, speed);
}

export default class AntiInsta extends Module {

    
    
}