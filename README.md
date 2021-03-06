# µject

_10 sloc, ⅛ kb, no-bullshit dependency injection micro-library_

[![NPM](https://nodei.co/npm/muject.png?compact=true)](https://nodei.co/npm/muject/)

## Usage

### Create a new injector

```
var modules = {},
    inject = require('muject').bind(require, modules);
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
modules.foo = inject('./my/foo'); // require, register w/ injection

modules.bar = require('./my/bar'); // require, register w/o injection

modules.baz = inject(function (bar) {  // direct, register w/ injection
  return bar.doSomething();
}, ['bar']);

var myModule = inject('./my/module.js');

myModule.exportA();
myModule.exportB();
```
