import "../style/main.scss";
import { Core } from "./core/Core";
import BackgroundRenderer from "./render/background/BackgroundRenderer";
import RenderManager from "./render/RenderManager";
import DocumentUtil from "./util/DocumentUtil";
import Logger from "./util/Logger";

const logger = new Logger("main");

DocumentUtil.init(document);

DocumentUtil.waitForElement("#gameCanvas", (element: Element) => {
    const renderManager = new RenderManager(<HTMLCanvasElement> element, 1920, 1080);

    renderManager.createRenderer("background", BackgroundRenderer);
    renderManager.startRender();
});

logger.info("initializing core");
const core = new Core();

export { core };