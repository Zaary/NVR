import Transformation from "../Transformation";

export default class TObjectSpriteLoader extends Transformation {
    constructor() {
        super();
    }

    transform(source: string): string {
        const gameObjectRegex = /(var \w+\s*=\s*)({});(\s*function \w+\(\w+\)\s*{\s*var \w+\s*=\s*\w+\.y\s*>=.*?if\s*\(\s*!.\s*\)\s*{\s*var\s+.\s*=\s*document\.createElement\("canvas"\);)/gs;
        source = source.replace(gameObjectRegex, `$1[nvrapi].registerReference("gameObjectSprites",$2,true);$3`);

        return source;
    }
}