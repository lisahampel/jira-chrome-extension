export interface IBrowserInfo {
    userAgent: string;
    os: string;
    browser: string;
    ipAddress: string;
    jsEnabled: boolean;
    cookiesEnabled: boolean;
    websocketSupported: boolean;
    webGlSupported: boolean;
    locale: string;
    windowHeight: number;
    windowWidth: number;
}
