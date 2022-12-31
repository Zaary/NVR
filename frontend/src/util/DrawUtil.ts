function progressBar(context: CanvasRenderingContext2D, currentProgress: number, x: number, y: number, width: number, height: number, barFillColor: string, emptyFillColor: string, text: string, textFillColor: string, textFont: string) {
    context.save();
    context.beginPath();
    if (!emptyFillColor) emptyFillColor = 'black';
    if (!barFillColor) barFillColor = 'white';
    var radius = height/2;
    const halfradians = (2 * Math.PI) / 2;
    const quarterradians = (2 * Math.PI) /4
    context.arc(radius + x, radius + y, radius, -quarterradians, halfradians, true)
    context.lineTo(x, y + height - radius);
    context.arc(radius + x, height - radius + y, radius, halfradians, quarterradians, true);
    context.lineTo(x + width - radius, y + height);
    context.arc(x + width - radius, y + height - radius, radius, quarterradians, 0, true);
    context.lineTo(x + width, y + radius);
    context.arc(x + width - radius, y + radius, radius, 0, -quarterradians, true);
    context.lineTo(x + radius, y);
    context.fillStyle = emptyFillColor;
    context.fill();
    context.stroke();
    context.closePath();
    context.clip();
    var calculateprogress = (currentProgress * width)+(x-width);
    var tst = calculateprogress;
    context.beginPath();
    context.arc(radius + tst, radius + y, radius, -quarterradians, halfradians, true)
    context.lineTo(tst, y + height - radius);
    context.arc(radius + tst, height - radius + y, radius, halfradians, quarterradians, true);
    context.lineTo(tst + width - radius, y + height);
    context.arc(tst + width - radius, y + height - radius, radius, quarterradians, 0, true);
    context.lineTo(tst + width, y + radius);
    context.arc(tst + width - radius, y + radius, radius, 0, -quarterradians, true);
    context.lineTo(tst + radius, y);
    context.fillStyle = barFillColor;
    context.fill();
    
    context.font = textFont;
    context.fillStyle = textFillColor;
    context.textAlign = "center";
    context.fillText(text, x + width / 2, y + height / 2);
    context.closePath();
    context.restore();
}

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
	d3_geom_contourStart(grid: any) {
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
	contour(grid: any, start: any) {
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

function strokeImageOutline(canvas: HTMLCanvasElement, maxTransparency: number) {
	const context = canvas.getContext("2d")!;

	let imgData = context.getImageData(0, 0, canvas.width, canvas.height);
	let data = imgData.data;

	function defineNonTransparent(x: number, y: number) {
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
}


export default {
    progressBar,
	strokeImageOutline
}