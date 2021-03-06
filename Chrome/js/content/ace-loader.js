'use strict';

const SYNTAX_HTML = "html";

//TODO: check on WP workfusion plugin custom code (extdev/customers)
class SavedEditorsState {
    constructor() {
        this.savedEditors = ls_get('ch_saved_editors', {});
    }

    saveEditorState(xPath, state) {
        this.savedEditors[xPath] = state;

        ls_set('ch_saved_editors', this.savedEditors);
    }

    removeSavedEditor(xPath) {
        delete this.savedEditors[xPath];
        ls_set('ch_saved_editors', this.savedEditors);
    }

    restoreSavedEditors() {
        this.walkSavedEditors((xPath, ed) => {
            if (SavedEditorsState.matchPattern(ed.pattern)) {
                SavedEditorsState.addHighlighting(xPath, ed);
            }
        });
    }

    walkSavedEditors(handler) {
        if ($.isEmptyObject(this.savedEditors)) {
            return;
        }

        for (var xPath in this.savedEditors) {
            handler(xPath, this.savedEditors[xPath]);
        }
    }

    hasSavedState(xPath) {
        return this.savedEditors[xPath];
    }

    static matchPattern(pattern) {
        return new RegExp(pattern).test(document.location.toString());
    }

    static addHighlighting(xPath, ed) {
        var editorEl = getElementByXpath(xPath);
        if (document.activeElement != editorEl) {
            editorEl.focus();
        }

        let editor = editorSupport.getEditorForNode(editorEl);
        editor.addHighlighting(ed.syntax, ed.theme);
    }
}

var savedEditors = new SavedEditorsState();

class SitesSupport {
    constructor() {
        this.attached = false;
        this.styleId = 'ch-styles-fixer';

        this.sites = [
            {
                desc: 'WordPress -> Appearance -> Edit page',
                condition: () => {
                    return $('#wpbody-content #template').length > 0;
                },
                cssFile: 'css/content/support/wordpress-appearance-editor.css'
            }
        ];
    }

    attach() {
        for (let site of this.sites) {
            if (site.condition()) {
                this.injectStyle(site.cssFile);
                this.attached = true;
                break;
            }
        }
    }

    detach() {
        if (this.attached) {
            $('#' + this.styleId).remove();
        }
    }

    injectStyle(file) {
        $('head').append($('<link>', {
            id: this.styleId,
            rel: 'stylesheet',
            type: 'text/css',
            href: chrome.extension.getURL(file)
        }));
    }
}
var sitesSupport = new SitesSupport();



class EditorButton {
    constructor(aceEditor, initialTooltip) {
        this.aceEditor = aceEditor;

        this.$button = this
            ._createButton()
            .attr('title', initialTooltip)
            .click(this._buttonClick.bind(this));
    }

    appendTo(el) {
        this.$button.appendTo(el);
    }

    remove() {
        this.$button.remove();
    }
}

class EditorSettingsButton extends EditorButton  {
    constructor(aceEditor) {
        super(aceEditor, 'Change settings of the current editor');
    }

    _createButton() {
        return $('<div>', {
            'class': 'ch-editor-button ch-active-editor-settings',
        }).css({
            top: '2px',
            right: '2px'
        });
    }

    _buttonClick() {
        this.aceEditor.execCommand("showSettingsMenu");
    }
}

class CodeEditorButton extends EditorButton {
    /**
     * @return {string}
     */
    static TOOLTIP_SAVE() {
        return 'Remember settings for this editor';
    }

    /**
     * @return {string}
     */
    static TOOLTIP_REMOVE() {
        return 'Forget settings for this editor';
    }

    constructor(aceEditor, editorXPath) {
        super(aceEditor, CodeEditorButton.TOOLTIP_SAVE());

        this.doSave = true;

        this.editorXPath = editorXPath;

        if (savedEditors.hasSavedState(this.editorXPath)) {
            this.updateButtonState();
            this.doSave = !this.doSave;
        }
    }

    _createButton() {
        return $('<div>', {
            'class': 'ch-editor-button ch-save-editor-settings',
        }).css({
            bottom: '2px',
            right: '2px'
        });
    }

    _buttonClick() {
        if (this.doSave) {
            var pattern = CodeEditorButton.promptPattern();
            if (!pattern) {
                return;
            }

            this.updateButtonState();

            savedEditors.saveEditorState(this.editorXPath, {
                pattern: pattern,
                syntax: this._getCurrentSyntax(),
                theme: this._getCurrentTheme(),
            });
        } else {
            this.updateButtonState();

            savedEditors.removeSavedEditor(this.editorXPath);
        }

        this.doSave = !this.doSave;
    }

    _getCurrentSyntax() {
        return this.aceEditor.getSession().getMode()['$id'].replace('ace/mode/', '');
    }

