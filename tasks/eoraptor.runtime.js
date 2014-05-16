var eoraptor = {
    name: 'eoraptor.js',
    version: '#VERSION#',
    _: {
        e: escaper,
        v: value
    }
};

// ## escaper ##
var escapeReg = /[&<>"']/g,
    escapeMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;'
    };

// callback for escaper replacement
function escapeCallback(match) {
    return escapeMap[match];
}

// escape html chars
// NOTE: 'escape' is reserved word in javascript
function escaper(str) {
    return str == null ? EMPTY : EMPTY + String(str).replace(escapeReg, escapeCallback);
}

// ## value ##
var EMPTY = '';
var FUNCTION = 'function';
function value(v, data) {
    return typeof v === FUNCTION ? v.apply(data, [data]) : (v || EMPTY);
}

var __ = eoraptor._;
