const St = imports.gi.St;
const Main = imports.ui.main;
const Overview = imports.ui.main.overview;
const Lang = imports.lang;
const Meta = imports.gi.Meta;
const ViewSelector = imports.ui.viewSelector;


const WindowSearch = new Lang.Class({
    Name: 'WindowSearch',

    _init: function() {
        this._windows = global.get_window_actors().filter(function(w) {
            return w.metaWindow.get_window_type() != Meta.WindowType.DESKTOP;
        });
    },

    search: function(term) {
        let windows = [];
        for (let i = 0; i < this._windows.length; i++) {
            let win = this._windows[i];
            if (win.metaWindow.get_title().indexOf(term) != -1) {
                windows.push(win.metaWindow);
            }
        }
        return windows;
    },

});

function injectToFunction(parent, name, func) {
    let origin = parent[name];
    parent[name] = function() {
        return func.apply(this, arguments);
    }
    return origin;
}

function injectToAttribute(parent, name, value) {
    let origin = parent[name];
    parent[name] = value;
    return origin;
}

function removeInjection(object, injection, name) {
    if (injection[name] === undefined)
        delete object[name];
    else
        object[name] = injection[name];
}

let viewInjections, createdActors;

function resetState() {
    viewInjections = { };
    createdActors = [ ];
}

function _performSearch(term) {
    let ws = new WindowSearch();
    let results = ws.search(term);
    for (let i=0; i < results.length; i++) {
        global.log(results[i].get_title());
    }
}

function setupInjections() {
    resetState();

    viewInjections['_switchDefaultTab'] = undefined;

    viewInjections['_switchDefaultTab'] = injectToFunction(ViewSelector.ViewSelector.prototype, '_switchDefaultTab', function() {
        let text = this._searchTab._text.get_text().replace(/^\s+/g, '').replace(/\s+$/g, '');
        this._searchTab._entry.clutter_text.connect('key-press-event', Lang.bind(this, function(o, e) {
            _performSearch(text);
        }));
        for (let i = 0; i < this._tabs.length; i++) {
            this._tabs[i].hide();
        }
    });
}


let button, icon;

function enable() {
    setupInjections();
}

function disable() {
    for (i in viewInjections) {
        removeInjection(ViewSelector.ViewSelector.prototype, viewInjections, i);
    }
    for each (i in createdActors)
        i.destroy();
    resetState();
}

function init() {}
