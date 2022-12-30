import "../style/main.scss";
import { Core } from "./core/Core";
import HoverInfoModule from "./render/HoverInfoModule";
import RenderManager from "./render/RenderManager";
import DocumentUtil from "./util/DocumentUtil";
import Logger from "./util/Logger";

const logger = new Logger("main");

DocumentUtil.init(document);

logger.info("initializing core");
const core = new Core();

export { core };