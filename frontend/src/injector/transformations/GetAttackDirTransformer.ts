import Transformation from "../Transformation";

export default class GetAttackDirTransformer extends Transformation {
    constructor() {
        super();
    }

    transform(source: string): string {
        const regex = /([\w$_]+\s*=\s*)(Math\.atan2\([\w$_]+\s*-\s*\(?[\w$_]+\s*\/\s*2\)?,\s*[\w$_]+\s*-\s*\(?[\w$_]+\s*\/\s*2\)?\))/s;

        source = source.replace(regex, `$1[nvrapi].getValue("attackdir",$2)`);

        return source;
    }
}