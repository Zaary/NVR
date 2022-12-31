import Transformation from "../Transformation";

export default class TObjectSpriteLoader extends Transformation {
    constructor() {
        super();
    }

    transform(source: string): string {
        const gameObjectRegex = /(var [\w$_]+\s*=\s*)({});(\s*function [\w$_]+\([\w$_]+\)\s*{\s*var [\w$_]+\s*=\s*[\w$_]+\.y\s*>=.*?if\s*\(\s*!.\s*\)\s*{\s*var\s+.\s*=\s*document\.createElement\(['"]canvas['"]\);)/gs;
        const itemSpriteRegex = /(var [\w$_]+\s*=\s*)(\[\])(;function [\w$_]+\([\w$_]+,[\w$_]+\)\s*{\s*var [\w$_]+\s*=\s*[\w$_]+\[[\w$_]+\.id\];if\s*\(![\w$_]+\s*\|\|\s*[\w$_]+\)\s*{var [\w$_]+\s*=\s*document\.createElement\(['"]canvas['"]\))/gs;

        source = source.replace(gameObjectRegex, `$1[nvrapi].registerReference("gameObjectSprites",$2,true);$3`);
        source = source.replace(itemSpriteRegex, `$1[nvrapi].registerReference("itemSprites",$2,true);$3`);

        return source;
    }
}