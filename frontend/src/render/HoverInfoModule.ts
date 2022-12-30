import { core } from "../main";
import MathUtil from "../util/MathUtil";
import Vector from "../util/type/Vector";
import RenderManager, { Renderer } from "./RenderManager";

export default class HoverInfoModule extends Renderer {

    private mouse: Vector;

    constructor(renderManager: RenderManager) {
        super(renderManager);

        this.mouse = new Vector();

        this.renderManager.on("mousemove", event => {
            

            this.mouse = new Vector(event.clientX, event.clientY);

            //

            //console.log(object);
        });
    }

    render(delta: number): void {

        const mapPosition = this.renderManager.canvasToMap(this.renderManager.cameraPosition, this.mouse);
        const mm = this.renderManager.canvasToContext(this.renderManager.cameraPosition, this.mouse);
        
        const gridArrays = core.objectManager.getGridArrays(mapPosition.x, mapPosition.y, 100);

        const object = gridArrays.flat(1).filter(x => MathUtil.getDistance(mapPosition, x.position) < x.scale).sort((a, b) => MathUtil.getDistance(mapPosition, a.position) - MathUtil.getDistance(mapPosition, b.position))[0];

        if (object) {
            const objectRenderPosition = this.renderManager.mapToContext(this.renderManager.cameraPosition, object.position);

            this.renderManager.context.fillStyle = "rgba(0, 0, 0, 0.3)";
            this.renderManager.context.beginPath();
            this.renderManager.context.arc(objectRenderPosition.x, objectRenderPosition.y, object.scale, 0, Math.PI * 2);
            this.renderManager.context.closePath();
            this.renderManager.context.fill();
            this.renderManager.context.fillStyle = "white";
            this.renderManager.context.fillText(object.position.toString(true), mm.x, mm.y);
        }
    }
    
}