import SecurityManager from "./SecurityManager";
import loader from "./loader.html";

let cb;

const security = new SecurityManager();

function start(callback: () => void) {
    cb = callback;

    document.body.insertAdjacentHTML("beforeend", loader);

    const header = <HTMLHeadingElement> document.querySelector("#loader > #header");
    const info = <HTMLParagraphElement> document.querySelector("#loader > #info");
    const details = <HTMLParagraphElement> document.querySelector("#loader > #details");

    header.innerText = "Loading NVR";
    info.innerText = "Performing security checks";
    details.innerHTML = "...";

    if (!security.checkHref()) {
        
    }
}

export default { start };