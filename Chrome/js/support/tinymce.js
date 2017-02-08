var tabId2tinymce = {};

chrome.tabs.onRemoved.addListener(function (tabId, info) {
    delete tabId2tinymce[tabId];
});

chrome.webRequest.onBeforeRequest.addListener(function (data) {
    if (!data.tabId) {
        return;
    }
    if (data.type == "script" && data.url.indexOf('tinymce.min.js') != -1) {
        tabId2tinymce[data.tabId] = true;
    }
}, {urls: ["http://*/*", "https://*/*"]}, []);

export function hasTinyMCE(tabId) {
    return !!tabId2tinymce[tabId];
}
