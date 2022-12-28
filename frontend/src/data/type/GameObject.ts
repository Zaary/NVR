class GameObject {

    public sid: number;
    public sentTo: {} = {};
    public gridLocations: any[] = [];
    public active: boolean = true;
    public doUpdate: boolean = false;
    public x: number = 0;
    public y: number = 0;
    public dir: number = 0;
    public xWiggle: number = 0;
    public yWiggle: number = 0;
    public scale: number = 0;
    public type: number | null = null;
    public id: number = -1;
    public owner: { sid: number } | null = null;
    public name: string = "";
    public isItem: boolean = false;
    public group: any = {};
    public health: number = 0;
    public layer: number = 0;
    public colDiv: number = 1;
    public blocker: number = 0;
    public ignoreCollision: boolean = false;
    public dontGather: boolean = false;
    public hideFromEnemy: boolean = false;
    public friction: any = null;
    public projDmg: number = 0;
    public dmg: number = 0;
    public pDmg: number = 0;
    public pps: number = 0;
    public zIndex: number = 0 || 0;
    public turnSpeed: number = 0;
    public req: any[] = [];
    public trap: boolean = false;
    public healCol: number = 0;
    public teleport: boolean = false;
    public boostSpeed: number = 0;
    public projectile: number = 0;
    public shootRange: number = 0;
    public shootRate: number = 0;
    public shootCount: number = 0;
    public spawnPoint: boolean = false;

    constructor(sid: number) {
        this.sid = sid;
    }
    
    init(x: number, y: number, dir: number, scale: number, type: number | null, data: any, owner: { sid: number } | null) {
        data = data ?? {};
        this.sentTo = {};
        this.gridLocations = [];
        this.active = true;
        this.doUpdate = data.doUpdate;
        this.x = x;
        this.y = y;
        this.dir = dir;
        this.xWiggle = 0;
        this.yWiggle = 0;
        this.scale = scale;
        this.type = type;
        this.id = data.id;
        this.owner = owner;
        this.name = data.name;
        this.isItem = (this.id!=undefined);
        this.group = data.group;
        this.health = data.health;
        this.layer = 2;
        if (this.group != undefined) {
            this.layer = this.group.layer;
        } else if (this.type == 0) {
            this.layer = 3;
        } else if (this.type == 2) {
            this.layer = 0;
        }  else if (this.type == 4) {
            this.layer = -1;
        }
        this.colDiv = data.colDiv||1;
        this.blocker = data.blocker;
        this.ignoreCollision = data.ignoreCollision;
        this.dontGather = data.dontGather;
        this.hideFromEnemy = data.hideFromEnemy;
        this.friction = data.friction;
        this.projDmg = data.projDmg;
        this.dmg = data.dmg;
        this.pDmg = data.pDmg;
        this.pps = data.pps;
        this.zIndex = data.zIndex||0;
        this.turnSpeed = data.turnSpeed;
        this.req = data.req;
        this.trap = data.trap;
        this.healCol = data.healCol;
        this.teleport = data.teleport;
        this.boostSpeed = data.boostSpeed;
        this.projectile = data.projectile;
        this.shootRange = data.shootRange;
        this.shootRate = data.shootRate;
        this.shootCount = this.shootRate;
        this.spawnPoint = data.spawnPoint;
    };

    // GET HIT:
    changeHealth(amount: number, doer: any) {
        this.health += amount;
        return (this.health <= 0);
    };

    // GET SCALE:
    getScale(sM: any = 0, ig: any = false) {
        sM = sM||1;
        return this.scale * ((this.isItem||this.type==2||this.type==3||this.type==4)
            ?1:(0.6*sM)) * (ig?1:this.colDiv);
    };

    // VISIBLE TO PLAYER:
    /*visibleToPlayer(player: Player) {
        return !(this.hideFromEnemy) || (this.owner && (this.owner == player ||
            (this.owner.team && player.team == this.owner.team)));
    };*/

// UPDATE:
    update(delta: number) {
        if (this.active) {
            if (this.xWiggle) {
                this.xWiggle *= Math.pow(0.99, delta);
            } if (this.yWiggle) {
                this.yWiggle *= Math.pow(0.99, delta);
            }
            if (this.turnSpeed) {
                this.dir += this.turnSpeed * delta;
            }
        }
    }
};

export { GameObject }