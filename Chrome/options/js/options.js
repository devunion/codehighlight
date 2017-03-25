import * as ls from 'js/ls.js';

export function getEditorTheme() {
    return ls.get('editor_theme', 'dark');
}
export function setEditorTheme(theme) {
    return ls.set('editor_theme', theme);
}

export function getUserEmail() {
    return ls.get('user-email', '');
}
export function setUserEmail(email) {
    return ls.set('user-email', email);
}

export function getHighlighterTheme() {
    return ls.get('highlighter_theme', 'dark');
}
export function setHighlighterTheme(theme) {
    return ls.set('highlighter_theme', theme);
}

export function isTinySourceCodeHighlighted() {
    return ls.get('tinymce_source_code_highlighted', true);
}
export function setTinySourceCodeHighlighted(val) {
    return ls.set('tinymce_source_code_highlighted', val);
}

export function isTinyAddFormatCodeButton() {
    return ls.get('tinymce_add_format_button', true);
}
export function setTinyAddFormatCodeButton(val) {
    return ls.set('tinymce_add_format_button', val);
}

export function isTinyFormatOnLoading() {
    return ls.get('tinymce_format_on_loading', true);
}
export function setTinyFormatOnLoading(val) {
    return ls.set('tinymce_format_on_loading', val);
}

export function getTinyMceOptions() {
    return {
        source_code_highlighted: isTinySourceCodeHighlighted(),
        add_format_button: isTinyAddFormatCodeButton(),
        format_on_loading: isTinyFormatOnLoading()
    };
}

////////////////////////////////////////

export function isSummernoteFormatOnLoading() {
    return ls.get('summernote_format_on_loading', true);
}
export function setSummernoteFormatOnLoading(val) {
    return ls.set('summernote_format_on_loading', val);
}

export function getSummernoteOptions() {
    return {
        format_on_loading: isSummernoteFormatOnLoading()
    };
}
