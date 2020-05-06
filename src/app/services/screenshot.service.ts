import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ScreenshotService {

    constructor() {
    }

    takeScreenshot(): Promise<string> {
        return new Promise((resolve) => {
            chrome.tabs.captureVisibleTab(resolve);
        });
    }

    downloadUrl(screenshotUrl) {
        const link = document.createElement('a');
        link.download = 'screenshot.png';
        link.href = screenshotUrl;
        link.click();
    }
}
