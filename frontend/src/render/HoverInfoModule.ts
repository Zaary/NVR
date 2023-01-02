import e from "cors";
import { Core } from "../core/Core";
import config from "../data/moomoo/config";
import { items } from "../data/moomoo/items";
import { NaturalObject, PlayerBuilding } from "../data/type/GameObject";
import NVRLoader from "../loader/NVRLoader";
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

        this.renderManager.on("mousemove", event => {
            this.mouse = new Vector(event.clientX, event.clientY);
        });
    }

    load() {
        NVRLoader.setStatus("HoverInfoModule", "...");
        return new Promise<void>(async (resolve, reject) => {
            /*if (CacheManager.cache.hasOwnProperty("HoverInfoModule")) {
                const data = CacheManager.cache.HoverInfoModule;
                for (const item in data) {
                    NVRLoader.setStatus("HoverInfoModule", `${item} (cached)`);
                    const canvasData = data[item];
                    const canvas = document.createElement("canvas");
                    const width = canvas.width = canvasData[0];
                    const height = canvas.height = canvasData[1];
                    const context = canvas.getContext("2d")!;
                    context.putImageData(new ImageData(canvasData[2], width, height, {}), 0, 0);
                    this.shadows[item] = canvas;
                }
            }*/

            const core = this.core;
            const renderManager = this.renderManager;

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

            async function createShadowCopy(canvas: HTMLCanvasElement, outline: string, spriteName: string) {
                canvas = cloneCanvas(canvas);

                const factor = 20;

                const context = canvas.getContext("2d")!;
                const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;

                NVRLoader.setStatus("HoverInfoModule", `Sprite ${spriteName} (${data.length})`);

                for (let i = 0; i < data.length; i += 4) {
                    if (data[i + 3] != 255) continue;

                    const original = MathUtil.combineColors([data[i], data[i + 1], data[i + 2], 1], [0, 0, 70, 0.35]);

                    data[i] = Math.min(Math.max(0, original[0] + factor), 255);
                    data[i + 1] = Math.min(Math.max(0, original[1] + factor), 255);
                    data[i + 2] = Math.min(Math.max(0, original[2] + factor), 255);
                }

                context.putImageData(imageData, 0, 0);

                context.lineWidth = 4;
                context.strokeStyle = outline;
                context.lineJoin = "round";

                const kokot = await NVRLoader.workerExecute("util.outline", [context.getImageData(0, 0, canvas.width, canvas.height).data, canvas.width, 1]);
                
                context.beginPath();
                context.moveTo(kokot[0][0], kokot[0][4]);
                for (let i = 0; i < kokot.length; i++) {
                    const point = kokot[i];
                    context.lineTo(point[0], point[1]);
                }
                context.closePath();
                context.stroke();

                //DrawUtil.strokeImageOutline(canvas, 1);

                return canvas;
            }

            async function autoload(this: HoverInfoModule, getResSprite: Function, getItemSprite: Function) {
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

                for (const item of queue) {
                    const [name, property, value] = item;
                    const prop = <string> (name == "gameObjectSprites" ? property : `item_${String(property)}`);
                    if (name == "itemSprites") {
                        if (!this.shadows[prop + "_own"]) this.shadows[prop + "_own"] = await createShadowCopy(value, "rgba(64, 255, 64, 1)", prop + "_own");
                        if (!this.shadows[prop + "_team"]) this.shadows[prop + "_team"] = await createShadowCopy(value, "rgba(64, 64, 255, 1)", prop + "_team");
                        if (!this.shadows[prop + "_enemy"]) this.shadows[prop + "_enemy"] = await createShadowCopy(value, "rgba(255, 64, 64, 1)", prop + "_enemy");
                    } else {
                        if (!this.shadows[prop]) this.shadows[prop] = await createShadowCopy(value, "rgba(190, 190, 190, 1)", prop);
                    }
                }

                /*CacheManager.cacheItem("HoverInfoModule", Object.fromEntries(Object.entries(this.shadows).map(([id, canvas]: [string, HTMLCanvasElement]) => {
                    const context = canvas.getContext("2d")!;
                    const data = context.getImageData(0, 0, canvas.width, canvas.height).data;
                    return [id, [canvas.width, canvas.height, data]];
                })));
                CacheManager.saveCache();*/

                resolve();
            }

            const loadReference = async (ref: string) => {
                if (core && core.bundleAPI && core.bundleAPI.references) {
                    const sprites = (core.bundleAPI.references[ref] ?? {})
                    for (const sprite in sprites) {
                        if (ref == "itemSprites") {
                            if (!this.shadows[sprite + "_own"]) this.shadows[sprite + "_own"] = await createShadowCopy(sprites[sprite], "rgba(64, 255, 64, 1)", sprite + "_own");
                            if (!this.shadows[sprite + "_team"]) this.shadows[sprite + "_team"] = await createShadowCopy(sprites[sprite], "rgba(64, 64, 255, 1)", sprite + "_team");
                            if (!this.shadows[sprite + "_enemy"]) this.shadows[sprite + "_enemy"] = await createShadowCopy(sprites[sprite], "rgba(255, 64, 64, 1)", sprite + "_enemy");
                        } else {
                            if (!this.shadows[sprite]) this.shadows[sprite] = await createShadowCopy(sprites[sprite], "rgba(190, 190, 190, 1)", sprite);
                        }
                    }
                }
            }

            console.log(core.bundleAPI.references);
            await loadReference("gameObjectSprites");
            await loadReference("itemSprites");

            let queue: [string, string, HTMLCanvasElement][] = [];
            
            core.bundleAPI.on("refPropertySet", async (name, property, value) => {
                if (name == "gameObjectSprites" || name == "itemSprites") {
                    queue.push([name, <string> property, value]);
                }
            });

            // force bundle to load all objects

            const fcs = (() => {
                const { getResSprite, getItemSprite } = core.bundleAPI.functions;
                return { getResSprite, getItemSprite };
            })();

            await new Promise<void>((resolve, reject) => {
                if (fcs.getResSprite && fcs.getItemSprite) {
                    resolve();
                } else {
                    core.bundleAPI.on("functionReg", async (name, func) => {
                        if (name == "getResSprite" || name == "getItemSprite") {
                            fcs[name] = func;
                            if (fcs.getResSprite && fcs.getItemSprite) resolve();
                        }
                    });
                }
            });
            
            await autoload.call(this, fcs.getResSprite, fcs.getItemSprite);
        });
    }

    render(delta: number): void {
        
        const mapPosition = this.renderManager.canvasToMap(this.renderManager.cameraPosition, this.mouse);
        const mm = this.renderManager.canvasToContext(this.renderManager.cameraPosition, this.mouse);
        
        const gridArrays = this.core.objectManager.getGridArrays(mapPosition.x, mapPosition.y, 100);

        const object = gridArrays.flat(1).filter(x => MathUtil.getDistance(mapPosition, x.position) < x.scale).sort((a, b) => MathUtil.getDistance(mapPosition, a.position) - MathUtil.getDistance(mapPosition, b.position))[0];

        const myPlayer = this.core.playerManager.myPlayer;

        if (object) {
            const objectRenderPosition = this.renderManager.mapToContext(this.renderManager.cameraPosition, object.position).add(object.wiggle);

            const isNaturalObject = object instanceof NaturalObject;
            const isPlayerBuilding = object instanceof PlayerBuilding;
            const index = isNaturalObject ? 
            (object.type + "_" + object.scale + "_" + ((object.position.y >= config.mapScale - config.snowBiomeTop) ? 2 : ((object.position.y <= config.snowBiomeTop) ? 1 : 0)))
            : isPlayerBuilding ? `item_${object.stats.id}_${object.owner.sid ==  myPlayer.sid ? "own" : "enemy"}` : "unknown";

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