/**
 * Created by Viktar Liaskovich on 27.01.2016.
 */

export function get(name, def) {
    var obj = localStorage[name];
    if (!obj) {
        return def;
    }
    try {
        return JSON.parse(localStorage[name]);
    } catch(e) {
        return def;
    }
}

export function set(name, val) {
    localStorage[name] = JSON.stringify(val);
}

export function remove(name) {
    localStorage.removeItem(name);
}