    _getCurrentTheme() {
        return this.aceEditor.getTheme().replace('ace/theme/', '');
    }

    _getToolTip() {
        return this.doSave ? CodeEditorButton.TOOLTIP_REMOVE() : CodeEditorButton.TOOLTIP_SAVE()
    }

    updateButtonState() {
        this.$button.toggleClass('discard').attr('title', this._getToolTip());
    }

    static promptPattern() {
        while (true) {
            var pattern = prompt('Specify URL or pattern for this editor detection.\nTip: pattern can contain asterisks only.', document.location.toString())
            if (pattern === null) {
                return null;
            }

            if ($.trim(pattern) == '') {
                alert("Pattern can't be blank");
                continue;
            }

            return RegExp.escape(pattern).replace('\\*', '.*');
        }
    }
}

class CodeEditor {
    constructor(activeEl) {
        this._activeEditor = new EditorTypesSupport().getContainerInfo();
        this._containerInfo = new EditorTypesSupport().getContainerInfo();

        this.id = "ace-csseditor-" + new Date().getTime();
        this.realEditorXPath = getElementXPath(activeEl);

        this.$editor = $('<div>', {id: this.id, 'original-editor': this.realEditorXPath});
        this.$realEditor = $(activeEl);
        this.$realEditorContainer = this._containerInfo.container;
    }

    copyCssToEditor() {
        ['border', 'width', 'height', 'position', 'left', 'top', 'right', 'bottom', 'margin'].forEach(function (prop) {
            let val = this.$realEditorContainer.css(prop);

            if (prop == 'position' && val == 'static') {
                return;
            }

            this.$editor.css(prop, this.$realEditorContainer.css(prop));

        }.bind(this));
    }

    applyCustomStyles() {
        if (this._activeEditor.css) {
            this.$editor.css(this._activeEditor.css);
        }
    }

    isTinyMceEditor() {
        return this._activeEditor.type == 'tinymce' || this._activeEditor.type == 'tinymce-code';
    }

    isSummerNoteEditor() {
        return this._activeEditor.type == 'summernote-codable' || this._activeEditor.type == 'summernote-editable';
    }

    _ensureFormatterLoaded(callback) {
        if (!callback) {
            return;
        }

        if (window.html_beautify) {
            callback();
        } else {
            chrome.runtime.sendMessage({action: 'load-formatter', syntax: 'html'}, callback);
        }
    }

    _getEditorCode(syntax, callback) {
        if (this.isSummerNoteEditor()) {
            var code = this._activeEditor.text;

            if (syntax == SYNTAX_HTML && window._detectedEditorsOptions.summernoteOptions.format_on_loading) {
                this._ensureFormatterLoaded(function () {
                    code = window.html_beautify(code, {
                        "indent_level": 0,
                        "indent_with_tabs": true,
                        "preserve_newlines": false,
                    });

                    callback(code);
                });
            } else {
                callback(code);
            }
        } else {
            callback(this._activeEditor.text);
        }
    }

    addHighlighting(syntax, theme) {
        if (this.isTinyMceEditor()) {
            alert('Please use standard source code editor tool. You should already have a syntax highlighting there.');
            return;
        }

        theme = getAceTheme(theme);

        this.copyCssToEditor();
        this.applyCustomStyles();

        //TODO: remove placeholder for summernote.
        //TODO: just add class???
        this._getEditorCode(syntax, function (code) {
            this.setValue(code);

            this._activeEditor.hideContainer();

            this.addCodeEditor(syntax, theme);

            this.addSaveButton();
            this.addSettingsButton();

            this.aceEditor.focus();
        }.bind(this));
    }

    addCodeEditor(syntax, theme) {
        this.$realEditorContainer.after(this.$editor);

        this.aceEditor = window.ace.edit(this.id);
        this.aceEditor.setOption("wrap", "free");
        this.aceEditor.setOption("show_print_margin", 'false');
        this.aceEditor.setShowPrintMargin(false);

        this.aceEditor.setTheme("ace/theme/" + theme);
        this.aceEditor.getSession().setMode("ace/mode/" + syntax);

        this.aceEditor.setOption("enableEmmet", true);

        // add command to lazy-load keybinding_menu extension
        // this.aceEditor.commands.addCommand({
        //     name: "showKeyboardShortcuts",
        //     bindKey: {win: "Ctrl-Alt-h", mac: "Command-Alt-h"},
        //     exec: function(editor) {
        //         window.ace.config.loadModule("ace/ext/keybinding_menu", function(module) {
        //             module.init(editor);
        //             editor.showKeyboardShortcuts()
        //         })
        //     }
        // });
        // this.aceEditor.execCommand("showKeyboardShortcuts");

        this.addStateSync();
    }

