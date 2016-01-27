"use strict";

var hash = require("object-hash");
var _ = require("lodash");

function multi(fn) {
    var m = new Map();
    var defaultMethod = _.restParam(function(args) {
        throw new Error("No match found and no default");
    });
    function dispatcher(args) {
        var value = _.spread(fn)(args);
        if (value != undefined && m.has(hash.sha1(value))) {
           return _.spread(m.get(hash.sha1(value)))(args); 
        } else {
            return _.spread(defaultMethod)(args);
        }
        
    }
    dispatcher = _.restParam(dispatcher);
    dispatcher.method = (value, f) => {
        m.set(hash.sha1(value), f);
        return this;
    }
    dispatcher.defaultMethod = (f) => {
        defaultMethod = f;
        return this;
    } 
    return dispatcher;
}
module.exports = multi
