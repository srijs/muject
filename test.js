var assert = require('assert');

var muject = require('./index');

describe('Dependency Injection', function () {

  var inject;

  beforeEach(function () {
    inject = muject(require);
  });

  it('injects zero dependencies, require-style', function () {
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

  it('injects zero dependencies, literal-style', function () {
    var called = false;
    var ret = inject(function () {
      called = true;
      assert.equal(arguments.length, 0);
      return 'foo';
    }, []);
    assert(called);
    assert.equal(ret, 'foo');
  });

  it('injects simple dependency, require-style', function () {
    var called = false;
    inject.bar = 'foo';
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

  it('injects simple dependency, literal-style', function () {
    var called = false;
    inject.bar = 'foo';
    var ret = inject(function (bar) {
      called = true;
      assert.equal(arguments.length, 1);
      return bar;
    }, ['bar']);
    assert(called);
    assert.equal(ret, 'foo');
  });

  it('injects nested dependency, require-style', function () {
    var called = false;
    inject.bar = 'foo';
    inject.baz = inject(function (bar) {
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

  it('injects nested dependency, literal-style', function () {
    var called = false;
    inject.bar = 'foo';
    inject.baz = inject(function (bar) {
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
    var called = false;
    inject.bar = 'foo';
    inject.baz = inject(function (bar) {
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
