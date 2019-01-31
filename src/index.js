import hash from 'object-hash';

function multi(fn) {
    const m = new Map();
    let defaultMethod = function(...args) {
        throw new Error("No match found and no default");
    };
    function dispatcher(...args) {
        var value = fn(...args);
        if (value != undefined && m.has(hash.sha1(value))) {
           return m.get(hash.sha1(value))(...args); 
        } else {
            return defaultMethod(...args);
        }
        
    }
    dispatcher.method = (value, f) => {
        m.set(hash.sha1(value), f);
        return dispatcher;
    }
    dispatcher.defaultMethod = (f) => {
        defaultMethod = f;
        return dispatcher;
    } 
    return dispatcher;
}

export default multi;
