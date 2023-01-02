import SecurityManager from "./SecurityManager";
import loader from "./loader.html";
import NVRWorker from "!!raw-loader!./NVRWorker.js";
import StringUtil from "../util/StringUtil";
import Logger from "../util/Logger";

const logger = new Logger("loader");

const security = new SecurityManager();

let frame: HTMLDivElement | null = null;
let info: HTMLParagraphElement | null = null;
let details: HTMLParagraphElement | null = null;

let menuHider: HTMLStyleElement | null = null;

let worker: Worker | null = <Worker> <unknown> null;

function start() {

    document.body.insertAdjacentHTML("beforeend", loader);

    frame = <HTMLDivElement> document.querySelector("#loader-wrapper")
    const header = <HTMLHeadingElement> document.querySelector("#loader > #header");
    info = <HTMLParagraphElement> document.querySelector("#loader > #info");
    details = <HTMLParagraphElement> document.querySelector("#loader > #details");

    menuHider = document.createElement("style");
    menuHider.innerText = "#mainMenu { display: none !important; }";
    document.head.appendChild(menuHider);

    header.innerText = "Loading NVR";
    info.innerText = "Performing security checks";
    details.innerText = "...";

    if (!security.checkHref()) {
        
    }
}

function setStatus(info_: string, details_: string) {
    if (info && details) {
        info.innerText = info_;
        details.innerText = details_;
    }
}

function stop() {
    document.getElementById("mainMenu")!.style.opacity = "";
    menuHider?.remove();
    frame?.remove();
}

let workerTasks: WorkerTask[] = [];

class WorkerTask {

    public id: string;
    private fc_resolve: Function;
    private fc_reject: Function;

    constructor(id: string, resolve: Function, reject: Function) {
        this.id = id;
        this.fc_resolve = resolve;
        this.fc_reject = reject;
    }

    resolve(val: any) {
        this.fc_resolve(val);
    }
    
    reject(val: any) {
        this.fc_reject(val);
    }
}

function createWebWorker(): Promise<void> {
    const blob = new Blob([NVRWorker], { type: 'application/javascript' });
    worker = new Worker(URL.createObjectURL(blob));

    worker.onmessage = (e) => {
        const [taskId, status, data] = e.data;

        if (taskId === "0") return logger.error(data);
        if (taskId === "log") return logger.log(data);

        const task = workerTasks.find(x => x.id === taskId);
        
        if (task) {
            task[status ? "resolve" : "reject"](data);
        }
    }

    return new Promise<void>((resolve, reject) => {
        workerExecute("echo", "init").then((e) => {
            if (e === "init") {
                logger.log("worker init complete");
            } else {
                logger.log("worker not behaving correctly? init != " + e);
            }
            resolve();
        }).catch((e) => {
            logger.error("failed to init worker:", e);
            reject();
        });
    });
}

function createWorkerTaskId() {
    return StringUtil.randomString(16);
}

function workerExecute(task: string, data: any): Promise<any> {
    const taskId = createWorkerTaskId();

    worker!.postMessage([taskId, task, data]);

    const promise = new Promise((resolve, reject) => {
        workerTasks.push(new WorkerTask(taskId, resolve, reject));
    });

    return promise;
}

export default { start, setStatus, stop, createWebWorker, workerExecute };