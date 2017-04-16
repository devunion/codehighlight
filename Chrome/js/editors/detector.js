// console.log('detector: ' + window.jQuery + ", " + window.jQuery.summernote);

function isSummernoteInstalled() {
    return !!(window.jQuery && window.jQuery.summernote);
}

function isTinyMceInstalled() {
    return !!window.tinymce;
}

var api = new ExtAPI();
api.sendInstalledEditorsEvent({
    summernote: isSummernoteInstalled(),
    tinymce: isTinyMceInstalled()
});
