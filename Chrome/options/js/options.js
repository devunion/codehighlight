import * as ls from 'js/ls.js';

const SUPPORTED_LANGUAGES = [
    {
        name: 'ActionScript',
        slug: 'actionscript',
        enabled: false
    },
    {
        name: 'Apache Config',
        slug: 'apache_conf',
        enabled: false
    },
    {
        name: 'Clojure',
        slug: 'clojure',
        enabled: false
    },
    {
        name: 'C/C++',
        slug: 'c_cpp',
        enabled: true
    },
    {
        name: 'CoffeeScript',
        slug: 'coffee',
        enabled: false
    },
    {
        name: 'CSS',
        slug: 'css',
        enabled: true
    },
    {
        name: 'Dart',
        slug: 'dart',
        enabled: false
    },
    {
        name: 'Go',
        slug: 'golang',
        enabled: false
    },
    {
        name: 'Groovy',
        slug: 'groovy',
        enabled: false
    },
    {
        name: 'Haskell',
        slug: 'haskell',
        enabled: false
    },
    {
        name: 'HTML',
        slug: 'html',
        enabled: true
    },
    {
        name: 'Jade',
        slug: 'jade',
        enabled: false
    },
    {
        name: 'Java',
        slug: 'java',
        enabled: true
    },
    {
        name: 'JavaScript',
        slug: 'javascript',
        enabled: true
    },
    {
        name: 'JSON',
        slug: 'json',
        enabled: false
    },
    {
        name: 'LESS',
        slug: 'less',
        enabled: false
    },
    {
        name: 'Markdown',
        slug: 'markdown',
        enabled: false
    },
    {
        name: 'MySQL',
        slug: 'mysql',
        enabled: false
    },
    {
        name: 'Perl',
        slug: 'perl',
        enabled: false
    },
    {
        name: 'PHP',
        slug: 'php',
        enabled: true
    },
    {
        name: 'Python',
        slug: 'python',
        enabled: true
    },
    {
        name: 'Ruby',
        slug: 'ruby',
        enabled: true
    },
    {
        name: 'Rust',
        slug: 'rust',
        enabled: false
    },
    {
        name: 'SASS',
        slug: 'sass',
        enabled: false
    },
    {
        name: 'SCSS',
        slug: 'scss',
        enabled: false
    },
    {
        name: 'SQL',
        slug: 'sql',
        enabled: false
    },
    {
        name: 'SVG',
        slug: 'svg',
        enabled: false
    },
    {
        name: 'Typescript',
        slug: 'typescript',
        enabled: false
    },
    {
        name: 'XML',
        slug: 'xml',
        enabled: false
    },
    {
        name: 'YAML',
        slug: 'yaml',
        enabled: false
    }
];

export function getActiveLanguages() {
    return ls.get('active_languages', SUPPORTED_LANGUAGES);
}
export function setActiveLanguage(slug, isActive) {
    let active = getActiveLanguages();
    active.filter(function(l){return l.slug==slug;})[0].enabled = isActive;
    return ls.set('active_languages', active);
}

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
