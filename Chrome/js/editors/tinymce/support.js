(function () {
    const EVENT_NAME = 'ApiSupport::TinyMCE';
    const ACTION_SET_TEXT = 'SetText';
    const ACTION_READY = 'Ready';
    const ACTION_HIDE = 'Hide';
    const ACTION_SHOW = 'Show';

    var newContent;

    window.addEventListener(EVENT_NAME, function (e) {
        var action = e.detail.action;
        var data = e.detail.data;

        switch (action) {
            case ACTION_SET_TEXT:
                newContent = data;
                break;
            case ACTION_HIDE:
                hideEditor();
                break;
            case ACTION_SHOW:
                showEditor();
                break;
        }
    }, false);

    function sendReadyEvent() {
        window.dispatchEvent(new CustomEvent(EVENT_NAME, {
            detail: {
                action: ACTION_READY
            }
        }));
    }

    function setTinyMceText(ed, text) {
        if (!text) {
            return;
        }

        ed.undoManager.transact(function () {
            ed.setContent(text)
        });
        ed.selection.setCursorLocation();
        ed.nodeChanged();
    }

    function hideEditor() {
        tinymce.editors.forEach(function (ed) {
            ed.hide();
        });
    }

    function showEditor() {
        tinymce.editors.forEach(function (ed) {
            ed.show();

            setTinyMceText(ed, newContent);

            ed.focus();
        });

        newContent = null;
    }

    sendReadyEvent();
})();