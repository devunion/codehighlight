
var URL_FEEDBACK = 'http://codehighlight.com/scripts/feedback.php';
var URL_UNINSTALL = 'http://codehighlight.idea.informer.com/proj/?mod=one';

import * as menu from 'js/menu.js';
import * as options from 'options/js/options.js';
import {hasTinyMCE} from 'js/support/tinymce.js';

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action == 'inject_script') {
        $.ajax({
            url: message.src,
            dataType: 'text'
        }).done(function (content) {
            chrome.tabs.executeScript(sender.tab.id, {code: content}, function (result) {
                sendResponse();
            });
        });
    } else if (message.action == 'ace-editor-context') {
        menu.removeHighlightingMenu('remove-ace-highlighting', ["editable"]);
    } else if (message.action == 'plain-editor-context') {
        menu.addHighlightingMenu();
    } else if (message.action == 'text-plain-context') {
        menu.addHighlightJsMenu();
    } else if (message.action == 'highlightjs-context') {
        menu.removeHighlightingMenu('remove-highlightjs-highlighting',  ["page"]);
    } else if (message.action == 'send-report') {
        sendReport(message.xpath, message.url);
    } else if (message.action == 'get-installed-editors') {
        sendResponse(
            Object.assign({theme: options.getEditorTheme()}, getInstalledEditors(sender.tab.id))
        );
    }
    return true;
});

function getInstalledEditors(tabId) {
    let response = {};
    if (hasTinyMCE(tabId)) {
        response.tinymce = true;
        response.tinymceOptions = options.getTinyMceOptions();
    }
    return response;
}
function sendReport(xpath, url) {
    $.post(URL_FEEDBACK, {
        action: 'report_bad_support',
        xpath: xpath,
        url: url
    }).success(function () {
        alert('We\'ve received your report. Thank you!');
    });
}

menu.addHighlightingMenu();

chrome.runtime.setUninstallURL(URL_UNINSTALL);