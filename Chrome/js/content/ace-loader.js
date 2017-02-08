'use strict';

var CDN_JS_ACE_ROOT = 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.6/';
var CDN_JS_ACE = CDN_JS_ACE_ROOT + 'ace.js';

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

class CodeEditorButton {
    constructor(editor, editorXPath, syntax, theme) {
        this.TOOLTIP_SAVE = 'Remember settings for this editor';
        this.TOOLTIP_REMOVE = 'Forget settings for this editor';

        this.doSave = true;

        var offset = editor.offset();
        var height = editor.height();
        var width = editor.width();

        this.editorXPath = editorXPath;
        this.$button = $('<div>', {
            'class': 'ch-save-editor-settings',
            'title': this.TOOLTIP_SAVE
        }).css({
            top: (offset.top + height - 32) + 'px',
            left: (offset.left + width - 32) + 'px'
        }).click((e) => {
            this.updateButtonState();

            if (this.doSave) {
                var pattern = CodeEditorButton.promptPattern();
                if (!pattern) {
                    return;
                }

                savedEditors.saveEditorState(this.editorXPath, {
                    pattern: pattern,
                    syntax: syntax,
                    theme: theme,
                });
            } else {
                savedEditors.removeSavedEditor(this.editorXPath);
            }

            this.doSave = !this.doSave;
        });

        if (savedEditors.hasSavedState(this.editorXPath)) {
            this.updateButtonState();
            this.doSave = !this.doSave;
        }
    }

    updateButtonState() {
        this.$button.toggleClass('discard').attr('title', this.doSave ? this.TOOLTIP_REMOVE : this.TOOLTIP_SAVE);
    }

    appendTo(el) {
        this.$button.appendTo(el);
    }

    remove() {
        this.$button.remove();
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
        this._containerInfo = EditorTypesSupport.getContainerInfo();

        this.id = "ace-csseditor-" + new Date().getTime();
        this.realEditorXPath = getElementXPath(activeEl);

        this.$editor = $('<div>', {id: this.id, 'original-editor': this.realEditorXPath});
        this.$realEditor = $(activeEl);
        this.$realEditorContainer = this._containerInfo.container;

        this.containerType = this._containerInfo.type;
    }

    copyCssToEditor() {
        ['border', 'width', 'height', 'position', 'left', 'top', 'right', 'bottom', 'margin'].forEach(function (prop) {
            let val = this.$realEditorContainer.css(prop);
            // console.log('CSS: ' + prop + ' -> ' + val);

            if (prop == 'position' && val == 'static') {
                return;
            }

            this.$editor.css(prop, this.$realEditorContainer.css(prop));

        }.bind(this));
    }

    isTinyMceEditor() {
        return this.containerType == 'tinymce' || this.containerType == 'tinymce-code';
    }

    addHighlighting(syntax, theme) {
        // console.log('this.containerType: ' + this.containerType);

        if (this.isTinyMceEditor()) {
            alert('Please use standard source code editor tool. You should already have a syntax highlighting there.');
            return;
        }

        theme = getAceTheme(theme);

        this.copyCssToEditor();

        //TODO: just add class???
        this.$editor.text(this.$realEditor.val());
        this.$realEditorContainer.hide();

        this.addCodeEditor(syntax, theme);
        this.addSaveButton(syntax, theme);
    }

    addCodeEditor(syntax, theme) {
        this.$realEditorContainer.after(this.$editor);

        this.aceEditor = window.ace.edit(this.id);
        this.aceEditor.setOption("wrap", "free");
        this.aceEditor.setOption("show_print_margin", 'false');
        this.aceEditor.setShowPrintMargin(false);
        this.aceEditor.setTheme("ace/theme/" + theme);
        this.aceEditor.getSession().setMode("ace/mode/" + syntax);

        this.addStateSync();
    }

    addSaveButton(syntax, theme) {
        this.saveButton = new CodeEditorButton(this.$editor, this.realEditorXPath, syntax, theme);
        this.saveButton.appendTo('body');
    }

    addStateSync() {
        this.aceEditor.getSession().on('change', function (e) {
            this.$realEditor.val(this.aceEditor.getValue());
        }.bind(this));
    }

    removeHighlighting() {
        //this.aceEditor.destroy();
        this.$editor.remove();
        this.$realEditorContainer.show();
        this.saveButton.remove();

        this.$realEditor.focus();
    }
}

class EditorTypesSupport {
    static getTinyMceInlineEditor() {
        return $(document.activeElement).parents('.mce-tinymce')
    }

    static isTinyMcePopupEditor() {
        return $(document.activeElement).hasClass('mce-textbox');
    }

    static getTinyMcePopupContainer() {
        return $(document.activeElement).parents('.mce-container-body').filter(':last');
    }

    // Returns container element of the editor in the case of rich editors
    // or the editor itself if we're working wiht the basic textarea
    static getContainerInfo() {
        // In-page TinyMCE Editor
        let editor = EditorTypesSupport.getTinyMceInlineEditor();
        if (editor.length > 0) {
            return {
                type: 'tinymce',
                container: editor
            };
        }

        // TinyMCE Source Code Editor in popup
        if (EditorTypesSupport.isTinyMcePopupEditor()) {
            return {
                type: 'tinymce-code',
                container: EditorTypesSupport.getTinyMcePopupContainer()
            };
        }

        return {
            type: 'plain',
            container: $(document.activeElement)
        };
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
        if (msg.action == 'add-ace-highlighting') {
            let editor = this.getEditorForNode(document.activeElement);
            editor.addHighlighting(msg.syntax, msg.theme);
        } else if (msg.action == 'remove-ace-highlighting') {
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

loadScript(CDN_JS_ACE, function () {
    window.ace.config.set('workerPath', CDN_JS_ACE_ROOT);
    window.ace.require('./lib/net').loadScript = function (path, callback) {
        //console.log('loadScript -> path: ' + path);
        loadScript(CDN_JS_ACE_ROOT + path, callback);
    };

    savedEditors.restoreSavedEditors();
});

$(document).on('mousedown', 'div.ace_content', function (e) {
    if (e.which == 3) {
        chrome.runtime.sendMessage({action: 'ace-editor-context'});
    }
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    editorSupport.handleMessage(message);
});
