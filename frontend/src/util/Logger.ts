enum Level {
    LOG,
    INFO,
    WARN,
    ERROR,
    TRACE
}

const LogLevel: Map<Level, string> = new Map();
LogLevel.set(Level.LOG, "LOG");
LogLevel.set(Level.INFO, "INFO");
LogLevel.set(Level.WARN, "WARN");
LogLevel.set(Level.ERROR, "ERROR");
LogLevel.set(Level.TRACE, "TRACE");

function format(loggerId: string, level: Level, ...msg: string[]): string[] {
    return [`NVR | ${loggerId}: [${LogLevel.get(level)}] ->`].concat(msg);
}

class Logger {

    private id: string;
    private profilers: Map<string, number>;
    private console: Console;

    constructor(arg0: string | Console, arg1?: string) {
        this.id = typeof arg0 == "string" ? arg0 : arg1!;
        this.profilers = new Map();
        this.console = typeof arg0 == "object" ? arg0 : window.console;
    }

    log(...message: any[]) {
        this.console.log(...format(this.id, Level.LOG, ...message));
    }

    info(...message: any[]) {
        this.console.info(...format(this.id, Level.INFO, ...message));
    }
    
    warn(...message: any[]) {
        this.console.warn(...format(this.id, Level.WARN, ...message));
    }

    error(...message: any[]) {
        this.console.error(...format(this.id, Level.ERROR, ...message));
    }

    trace(...message: any[]) {
        this.console.trace(...format(this.id, Level.TRACE, ...message));
    }

    profile(profileId: string, ...message: any[]) {
        if (this.profilers.has(profileId)) {
            this.console.log(...format(this.id, Level.LOG, ...message, `(took ${Date.now() - <number> this.profilers.get(profileId)} ms)`));
            this.profilers.delete(profileId);
        } else {
            this.profilers.set(profileId, Date.now());
        }
    }
}

export default Logger;