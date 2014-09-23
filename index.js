module.exports = function (require) {

  return function inject (name, deps) {

    var exports = {}, module = typeof name === 'function' ? name : require(name);

    if (!(deps = deps || module.inject))
      return module;

    return module.apply(exports, deps.map(function (dep) {
      return inject[dep];
    })) || exports;

  };

};
