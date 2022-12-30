const randInt = function (min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

const randFloat = function (min: number, max: number) {
	return Math.random() * (max - min + 1) + min;
}

const lerp = function (value1: number, value2: number, amount: number) {
	return value1 + (value2 - value1) * amount;
}

const decel = function (val: number, cel: number) {
	if (val > 0)
		val = Math.max(0, val - cel);
	else if (val < 0)
		val = Math.min(0, val + cel);
	return val;
}

const getDistance = function (x1, y1, x2, y2) {
	return Math.sqrt((x2 -= x1) * x2 + (y2 -= y1) * y2);
}

const getDirection = function (x1, y1, x2, y2) {
	return Math.atan2(y1 - y2, x1 - x2);
}

const getAngleDist = function (a: number, b: number) {
	var p = Math.abs(b - a) % (Math.PI * 2);
	return (p > Math.PI ? (Math.PI * 2) - p : p);
}

const isNumber = function (n: any) {
	return (typeof n == "number" && !isNaN(n) && isFinite(n));
}

const isString = function (s: any) {
	return (s && typeof s == "string");
}

const kFormat = function (num: number) {
	return num > 999 ? (num / 1000).toFixed(1) + 'k' : num;
}

const capitalizeFirst = function (string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

const fixTo = function (n: number, v: number) {
	return parseFloat(n.toFixed(v));
}

const sortByPoints = function (a: { points: number | string }, b: { points: number | string }) {
	return parseFloat(<string>b.points) - parseFloat(<string>a.points);
}

const lineInRect = function (recX: number, recY: number, recX2: number, recY2: number, x1: number, y1: number, x2: number, y2: number) {
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

const containsPoint = function (element: any, x: number, y: number) {
	var bounds = element.getBoundingClientRect();
	var left = bounds.left + window.scrollX;
	var top = bounds.top + window.scrollY;
	var width = bounds.width;
	var height = bounds.height;

	var insideHorizontal = x > left && x < left + width;
	var insideVertical = y > top && y < top + height;
	return insideHorizontal && insideVertical;
}

const mousifyTouchEvent = function(event: any) {
	var touch = event.changedTouches[0];
	event.screenX = touch.screenX;
	event.screenY = touch.screenY;
	event.clientX = touch.clientX;
	event.clientY = touch.clientY;
	event.pageX = touch.pageX;
	event.pageY = touch.pageY;
}

const removeAllChildren = function (element: HTMLElement) {
	while (element.hasChildNodes()) {
		element.removeChild(<ChildNode>element.lastChild);
	}
}

const generateElement = function (config: any) {
	var element = document.createElement(config.tag || "div");
	function bind(configValue: any, elementValue: any) {
		if (config[configValue])
			element[elementValue] = config[configValue];
	}
	bind("text", "textContent");
	bind("html", "innerHTML");
	bind("class", "className");
	for (var key in config) {
		switch (key) {
			case "tag":
			case "text":
			case "html":
			case "class":
			case "style":
			case "hookTouch":
			case "parent":
			case "children":
				continue;
			default:
				break;
		}
		element[key] = config[key];
	}
	if (element.onclick)
		element.onclick = module.exports.checkTrusted(element.onclick);
	if (element.onmouseover)
		element.onmouseover = module.exports.checkTrusted(element.onmouseover);
	if (element.onmouseout)
		element.onmouseout = module.exports.checkTrusted(element.onmouseout);
	if (config.style) {
		element.style.cssText = config.style;
	}
	if (config.hookTouch) {
		module.exports.hookTouchEvents(element);
	}
	if (config.parent) {
		config.parent.appendChild(element);
	}
	if (config.children) {
		for (var i = 0; i < config.children.length; i++) {
			element.appendChild(config.children[i]);
		}
	}
	return element;
}

const eventIsTrusted = function(ev: Event) {
    if (ev && typeof ev.isTrusted == "boolean") {
        return ev.isTrusted;
    } else {
        return true;
    }
}

const checkTrusted = function(callback: any) {
    return function(ev: Event) {
        if (ev && ev instanceof Event && module.exports.eventIsTrusted(ev)) {
            callback(ev);
        } else {
            //console.error("Event is not trusted.", ev);
        }
    }
}

const randomString = function(length: number) {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for (var i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}

const countInArray = function(array: any[], val: any) {
	var count = 0;
	for (var i = 0; i < array.length; i++) {
		if (array[i] === val) count++;
	} return count;
}

const util = {
	randInt,
	randFloat,
	lerp,
	decel,
	getDistance,
	getDirection,
	getAngleDist,
	isNumber,
	isString,
	kFormat,
	capitalizeFirst,
	fixTo,
	sortByPoints,
	lineInRect,
	containsPoint,
	mousifyTouchEvent,
	removeAllChildren,
	generateElement,
	eventIsTrusted,
	checkTrusted,
	randomString,
	countInArray
};

export { util }