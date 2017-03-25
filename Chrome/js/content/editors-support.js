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

    function shouldInjectBeautify(options) {
        return options.add_format_button || options.format_on_loading;
    }

    function getScriptsToInject(options) {
        var result = [CDN_JS_ACE, chrome.extension.getURL('js/editors/tinymce/loader.js')];
        if (shouldInjectBeautify(options)) {
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

    function addSummerNoteCustomization(options) {
        // console.log('addSummerNoteCustomization: ' + shouldInjectBeautify(options));

        // if (shouldInjectBeautify(options)) {
        //     injectScripts([chrome.extension.getURL('js/content/lib/beautify-html.js')]);
        // }
    }

    function getOptions(editors) {
        return Object.assign({theme: getAceTheme(editors.theme)}, editors.tinymceOptions);
    }

    function detectEditors() {
        injectScripts([
            chrome.extension.getURL('js/content/const.js'),
            chrome.extension.getURL('js/content/events.js'),
            chrome.extension.getURL('js/editors/detector.js')
        ]);
    }

    function getEditorsOptions(callback) {
        chrome.runtime.sendMessage({action: 'get-editors-options'}, callback);
    }

    function handleInstalledEditors(data) {
        console.log('@@@@ data: ' + JSON.stringify(data));
        window._detectedEditors = data;

        if (data.summernote) {
            getEditorsOptions(function(options){
                window._detectedEditorsOptions = options;

                // console.log('summernote options: ' + JSON.stringify(options));
                addSummerNoteCustomization(options.summernoteOptions);
            });
        }
        if (data.tinymce) {
            getEditorsOptions(function(options){
                window._detectedEditorsOptions = options;

                // console.log('tinymce options: ' + JSON.stringify(options));
                addTinyMceCustomization(getOptions(options));
            });
        }
    }

    var api = new ExtAPI();
    api.getInstalledEditors(handleInstalledEditors);
    detectEditors();
})();