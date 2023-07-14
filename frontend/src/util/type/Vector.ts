export default class Vector {

    public x: number;
    public y: number;
    private frozen: boolean;

    constructor(x?: number, y?: number) {
        this.x = x ?? 0;
        this.y = y ?? 0;
        this.frozen = false;
    }

    isNull() {
        return this.x == 0 && this.y == 0;
    }

    isNaN() {
        return isNaN(this.x) || isNaN(this.y);
    }

    add(vector: Vector): this;
    add(x: number, y: number): this;
    add(amount: number): this;

    add(param1: Vector | number, param2?: number): this {
        if (this.frozen) return this;
        
        if (typeof param1 === "object") {
            this.x += param1.x;
            this.y += param1.y;
        } else if (typeof param2 === "number") {
            this.x += param1;
            this.y += param2;
        } else {
            this.x += param1;
            this.y += param1;
        }
        return this;
    }

    subtract(vector: Vector): this;
    subtract(x: number, y: number): this;
    subtract(amount: number): this;

    subtract(param1: Vector | number, param2?: number): this {
        if (this.frozen) return this;
        
        if (typeof param1 === "object") {
            this.x -= param1.x;
            this.y -= param1.y;
        } else if (typeof param2 === "number") {
            this.x -= param1;
            this.y -= param2;
        } else {
            this.x -= param1;
            this.y -= param1;
        }
        return this;
    }

    multiply(vector: Vector): this;
    multiply(x: number, y: number): this;
    multiply(amount: number): this;

    multiply(param1: Vector | number, param2?: number): this {
        if (this.frozen) return this;
        
        if (typeof param1 === "object") {
            this.x *= param1.x;
            this.y *= param1.y;
        } else if (typeof param2 === "number") {
            this.x *= param1;
            this.y *= param2;
        } else {
            this.x *= param1;
            this.y *= param1;
        }
        return this;
    }

    divide(vector: Vector): this;
    divide(x: number, y: number): this;
    divide(amount: number): this;

    divide(param1: Vector | number, param2?: number): this {
        if (this.frozen) return this;
        
        if (typeof param1 === "object") {
            this.x /= param1.x;
            this.y /= param1.y;
        } else if (typeof param2 === "number") {
            this.x /= param1;
            this.y /= param2;
        } else {
            this.x /= param1;
            this.y /= param1;
        }
        return this;
    }

    set(vector: Vector): this;
    set(x: number, y: number): this;
    set(amount: number): this;

    set(param1: Vector | number, param2?: number): this {
        if (this.frozen) return this;
        
        if (typeof param1 === "object") {
            this.x = param1.x;
            this.y = param1.y;
        } else if (typeof param2 === "number") {
            this.x = param1;
            this.y = param2;
        } else {
            this.x = param1;
            this.y = param1;
        }
        return this;
    }

    move(amount: number) {
        if (this.frozen) return this;
        
        this.directionMove(this.direction(), amount);
        return this;
    }

    directionMove(direction: number, amount: number): this {
        if (this.frozen) return this;
        
        this.x += Math.cos(direction) * amount;
        this.y += Math.sin(direction) * amount;
        return this;
    }

    clone(): Vector {
        return new Vector(this.x, this.y);
    }

    length(): number {
        return Math.hypot(this.x, this.y);
    }

    direction(): number {
        return Math.atan2(this.y, this.x);
    }

    freeze(): this {
        this.frozen = true;
        return this;
    }

    toString(round?: boolean): string {
        return "[" + (round ? Math.round(this.x) : this.x) + ", " + (round ? Math.round(this.y) : this.y) + "]";
    }
}