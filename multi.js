"use strict";

const hash = require("object-hash");
const _ = require("lodash");

function multi(fn) {
    let m = new Map();
    let defaultMethod = _.restParam(function(args) {
        throw new Error("No match found and no default");
    });
    function dispatcher(args) {
        let value = _.spread(fn)(args);
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
