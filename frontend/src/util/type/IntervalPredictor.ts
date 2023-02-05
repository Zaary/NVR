export default class IntervalPredictor {

    private interval: number;
    private startOffset: number;
    private prediction: number;
    private futurePrediction: number;

    constructor(interval: number, startingPoint: number) {
        this.interval = interval;
        this.startOffset = startingPoint % interval;
        this.prediction = this.startOffset;
        this.futurePrediction = 0;
    }

    update(delta: number) {
        const now = Date.now();
            
        this.prediction += delta;
        const futureProgress = this.prediction + delta;

        if (futureProgress >= this.futurePrediction) {
            this.futurePrediction += this.interval;
        }
    }
}