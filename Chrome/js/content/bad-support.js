chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action == 'report-bad-support') {
        var xPath = getElementXPath(document.activeElement);
        chrome.runtime.sendMessage({action: 'send-report', xpath: xPath, url: document.location.toString()});
    }
});
