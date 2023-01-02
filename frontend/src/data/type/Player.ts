import { util } from "../type/MoomooUtil";
import accessories, { Accessory } from "../moomoo/accessories";
import config from "../moomoo/config";
import hats, { Hat } from "../moomoo/hats";
import { items } from "../moomoo/items";
import Vector from "../../util/type/Vector";

class Inventory {

	public weapons: [number, number | null];
	public items: number[];

	constructor() {
		this.weapons = [0, null];
		this.items = [0, 3, 6, 10];
	}
	
	reset() {
		this.weapons = [0, null];
		this.items = [0, 3, 6, 10];
	}
}

class Player {
	
    public id: string;
    public sid: number;
    public name: string;
    public team: string | null;

    /*public hat: Hat;
    public tail: Accessory;*/

	//public isLeader: boolean = false;
	
	//public serverPosition: Vector; // x2, y2
	//public clientPosition: Vector; // x1, y1
	//public renderPosition: Vector; // x, y

	public serverPos: Vector;
	public renderPos: Vector;
	public lerpPos: Vector;
	
	/*public zIndex: number = 0;
	public xVel: number = 0;
	public yVel: number = 0;*/

	public dir: number = 0;

	public maxHealth: number = 100;
	public health: number = this.maxHealth;


	public skinColor: number;

	public scale: number = config.playerScale;
	public speed: number = config.playerSpeed;

	public inventory: Inventory;

	public reloads: { [key: number]: number } = {};
    
	public visible: boolean = false;
    forcePos: any;
    
    lastTickPosX: number;
    lastTickPosY: number;
    serverDir: any;

	dt: any;
    
    constructor(id: string, sid: number, name: string, position: Vector, dir: number, health: number, maxHealth: number, scale: number, skinColor: number) {
        this.id = id;
        this.sid = sid;
		this.name = name;
		this.serverPos = new Vector;
		this.renderPos = position;
		this.lerpPos = new Vector;
		this.dir = dir;
		this.health = health;
		this.maxHealth = maxHealth;
		this.scale = scale;
		this.skinColor = skinColor;

        this.team = null;
		
		this.lastTickPosX = 0;
		this.lastTickPosY = 0;

		this.inventory = new Inventory();
    }

	updateData(id: string, sid: number, name: string, position: Vector, dir: number, health: number, maxHealth: number, scale: number, skinColor: number) {
		this.id = id;
		this.sid = sid;
		this.name = name;
		this.serverPos = position;
		this.dir = dir;
		this.health = health;
		this.maxHealth = maxHealth;
		this.scale = scale;
		this.skinColor = skinColor;
	};
}

class ClientPlayer extends Player {

}

export { Player, ClientPlayer };