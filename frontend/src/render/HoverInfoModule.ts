import e from "cors";
import { Core, currentPlayer } from "../core/Core";
import config from "../data/moomoo/config";
import { items } from "../data/moomoo/items";
import { NaturalObject, PlayerBuilding } from "../data/type/GameObject";
import DrawUtil from "../util/DrawUtil";
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

        /**
         * Copies canvas on a new canvas and expands it by 1 pixel
         * in every side (outline alghoritm has problems otherwise)
         */
        function cloneCanvas(oldCanvas: HTMLCanvasElement) {
            var newCanvas = document.createElement('canvas');
            var context = newCanvas.getContext('2d')!;
        
            //set dimensions
            newCanvas.width = oldCanvas.width + 2;
            newCanvas.height = oldCanvas.height + 2;
        
            //apply the old canvas to the new one
            context.drawImage(oldCanvas, 1, 1);
        
            //return the new canvas
            return newCanvas;
        }

        function createShadowCopy(canvas: HTMLCanvasElement, outline: string): HTMLCanvasElement {
            canvas = cloneCanvas(canvas);

            const factor = 20;

            const context = canvas.getContext("2d")!;
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            for (let i = 0; i < data.length; i += 4) {
                if (data[i + 3] != 255) continue;

                const original = MathUtil.combineColors([data[i], data[i + 1], data[i + 2], 1], [0, 0, 70, 0.35]);

                data[i] = Math.min(Math.max(0, original[0] + factor), 255);
                data[i + 1] = Math.min(Math.max(0, original[1] + factor), 255);
                data[i + 2] = Math.min(Math.max(0, original[2] + factor), 255);
            }

            context.putImageData(imageData, 0, 0);

            context.lineWidth = 3;
            context.strokeStyle = outline;
            context.lineJoin = "round";
            DrawUtil.strokeImageOutline(canvas, 1);

            return canvas;
        }

        /*const loadReference = (ref: string) => {
            if (core && core.bundleAPI && core.bundleAPI.references) {
                const sprites = (core.bundleAPI.references[ref] ?? {})
                for (const sprite in sprites) {
                    this.shadows[sprite] = createShadowCopy(sprites[sprite]);
                }
            }
        }
        loadReference("gameObjectSprites");
        loadReference("itemSprites");*/
        
        core.bundleAPI.on("refPropertySet", (name, property, value) => {
            if (name == "gameObjectSprites" || name == "itemSprites") {
                const prop = <string> (name == "gameObjectSprites" ? property : `item_${String(property)}`);;
                if (name == "itemSprites") {
                    this.shadows[prop + "_own"] = createShadowCopy(value, "rgba(64, 255, 64, 1)");
                    this.shadows[prop + "_team"] = createShadowCopy(value, "rgba(64, 64, 255, 1)");
                    this.shadows[prop + "_enemy"] = createShadowCopy(value, "rgba(255, 64, 64, 1)");
                } else {
                    this.shadows[prop] = createShadowCopy(value, "rgba(190, 190, 190, 1)");
                }
            }
        });

        this.renderManager.on("mousemove", event => {
            

            this.mouse = new Vector(event.clientX, event.clientY);

            //

            //console.log(object);
        });

        // force bundle to load all objects

        const fcs = (() => {
            const { getResSprite, getItemSprite } = core.bundleAPI.functions;
            return { getResSprite, getItemSprite };
        })();


        if (fcs.getResSprite && fcs.getItemSprite) {
            autoload(fcs.getResSprite, fcs.getItemSprite)
        } else {
            core.bundleAPI.on("functionReg", (name, func) => {
                if (name == "getResSprite" || name == "getItemSprite") {
                    fcs[name] = func;
                    if (fcs.getResSprite && fcs.getItemSprite) autoload(fcs.getResSprite, fcs.getItemSprite);
                }
            });
        }

        function autoload(getResSprite: Function, getItemSprite: Function) {
            function loadObjects(id: number, scale: number) {
                console.log("loading natural object", id);
                getResSprite({ type: id, scale, y: 0 }, { type: id, scale, y: 0 });
                getResSprite({ type: id, scale, y: config.snowBiomeTop + 500 }, { type: id, scale, y: config.snowBiomeTop + 500 });
                getResSprite({ type: id, scale, y: config.mapScale }, { type: id, scale, y: config.mapScale });
            }
    
            // load items
            for (const item of items.list) {
                console.log("loading item", item.id);
                getItemSprite(item, false);
            }
    
            for (const treeScale of config.treeScales) loadObjects(0, treeScale);
            for (const bushScale of config.bushScales) loadObjects(1, bushScale);
            for (const rockScale of config.rockScales) {
                loadObjects(2, rockScale);
                loadObjects(3, rockScale);
            }
        }
    }

    render(delta: number): void {
        
        const mapPosition = this.renderManager.canvasToMap(this.renderManager.cameraPosition, this.mouse);
        const mm = this.renderManager.canvasToContext(this.renderManager.cameraPosition, this.mouse);
        
        const gridArrays = this.core.objectManager.getGridArrays(mapPosition.x, mapPosition.y, 100);

        const object = gridArrays.flat(1).filter(x => MathUtil.getDistance(mapPosition, x.position) < x.scale).sort((a, b) => MathUtil.getDistance(mapPosition, a.position) - MathUtil.getDistance(mapPosition, b.position))[0];

        if (object) {
            const objectRenderPosition = this.renderManager.mapToContext(this.renderManager.cameraPosition, object.position).add(object.wiggle);

            const isNaturalObject = object instanceof NaturalObject;
            const isPlayerBuilding = object instanceof PlayerBuilding;
            const index = isNaturalObject ? 
            (object.type + "_" + object.scale + "_" + ((object.position.y >= config.mapScale - config.snowBiomeTop) ? 2 : ((object.position.y <= config.snowBiomeTop) ? 1 : 0)))
            : isPlayerBuilding ? `item_${object.stats.id}_${object.owner.sid == currentPlayer!.sid ? "own" : "enemy"}` : "unknown";

            if (this.shadows.hasOwnProperty(index)) {
                const sprite = this.shadows[index];
                this.renderManager.context.save();
                this.renderManager.context.translate(objectRenderPosition.x, objectRenderPosition.y);
                this.renderManager.context.rotate(object.dir);
                this.renderManager.context.drawImage(sprite, sprite.width / -2, sprite.height / -2);
                this.renderManager.context.restore();
            } else {
                console.log("uknown sprite:", index);
            }

            /*
            this.renderManager.context.fillStyle = "white";
            this.renderManager.context.fillText(object.position.toString(true), mm.x, mm.y);
            */
        }
    }
    
}