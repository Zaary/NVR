import { EventEmitter } from "tsee";
import MathUtil from "../util/MathUtil";
import { Class } from "../util/type/Definitions";
import Vector from "../util/type/Vector";
import BackgroundRenderer from "./background/BackgroundRenderer";

type Dimensions = {
    width: number;
    height: number;
}

type RendererID = "background";

export abstract class Renderer {
    protected renderManager: RenderManager;

    constructor(renderManager: RenderManager) {
        this.renderManager = renderManager;
    }

    abstract render(delta: number): void;
}

export default class RenderManager extends EventEmitter<{
    mousemove: (event: MouseEvent) => void;
    mousedown: (event: MouseEvent) => void;
    mouseup: (event: MouseEvent) => void;
}> {
    private canvas: HTMLCanvasElement;
    public context: CanvasRenderingContext2D;
    public transformMatrix: DOMMatrix;
    public readonly defaultMatrix: DOMMatrixReadOnly;
    public viewport: Dimensions;
    private canvasVertices = [new Vector, new Vector];
    public cameraPosition: Vector;

    private renderers: Map<RendererID, Renderer>;
    private lastRender: number;

    constructor(canvas: HTMLCanvasElement, width: number, height: number) {
        super();
        this.canvas = canvas;
        this.context = canvas.getContext("2d")!;
        this.transformMatrix = new DOMMatrix([1, 0, 0, 1, 0, 0]);
        this.defaultMatrix = new DOMMatrixReadOnly([1, 0, 0, 1, 0, 0]);
        this.viewport = { width, height };
        this.cameraPosition = new Vector(0, 0);

        this.renderers = new Map();
        this.lastRender = 0;

        const resizeListener = (() => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            this.updateTransformMatrix();
            this.context.setTransform(this.transformMatrix);
            this.canvasVertices = [
                this.canvasToContext(0, 0),
                this.canvasToContext(window.innerWidth, window.innerHeight)
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
        const speed = Math.min(distance * 0.01 * delta, distance);
        
        if (distance > 0.05) {
            this.cameraPosition.directionMove(direction, speed);
        } else {
            this.cameraPosition.set(targetPosition);
        }
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
        const currentMs = Date.now();
        const delta = currentMs - this.lastRender;
        this.lastRender = currentMs;

        //this.clear();
        this.renderers.forEach(renderer => { renderer.render(delta) });

        window.requestAnimationFrame(() => this.render());
    }

    createRenderer(id: RendererID, rendererClass: Class<Renderer>) {
        this.renderers.set(id, new rendererClass(this));
    }

    startRender() {
        this.lastRender = Date.now();
        window.requestAnimationFrame(() => this.render());
    }

    private getCameraOffset() {
        return new Vector(this.cameraPosition.x - (this.viewport.width / 2), this.cameraPosition.y - (this.viewport.height / 2));
    }

    mapToContext(vector: Vector): Vector;
    mapToContext(x: number, y: number): Vector;

    /**
     * Projects given position from the map onto the canvas
     */
     mapToContext(param1: Vector | number, param2?: number): Vector {
        const offset = this.getCameraOffset();
        if (typeof param1 === "object") {
            return param1.clone().subtract(offset);
        } else {
            return new Vector(param1 - offset.x, param2! - offset.y);
        }
    }

    canvasToMap(vector: Vector): Vector;
    canvasToMap(x: number, y: number): Vector;

    /**
     * Gives mouse map position from the mouse position on canvas
     */
    canvasToMap(param1: Vector | number, param2?: number): Vector {
        const offset = this.getCameraOffset();
        if (typeof param1 === "object") {
            return param1
                .clone()
                .subtract(this.transformMatrix.e, this.transformMatrix.f)
                .divide(this.transformMatrix.a, this.transformMatrix.d)
                .add(offset);
        } else {
            return new Vector(
                (param1 - this.transformMatrix.e) / this.transformMatrix.a + offset.x,
                (param2! - this.transformMatrix.f) / this.transformMatrix.d + offset.y
            );
        }
    }

    canvasToContext(vector: Vector): Vector;
    canvasToContext(x: number, y: number): Vector;

    canvasToContext(param1: Vector | number, param2?: number) {
        if (typeof param1 === "object") {
            return this.mapToContext(this.canvasToMap(param1));
        } else {
            return this.mapToContext(this.canvasToMap(param1, param2!));
        }
        
    }
}