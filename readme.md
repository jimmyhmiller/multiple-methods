# Multiple-methods

Multiple-methods is a micro library that implements multi methods in javascript. This allows you to do things like the following:

```javascript
var multi = require('multiple-methods');
var area = multi(_.property('shape'));
area.defaultMethod(() => 0);
area.method('circle', (s) => Math.PI * Math.pow(s.radius,2));
area.method('square', (s) => Math.pow(s.side, 2));

area({shape:'circle', radius: 1});
// 3.141592653589793
area({shape:'square', side: 4});
// 16
area({shape:'nothing'});
// 0
```

This library is incredibly small, so you should feel free to read the source. In fact you have seen everything that the library can do above. It only has one entry point "multi". Which has two properties, method and defaultMethod. It doesn't implement clojure style instance checking, although it would be easy to do yourself with it.

## Install
    npm install --save multiple-methods

If you find any bugs feel free to file and issue or put in a PR.
