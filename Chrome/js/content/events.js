var EVENT_NAME = "CodeHighlightDataEvent";

var ExtAPI = function () {
    this._installedEditorsCallbacks = [];

    window.addEventListener(EVENT_NAME, this._eventHandler.bind(this), false);
};

ExtAPI.prototype._eventHandler = function (e) {
    var action = e.detail.action;
    var data = e.detail.data;

    switch (action) {
        case RESPONSE_GET_INSTALLED_EDITORS:
            this._handleInstalledEditorsResponse(data);
            break;
    }
};

ExtAPI.prototype._sendExtEvent = function (action, data) {
    window.dispatchEvent(new CustomEvent(EVENT_NAME, {
        detail: {
            action: action,
            data: data
        }
    }));
};

ExtAPI.prototype._handleCallback = function (callbacks, data) {
    while (callbacks.length > 0) {
        var cb = callbacks.shift();
        try {
            cb(data);
        } catch (exc) {
            console.log('Exception on callback handling: ');
            console.error(exc);
        }
    }
};

ExtAPI.prototype._handleInstalledEditorsResponse = function (data) {
    this._handleCallback(this._installedEditorsCallbacks, data);
};

ExtAPI.prototype.sendInstalledEditorsEvent = function (data) {
    this._sendExtEvent(RESPONSE_GET_INSTALLED_EDITORS, data);
};

ExtAPI.prototype.getInstalledEditors = function (callback) {
    this._installedEditorsCallbacks.push(callback);

    this._sendExtEvent(REQUEST_GET_INSTALLED_EDITORS);
};