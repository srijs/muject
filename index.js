module.exports = function (require) {

  return function inject (module, deps) {

    if (!module.apply) module = require(module);

    return (deps = deps || module.inject) ?
    module.apply(module = {}, deps.map(function (dep) {
      return inject[dep];
    })) || module : module;

  };

};
