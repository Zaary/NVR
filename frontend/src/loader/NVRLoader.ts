import SecurityManager from "./SecurityManager";
import loader from "./loader.html";
import NVRWorker from "!!raw-loader!./NVRWorker.js";
import StringUtil from "../util/StringUtil";
import Logger from "../util/Logger";
import { core } from "../main";
import { Core } from "../core/Core";
import FingerprintJS from "./FingerprintJS";

const logger = new Logger("loader");

const security = new SecurityManager();

let frame: HTMLDivElement | null = null;
let info: HTMLParagraphElement | null = null;
let details: HTMLParagraphElement | null = null;
let keyInput: HTMLInputElement | null = null;

let menuHider: HTMLStyleElement | null = null;

let worker: Worker | null = <Worker> <unknown> null;

function dummy1_(a: () => void) {
    return () => {
        a();
        return "x" + 69;
    }
}
function dummy2_(a: () => void) {
    return () => {
        a();
        return "y" + 420;
    }
}
function dummy3_(a: () => void) {
    return () => {
        a();
        return "z" + 1337;
    }
}
const dummySym = Symbol();

const sym = Math.floor(Math.random() * 256);
const rr = Math.random();
let nn = 0;

let isCoreLoaded = false;

function x(num: number) {
    nn = num + rr;
    return sym;
}

