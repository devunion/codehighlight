chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action == 'report-bad-support') {
        var email = message.email;
        if (email == '') {
            email = prompt('Leave your email to get feedback about the progress on fixing the problem.');
        }
        var xPath = getElementXPath(document.activeElement);
        chrome.runtime.sendMessage({action: 'send-report', xpath: xPath, url: document.location.toString(), email: email});
    }
});
