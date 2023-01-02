import MathUtil from "./MathUtil";

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

function graph(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, data: number[], maxValue: number, step: number, baseColor: string, baseLineWidth: number, lineColor: string, lineLineWidth: number, statsData: number[], statsFont?: string, statsFontHeight?: number, strokeStats?: boolean, statsStrokeColor: string = "#000000", statsFillColor: string = "#ffffff") {
	context.save();

	context.strokeStyle = baseColor;
	context.lineWidth = baseLineWidth;

	context.beginPath();
	context.rect(x, y, width, height);
	context.stroke();

	const rows = Math.ceil(maxValue / step);

	for (let i = 0; i < rows; i++) {
		const of = (i / rows) * height;
		context.beginPath();
		context.moveTo(x, y + of);
		context.lineTo(x + width, y + of);
		context.closePath();
		context.stroke();
	}

	context.strokeStyle = lineColor;
	context.lineWidth = lineLineWidth;

	context.beginPath();
	context.moveTo(x, y + (1 - data[0] / maxValue) * height);
	for (let i = 0; i < data.length; i++) {
		const val = data[i];
		const xPos = x + i / data.length * width;
		const yPos = y + (1 - val / maxValue) * height;
		context.lineTo(xPos, yPos);
	}
	context.stroke();

    if (statsFont !== undefined && statsFontHeight !== undefined && strokeStats !== undefined) {
        context.font = statsFont;
        const avg = MathUtil.averageOfArray(statsData).toFixed(2);
        const max = Math.max(...statsData);
        const yPos = y + height + statsFontHeight / 2 + 3;

        context.strokeStyle = statsStrokeColor;
        context.fillStyle = statsFillColor;

        context.textAlign = "start";
        if (strokeStats) context.strokeText(`Avg: ${avg}`, x, yPos);
        context.fillText(`Avg: ${avg}`, x, yPos);

        const maxText = `Max: ${max}`;
        const textwidth = context.measureText(maxText);
        if (strokeStats) context.strokeText(maxText, x + width - textwidth.width, yPos);
        context.fillText(maxText, x + width - textwidth.width, yPos);
    }

	context.restore();
}


export default {
	progressBar,
	graph
}