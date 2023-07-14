import { Action } from "../core/Action";
import { PlayerBuilding } from "../data/type/GameObject";
import { Player } from "../data/type/Player";
import { Projectile, ProjectileItem } from "../data/type/Projectile";
import EventPacket from "../event/EventPacket";
import Logger from "../util/Logger";
import { Class } from "../util/type/Definitions";
import Vector from "../util/type/Vector";
import AntiTrap from "./modules/building/AntiTrap";
import AutoPlacer from "./modules/building/AutoPlacer";
import AutoReplace from "./modules/building/AutoReplace";
import ItemPlacer from "./modules/building/ItemPlacer";
import AntiBull from "./modules/combat/AntiBull";
import AntiInsta from "./modules/combat/AntiInsta";
import Autoheal from "./modules/combat/Autoheal";
import BullTick from "./modules/combat/BullTick";
import SpikeSync from "./modules/combat/SpikeSync";
import NoToxic from "./modules/misc/NoToxic";
import Module from "./modules/Module";
import AutoHat from "./modules/player/AutoHat";

const logger = new Logger("module-manager");

export default class ModuleManager {
    /**
     * ORDER IS VERY IMPORTANT!!!
     * 
     * AntiTrap runs after placing it would mess it up
     * AutoHat runs last because of all the attacks from placements that could confuse it
     */
    private static classes: Class<Module>[] = [
        NoToxic,
        // run before autohat so it has the oppourtunity to mess with it's hat switchers
        AutoHat,
        
        //AutoPlacer,
        AutoReplace,
        ItemPlacer,
        
        BullTick,

        SpikeSync, // run before autotrap since autotrap also checks if it has highest priority in tick

        AntiTrap,

        AntiBull,

        // anti insta has to run after all the hat setters so it doesnt get overriden by a mistake
        AntiInsta,
        Autoheal, // activate autoheal after anti insta in case the player is already fully healed by anti
    ];

    private modules: Module[] = [];

    constructor() {
        for (const clazz of ModuleManager.classes) {
            this.modules.push(Reflect.construct(clazz, []));
        }
        logger.info(`loaded ${this.modules.length} modules`);
    }

    onRespawn() {
        for (const module of this.modules) {
            module.onRespawn();
        }
    }

    onUpdate(delta: number) {
        for (const module of this.modules) {
            module.onUpdate(delta);
        }
    }

    onPreTick(tickIndex: number) {
        for (const module of this.modules) {
            module.onPreTick(tickIndex);
        }
    }
    
    onTick(tickIndex: number, schedulableTick: number) {
        for (const module of this.modules) {
            module.onTick(tickIndex, schedulableTick);
        }
    }

    onPostTick(tickIndex: number) {
        for (const module of this.modules) {
            module.onPostTick(tickIndex);
        }
    }

    onKeydown(keyCode: number) {
        for (const module of this.modules) {
            module.onKeydown(keyCode);
        }
    }

    onKeyup(keyCode: number) {
        for (const module of this.modules) {
            module.onKeyup(keyCode);
        }
    }

    onPacketReceive(event: EventPacket) {
        for (const module of this.modules) {
            if (!event.isCanceled()) module.onPacketReceive(event);
        }
    }

    onPacketSend(event: EventPacket) {
        for (const module of this.modules) {
            if (!event.isCanceled()) module.onPacketSend(event);
        }
    }

    onRender(delta: number) {
        for (const module of this.modules) {
            module.onRender(delta);
        }
    }

    onActionRun(action: Action) {
        for (const module of this.modules) {
            module.onActionRun(action);
        }
    }

    onPreBuildingHit(player: Player, building: PlayerBuilding, tickIndex: number, potentialBreak: boolean) {
        for (const module of this.modules) {
            module.onPreBuildingHit(player, building, tickIndex, potentialBreak);
        }
    }

    onBuildingBreak(building: PlayerBuilding) {
        for (const module of this.modules) {
            module.onBuildingBreak(building);
        }
    }

    onPlayerUpdate(player: Player) {
        for (const module of this.modules) {
            module.onPlayerUpdate(player);
        }
    }

    onProjectileEarlyDespawn(projectileItem: ProjectileItem, spawnPosition: Vector, direction: number) {
        for (const module of this.modules) {
            module.onProjectileEarlyDespawn(projectileItem, spawnPosition, direction);
        }
    }

    getModule(clazz: Class<Module>) {
        for (const module of this.modules) {
            if (module instanceof clazz) return module;
        }
    }
}