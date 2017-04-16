
var URL_FEEDBACK = 'http://codehighlight.com/scripts/feedback.php';
var URL_UNINSTALL = 'http://codehighlight.idea.informer.com/proj/?mod=one';

import * as menu from 'js/menu.js';
import * as options from 'options/js/options.js';

window.menu = menu;

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
        if ($.trim(message.email) != '') {
            options.setUserEmail(message.email);
        }
        sendReport(message.xpath, message.url);
    } else if (message.action == 'get-editors-options') {
        sendResponse(
            getEditorsOptions()
        );
    } else if (message.action == 'load-formatter') {
        //TODO: check syntax
        chrome.tabs.executeScript(sender.tab.id, {
            file: "js/content/lib/beautify-html.js",
            runAt: 'document_start'
        }, sendResponse);
    }
    return true;
});

function getEditorsOptions() {
    return {
        theme: options.getEditorTheme(),
        tinymceOptions: options.getTinyMceOptions(),
        summernoteOptions: options.getSummernoteOptions()
    };
}
function sendReport(xpath, url) {
    $.post(URL_FEEDBACK, {
        action: 'report_bad_support',
        xpath: xpath,
        email: options.getUserEmail(),
        url: url
    }).success(function () {
        alert('We\'ve received your report. Thank you!');
    });
}

menu.addHighlightingMenu();

chrome.runtime.setUninstallURL(URL_UNINSTALL);