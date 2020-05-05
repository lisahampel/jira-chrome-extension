import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class ScreenshotService {

    constructor() {
    }

    takeScreenshot() {
        chrome.tabs.captureVisibleTab((screenshotUrl) => {
            const link = document.createElement('a');
            link.download = 'screenshot.png';
            link.href = screenshotUrl;
            link.click();
        });
    }
}
