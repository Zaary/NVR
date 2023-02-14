interface IndexedItem {
    sid: number;
}

export class SidArray<T> extends Array<T extends IndexedItem ? T : never> {

    constructor(size: number = 0) {
        super(size);
    }

    findBySid(sid: number): T | null { 
        for (let i = 0, length = this.length; i < length; i++) {
            const item = this[i];
            if (item.sid === sid) {
                return item;
            }
        }
        return null;
    }

    remove(item: any): T | null {
        const index = this.indexOf(item);
        if (index > -1) {
            return this.splice(index, 1)[0];
        }
        return null;
    }

    removeBySid(sid: number) {
        this.remove(this.findBySid(sid));
    }

    clear() {
        this.length = 0;
    }
}