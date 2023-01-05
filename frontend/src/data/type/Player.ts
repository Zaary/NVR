import { util } from "../type/MoomooUtil";
import accessories, { Accessory } from "../moomoo/accessories";
import config from "../moomoo/config";
import hats, { Hat } from "../moomoo/hats";
import { Item, items } from "../moomoo/items";
import Vector from "../../util/type/Vector";
import { MeleeWeapon, Weapon, weaponList } from "./Weapon";
import MathUtil from "../../util/MathUtil";
import MovementProcessor from "../../util/processor/MovementProcessor";
import ObjectManager from "../../manager/ObjectManager";
import { NaturalObject } from "./GameObject";

class Inventory {
//i need range of it xd
	public weapons: [number, number | null];
	public items: number[];

	public heldItem: Weapon | Item;
	public weaponSelected: Weapon;

	constructor() {
		this.weapons = [0, null];
		this.items = [0, 3, 6, 10];
		this.heldItem = weaponList[0];
		this.weaponSelected = weaponList[0];
	}
	
	reset() {
		this.weapons = [0, null];
		this.items = [0, 3, 6, 10];
		this.heldItem = weaponList[0];
		this.weaponSelected = weaponList[0];
	}
}

interface State {
	isTrapped: boolean;
	buildIndex: number;
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
	public lastTickServerPos: Vector;
	public renderPos: Vector;
	public lerpPos: Vector;

	public velocity: Vector;

	public movementProcessor: MovementProcessor;
	
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

	public state: State;
    
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
		this.lastTickServerPos = new Vector;
		this.renderPos = position;
		this.lerpPos = new Vector;
		this.velocity = new Vector;
		this.dir = dir;
		this.health = health;
		this.maxHealth = maxHealth;
		this.scale = scale;
		this.skinColor = skinColor;

        this.team = null;
		
		this.lastTickPosX = 0;
		this.lastTickPosY = 0;

		this.inventory = new Inventory();

		this.movementProcessor = new MovementProcessor(this);

		this.state = {
			isTrapped: false,
			buildIndex: -1
		}
    }

	updatePlayer(objectManager: ObjectManager, x: number, y: number, dir: number, buildIndex: number, weaponIndex: number, weaponVariant: number, team: string, isLeader: boolean, skinIndex: number, tailIndex: number, iconIndex: boolean, zIndex: number) {
		this.lerpPos = this.renderPos.clone();
		this.lastTickServerPos = this.serverPos.clone();
		this.serverPos = new Vector(x, y);
		this.velocity = this.serverPos.clone().subtract(this.lastTickServerPos);
		this.dir = dir;
		this.state.buildIndex = buildIndex;

		const holdsWeapon = buildIndex === -1;
		this.inventory.heldItem = holdsWeapon ? weaponList[weaponIndex] : items.list[buildIndex];
		this.inventory.weaponSelected = weaponList[weaponIndex];

                    /*player.buildIndex = playerData[4];
                    player.weaponIndex = playerData[5];
                    player.weaponVariant = playerData[6];
                    player.team = playerData[7];
                    player.isLeader = playerData[8];
                    player.skinIndex = playerData[9];
                    player.tailIndex = playerData[10];
                    player.iconIndex = playerData[11];
                    player.zIndex = playerData[12];*/
                    //player.visible = true;

		//this.movementProcessor.update(this.dt);
		this.dt = 0;

		this.state.isTrapped = false;

		// objects
		const grids = objectManager.getGridArrays(this.serverPos.x, this.serverPos.y, this.scale + this.velocity.length() * 2).flat(1);
		for (let i = 0; i < grids.length; i++) {
			const object = grids[i];
			if (object instanceof NaturalObject) continue;

			const isCollision = MathUtil.getDistance(this.serverPos, object.position) < this.scale + object.getScale();

			if (object.type === 15 && isCollision) this.state.isTrapped = true;
		}
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