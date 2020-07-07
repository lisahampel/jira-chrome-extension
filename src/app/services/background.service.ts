import { Injectable } from '@angular/core';

enum BackgroundActionType {
    START_WEB_AUTH_FLOW = 'startWebAuthFlow',
    GET_BROWSER_INFO = 'getBrowserInfo'
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
        return this._sendMessageAsync({
            type: BackgroundActionType.START_WEB_AUTH_FLOW,
            payload: options
        });
    }

    private _sendMessage<MESSAGE, RESULT>(message: MESSAGE, onResult: (result: RESULT) => void, onError?: (error: any) => void) {
        chrome.runtime.sendMessage(message, (result) => {
            console.log('BackgroundService._sendMessage result', result);

            if (!result) {
                if (onError != null) {
                    onError(chrome.runtime.lastError);
                }

                return;
            }

            onResult(result);
        });
    }

    private _sendMessageAsync<MESSAGE, RESULT>(message: MESSAGE): Promise<RESULT> {
        return new Promise<RESULT>((resolve, reject) => {
            this._sendMessage<MESSAGE, RESULT>(message, resolve, reject);
        });
    }

}
