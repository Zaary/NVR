import StringUtil from "../../util/StringUtil";
import Transformation from "../Transformation";

export default class ObjectSpriteLoaderTransformer extends Transformation {
    constructor() {
        super();
    }

    transform(source: string): string {
        const gameObjectRegex = /(var [\w$_]+\s*=\s*)({});(\s*function ([\w$_]+)\([\w$_]+)\)\s*{(\s*var [\w$_]+\s*=\s*\(?[\w$_]+\.y\s*>=.*?if\s*\(\s*![\w$_]+\s*\)\s*{\s*var\s+[\w$_]+\s*=\s*document\.createElement\(['"]canvas['"]\);.+?([\w$_]+)\.scale\s*\*\s*\([\w$_]+?\s*\?\s*\.+5\s*:\s*1\).+?[\w$_]+\[[\w$_]+\]\s*=\s*[\w$_]+\s*}\s*return [\w$_]+;?\s*)}\s*var/s;
        const itemSpriteRegex = /(var [\w$_]+\s*=\s*)(\[\])(;\s*function ([\w$_]+)\([\w$_]+,\s*[\w$_]+\)\s*{\s*var [\w$_]+\s*=\s*[\w$_]+\[[\w$_]+\.id\];\s*if\s*\(![\w$_]+\s*\|\|\s*[\w$_]+\)\s*{\s*var [\w$_]+\s*=\s*document\.createElement\(['"]canvas['"]\).+?return [\w$_]+;?\s*})/s;

        // also adds one parameter to the function because it depends on an out of scope object which is set before getting the sprite in game code
        const paramName = StringUtil.randomString(5);
        source = source.replace(gameObjectRegex, `$1[nvrapi].registerReference("gameObjectSprites",$2,true);$3,${paramName}){$6=${paramName}?${paramName}:$6;$5};[nvrapi].registerFunction("getResSprite",$4);var`);
        source = source.replace(itemSpriteRegex, `$1[nvrapi].registerReference("itemSprites",$2,true);$3;[nvrapi].registerFunction("getItemSprite",$4);`);

        return source;
    }
}