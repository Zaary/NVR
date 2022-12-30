import { core } from "../../main";
import DrawUtil from "../../util/DrawUtil";
import { PacketCountEngine } from "../../util/engine/PacketCountEngine";
import Vector from "../../util/type/Vector";
import InterfaceModule from "../InterfaceModule";
import RenderManager from "../RenderManager";

export default class PacketCountModule extends InterfaceModule {
    
    constructor(renderManager: RenderManager) {
        super(
            renderManager,
            new Vector(10, 10),
            new Vector(200, 18) // ye go ahead ill create a class for it
        ); // and sidneys code is garbage so im rewriting it
    }//alr

    render(delta: number): void {
        const position = this.renderManager.canvasToContext(this.renderManager.staticCamera, this.position);

        const packetPercent = core.packetEngine.packetCount2 / PacketCountEngine.PACKET_LIMIT2;
        DrawUtil.progressBar(this.renderManager.context, packetPercent, position.x, position.y, this.dimensions.x, this.dimensions.y, "#ff0004", "#474232", Math.round(packetPercent * 100) + "%", "#ffffff", "18px Hammersmith One");
    }
}