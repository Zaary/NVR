export default class SecurityManager {
    constructor() {

    }

    checkHref() {
        const loc = window.location;
        if (!(loc instanceof Location)) return false;
        if ((<Location & { [Symbol.toStringTag]: string }> location)[Symbol.toStringTag] != "Location") return false;
        if (loc.host !== "sandbox.moomoo.io") return false;
        return true;
    }

    run() {
        
    }

    
}