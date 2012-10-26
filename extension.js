const St = imports.gi.St;
const Main = imports.ui.main;
const Overview = imports.ui.main.overview;
const Lang = imports.lang;
const Meta = imports.gi.Meta;


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


function _performSearch() {
    let ws = new WindowSearch();
    let results = ws.search("Chrome");
    for (let i=0; i < results.length; i++) {
        global.log(results[i].get_title());
    }
}


let button, icon;

function enable() {
    button = new St.Bin({ style_class: 'panel-button',
                          reactive: true,
                          can_focus: true,
                          x_fill: true,
                          y_fill: false,
                          track_hover: true });
    let icon = new St.Icon({ icon_name: 'system-run',
                             icon_type: St.IconType.SYMBOLIC,
                             style_class: 'system-status-icon' });

    button.set_child(icon);
    button.connect('button-press-event', _performSearch);
    Main.panel._rightBox.insert_child_at_index(button, 0);
}

function disable() {
    Main.panel._rightBox.remove_child(button);
}

function init() {}
