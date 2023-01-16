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
	sumArray
}