import { Action } from "../core/Action";
import EventPacket from "../event/EventPacket";
import Logger from "../util/Logger";
import { Class } from "../util/type/Definitions";
import AutoBreak from "./modules/building/AutoBreak";
import AutoPlacer from "./modules/building/AutoPlacer";
import ItemPlacer from "./modules/building/ItemPlacer";
import Autoheal from "./modules/combat/Autoheal";
import Module from "./modules/Module";
import AutoHat from "./modules/player/AutoHat";

const logger = new Logger("module-manager");

export default class ModuleManager {
    private static classes: Class<Module>[] = [
        AutoBreak,
        AutoPlacer,
        ItemPlacer,
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

    onUnsafeTick(tickIndex: number) {
        for (const module of this.modules) {
            module.onUnsafeTick(tickIndex);
        }
    }
    
    onTick(tickIndex: number) {
        for (const module of this.modules) {
            module.onTick(tickIndex);
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
            module.onPacketReceive(event);
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

    getModule(clazz: Class<Module>) {
        for (const module of this.modules) {
            if (module instanceof clazz) return module;
        }
    }
}