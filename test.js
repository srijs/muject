var assert = require('assert');

var muject = require('./index');

describe('Dependency Injection', function () {

  it('skips module w/o inject', function () {
    var inject = muject.bind(null, {});
    var called = false;
    var module = function () {
      called = true;
      assert.equal(arguments.length, 0);
      return 'foo';
    };
    var ret = inject(module);
    assert(!called);
    assert.equal(ret, module);
  });

  it('skips module w/o inject, require-style', function () {
    var called = false, required = false;
    var module = function () {
      called = true;
      assert.equal(arguments.length, 0);
      return 'foo';
    };
    var inject = muject.bind(function (name) {
      required = name;
      return module;
    }, {});
    var ret = inject('hello');
    assert(!called);
    assert.equal(required, 'hello');
    assert.equal(ret, module);
  });

  it('injects zero dependencies, value-style', function () {
    var inject = muject.bind(null, {});
    var called = false;
    var module = function () {
      called = true;
      assert.equal(arguments.length, 0);
      return 'foo';
    };
    module.inject = [];
    var ret = inject(module);
    assert(called);
    assert.equal(ret, 'foo');
  });

  it('injects zero dependencies, require-style', function () {
    var called = false, required = false;
    var module = function () {
      called = true;
      assert.equal(arguments.length, 0);
      return 'foo';
    };
    module.inject = [];
    var inject = muject.bind(function (name) {
      required = name;
      return module;
    }, {});
    var ret = inject('hello');
    assert(called);
    assert.equal(required, 'hello');
    assert.equal(ret, 'foo');
  });

  it('injects zero dependencies, literal-style', function () {
    var inject = muject.bind(null, {});
    var called = false;
    var ret = inject(function () {
      called = true;
      assert.equal(arguments.length, 0);
      return 'foo';
    }, []);
    assert(called);
    assert.equal(ret, 'foo');
  });

  it('injects simple dependency, value-style', function () {
    var modules = {}, inject = muject.bind(null, modules);
    var called = false;
    modules.bar = 'foo';
    var module = function (bar) {
      called = true;
      assert.equal(arguments.length, 1);
      return bar;
    };
    module.inject = ['bar'];
    var ret = inject(module);
    assert(called);
    assert.equal(ret, 'foo');
  });

  it('injects simple dependency, require-style', function () {
    var called = false, required = false;
    var module = function (bar) {
      called = true;
      assert.equal(bar, 'foo');
      return bar;
    };
    module.inject = ['bar'];
    var modules = {}, inject = muject.bind(function (name) {
      required = name;
      return module;
    }, modules);
    modules.bar = 'foo';
    var ret = inject('hello');
    assert(called);
    assert.equal(required, 'hello');
    assert.equal(ret, 'foo');
  });

  it('injects simple dependency, literal-style', function () {
    var modules = {}, inject = muject.bind(null, modules);
    var called = false;
    modules.bar = 'foo';
    var ret = inject(function (bar) {
      called = true;
      assert.equal(arguments.length, 1);
      return bar;
    }, ['bar']);
    assert(called);
    assert.equal(ret, 'foo');
  });

  it('injects nested dependency, value-style', function () {
    var modules = {}, inject = muject.bind(null, modules);
    var called = false;
    modules.bar = 'foo';
    modules.baz = inject(function (bar) {
      return bar + '_';
    }, ['bar']);
    var module = function (baz) {
      called = true;
      assert.equal(arguments.length, 1);
      return baz;
    };
    module.inject = ['baz'];
    var ret = inject(module);
    assert(called);
    assert.equal(ret, 'foo_');
  });

  it('injects nested dependency, require-style', function () {
    var called = false, required = false;
    var module = function (baz) {
      called = true;
      assert.equal(arguments.length, 1);
      return baz;
    };
    module.inject = ['baz'];
    var modules = {}, inject = muject.bind(function (name) {
      required = name;
      return module;
    }, modules);
    modules.bar = 'foo';
    modules.baz = inject(function (bar) {
      return bar + '_';
    }, ['bar']);
    var ret = inject('hello');
    assert(called);
    assert.equal(required, 'hello');
    assert.equal(ret, 'foo_');
  });

  it('injects nested dependency, literal-style', function () {
    var modules = {}, inject = muject.bind(null, modules);
    var called = false;
    modules.bar = 'foo';
    modules.baz = inject(function (bar) {
      return bar + '_';
    }, ['bar']);
    var ret = inject(function (baz) {
      called = true;
      assert.equal(arguments.length, 1);
      return baz;
    }, ['baz']);
    assert(called);
    assert.equal(ret, 'foo_');
  });

  it('injects nested dependency, export-style', function () {
    var modules = {}, inject = muject.bind(null, modules);
    var called = false;
    modules.bar = 'foo';
    modules.baz = inject(function (bar) {
      this.baz = bar + '_';
    }, ['bar']);
    var ret = inject(function (baz) {
      called = true;
      assert.equal(arguments.length, 1);
      return baz.baz;
    }, ['baz']);
    assert(called);
    assert.equal(ret, 'foo_');
  });

});
