function mapTupleArray<T>(array: [T, T][], mapFunc: (value: T) => T): [T, T][] {
    return array.map(value => [mapFunc(value[0]), mapFunc(value[1])]);
}

/*

UNFINISHED!

function mapRecursive<T>(array: T[], mapFunc: any) {
    return array.map(function(element) {
        if (Array.isArray(element)) {
            return mapArrayValues(element, mapFunc);
        } else {
            return mapFunc(element);
        }
    });
}

*/

export default {
    mapTupleArray,
    //mapRecursive
}