import { Core } from "../../core/Core";
import DrawUtil from "../../util/DrawUtil";
import { PacketCountEngine } from "../../util/engine/PacketCountEngine";
import Vector from "../../util/type/Vector";
import InterfaceModule from "../InterfaceModule";
import RenderManager from "../RenderManager";

export default class PacketGraphModule extends InterfaceModule {
    
    private graphValues: number[];

    constructor(core: Core, renderManager: RenderManager) {
        super(
            core,
            renderManager,
            new Vector(10, 43),
            new Vector(200, 170)
        );
        this.graphValues = [];
    }

    render(delta: number): void {
        const position = this.renderManager.canvasToContext(this.renderManager.staticCamera, this.position);

        this.graphValues.push(this.core.packetEngine.packetCount);
        if (this.graphValues.length > 320) this.graphValues.shift();

        DrawUtil.graph(this.renderManager.context, position.x, position.y, this.dimensions.x, this.dimensions.y, this.graphValues, PacketCountEngine.PACKET_LIMIT, 20, "#ffffff", 2, "#ffffff", 4, this.core.packetEngine.stats_pps_graph, "16px Hammersmith One", 16, true);
    }
}