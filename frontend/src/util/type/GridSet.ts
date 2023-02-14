import { GameObject } from "../../data/type/GameObject";

export default class GridSet extends Set<GameObject> {
    constructor(values?: readonly any[] | null | undefined) {
        super(values);
    }

    addGrid(grid: GameObject[]) {
        for (let i = 0; i < grid.length; i++) this.add(grid[i]);
    }
}