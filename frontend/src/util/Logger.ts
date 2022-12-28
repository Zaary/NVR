enum Level {
    LOG,
    INFO,
    WARN,
    ERROR
}

const LogLevel: Map<Level, string> = new Map();
LogLevel.set(Level.LOG, "LOG");
LogLevel.set(Level.INFO, "INFO");
LogLevel.set(Level.WARN, "WARN");
LogLevel.set(Level.ERROR, "ERROR");

function format(loggerId: string, level: Level, ...msg: string[]): string[] {
    return [`NVR | ${loggerId}: [${LogLevel.get(level)}] ->`].concat(msg);
}

class Logger {

    private id: string;
    private profilers: Map<string, number>;

    constructor(id: string) {
        this.id = id;
        this.profilers = new Map();
    }

    log(...message: any[]) {
        console.log(...format(this.id, Level.LOG, ...message));
    }

    info(...message: any[]) {
        console.log(...format(this.id, Level.INFO, ...message));
    }
    
    warn(...message: any[]) {
        console.log(...format(this.id, Level.WARN, ...message));
    }

    error(...message: any[]) {
        console.log(...format(this.id, Level.ERROR, ...message));
    }

    profile(profileId: string, ...message: any[]) {
        if (this.profilers.has(profileId)) {
            console.log(...format(this.id, Level.LOG, ...message, `(took ${Date.now() - <number> this.profilers.get(profileId)} ms)`));
            this.profilers.delete(profileId);
        } else {
            this.profilers.set(profileId, Date.now());
        }
    }
}

export default Logger;