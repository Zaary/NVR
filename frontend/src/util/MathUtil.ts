import { util } from "../data/type/MoomooUtil";
import Vector from "./type/Vector";

function randInt(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randFloat(min: number, max: number) {
	return Math.random() * (max - min) + min;
}

function lerp(value1: number, value2: number, amount: number) {
	return value1 + (value2 - value1) * amount;
}

function decel(val: number, cel: number) {
	if (val > 0) val = Math.max(0, val - cel);
	else if (val < 0) val = Math.min(0, val + cel);
	return val;
}


function getDistance(pos1: Vector, pos2: Vector): number {
	return pos1.clone().subtract(pos2).length();
}

function getDirection(from: Vector, to: Vector): number {
	return Math.atan2(to.y - from.y, to.x - from.x);
}

function getAngleDist(a: number, b: number) {
	var p = Math.abs(b - a) % (Math.PI * 2);
	return (p > Math.PI ? (Math.PI * 2) - p : p);
}

function lerpAngle(value1: number, value2: number, amount: number) {
	var difference = Math.abs(value2 - value1);
	if (difference > Math.PI) {
		if (value1 > value2) {
			value2 += Math.PI * 2;
		} else {
			value1 += Math.PI * 2;
		}
	}
	var value = (value2 + ((value1 - value2) * amount));
	if (value >= 0 && value <= Math.PI * 2)
		return value;
	return (value % Math.PI * 2);
}

type Color = [number, number, number, number];

function combineColors(base: Color, added: Color): Color {
	let mix = [];
	mix[3] = 1 - (1 - added[3]) * (1 - base[3]); // alpha
	mix[0] = Math.round((added[0] * added[3] / mix[3]) + (base[0] * base[3] * (1 - added[3]) / mix[3])); // red
	mix[1] = Math.round((added[1] * added[3] / mix[3]) + (base[1] * base[3] * (1 - added[3]) / mix[3])); // green
	mix[2] = Math.round((added[2] * added[3] / mix[3]) + (base[2] * base[3] * (1 - added[3]) / mix[3])); // blue
	return <Color> mix;
}

function averageOfArray(array: number[]) {
	return sumArray(array) / array.length;
}

function sumArray(array: number[]) {
	let a = 0;
	for (let i = 0; i < array.length; i++) a += array[i];
	return a;
}

function roundTo(value: number, places: number) {
	const placesMlt = places * 10;
	return Math.round(value * placesMlt) / placesMlt;
}

function lineSpan(origin: Vector, p1: Vector, p2: Vector) {
    var AB = Math.sqrt(Math.pow(origin.x - p1.x, 2) + Math.pow(origin.y - p1.y, 2));
    var BC = Math.sqrt(Math.pow(origin.x - p2.x, 2) + Math.pow(origin.y - p2.y, 2));
    var AC = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
    return Math.acos((BC * BC + AB * AB - AC * AC) / (2 * BC * AB));
}

function lineInRectMooMoo(recX: number, recY: number, recX2: number, recY2: number, x1: number, y1: number, x2: number, y2: number) {
	var minX = x1;
	var maxX = x2;
	if (x1 > x2) {
		minX = x2;
		maxX = x1;
	}
	if (maxX > recX2)
		maxX = recX2;
	if (minX < recX)
		minX = recX;
	if (minX > maxX)
		return false;
	var minY = y1;
	var maxY = y2;
	var dx = x2 - x1;
	if (Math.abs(dx) > 0.0000001) {
		var a = (y2 - y1) / dx;
		var b = y1 - a * x1;
		minY = a * minX + b;
		maxY = a * maxX + b;
	}
	if (minY > maxY) {
		var tmp = maxY;
		maxY = minY;
		minY = tmp;
	}
	if (maxY > recY2)
		maxY = recY2;
	if (minY < recY)
		minY = recY;
	if (minY > maxY)
		return false;
	return true;
}

function getTangentSpanIntersectionRadius(distanceToTarget: number, targetScale: number, intersectionRadius: number) {
	return Math.acos((targetScale ** 2 - distanceToTarget ** 2 - intersectionRadius ** 2) / (-2 * distanceToTarget * intersectionRadius));
}

function getTangentSpanSimple(distanceToTarget: number, targetScale: number) {
	const tangentDistance = Math.sqrt(Math.pow(distanceToTarget, 2) - Math.pow(targetScale, 2));
	return Math.atan(targetScale / tangentDistance);
}

function willTargetBeHit(source: Vector, targetPosition: Vector, targetSize: number, shotAngle: number) {
	// Calculate the distance from the observer to the target
	const distanceToTarget = getDistance(source, targetPosition);
	
	// Calculate the tangent span of the target
	const tangentSpan = getTangentSpanSimple(distanceToTarget, targetSize);
	
	// Calculate the angle from the observer to the target
	const angleToTarget = getDirection(source, targetPosition);
	
	// Calculate the difference between the shot angle and the angle to the target
	const angleDifference = getAngleDist(angleToTarget, shotAngle);
	
	// Check if the shot angle is within the tangent span of the target
	return angleDifference <= tangentSpan;
}

// no one knows how much these functions mean to me me (i literally spent several hours figuring this shit out and raging multiple times)
function polarToCartesian(angle: number) {
    return (angle < 0 && angle > -Math.PI) ? -angle : Math.PI * 2 - angle;
}

function cartesianToPolar(angle: number) {
    return (angle > Math.PI) ? Math.PI * 2 - angle : -angle;
}

function clampPolar(angle: number) {
    return (angle >= -Math.PI && angle <= Math.PI) ? angle : ((angle < -Math.PI) ? angle + 2 * Math.PI : angle - 2 * Math.PI);
}

function clampCartesian(angle: number) {
    return (angle >= 0 && angle <= 2 * Math.PI) ? angle : ((angle < 0) ? angle + 2 * Math.PI : angle - 2 * Math.PI);
}

function middleOfCartesianArc(angles: [number, number]) {
    let startAngle = angles[0];
    let endAngle = angles[1];

    if (endAngle < startAngle) {
        endAngle += 2 * Math.PI;
    }

    return (startAngle + (endAngle - startAngle) / 2) % (Math.PI * 2);
}

/*
function angleToUnitCircle(angle: number) {
	var unitAngle;
	if (angle >= 0 && angle <= Math.PI) {
	  	unitAngle = angle;
	} else {
	  	unitAngle = Math.PI * -2 + angle;
	}
	return unitAngle;
}


function clampUnitCircleAngle(angle: number) {
	angle %= Math.PI * 2;
	if (angle < -Math.PI) {
		return angle + Math.PI * 2;
	} else if (angle > Math.PI) {
		return angle - Math.PI * 2;
	}
	return angle;
}

function unitCircleAngleToFull(angle: number) {
	if (angle < 0) {
		return angle + Math.PI * 2;
	} else {
		return angle;
	}
}
*/

export default {
    randInt,
    randFloat,
    lerp,
    decel,
    getDistance,
    getDirection,
    getAngleDist,
    lerpAngle,
	combineColors,
	averageOfArray,
	roundTo,
	lineSpan,
	lineInRectMooMoo,
	sumArray,
	getTangentSpanIntersectionRadius,
	getTangentSpanSimple,
	willTargetBeHit,
	polarToCartesian,
	cartesianToPolar,
	clampPolar,
	clampCartesian,
	middleOfCartesianArc
}