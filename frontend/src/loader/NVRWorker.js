/**
 Marching Squares Edge Detection
 this is a "marching ants" algorithm used to calc the outline path

 d3-plugin for calculating outline paths
 License: https://github.com/d3/d3-plugins/blob/master/LICENSE
    
 Copyright (c) 2012-2014, Michael Bostock
 All rights reserved.
    
 * Redistribution and use in source and binary forms, with or without
   modification, are permitted provided that the following conditions are met:
 * Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.
 * The name Michael Bostock may not be used to endorse or promote products
   derived from this software without specific prior written permission.
   THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL MICHAEL BOSTOCK BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. 
 */
const Geom = {
	// lookup tables for marching directions
    d3_geom_contourDx: [1, 0, 1, 1,-1, 0,-1, 1,0, 0,0,0,-1, 0,-1,NaN],
    d3_geom_contourDy: [0,-1, 0, 0, 0,-1, 0, 0,1,-1,1,1, 0,-1, 0,NaN],
	d3_geom_contourStart(grid) {
		let x = 0;
		let y = 0;

		// search for a starting point; begin at origin
		// and proceed along outward-expanding diagonals
		while (true) {
		  	if (grid(x, y)) return [x, y];

		  	if (x === 0) {
				x = y + 1;
				y = 0;
		  	} else {
				x = x - 1;
				y = y + 1;
		  	}
		}
	},
	contour(grid, start) {
		let s = start  // starting point
        let c = [];    // contour polygon
    	let x = s[0];  // current x position
        let y = s[1];  // current y position
        let dx = 0;    // next x direction
        let dy = 0;    // next y direction
        let pdx = NaN; // previous x direction
        let pdy = NaN; // previous y direction
        let i = 0;

      	do {
        	// determine marching squares index 
			i = 0;
			if (grid(x - 1, y - 1)) i += 1;
			if (grid(x, y - 1)) i += 2;
			if (grid(x - 1, y)) i += 4;
			if (grid(x, y)) i += 8;

			// determine next direction
			if (i === 6) {
				dx = pdy === -1 ? -1 : 1;
				dy = 0;
			} else if (i === 9) {
				dx = 0;
				dy = pdx === 1 ? -1 : 1;
			} else {
				dx = this.d3_geom_contourDx[i];
				dy = this.d3_geom_contourDy[i];
			}

			// update contour polygon
			if (dx != pdx && dy != pdy) {
				c.push([x, y]);
				pdx = dx;
				pdy = dy;
			}

			x += dx;
			y += dy;
    	} while (s[0] != x || s[1] != y);

    	return c;
	}
}
/*
const context = canvas.getContext("2d");

	let imgData = context.getImageData(0, 0, canvas.width, canvas.height);
	let data = imgData.data;

	function defineNonTransparent(x, y) {
		return data[(y * canvas.width + x) * 4 + 3] >= maxTransparency;
	}

	const start = Geom.d3_geom_contourStart(defineNonTransparent);
	const points = Geom.contour(defineNonTransparent, start);

	context.beginPath();
    context.moveTo(points[0][0], points[0][4]);
    for (let i = 0; i < points.length; i++) {
        const point = points[i];
        context.lineTo(point[0], point[1]);
    }
    context.closePath();
    context.stroke();
*/
function createImageOutline(data, width, maxTransparency) {

	function defineNonTransparent(x, y) {
		return data[(y * width + x) * 4 + 3] >= maxTransparency;
	}

	const start = Geom.d3_geom_contourStart(defineNonTransparent);
	const points = Geom.contour(defineNonTransparent, start);

    return points;
}

const handler = {
    "echo": function(data) {
        return data;
    },
    "util.outline": function(data) {
        return createImageOutline(...data);
    }
}

onerror = (e) => {
    postMessage(["0", null, e]);
}

onmessage = (e) => {
    const data = e.data;
    try {
        const result = handler[data[1]].call(null, data[2]);
        postMessage([data[0], true, result]);
    } catch (err) {
        postMessage([data[0], false, err]);
    }
}