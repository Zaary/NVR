import { Core } from "../../core/Core";
import DrawUtil from "../../util/DrawUtil";
import { PacketCountEngine } from "../../util/engine/PacketCountEngine";
import Vector from "../../util/type/Vector";
import InterfaceModule from "../InterfaceModule";
import RenderManager from "../RenderManager";

export default class PacketCountModule extends InterfaceModule {
    
    constructor(core: Core, renderManager: RenderManager) {
        super(
            core,
            renderManager,
            new Vector(10, 10),
            new Vector(200, 18)
        );
    }

    render(delta: number): void {
        const position = this.renderManager.canvasToContext(this.renderManager.staticCamera, this.position);

        const packetPercent = this.core.packetEngine.packetCount2 / PacketCountEngine.PACKET_LIMIT2;
        DrawUtil.progressBar(this.renderManager.context, packetPercent, position.x, position.y, this.dimensions.x, this.dimensions.y, "#ff0004", "#474232", Math.round(packetPercent * 100) + "%", "#ffffff", "18px Hammersmith One");
    }
}