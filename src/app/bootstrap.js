module.exports = (function () {
  'use strict';

  var runtime = require('./runtime');
  var router = require('./router');

  function bootstrap(options) {
    var opts = options || {};
    return {
      name: runtime.name,
      version: runtime.version,
      regions: runtime.regions,
      routes: router.routes,
      adminPrefix: router.adminPrefix,
      defaultRoute: opts.defaultRoute || runtime.defaultRoute,
      notFoundRoute: opts.notFoundRoute || runtime.notFoundRoute
    };
  }

  return {
    bootstrap: bootstrap
  };
}());
