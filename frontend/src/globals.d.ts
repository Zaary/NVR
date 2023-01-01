interface Window {
    captchaCallback: (() => void) | undefined;
}

declare module "*.html" {
    const content: string;
    export default content;
}