/**
 * Credits: ChatGPT with Zaary's assistance
 * https://sharegpt.com/c/3b3zXhq
 */
function allowedAnglesFromBlocked(blocked: [number, number][]) {
    const allowed: [number, number][] = [];
    const n = blocked.length;
    let start = 0;
    let end = 2 * Math.PI;
    let blockStart, blockEnd;
    
    // Split blocks that cross 0 into two separate blocks
    const blocks = [];
    for (let i = 0; i < n; i++) {
        blockStart = blocked[i][0];
        blockEnd = blocked[i][1];
        if (blockEnd < blockStart) {
            blocks.push([blockStart, 2 * Math.PI]);
            blocks.push([0, blockEnd]);
        } else {
            blocks.push([blockStart, blockEnd]);
        }
    }
  
    // Sort blocks by their start angle
    blocks.sort((a, b) => a[0] - b[0]);
  
    // Create allowed intervals
    for (let i = 0; i < blocks.length; i++) {
        blockStart = blocks[i][0];
        blockEnd = blocks[i][1];
        if (start < blockStart) {
            allowed.push([start, blockStart]);
        }
        start = blockEnd;
    }
  
    if (start < end) {
        allowed.push([start, end]);
    }
  
    return allowed;
}

/**
 * Credits: Base by ChatGPT, 2 * PI wrapping added by Zaary
 */
function mergeArcsCartesian(arcs: [number, number][]) {
    // sort arcs by starting angle in ascending order
    arcs.sort((a, b) => a[0] - b[0]);

    // initialize merged arcs with the first arc in the sorted array
    let mergedArcs = [arcs[0]];

    // loop through the rest of the arcs
    for (let i = 1; i < arcs.length; i++) {
        // get the last merged arc
        let lastArc = mergedArcs[mergedArcs.length - 1];

        // check if the current arc overlaps with the last merged arc
        if (arcs[i][0] <= lastArc[1]) {
            // update the end angle of the last merged arc to be the maximum of the two end angles
            lastArc[1] = Math.max(lastArc[1], arcs[i][1]);

            // replace the last merged arc with the updated arc
            mergedArcs[mergedArcs.length - 1] = lastArc;
        } else if (arcs[i][1] >= Math.PI * 2 && arcs[i][1] % (Math.PI * 2) >= mergedArcs[0][0]) {
            mergedArcs[0][0] = arcs[i][0];
        } else {
            // add the current arc to the merged arcs array if it does not overlap with the last merged arc
            mergedArcs.push(arcs[i]);
        }
    }

    // return the merged arcs array
    return mergedArcs;
}


export default {
    allowedAnglesFromBlocked,
    mergeArcsCartesian
}