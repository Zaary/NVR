import { Core } from "../core/Core";
import config from "../data/moomoo/config";
import { NaturalObject, PlayerBuilding } from "../data/type/GameObject";
import MathUtil from "../util/MathUtil";
import Vector from "../util/type/Vector";
import RenderManager, { Renderer } from "./RenderManager";

export default class HoverInfoModule extends Renderer {

    private shadows: Record<string, HTMLCanvasElement>;
    private mouse: Vector;

    constructor(renderManager: RenderManager, core: Core) {
        super(renderManager, core);

        this.shadows = {};
        this.mouse = new Vector();

        function cloneCanvas(oldCanvas: HTMLCanvasElement) {
            var newCanvas = document.createElement('canvas');
            var context = newCanvas.getContext('2d')!;
        
            //set dimensions
            newCanvas.width = oldCanvas.width;
            newCanvas.height = oldCanvas.height;
        
            //apply the old canvas to the new one
            context.drawImage(oldCanvas, 0, 0);
        
            //return the new canvas
            return newCanvas;
        }

        function createShadowCopy(canvas: HTMLCanvasElement): HTMLCanvasElement {
            canvas = cloneCanvas(canvas);

            const factor = 0;

            const context = canvas.getContext("2d")!;
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            for (let i = 0; i < data.length; i += 4) {
                if (data[i + 3] != 255) continue;

                const original = MathUtil.combineColors([data[i] / 255, data[i + 1] / 255, data[i + 2] / 255, 1], [0, 0, 70 / 255, 0.35]);

                data[i] = Math.max(original[0] * 255 - factor, 0);
                data[i + 1] = Math.max(original[1] * 255 - factor, 0);
                data[i + 2] = Math.max(original[2] * 255 - factor, 0);
            }

            return canvas;
        }

        if (core && core.bundleAPI && core.bundleAPI.references) {
            const gameObjectSprites = (core.bundleAPI.references["gameObjectSprites"] ?? {})
            for (const sprite in gameObjectSprites) {
                this.shadows[sprite] = createShadowCopy(gameObjectSprites[sprite]);
            }
        }

        core.bundleAPI.on("refPropertySet", (name, property, value) => {
            if (name == "gameObjectSprites") {
                this.shadows[<string> property] = createShadowCopy(value);
            }
        });

        this.renderManager.on("mousemove", event => {
            

            this.mouse = new Vector(event.clientX, event.clientY);

            //

            //console.log(object);
        });
    }

    render(delta: number): void {
        
        const mapPosition = this.renderManager.canvasToMap(this.renderManager.cameraPosition, this.mouse);
        const mm = this.renderManager.canvasToContext(this.renderManager.cameraPosition, this.mouse);
        
        const gridArrays = this.core.objectManager.getGridArrays(mapPosition.x, mapPosition.y, 100);

        const object = gridArrays.flat(1).filter(x => MathUtil.getDistance(mapPosition, x.position) < x.scale).sort((a, b) => MathUtil.getDistance(mapPosition, a.position) - MathUtil.getDistance(mapPosition, b.position))[0];

        if (object) {
            const objectRenderPosition = this.renderManager.mapToContext(this.renderManager.cameraPosition, object.position);

            if (object instanceof NaturalObject) {
                var biomeID = (object.position.y >= config.mapScale - config.snowBiomeTop) ? 2 : ((object.position.y <= config.snowBiomeTop) ? 1 : 0);
                var tmpIndex = (object.type + "_" + object.scale + "_" + biomeID);

                if (this.shadows.hasOwnProperty(tmpIndex)) {
                    const sprite = this.shadows[tmpIndex];
                    this.renderManager.context.drawImage(sprite, objectRenderPosition.x - sprite.width / 2, objectRenderPosition.y - sprite.height / 2);
                }
            }

            /*this.renderManager.context.fillStyle = "rgba(0, 0, 0, 0.3)";
            this.renderManager.context.beginPath();
            this.renderManager.context.arc(objectRenderPosition.x, objectRenderPosition.y, object.scale, 0, Math.PI * 2);
            this.renderManager.context.closePath();
            this.renderManager.context.fill();*/
            this.renderManager.context.fillStyle = "white";
            this.renderManager.context.fillText(object.position.toString(true), mm.x, mm.y);
        }
    }
    
}