    setValue(value) {
        this.$editor.text(value);
        // this.aceEditor.setValue(value);
    }

    addSettingsButton() {
        this.settingsButton = new EditorSettingsButton(this.aceEditor);
        this.settingsButton.appendTo(this.$editor);
    }

    addSaveButton() {
        this.saveButton = new CodeEditorButton(this.aceEditor, this.realEditorXPath);
        this.saveButton.appendTo(this.$editor);
    }

    addStateSync() {
        this.aceEditor.getSession().on('change', function (e) {
            this._activeEditor.text = this.aceEditor.getValue();
        }.bind(this));
    }

    removeHighlighting() {
        //this.aceEditor.destroy();
        this.$editor.remove();

        this._activeEditor.showContainer();
        this.saveButton.remove();

        this.$realEditor.focus();
    }
}

class TinyMceApi {
    constructor() {
        if (TinyMceApi._instance) {
            throw Error('Singleton already was created!');
        }

        this.EVENT_NAME = 'ApiSupport::TinyMCE';
        this.ACTION_SET_TEXT = 'SetText';
        this.ACTION_READY = 'Ready';
        this.ACTION_HIDE = 'Hide';
        this.ACTION_SHOW = 'Show';

        this._ready = false;
        this._addEventListener();

        injectScripts([chrome.extension.getURL('js/editors/tinymce/support.js')]);
    }


    static get() {
        if (!TinyMceApi._instance) {
            TinyMceApi._instance = new TinyMceApi();
        }
        return TinyMceApi._instance;
    }


    _addEventListener() {
        window.addEventListener(this.EVENT_NAME, (e) => {
            var action = e.detail.action;

            switch (action) {
                case this.ACTION_READY:
                    this._ready = true;

                    if (this._text) {
                        this._sendEvent(this.ACTION_SET_TEXT, this._text);
                        this._text = null;
                    }

                    if (this._doHide) {
                        this._sendEvent(this.ACTION_HIDE);
                        this._doHide = false;
                    }

                    if (this._doShow) {
                        this._sendEvent(this.ACTION_SHOW);
                        this._doShow = false;
                    }

                    break;
            }
        });
    }

    _sendEvent(action, data) {
        window.dispatchEvent(new CustomEvent(this.EVENT_NAME, {
            detail: {
                action: action,
                data: data
            }
        }));
    }

    setText(text) {
        if (this._ready) {
            this._sendEvent(this.ACTION_SET_TEXT, text);
        } else {
            this._text = text;
        }
    }

    hide() {
        if (this._ready) {
            this._sendEvent(this.ACTION_HIDE);
        } else {
            this._doHide = true;
        }
    }

    show() {
        if (this._ready) {
            this._sendEvent(this.ACTION_SHOW);
        } else {
            this._doShow = true;
        }
    }
}

TinyMceApi._instance = null;

//TODO create standalone classes for each object.
class EditorTypesSupport {
    constructor() {
        this._supportedEditors = [
            {
                description: 'WordPress Page/Post code editor',
                type: 'wp-post-page-code',
                isEditor: function ($el) {
                    return this.getContainer($el).length > 0 && $el.hasClass('wp-editor-area')
                },
                getContainer: ($el) => {
                    return $el.parents('#postdivrich')
                },
                getText: $el => $el.val(),
                setText: ($el, val) => {
                    $el.val(val)
                },
                css: {
                    marginTop: '20px'
                }
            },
            {
                description: 'WordPress Page/Post rich editor',
                type: 'wp-post-page-rich',
                isEditor: function ($el) {
                    return this.getContainer($el).length > 0 && $el.attr('id') == 'content_ifr'
                },
                getContainer: ($el) => {
                    return $el.parents('#postdivrich')
                },
                getText: $el => $('.wp-editor-area').val(),
                setText: ($el, val) => {
                    TinyMceApi.get().setText(val)
                },
                hideContainer: (container) => {
                    container.addClass('ch-hidden');
                    TinyMceApi.get().hide()
                },
                showContainer: (container) => {
                    container.removeClass('ch-hidden');
                    TinyMceApi.get().show()
                },
                css: {
                    marginTop: '20px'
                }
            },
            {
                description: 'TinyMce popup editor',
                type: 'tinymce-code',
                isEditor: function ($el) {
                    return $el.hasClass('mce-textbox')
                },
                getContainer: ($el) => {
                    return $el.parents('.mce-container-body').filter(':last')
                },
                getText: $el => $el.val(),
                setText: ($el, val) => {
                    $el.val(val)
                }
            },
            {
                description: 'TinyMce inline editor',
                type: 'tinymce',
                isEditor: function ($el) {
                    return this.getContainer($el).length > 0
                },
                getContainer: ($el) => {
                    return $el.parents('.mce-tinymce')
                },
                getText: $el => $el.val(),
                setText: ($el, val) => {
                    $el.val(val)
                }
            },
            {
                description: 'Summernote editable area',
                type: 'summernote-editable',
                isEditor: function ($el) {
                    return $el.hasClass('note-editable')
                },
                getContainer: ($el) => {
                    return $el.parents('.note-editor')
                },
                getText: $el => $el.html(),
                setText: ($el, val) => {
                    $el.html(val)
                }
            },
            {
                description: 'Summernote codable area',
                type: 'summernote-codable',
                isEditor: function ($el) {
                    return $el.hasClass('note-codable')
                },
                getContainer: ($el) => {
                    return $el.parents('.note-editor')
                },
                getText: $el => $el.val(),
                setText: ($el, val) => {
                    $el.val(val)
                }
            },
            {
                description: 'Default text editor',
                type: 'plain',
                isEditor: function ($el) {
                    return true
                },
                getContainer: ($el) => {
                    return $el
                },
                getText: $el => $el.val(),
                setText: ($el, val) => {
                    $el.val(val)
                }
            }
        ];
    }

