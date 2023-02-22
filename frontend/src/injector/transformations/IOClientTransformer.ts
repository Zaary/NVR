import Transformation from "../Transformation";

export default class IOClientTransformer extends Transformation {
    constructor() {
        super();
    }

    transform(source: string): string {
        const regex = /(send:\s*function\([\w$_]+\)\s*{\s*var\s+[\w$_]+\s*=\s*Array\.prototype\.slice\.call\(arguments,\s*1\))(?:,|;)?(?:\s*var\s*)?(\s*[\w$_]+\s*=\s*[\w$_]+\.encode\(\[([\w$_]+),\s*([\w$_]+)\]\);\s*this\.socket\.send\([\w$_]+\))(;?\s*})/s;
        
        source = source.replace(regex, `$1;[nvrapi].callbackIntercept("iosend",[$3,$4],()=>{var $2})$5`);
        

        return source;
    }
}