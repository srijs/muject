module.exports = function inject (module, deps) {

  // If the provided module is not a function
  // (or, in behaviour terms, can't be applied),
  // we treat it as a module identifier/path and
  // use the optionally supplied require function
  // (which is specified via `inject.bind(require)`)
  // to require the actual module.
  module = module.apply ? module : this(module);

  // Now, if the module has an `inject` property,
  // or a list of dependencies has been supplied,...
  return (deps = deps || module.inject) ?
  // ...we apply the module to a exports object (`{}`)
  // and the list of resolved dependencies.
  module.apply(module = {}, deps.map(function (dep) {
    return inject[dep];
  }))
  // If the function application does not return a
  // truthy value, we return the exports object instead.
  || module
  // In the case that we don't have a list of dependencies
  // in the first place (not `inject` property and no `dep`
  // argument), we just return the module as-is.
  : module;

};
