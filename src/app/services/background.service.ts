import { Injectable } from '@angular/core';

enum BackgroundActionType {
    START_WEB_AUTH_FLOW = 'startWebAuthFlow'
}

enum BackgroundResponseType {
    WEB_AUTH_FLOW = 'webAuthFlow'
}

interface StartWebAuthFlowAction {
    type: BackgroundActionType.START_WEB_AUTH_FLOW;
    payload: chrome.identity.WebAuthFlowOptions;
}

interface WebAuthFlowResponse {
    type: BackgroundResponseType.WEB_AUTH_FLOW;
    payload: { redirectUrl: string };
}


@Injectable({
    providedIn: 'root'
})
export class BackgroundService {
    private readonly _port: chrome.runtime.Port;

    constructor() {
        this._port = chrome.runtime.connect({
            name: 'Sample Communication'
        });

        console.log('LoginPage port', this._port);
        this._port.postMessage('Hi BackGround');
// tslint:disable-next-line:only-arrow-functions
        this._port.onMessage.addListener(function() {
            console.log('LoginPage message recieved', ...arguments);
        });
    }

    startWebAuthFlow(options: chrome.identity.WebAuthFlowOptions) {
        this._port.postMessage({
            type: BackgroundActionType.START_WEB_AUTH_FLOW,
            payload: options
        });
    }
}
