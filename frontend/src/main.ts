import "../style/main.scss";
import { Core } from "./core/Core";
import HoverInfoModule from "./render/HoverInfoModule";
import RenderManager from "./render/RenderManager";
import DocumentUtil from "./util/DocumentUtil";
import Logger from "./util/Logger";

const logger = new Logger("main");

if (document && document instanceof Node) {
    DocumentUtil.init(document);
} else {
    window.addEventListener("load", () => DocumentUtil.init(document));
}

logger.info("initializing core");
const core = new Core();

if (!core) {
    logger.error("critical: core failed to load!");
    alert("critical: core failed to load! please report this to developers!");
}

export { core };