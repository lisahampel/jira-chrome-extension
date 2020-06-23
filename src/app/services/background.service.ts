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
        /*this._port = chrome.runtime.connect({
            name: 'Sample Communication'
        });

        console.log('LoginPage port', this._port);
        this._port.postMessage('Hi BackGround');
        // tslint:disable-next-line:only-arrow-functions
        this._port.onMessage.addListener(function() {
            console.log('LoginPage message received', ...arguments);
        });*/
    }

    startWebAuthFlow(options: chrome.identity.WebAuthFlowOptions): Promise<string> {
        return new Promise((resolve) => {
            const message = {
                type: BackgroundActionType.START_WEB_AUTH_FLOW,
                payload: options
            };

            this._sendMessage(message, (result) => {
                console.log('BackgroundService.startWebAuthFlow result', result);
                resolve(result);
            });
        });
    }

    private _sendMessage(message: any, callback: (result: any) => any) {
        chrome.runtime.sendMessage(message, (result) => {
            console.log('BackgroundService._sendMessage result', result);

            if (!result)
                console.error("This was a fiasco :", chrome.runtime.lastError.message);
            callback(result);
        });
    }

}
