import Vector from "../util/type/Vector";
import RenderManager from "./RenderManager";

export default abstract class InterfaceModule {
    
    protected renderManager: RenderManager;
    protected position: Vector;
    protected dimensions: Vector;

    constructor(renderManager: RenderManager, position: Vector, dimensions: Vector) {
        this.renderManager = renderManager;
        this.position = position;
        this.dimensions = dimensions;
    }
    
    abstract render(delta: number): void;
}