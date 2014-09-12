module.exports = (function () {
  'use strict';

  var Backbone = require('backbone');
  var router = require('./router');

  return Backbone.Router.extend({
    routes: router.routes
  });
}());
