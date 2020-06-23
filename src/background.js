function startWebAuthFlow(payload, callback) {
    console.log('startWebAuthFlow', payload);

    const identity = chrome.identity;
    const launchWebAuthFlow = identity.launchWebAuthFlow;

    launchWebAuthFlow(payload, (result) => {
        console.log('startWebAuthFlow =>', result || chrome.runtime.lastError);
        callback(result);
    });
}

console.log('chrome.identity', chrome.identity);
console.log('chrome.identity.launchWebAuthFlow', chrome.identity.launchWebAuthFlow);

chrome.runtime.onMessage.addListener((action, sender, sendResponse) => {
    console.log('Background  onMessage received2 ', action, sender, sendResponse);
    switch (action.type) {
        case 'startWebAuthFlow':
            startWebAuthFlow(action.payload, (result) => sendResponse(result));
            break;
    }

    return true;
});

/*chrome.runtime.onConnect.addListener((port) => {
    console.log('Background Connected .....', port.name);
    // @ts-ignore
    port.onMessage.addListener((action, sender, response) => {
        console.log('Background  onConnect message received2 ', action);
        switch (action.type) {
            case 'startWebAuthFlow':
                startWebAuthFlow(action.payload, (result) => response(result));
                break;
        }
        port.postMessage('Hi Popup.js');
    });
});*/

// chrome.browserAction.onClicked.addListener(() => {


/* chrome.webNavigation.onCompleted.addListener(() => {
     chrome.tabs.query({active: true, currentWindow: true}, ([{id}]) => {
         chrome.pageAction.show(id);
     });
 });*/
// });

/*chrome.browserAction.onClicked.addListener(function() {
    chrome.tabs.create({url: 'index.html'});
});*/

/*chrome.browserAction.onClicked.addListener(() => {
    chrome.tabs.captureVisibleTab((screenshotUrl) => {
        const link = document.createElement('a');
        link.download = 'screenshot.png';
        link.href = screenshotUrl;
        link.click();
});
});*/