async function start(m: (a: any) => (() => void)) {

    const ENDPOINT = Core.ENDPOINT;
    const VER = Core.VER.uformat();

    document.body.insertAdjacentHTML("beforeend", loader);

    frame = <HTMLDivElement> document.querySelector("#loader-wrapper")
    const header = <HTMLHeadingElement> document.querySelector("#loader > #header");
    info = <HTMLParagraphElement> document.querySelector("#loader > #info");
    details = <HTMLParagraphElement> document.querySelector("#loader > #details");
    keyInput = <HTMLInputElement> document.querySelector("#loader > #activation-key");
    

    menuHider = document.createElement("style");
    menuHider.innerText = "#mainMenu { display: none !important; }";
    document.head.appendChild(menuHider);

    header.innerText = "Loading NVR";

    info.innerText = "Loading libraries";
    details.innerText = "...";

    function fail() {
        header.innerText = "Integrity Compromised";
        info!.innerText = "Unauthorized changes were detected";
        details!.innerText = "This incident was reported along with all neccessary data";
        header.classList.add("mark-error");
        return;
    }

    const fpjsloader = await FingerprintJS.import("jAYuN2pGILWUwQbCDWTw");
    const fpjs = await fpjsloader.load();
    const fingerprint: any = await fpjs.get();
    
    function getFingerprint() {
        return fingerprint.visitorId;
    }

    const oldFetch = window.fetch;
    const fetch = new Proxy(oldFetch, {
        apply(target, thisArg, argArray) {
            if (/pleasingringedexpertise\.gg69gamer\.repl\.co/.test(argArray[0])) {
                if (argArray[1] !== undefined) {
                    argArray[1].headers = Object.assign(argArray[1].headers, { "x-replit-ray": window.btoa(fingerprint.visitorId) });
                } else {
                    argArray[1] = { "headers": { "x-replit-ray": window.btoa(fingerprint.visitorId) }};
                }
            }
            return Reflect.apply(target, thisArg, argArray);
        },
    });

    info.innerText = "Checking for updates";
    details.innerText = "...";

    interface UpdateCheckResult { update: boolean; version: string, url: string };
    async function checkForUpdates(): Promise<UpdateCheckResult> {
        return new Promise((resolve, reject) => {
            fetch(ENDPOINT + "/update?ver=" + VER).then(res => res.json()).then(res => {
                resolve(res);
            }).catch(reject);
        });
    }

    interface KeyCheckResult { valid: boolean; expired: boolean; byteCode: string }
    async function checkKey(key: string): Promise<KeyCheckResult> {
        return new Promise((resolve, reject) => {
            fetch(ENDPOINT + "/verifyKey/" + key + "?ver=" + VER).then(res => res.json()).then(res => {
                resolve(res);
            }).catch(reject);
        });
    }

    try {
        (async (dummy1, fail, symbol, dummy2, success, dummySymbol, dummy3, fpGetter) => { // https://pleasingringedexpertise.gg69gamer.repl.co/download/static/script.user.js

            const updates = await checkForUpdates();
            if (updates.update) {
                header.innerText = "Updating NVR";
                info.innerText = "An update is available: " + Core.VER.toString() + " > " + updates.version.replace(/_/g, ".");
                details.innerText = "Installing script...";

                setTimeout(() => {
                    details!.innerText = "Please confirm script installation!";
                    window.onbeforeunload = null;
                    window.location.href = `${ENDPOINT}/download/${updates.url}/script.user.js`;
                    window.addEventListener("blur", function() {
                        window.addEventListener("focus", function() {
                            details!.innerText = "Reloading page to start new version...";
                            window.onbeforeunload = null;
                            window.location.reload();
                        }, { once: true });
                    }, { once: true });
                }, 3000);
            } else {
                let key = localStorage.getItem("nvr_token");

                let byteCode = "";

                function checkKeyVisual(value: string, isRequiring: boolean, resolve?: (value: string) => void, reject?: () => void, listener?: (this: HTMLInputElement, ev: Event) => any) {
                    checkKey(value).then(result => {
                        if (result.valid) {
                            if (listener) keyInput!.removeEventListener("input", listener);
                            details!.style.display = "none";
                            details!.classList.remove("mark-error");

                            byteCode = result.byteCode;
                            if (resolve) resolve(value);
                        } else if (result.expired) {
                            details!.style.display = "block";
                            details!.innerText = "Key has expired! Get a new key.";
                            details!.classList.add("mark-error");
                            if (!isRequiring && reject) reject();
                        } else {
                            details!.style.display = "block";
                            details!.innerText = "Invalid key!";
                            details!.classList.add("mark-error");
                            if (!isRequiring && reject) reject();
                        }
                    }).catch(() => undefined);
                }

                async function requireKey(): Promise<string> {
                    return new Promise((resolve, reject) => {
                        header.innerText = "Activation";
                        info!.innerText = "Please enter activation key"
                        keyInput!.style.display = "block";
        
                        keyInput!.addEventListener("input", function listener(event) {
                            const value = keyInput!.value.toLowerCase();
                            if (/^[a-f0-9]{32}$/.test(value)) {
                                checkKeyVisual(value, true, resolve, reject, listener);
                            }
                        });
                    });
                }

                async function setNewKey() {
                    localStorage.removeItem("nvr_token");
                    key = await requireKey();
                    localStorage.setItem("nvr_token", key);
                }
                
                if (!key) {
                    details!.style.display = "none";
                    await setNewKey();
                } else {
                    await new Promise((resolve, reject) => checkKeyVisual(key!, false, resolve, reject)).catch(async () => await setNewKey());
                }

                info!.innerText = "Verifying code integrity";
                details!.innerText = "...";

                // VM verifies if local fingerprint matches with received one
                const vm = security.createVM(byteCode, {
                    stack: {
                        maxStringByteLength: 63,
                    }
                }, [symbol, dummy3, fpGetter, fail, dummy2, success, dummy1, dummySymbol]);

                isCoreLoaded = true;

                try {
                    vm();
                } catch (err) {
                    fail();
                }
            }
        })(dummy1_(fail), fail, () => sym, dummy2_(fail), m, dummySym, dummy3_(fail), getFingerprint);
    } catch (e) {
        const err = <Error> e;
        alert("An error occured during load: " + (err.stack ?? err.message));
    }
}

function setStatus(info_: string, details_: string) {
    if (info && details) {
        info.innerText = info_;
        details.innerText = details_;
    }
}

function stop() {
    if (!isCoreLoaded) return;

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

export default { start, setStatus, stop, createWebWorker, workerExecute, x };