    // Returns container element of the editor in the case of rich editors
    // or the editor itself if we're working wiht the basic textarea
    getContainerInfo() {
        let $el = $(document.activeElement);

        for (let editor of this._supportedEditors) {
            if (editor.isEditor($el)) {
                return new ActiveEditor($el, editor);
            }
        }

        throw new Error('At least default code editor should be returned!');
    }
}

class ActiveEditor {
    constructor($el, editor) {
        this._editor = editor;
        this._$el = $el;
        this.type = editor.type;
        this.container = editor.getContainer($el);

        this.css = editor.css;
    }

    hideContainer() {
        if (this._editor.hideContainer) {
            this._editor.hideContainer(this.container);
        } else {
            this.container.addClass('ch-hidden');
        }
    }

    showContainer() {
        if (this._editor.showContainer) {
            this._editor.showContainer(this.container);
        } else {
            this.container.removeClass('ch-hidden');
        }
    }

    get text() {
        return this._editor.getText(this._$el);
    }

    set text(val) {
        this._editor.setText(this._$el, val);
    }
}

class CodeEditorManager {
    constructor() {
        this.addContextMenuTriggers();
        this.editors = {};
    }

    getEditorForNode(node) {
        let xPath = getElementXPath(node);

        let ed = this.editors[xPath];
        if (!ed) {
            ed = new CodeEditor(node);
            this.editors[xPath] = ed;
        }

        return ed;
    }

    removeEditorForNode(node) {
        delete this.editors[getElementXPath(node)];
    }

    handleMessage(msg) {
        // console.log('message: ' + JSON.stringify(msg));
        // console.log('window._detectedEditors: ' + JSON.stringify(window._detectedEditors));

        if (msg.action == 'add-ace-highlighting') {
            sitesSupport.attach();

            // console.log('document.activeElement:');
            // console.log(document.activeElement);

            var editor = this.getEditorForNode(document.activeElement);
            editor.addHighlighting(msg.syntax, msg.theme, msg.editors);
            // console.log('editor: ');
            // console.log(editor);

        } else if (msg.action == 'remove-ace-highlighting') {
            sitesSupport.detach();

            var originalEditorXPath = $(document.activeElement).parents('.ace_editor').attr('original-editor');
            var originalEditor = getElementByXpath(originalEditorXPath);

            let editor = this.getEditorForNode(originalEditor);
            editor.removeHighlighting();

            this.removeEditorForNode(originalEditor);
        }
    }

    addContextMenuTriggers() {
        // plain textarea
        $(document).on('mousedown', 'textarea', function (e) {
            if (e.which == 3) {
                chrome.runtime.sendMessage({action: 'plain-editor-context'});
            }
        });
    }
}

var editorSupport = new CodeEditorManager();

loadScript(EMMET_CORE, function () {
    loadScript(CDN_JS_ACE, function () {
        loadScript(CDN_JS_ACE_EMMET, function () {
            window.ace.config.set('workerPath', CDN_JS_ACE_ROOT);
            window.ace.require('./lib/net').loadScript = function (path, callback) {
                if (path.indexOf('http') == 0) {
                    loadScript(path, callback);
                } else {
                    loadScript(CDN_JS_ACE_ROOT + path, callback);
                }
            };

            savedEditors.restoreSavedEditors();
        });
    });
});

$(document).on('mousedown', 'div.ace_content', function (e) {
    if (e.which == 3) {
        chrome.runtime.sendMessage({action: 'ace-editor-context'});
    }
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    editorSupport.handleMessage(message);
});
