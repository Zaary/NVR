// fingerprintjs api compatible with obfuscation, all rights go to fingerprintjs owners!!!

export default class FingerprintJS {
    static import(apiKey: string) {
        const script = document.createElement("script");
        script.src = "https://fpnpmcdn.net/v3/" + apiKey + "/loader_v3.8.1.js";
        document.head.appendChild(script);
        
        return window["__fpjs_p_l_b"] !== undefined ? Promise.resolve(window["__fpjs_p_l_b"]) : new Promise(resolve => {
            let interval = setInterval(() => {
                if (window["__fpjs_p_l_b"] !== undefined) {
                    clearInterval(interval);
                    resolve(window["__fpjs_p_l_b"]);
                }
            }, 50);
        });
    }
}