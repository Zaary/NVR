import { Core } from "../core/Core";
import config from "../data/moomoo/config";
import { NaturalObject, PlayerBuilding } from "../data/type/GameObject";
import { PredictedPlacement } from "../manager/ObjectManager";
import RenderManager, { Renderer } from "./RenderManager";

export default class BuildingVisualisationModule extends Renderer {

    //private shadows: Record<string, HTMLCanvasElement>;
    //private mouse: Vev;

    constructor(renderManager: RenderManager, core: Core) {
        super(renderManager, core);

        //this.shadows = {};
        //this.mouse = new Vector();

        /*this.renderManager.on("mousemove", event => {
            this.mouse = new Vector(event.clientX, event.clientY);
        });*/
    }

    load(): Promise<void> {
        return Promise.resolve();
    }

    render(delta: number): void {
        const camera = this.renderManager.cameraPosition;
        const myPlayer = this.core.playerManager.myPlayer;
        
        const objects = this.core.objectManager.getVisibleBuildings(myPlayer.renderPos, camera).concat(this.core.objectManager.predictedPlacements);


        
        for (let i = 0; i < objects.length; i++) {
            const object = objects[i];
            const objectRenderPosition = this.renderManager.mapToContext(this.renderManager.cameraPosition, object.position).add(object.wiggle);

            const isPredicted = object instanceof PredictedPlacement;
            const isNaturalObject = object instanceof NaturalObject;
            const isTeamBuilding = object instanceof PlayerBuilding && this.core.playerManager.checkTeam(object.owner.sid);

            //this.renderManager.context.save();
            this.renderManager.context.moveTo(objectRenderPosition.x, objectRenderPosition.y);
            this.renderManager.context.beginPath();
            this.renderManager.context.arc(objectRenderPosition.x, objectRenderPosition.y, object.getScale(), 0, Math.PI * 2);
            this.renderManager.context.fillStyle = isPredicted ? "rgba(20, 251, 255, 0.3)" : isNaturalObject ? "rgba(37, 14, 18, 0.3)" : isTeamBuilding ? "rgba(92, 129, 50, 0.3)" : "rgba(129, 53, 50, 0.3)";
            this.renderManager.context.fill();
            //this.renderManager.context.restore();

            /*this.renderManager.context.save();
            this.renderManager.context.translate(objectRenderPosition.x, objectRenderPosition.y);
            this.renderManager.context.rotate(object.dir);
            this.renderManager.context.drawImage(sprite, sprite.width / -2, sprite.height / -2);
            this.renderManager.context.restore();*/
        }
    }
    
}