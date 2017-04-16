(function () {
    function waitFor(condition, delay, callback) {
        window._chWaitForInterval = setInterval(function () {
            if (condition()) {
                clearInterval(window._chWaitForInterval);
                window._chWaitForInterval = null;

                callback && callback();
            }
        }, delay);
    }

    function aceLoaded() {
        return window.ace != null;
    }

    function htmlBeautifierLoaded() {
        return window.html_beautify != null;
    }

    function getWindowSize() {
        return {
            w: document.documentElement.clientWidth,
            h: document.documentElement.clientHeight
        };
    }

    function getPopupSize() {
        var ws = getWindowSize();

        var pw = ws.w - 30,
            ph = ws.h - 120;
        pw > 1800 && (pw = 1800), ph > 1200 && (ph = 1200);

        var x = (pw - 20) % 138;
        if (pw = pw - x + 10, pw > 600) {
            var x = (pw - 20) % 138;
            pw = pw - x + 10
        }

        return {
            w: pw,
            h: ph
        };
    }

    function findTinyElement(editor, condition, callback) {
        var result = null;

        function findContainerIml(root, condition, callback, isRoot) {
            for (var itemIndex in root._items) {
                var item = root._items[itemIndex];
                if (condition(item)) {
                    result = item;
                    break;
                }

                if (item._items) {
                    findContainerIml(item, condition, callback, false);
                    if (result) {
                        break;
                    }
                }
            }

            if (isRoot) {
                callback(result);
            }
        }

        findContainerIml(editor.theme.panel, condition, callback, true);
    }

    function findMenuItem(menuBar, icon) {
        for (var buttonIndex in menuBar._items) {
            var mi = menuBar._items[buttonIndex];

            if (mi.settings && mi.settings.menu) {
                for (var subItemIndex in mi.settings.menu) {
                    subMenu = mi.settings.menu[subItemIndex];

                    if (subMenu.icon == icon) {
                        return subMenu;
                    }
                }
            }
        }
    }

    function conditionIcon(icon) {
        return function (item) {
            return item.settings && item.settings.icon == icon;
        };
    }

    function conditionType(type) {
        return function (item) {
            return item.type == type;
        };
    }

    function conditions() {
        var args = Array.from(arguments);
        return function (item) {
            return args.reduce(function (result, func) {
                return result && func(item);
            }, true);
        }
    }

    function patchCodeToolbarItem(editor, clickHandler) {
        findTinyElement(editor, conditions(conditionType('button'), conditionIcon('code')), function (button) {
            if (!button) {
                return;
            }

            tinymce.DOM.bind((button.el || button.$el)[0], 'click', function (e) {
                e.stopPropagation();
                clickHandler();
            })
        });
    }

    function patchCodeMenuItem(editor, clickHandler) {
        findTinyElement(editor, conditionType('menubar'), function (menubar) {
            if (!menubar) {
                return;
            }
            var mi = findMenuItem(menubar, 'code');
            if (!mi) {
                return
            }
            mi.onclick = clickHandler;
        });
    }

    function getEditorButtons(ed, ctx, options) {
        function saveChanges() {
            if (typeof ctx.mce_editor !== "undefined") {
                ed.focus();
                ed.undoManager.transact(function () {
                    ed.setContent(ctx.mce_editor.getValue())
                });
                ed.selection.setCursorLocation();
                ed.nodeChanged();
                ed.windowManager.close();
            }
        }

        function formatCode() {
            if (typeof ctx.mce_editor !== "undefined" && typeof html_beautify !== "undefined") {
                ctx.mce_editor.getSession().setValue(html_beautify(ctx.mce_editor.getValue(), {
                    "indent_level": 0,
                    "indent_with_tabs": true,
                    "preserve_newlines": false,
                }));
            }
        }

        var result = [
            {
                text: "Ok",
                classes: "primary",
                onclick: saveChanges
            }
        ];
        if (options.add_format_button) {
            result.push({
                text: "Format Code",
                onclick: formatCode
            });
        }
        result.push({
            text: "Cancel",
            onclick: "close"
        });

        return result;
    }

    function prepareContent(html, options) {
        return options.format_on_loading ?
            html_beautify(html, {
                "indent_level": 0,
                "indent_with_tabs": true,
                "preserve_newlines": false,
            }) :
            html;
    }

    function showAceEditorPopup(ed, options) {
        return function () {
            var dim = getPopupSize();
            var ctx = {};

            ed.windowManager.open({
                title: "Code Editor",
                type: "container",
                id: "mce-ace-editor",
                name: "code",
                width: dim.w,
                height: dim.h,
                inline: 1,
                buttons: getEditorButtons(ed, ctx, options)
            });

            // We need to update Z Index of the popup here in order to provide a better user experience.
            setTimeout(function () {
                tinymce.DOM.setStyles(tinymce.DOM.get('mce-ace-editor'), {'z-index': 2147483647});
            }, 0);

            var edBody = tinymce.DOM.get('mce-ace-editor-body');
            if (edBody) {
                var edBlock = tinymce.DOM.create('div', {'id': "mce-ace-editor-block"});
                edBody.appendChild(edBlock);

                // Load editor
                tinymce.DOM.setStyles(edBlock, {
                    'position': 'absolute',
                    'left': '0',
                    'right': '0',
                    'top': '0',
                    'bottom': '0'
                });

                mce_editor = window.ace.edit('mce-ace-editor-block');
                mce_editor.setTheme("ace/theme/" + options.theme);
                mce_editor.getSession().setMode("ace/mode/html");
                mce_editor.setOptions({
                    showPrintMargin: false
                });
                mce_editor.getSession().setUseWrapMode(true);

                // Set editor contents
                mce_editor.getSession().setValue(prepareContent(ed.getContent({
                    source_view: true
                }), options));

                ctx.mce_editor = mce_editor;
            }

            // Only thing needed to get Ace to work is to remove the mce-container class
            // Tinymce re-adds the class so we need to loop it
            // TODO: Find a less HORRIFIC solution for this
            var countchecks = 0;

            function soddoffmce() {
                // Lets do it say 50 times (for 5 seconds)...
                if (countchecks++ == 50) {
                    clearTimeout(soddoffloop);
                    return;
                }

                var mceAceEditor = tinymce.DOM.get('mce-ace-editor');

                soddoffloop = setTimeout(function () {
                    if (tinymce.DOM.hasClass(mceAceEditor, 'mce-container')) {
                        tinymce.DOM.removeClass(mceAceEditor, 'mce-container');
                    }
                    soddoffmce();
                }, 100);
            }

            soddoffmce();
        }
    }

    function addAceSupport(options) {
        tinymce.editors.forEach(function (ed) {
            var aceEditorHandler = showAceEditorPopup(ed, options);

            patchCodeMenuItem(ed, aceEditorHandler);
            patchCodeToolbarItem(ed, aceEditorHandler);
        });
    }

    function loadOptions() {
        function castType(val) {
            if (val === "true") {
                return true;
            }
            if (val === "false") {
                return false;
            }

            return val;
        }

        var result = {};

        var optionsEl = document.getElementById('ch-tinymce-options');
        for (var i = optionsEl.attributes.length - 1; i >= 0; i--) {
            var attr = optionsEl.attributes[i];
            if (attr.name != 'id' && attr.name != 'style') {
                result[attr.name] = castType(attr.value);
            }
        }

        return result;
    }

    function getWaitCondition(options) {
        return (options.add_format_button || options.format_on_loading) ?
            conditions(aceLoaded, htmlBeautifierLoaded) :
            aceLoaded;
    }

    var options = loadOptions();
    waitFor(getWaitCondition(options), 10, function () {
        addAceSupport(options);
    });
})();