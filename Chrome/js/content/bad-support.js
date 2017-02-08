chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action == 'report-bad-support') {
        var xPath = getElementXPath(document.activeElement);

        console.log('report-bad-support + xPath: ' + xPath);
        chrome.runtime.sendMessage({action: 'send-report', xpath: xPath, url: document.location.toString()});
    }
});
