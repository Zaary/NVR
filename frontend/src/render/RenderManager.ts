import { EventEmitter } from "tsee";
import { Core } from "../core/Core";
import config from "../data/moomoo/config";
import { util } from "../data/type/MoomooUtil";
import { Player } from "../data/type/Player";
import MathUtil from "../util/MathUtil";
import { Class } from "../util/type/Definitions";
import Vector from "../util/type/Vector";
import InterfaceModule from "./InterfaceModule";

type Dimensions = {
    width: number;
    height: number;
}

type RendererID = "background";
type InterfaceRendererID = "packetCount" | "packetGraph";

export abstract class Renderer {
    protected renderManager: RenderManager;
    protected core: Core;

    constructor(renderManager: RenderManager, core: Core) {
        this.renderManager = renderManager;
        this.core = core;
    }

    abstract render(delta: number): void;
    abstract load(): Promise<void>;
}

export default class RenderManager extends EventEmitter<{
    mousemove: (event: MouseEvent) => void;
    mousedown: (event: MouseEvent) => void;
    mouseup: (event: MouseEvent) => void;
}> {
    private core: Core;
    private canvas: HTMLCanvasElement;
    public context: CanvasRenderingContext2D;
    public transformMatrix: DOMMatrix;
    public readonly defaultMatrix: DOMMatrixReadOnly;
    public viewport: Dimensions;
    private canvasVertices = [new Vector, new Vector];
    public cameraPosition: Vector;
    public staticCamera: Vector;

    private renderers: Map<RendererID, Renderer>;
    private interfaceRenderers: Map<InterfaceRendererID, InterfaceModule>;
    private lastRender: number;

    constructor(core: Core, canvas: HTMLCanvasElement, width: number, height: number) {
        super();
        this.core = core;
        this.canvas = canvas;
        this.context = canvas.getContext("2d")!;
        this.transformMatrix = new DOMMatrix([1, 0, 0, 1, 0, 0]);
        this.defaultMatrix = new DOMMatrixReadOnly([1, 0, 0, 1, 0, 0]);
        this.viewport = { width, height };
        this.cameraPosition = new Vector(14400 / 2, 14400 / 2);
        this.staticCamera = new Vector(14400 / 2, 14400 / 2);

        this.renderers = new Map();
        this.interfaceRenderers = new Map();
        this.lastRender = 0;

        const resizeListener = (() => {
            //canvas.width = window.innerWidth;
            //canvas.height = window.innerHeight;
            this.updateTransformMatrix();
            //this.context.setTransform(this.transformMatrix);
            this.canvasVertices = [
                this.canvasToContext(this.cameraPosition, 0, 0),
                this.canvasToContext(this.cameraPosition, window.innerWidth, window.innerHeight)
            ];
        });

        resizeListener();

        window.addEventListener("resize", resizeListener);
        canvas.addEventListener("mousemove", e => this.emit("mousemove", e));
        canvas.addEventListener("mousedown", e => this.emit("mousedown", e));
        canvas.addEventListener("mouseup", e => this.emit("mouseup", e));
    }

    updateCamera(delta: number, targetPosition: Vector) {

        const distance = MathUtil.getDistance(this.cameraPosition, targetPosition);
        const direction = MathUtil.getDirection(this.cameraPosition, targetPosition);
        const speed = distance * 0.01 * delta;
        
        if (distance > 0.05) {
            this.cameraPosition.directionMove(direction, speed);
        } else {
            this.cameraPosition.set(targetPosition);
        }

        this.staticCamera.set(targetPosition);

        this.core.playerManager.playerList.forEach((player: Player) => {
            if (player.visible) {
                if (player.forcePos && !player.renderPos.isNaN()) {
                    player.renderPos.set(player.serverPos);
                } else {
                    // lerp position
                    player.dt += delta;

                    const overTick = Math.min(1.7, player.dt / 170);
                    /*player.renderPosition.set(
                        util.lerp(player.clientPosition.x, player.serverPosition.x, overTick),
                        util.lerp(player.clientPosition.y, player.serverPosition.y, overTick)
                    );*/

                    if (player.lerpPos.isNaN()) player.lerpPos.set(player.serverPos);

                    player.renderPos = new Vector();
                    player.renderPos.x = util.lerp(player.lerpPos.x, player.serverPos.x, overTick);
                    player.renderPos.y = util.lerp(player.lerpPos.y, player.serverPos.y, overTick);

                    //console.log(player.renderPosition.toString(true));

                    // lerp direction
                    /*const positionDelta = player.positionTimestamp - player.lastPositionTimestamp;
                    const tickDelta = lastTime - player.lastPositionTimestamp;
                    const ratio = tickDelta / positionDelta;
                    player.dir = MathHelper.lerpAngle(player.serverDir, player.lastDir, Math.min(1.2, ratio));*/
                }
            }
        })
    }

    updateTransformMatrix() {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        let scale = Math.max(windowWidth / this.viewport.width, windowHeight / this.viewport.height);
        this.transformMatrix.a = this.transformMatrix.d = scale;
        this.transformMatrix.e = (windowWidth - this.viewport.width * scale) / 2;
        this.transformMatrix.f = (windowHeight - this.viewport.height * scale) / 2;
    }

    clear() {
        this.context.clearRect(
            this.canvasVertices[0].x,
            this.canvasVertices[0].y,
            this.canvasVertices[1].x - this.canvasVertices[0].x,
            this.canvasVertices[1].y - this.canvasVertices[0].y
        )
    }

    private render() {
        if (!this.core.loaded) return;

        const currentMs = Date.now();
        const delta = currentMs - this.lastRender;
        this.lastRender = currentMs;

        const myPlayer = this.core.playerManager.myPlayer;

        if (myPlayer && myPlayer.renderPos) {
            this.updateCamera(delta, /*new Vector(myPlayer.renderPos.x, myPlayer.renderPos.y)*/myPlayer.renderPos);
            //console.log(myPlayer.renderPos);
        }

        //this.clear();
        this.renderers.forEach(renderer => { renderer.render(delta) });
        this.interfaceRenderers.forEach(renderer => { renderer.render(delta) });
        
        this.core.moduleManager.onRender(delta);
    }

    async createRenderer(id: RendererID, rendererClass: Class<Renderer>, core: Core) {
        const instance = new rendererClass(this, core);
        await instance.load();
        this.renderers.set(id, instance);
    }

    async createInterfaceRenderer(id: InterfaceRendererID, rendererClass: Class<InterfaceModule>, core: Core) {
        this.interfaceRenderers.set(id, new rendererClass(core, this));
    }

    createRenderHook() {
        this.lastRender = Date.now();
        const _ = this;

        const originalAnimFrame = window.requestAnimationFrame;
        window.requestAnimFrame = window.requestAnimationFrame = function(callback: FrameRequestCallback): number {
            // call moomoo's renderer
            const result = originalAnimFrame.call(this, callback);
            // then call our renderer
            _.render();
            // and finally return result from moomoo's renderer
            return result;
        }

        originalAnimFrame(() => this.render());
    }

    private getCameraOffset(camera: Vector) {
        return camera.clone().subtract(this.viewport.width / 2, this.viewport.height / 2);
    }

    mapToContext(camera: Vector, vector: Vector): Vector;
    mapToContext(camera: Vector, x: number, y: number): Vector;

    /**
     * Projects given position from the map onto the canvas
     */
     mapToContext(camera: Vector, param1: Vector | number, param2?: number): Vector {
        const offset = this.getCameraOffset(camera);
        if (typeof param1 === "object") {
            return param1.clone().subtract(offset);
        } else {
            return new Vector(param1 - offset.x, param2! - offset.y);
        }
    }

    canvasToMap(camera: Vector, vector: Vector): Vector;
    canvasToMap(camera: Vector, x: number, y: number): Vector;

    /**
     * Gives mouse map position from the mouse position on canvas
     */
    canvasToMap(camera: Vector, param1: Vector | number, param2?: number): Vector {
        const offset = this.getCameraOffset(camera);
        if (typeof param1 === "object") {
            return param1
                .clone()
                .subtract(this.transformMatrix.e, this.transformMatrix.f)
                .divide(this.transformMatrix.a, this.transformMatrix.d)
                .add(offset)
        } else {
            return new Vector(
                (param1 - this.transformMatrix.e) / this.transformMatrix.a + offset.x,
                (param2! - this.transformMatrix.f) / this.transformMatrix.d + offset.y
            );
        }
    }

    canvasToContext(camera: Vector, vector: Vector): Vector;
    canvasToContext(camera: Vector, x: number, y: number): Vector;

    canvasToContext(camera: Vector, param1: Vector | number, param2?: number) {
        if (typeof param1 === "object") {
            return this.mapToContext(camera, this.canvasToMap(camera, param1));
        } else {
            return this.mapToContext(camera, this.canvasToMap(camera, param1, param2!));
        }
    }
}