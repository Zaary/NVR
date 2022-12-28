export default abstract class Event {
    private canceled: boolean;

    constructor() {
        this.canceled = false;
    }

    cancel() {
        this.canceled = true;
    }

    isCanceled() {
        return this.canceled;
    }
}