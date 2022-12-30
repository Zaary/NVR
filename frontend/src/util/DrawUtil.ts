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

export default {
    progressBar
}