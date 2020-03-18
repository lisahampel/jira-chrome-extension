chrome.browserAction.onClicked.addListener(() => {

    // chrome.webNavigation.onCompleted.addListener(() => {
    //     chrome.tabs.query({active: true, currentWindow: true}, ([{id}]) => {
    //         chrome.pageAction.show(id);
    //     });
    // });
});

/*chrome.browserAction.onClicked.addListener(() => {
    chrome.tabs.captureVisibleTab((screenshotUrl) => {
        const link = document.createElement('a');
        link.download = 'screenshot.png';
        link.href = screenshotUrl;
        link.click();
});
});*/
