(function () {
    function injectScripts(scripts) {
        var head = $('head');
        scripts.forEach(function (url) {
            head.append($("<script>", {'src': url}));
        });
    }

    function isHighlightingEnabled(options) {
        return options['source_code_highlighted'];
    }

    function writeOptionsIntoPage(options) {
        $('body').append($("<div>", Object.assign({
            'id': 'ch-tinymce-options',
        }, options)).hide());
    }

    function shouldInjectBeautiry(options) {
        return options.add_format_button || options.format_on_loading;
    }

    function getScriptsToInject(options) {
        var result = [CDN_JS_ACE, chrome.extension.getURL('js/editors/tinymce/loader.js')];
        if (shouldInjectBeautiry(options)) {
            result.push(chrome.extension.getURL('js/content/lib/beautify-html.js'));
        }
        return result;
    }

    function addTinyMceCustomization(options) {
        if (!isHighlightingEnabled(options)) {
            return;
        }

        writeOptionsIntoPage(options);

        injectScripts(getScriptsToInject(options));
    }

    function getOptions(editors) {
        return Object.assign({theme: getAceTheme(editors.theme)}, editors.tinymceOptions);
    }

    chrome.runtime.sendMessage({action: 'get-installed-editors'}, function (editors) {
        if (editors.tinymce) {
            addTinyMceCustomization(getOptions(editors));
        }
    });
})();