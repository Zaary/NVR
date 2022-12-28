export class SidArray extends Array {

    constructor(size: number = 0) {
        super(size);
    }

    findBySid(sid: number) {
        for (let i = 0, length = this.length; i < length; i++) {
            const player = this[i];
            if (player.sid === sid) {
                return player;
            }
        }
        return null;
    }

    remove(item: any) {
        const index = this.indexOf(item);
        if (index > -1) {
            this.splice(index, 1);
        }
    }

    removeBySid(sid: number) {
        this.remove(this.findBySid(sid));
    }
}