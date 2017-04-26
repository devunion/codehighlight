RegExp.escape = function (value) {
    return value.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
};

function ls_get(name, def) {
    var obj = localStorage[name];
    if (!obj) {
        return def;
    }
    try {
        return JSON.parse(localStorage[name]);
    } catch (e) {
        return def;
    }
}

function ls_set(name, val) {
    localStorage[name] = JSON.stringify(val);
}

function injectScripts(scripts) {
    var head = $('head');
    scripts.forEach(function (url) {
        head.append($("<script>", {'src': url}));
    });
}

function getAceTheme(theme) {
    if (theme == 'dark') {
        theme = 'monokai';
    } else if (theme == 'light') {
        theme = 'github';
    } else if ($.trim(theme) == "") {
        theme = 'monokai';
    }
    return theme;
}

function loadScript(src, callback) {
    chrome.runtime.sendMessage({action: 'inject_script', src: src}, callback);
}

function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

/**
 * Gets an XPath for an element which describes its hierarchical location.
 */
var getElementXPath = function (element) {
    if (element && element.id)
        return '//*[@id="' + element.id + '"]';

    return getElementTreeXPath(element);
};

var getElementTreeXPath = function (element) {
    var paths = [];

    // Use nodeName (instead of localName) so namespace prefix is included (if any).
    for (; element && element.nodeType == 1; element = element.parentNode) {
        var index = 0;
        // EXTRA TEST FOR ELEMENT.ID
        if (element && element.id) {
            paths.splice(0, 0, '/*[@id="' + element.id + '"]');
            break;
        }

        for (var sibling = element.previousSibling; sibling; sibling = sibling.previousSibling) {
            // Ignore document type declaration.
            if (sibling.nodeType == Node.DOCUMENT_TYPE_NODE)
                continue;

            if (sibling.nodeName == element.nodeName)
                ++index;
        }

        var tagName = element.nodeName.toLowerCase();
        var pathIndex = (index ? "[" + (index + 1) + "]" : "");
        paths.splice(0, 0, tagName + pathIndex);
    }

    return paths.length ? "/" + paths.join("/") : null;
};
