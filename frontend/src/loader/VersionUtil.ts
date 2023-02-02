class Version {
    
    public major: number;
    public minor: number;
    public revision: number;

    constructor(major: number, minor: number, revision: number) {
        this.major = major;
        this.minor = minor;
        this.revision = revision;
    }
}

function parseVersion(version: string) {
    const data = version.split(/[_\.]/).map(Number);
    return new Version(data[0], data[1], data[2]);
}