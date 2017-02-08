(function () {
    var CDN_JS = document.location.protocol + '//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.3.0/highlight.min.js';
    var CDN_CSS = document.location.protocol + '//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.3.0/styles/$THEME$.min.css';

    var DEFAULT_THEME = 'tomorrow-night-bright';
    var THEMES_MAPPING = {
        'dark': DEFAULT_THEME,
        'light': 'github'
    };
    var codeBackup;

    function isTextDoc() {
        return document.contentType == "text/plain";
    }

    function getTheme(theme) {
        return THEMES_MAPPING[theme] || DEFAULT_THEME;
    }

    function injectThemeCss(theme) {
        $('head').append($("<link>", {
            'rel': 'stylesheet',
            'href': CDN_CSS.replace('$THEME$', getTheme(theme))
        }));
    }

    function addJsHighlighting(syntax, $nodes) {
        return function () {
            window.hljs.configure({
                languages: [syntax]
            });

            $nodes.each(function (i, block) {
                codeBackup = $(block).text();
                window.hljs.highlightBlock(block);
            });
        };
    }

    function addHighlighting(syntax, theme) {
        injectThemeCss(theme);

        loadScript(CDN_JS, addJsHighlighting(syntax, $('pre')));
    }

    function removeJsHighlighting() {
        $('pre').text(codeBackup).removeAttr('class');
        codeBackup = null;
    }

    function chooseContextAction() {
        return codeBackup ? 'highlightjs-context' : 'text-plain-context';
    }

    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
        if (message.action == 'highlightjs-add') {
            addHighlighting(message.syntax, message.theme);
        } else if (message.action == 'remove-highlightjs-highlighting') {
            removeJsHighlighting();
        }
    });

    if (isTextDoc()) {
        $(document).on('mousedown', function (e) {
            if (e.which == 3) {
                chrome.runtime.sendMessage({action: chooseContextAction()});
            }
        });
    }
})();