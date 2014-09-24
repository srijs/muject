module.exports = function inject (module, deps) {

  module = module.apply ? module : this(module);

  return (deps = deps || module.inject) ?
  module.apply(module = {}, deps.map(function (dep) {
    return inject[dep];
  })) || module : module;

};
