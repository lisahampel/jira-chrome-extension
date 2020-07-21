import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBrowserInfo } from '../models/browser-information.model.i';
import { BackgroundService } from './background.service';
import platform from 'platform';

@Injectable({
    providedIn: 'root'
})
export class IssueService {

    constructor(private readonly _backgroundService: BackgroundService, private readonly _http: HttpClient) {
    }

    sendBug() {
        // chrome.tabs.captureVisibleTab()
    }

    async getBrowserInfo(): Promise<IBrowserInfo> {
        const browserInfo: IBrowserInfo = {
            userAgent: navigator.userAgent,
            ...platform
        } as IBrowserInfo;

        let currentTab: chrome.tabs.Tab = await new Promise((resolve) => chrome.tabs.getCurrent(resolve));


        console.log('BackgroundService.getBrowserInfo currentTab', currentTab);

        if (currentTab == null) {
            const activeTabs: chrome.tabs.Tab[] = await new Promise<chrome.tabs.Tab[]>((resolve) => chrome.tabs.query({ active: true }, resolve));

            console.log('BackgroundService.getBrowserInfo activeTabs', activeTabs);
            currentTab = activeTabs[0];
        }

        if (currentTab != null) {
            browserInfo.locale = await new Promise((resolve) => chrome.tabs.detectLanguage(resolve));
            browserInfo.windowHeight = currentTab.height;
            browserInfo.windowWidth = currentTab.width;
        }

        this._http.get('http://api.ipify.org/?format=json').subscribe((res: any) => {
            browserInfo.ipAddress = res.ip;
            console.log('ipAddress: ', browserInfo.ipAddress);
        });

        browserInfo.cookiesEnabled = navigator.cookieEnabled;

        const support = 'MozWebSocket' in window ? 'MozWebSocket' : ('WebSocket' in window ? 'WebSocket' : null);
        if (support == null) {
            browserInfo.websocketSupported = false;
        } else {
            browserInfo.websocketSupported = true;
        }

        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) {
            browserInfo.webGlSupported = false;
            console.log('your browser has no WebGL2 support at all');
        } else {
            browserInfo.webGlSupported = true;
            console.log('webgl2 works!');
        }

        // check, ob noscript da ist (jsEnabled)
        const elementExists = document.querySelector('noscript');
        console.log(elementExists);

        return browserInfo;
    }
}
