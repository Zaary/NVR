import "../style/main.scss";
import { Core } from "./core/Core";
import HoverInfoModule from "./render/HoverInfoModule";
import RenderManager from "./render/RenderManager";
import { inject } from "./socket/Connection";
import Logger from "./util/Logger";

const logger = new Logger("main");

inject();

logger.info("initializing core");
const core = new Core();

if (!core) {
    logger.error("critical: core failed to load!");
    alert("critical: core failed to load! please report this to developers!");
}

window.addEventListener("DOMContentLoaded", () => {
    console.log("renderer init");
    core.initializeRenderer(<HTMLCanvasElement> document.getElementById("gameCanvas"));
});

window.captchaCallback = function() {};

//let observerTasks = 2;
const observer = new MutationObserver((mutations: MutationRecord[], observer: MutationObserver) => {
    for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
            if ((<HTMLElement> node).tagName === "SCRIPT" && /bundle\.js$/.test((<HTMLScriptElement> node).src)) {
                core.patchBundle((<HTMLScriptElement> node).src);

                // firefox executes script even if its removed
                node.addEventListener("beforescriptexecute", (e) => e.preventDefault(), { once: true });

                node.parentElement!.removeChild(node);
                observer.disconnect();
            }/* else if ((<HTMLElement> node).tagName == "CANVAS" && (<HTMLCanvasElement> node).id == "gameCanvas") {
                core.initializeRenderer(<HTMLCanvasElement> node);
                observerTasks--;
            }

            if (observerTasks <= 0) observer.disconnect();*/
        }
    }
});

observer.observe(document, {
    subtree: true,
    childList: true
});

export { core };