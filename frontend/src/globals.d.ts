interface Window {
    requestAnimFrame(callback: { (time: DOMHighResTimeStamp): void; }): number;
    captchaCallback: (() => void) | undefined;
}

declare module "*.html" {
    const content: string;
    export default content;
}

declare module "!!raw-loader!*" {
    const content: string;
    export default content;
}