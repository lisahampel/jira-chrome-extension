

function startWebAuthFlow(payload) {
    chrome.identity.launchWebAuthFlow(payload, resolve)
}

chrome.runtime.onConnect.addListener(function(port) {
    console.log("Background Connected .....", port.name);
    port.onMessage.addListener(function(action) {
        switch(action.type) {
            case 'startWebAuthFlow':
                startWebAuthFlow();
        }
        console.log("Background  message recieved2 " + msg);
        port.postMessage("Hi Popup.js");
    });
});

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
