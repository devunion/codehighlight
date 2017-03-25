import * as options from 'options/js/options.js';
// import {hasTinyMCE, hasSummerNote} from 'js/support/common-editors.js';

var ID_HIGHLIGHT_TOP = "highlightTop";
var ID_REMOVE_HIGHLIGHTING = 'removeHighlighting';
var ID_ADD_HIGHLIGHT_JS_MENU = 'addHighlightJS';
var ID_REMOVE_HIGHLIGHT_JS_MENU = 'removeHighlightJS';

export function removeHighlightingMenu(action, contexts) {
    chrome.contextMenus.removeAll(function () {
        chrome.contextMenus.create({
            id: ID_REMOVE_HIGHLIGHTING,
            title: "Remove Highlighting",
            contexts: contexts,
            onclick: function (info, tab) {
                chrome.tabs.sendMessage(tab.id, {action: action});
                chrome.contextMenus.remove(ID_REMOVE_HIGHLIGHTING);

                addHighlightingMenu();
            }
        });
    });
}

export function addHighlightJsMenu() {
    chrome.contextMenus.removeAll(function () {
        chrome.contextMenus.create({
            id: ID_ADD_HIGHLIGHT_JS_MENU,
            title: "Highlighting Document",
            contexts: ["page"]
        });

        createLanguagesMenuItems(ID_ADD_HIGHLIGHT_JS_MENU, ["page"], 'highlightjs-add', options.getHighlighterTheme());
    });
}

export function createLanguagesMenuItems(parentId, contexts, action, theme) {
    [
        ["CSS", 'css'],
        ["JavaScript", 'javascript'],
        ["HTML", 'html'],
        ["Python", 'python'],
        ["C++", 'cpp'],
        ["Java", 'java'],
        ["Ruby", 'ruby']
    ].forEach(function (lang) {
        chrome.contextMenus.create({
            parentId: parentId,
            title: lang[0],
            contexts: contexts,
            onclick: (function (syntax) {
                return function (info, tab) {
                    // editors: {tinymce: hasTinyMCE(tab.id), summernote: hasSummerNote(tab.id)}
                    chrome.tabs.sendMessage(tab.id, {action: action, syntax: syntax, theme: theme});
                }
            })(lang[1])
        });
    });
}

export function addHighlightingMenu() {
    chrome.contextMenus.removeAll(function () {
        chrome.contextMenus.create({
            id: ID_HIGHLIGHT_TOP,
            title: "Code Highlight",
            contexts: ["editable"]
        });

        createLanguagesMenuItems(ID_HIGHLIGHT_TOP, ["editable"], 'add-ace-highlighting', options.getEditorTheme());

        chrome.contextMenus.create({parentId: ID_HIGHLIGHT_TOP, type: 'separator', contexts: ["editable"]});

        chrome.contextMenus.create({
            parentId: ID_HIGHLIGHT_TOP,
            title: "Report bad support",
            contexts: ["editable"],
            onclick: function (info, tab) {
                chrome.tabs.sendMessage(tab.id, {action: 'report-bad-support', email: options.getUserEmail()});
            }
        });
    });
}
