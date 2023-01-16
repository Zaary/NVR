import "../style/main.scss";
import "../style/moomoo.scss";

import { Core } from "./core/Core";
import NVRLoader from "./loader/NVRLoader";
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
    console.log("sex successful.");
}

async function initializeRenderer() {
    await core.initializeRenderer(<HTMLCanvasElement> document.getElementById("gameCanvas"));
    _resolve();
}

window.addEventListener("DOMContentLoaded", async () => initializeRenderer());

let _resolve: Function;
const promise = new Promise<void>((resolve, reject) => {
    _resolve = resolve;
});

const observer = new MutationObserver((mutations: MutationRecord[], observer: MutationObserver) => {
    for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
            if (node instanceof HTMLBodyElement) {
                NVRLoader.start();
            } else if ((<HTMLElement> node).tagName === "SCRIPT" && /var loadedScript/.test((<HTMLScriptElement> node).innerText)) {
                node.addEventListener("beforescriptexecute", (e) => e.preventDefault(), { once: true });
                node.parentElement!.removeChild(node);
            } else if ((<HTMLElement> node).tagName === "SCRIPT" && /bundle\.js$/.test((<HTMLScriptElement> node).src)) {
                core.patchBundle((<HTMLScriptElement> node).src, promise);

                // firefox executes script even if its removed
                node.addEventListener("beforescriptexecute", (e) => e.preventDefault(), { once: true });

                node.parentElement!.removeChild(node);
                observer.disconnect();
            }
        }
    }
});

observer.observe(document, {
    subtree: true,
    childList: true
});

// @ts-ignore
await NVRLoader.createWebWorker();

export { core };