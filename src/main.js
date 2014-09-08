(function () {
  'use strict';

  var app = require('./app');

  if (typeof window !== 'undefined' && window.console && window.console.log) {
    window.console.log('championship ' + app.VERSION + ' carregado');
  }

  module.exports = app;
}());
