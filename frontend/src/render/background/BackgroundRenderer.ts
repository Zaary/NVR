import Vector from "../../util/type/Vector";
import RenderManager, { Renderer } from "../RenderManager";

export default class BackgroundRenderer extends Renderer {

    private pos: Vector;

    constructor(renderManager: RenderManager) {
        super(renderManager);
        
        this.pos = new Vector();

        renderManager.on("mousemove", event => {
            this.pos = new Vector(event.clientX, event.clientY);
        });
    }

    render(delta: number): void {
        const vec = this.renderManager.canvasToMap(this.pos);

        const mapCorner = this.renderManager.canvasToContext(new Vector(50, 30));

        // black displays cursor position on the map
        this.renderManager.context.lineJoin = "round";
        this.renderManager.context.font = "20px Poppins";
        this.renderManager.context.strokeStyle = "black";
        this.renderManager.context.fillStyle = "white";
        this.renderManager.context.lineWidth = 5;
        this.renderManager.context.strokeText(vec.toString(true), mapCorner.x, mapCorner.y);
        this.renderManager.context.fillText(vec.toString(true), mapCorner.x, mapCorner.y);
    }
}