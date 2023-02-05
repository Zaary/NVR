import { Action } from "../core/Action";
import { PlayerBuilding } from "../data/type/GameObject";
import { Player } from "../data/type/Player";
import EventPacket from "../event/EventPacket";
import Logger from "../util/Logger";
import { Class } from "../util/type/Definitions";
import AntiTrap from "./modules/building/AntiTrap";
import AutoPlacer from "./modules/building/AutoPlacer";
import AutoReplace from "./modules/building/AutoReplace";
import ItemPlacer from "./modules/building/ItemPlacer";
import AntiInsta from "./modules/combat/AntiInsta";
import Autoheal from "./modules/combat/Autoheal";
import Module from "./modules/Module";
import AutoHat from "./modules/player/AutoHat";

const logger = new Logger("module-manager");

export default class ModuleManager {
    private static classes: Class<Module>[] = [
        AntiTrap,
        AutoPlacer,
        AutoReplace,
        ItemPlacer,
        //AntiInsta,
        Autoheal,
        AutoHat
    ];

    private modules: Module[] = [];

    constructor() {
        for (const clazz of ModuleManager.classes) {
            this.modules.push(Reflect.construct(clazz, []));
        }
        logger.info(`loaded ${this.modules.length} modules`);
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
    
    onTick(tickIndex: number) {
        for (const module of this.modules) {
            module.onTick(tickIndex);
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

    onBuildingHit(player: Player, building: PlayerBuilding, damage: number) {
        for (const module of this.modules) {
            module.onBuildingHit(player, building, damage);
        }
    }

    onBuildingBreak(building: PlayerBuilding) {
        for (const module of this.modules) {
            module.onBuildingBreak(building);
        }
    }

    getModule(clazz: Class<Module>) {
        for (const module of this.modules) {
            if (module instanceof clazz) return module;
        }
    }
}