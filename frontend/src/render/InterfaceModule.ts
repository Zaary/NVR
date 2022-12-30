import { Core } from "../core/Core";
import Vector from "../util/type/Vector";
import RenderManager from "./RenderManager";

export default abstract class InterfaceModule {
    
    protected core: Core;
    protected renderManager: RenderManager;
    protected position: Vector;
    protected dimensions: Vector;

    constructor(core: Core, renderManager: RenderManager, position: Vector, dimensions: Vector) {
        this.core = core;
        this.renderManager = renderManager;
        this.position = position;
        this.dimensions = dimensions;
    }
    
    abstract render(delta: number): void;
}