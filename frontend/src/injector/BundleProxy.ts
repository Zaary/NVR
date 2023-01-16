import NVRLoader from "../loader/NVRLoader";
import Logger from "../util/Logger";
import StringUtil from "../util/StringUtil";
import { Class } from "../util/type/Definitions";
import Transformation from "./Transformation";
import TObjectSpriteLoader from "./transformations/TObjectSpriteLoader";
import TSourceMapping from "./transformations/TSourceMapping";

const logger = new Logger("bundle-proxy");

let isCaptchaReady = false;

const transformations: Class<Transformation>[] = [
    TObjectSpriteLoader,
    TSourceMapping
];

let _promise: Promise<void>;

function loadBundle(src: string, injectedApi: any, promise: Promise<void>) {
    _promise = promise;
    window.captchaCallback = () => (isCaptchaReady = true);
    fetch(src).then(res => {
        if (res.ok) return res.text();
        throw logger.error("failed to load bundle: " + res.status);
    }).then(code => processBundle(code, injectedApi));
}

function processBundle(code: string, injectedApi: any) {
    const transformers = transformations.map(transformer => Reflect.construct(transformer, []));

    for (const transformer of transformers) {
        code = transformer.transform(code);
    }

    evalBundle(code, injectedApi);
}

function evalBundle(code: string, injectedApi: any) {
    const hash = StringUtil.randomString(10);
    const vm = new Function(hash, "console", code.replace(/\[nvrapi\]/g, hash));

    const logger = new Logger(window.console, "bundle-vm-" + hash);

    const exec = async () => {
        vm.call(/*window*/vm.bind(window), injectedApi, logger);
        const old: [Function | null, Function | undefined] = [window.onload, window.captchaCallback];
        window.onload = window.captchaCallback = () => {};
        if (_promise) await _promise;
        setTimeout(() => (old[0] && old[0](new Event("load")), (old[1] && old[1]()), NVRLoader.stop()), 1);
    }

    if (isCaptchaReady) {
        exec();
    } else {
        window.captchaCallback = exec;
    }
}

function clearPromise() {
    _promise = <Promise<void>> <unknown> undefined;
}

export default { loadBundle, clearPromise };