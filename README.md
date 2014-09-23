# µject

_10-SLOC no-bullshit dependency injection micro-library_

## Usage

### Create a new injector

```
var inject = require('muject')(require);
```

### Require dependencies inside a module

```
module.exports = function myModule (depFoo, depBar, depBaz) {
  this.exportA = ...;
  this.exportB = ...;
};
module.exports.inject = ['foo', 'bar', 'baz'];
```

### Register dependencies & require a module

```
inject.foo = inject('./my/foo'); // require, register w/ injection

inject.bar = require('./my/bar); // require, register w/o injection

inject.baz = inject(function (bar) {  // direct, register w/ injection
  return bar.doSomething();
}, ['bar']);

var myModule = inject('./my/module.js');
```