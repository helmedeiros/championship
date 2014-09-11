(function () {
  'use strict';

  var identity = require('./app/identity');
  var runtime = require('./app/runtime');
  var BaseModel = require('./persistence/base_model');
  var LocalStorageAdapter = require('./persistence/local_storage_adapter');

  function buildWelcomeView(Marionette) {
    return Marionette.ItemView.extend({
      template: function () {
        return '' +
          '<div class="jumbotron">' +
            '<h1>championship</h1>' +
            '<p class="lead">Aplicação ' + identity.NAME +
            ' versão ' + identity.VERSION + ' carregada.</p>' +
            '<p><a class="btn btn-primary" href="#/times">Ver times</a></p>' +
          '</div>';
      }
    });
  }

  function createApp(deps) {
    var Marionette = deps.Marionette;
    var Backbone = deps.Backbone;
    var $ = deps.$;
    var storageFactory = deps.storageFactory ||
      function () { return new LocalStorageAdapter(); };

    Backbone.$ = $;

    var app = new Marionette.Application();
    app.addRegions(runtime.regions);

    app.addInitializer(function () {
      BaseModel.setStorage(storageFactory());
    });

    var WelcomeView = buildWelcomeView(Marionette);
    app.on('start', function () {
      var main = app.getRegion('mainRegion');
      if (main) { main.show(new WelcomeView()); }
    });

    return app;
  }

  module.exports = createApp;
  module.exports.createApp = createApp;

  // Auto-boot in real browser environments only. `process` (Node global)
  // being absent is the marker — Node tests, even with jsdom, keep `process`.
  if (typeof process === 'undefined' &&
      typeof window !== 'undefined' &&
      typeof window.document !== 'undefined') {
    var browser$ = require('jquery');
    if (typeof browser$.fn === 'undefined') {
      browser$ = browser$(window);
    }
    var browserApp = createApp({
      Marionette: require('backbone.marionette'),
      Backbone: require('backbone'),
      $: browser$
    });
    browser$(function () { browserApp.start(); });
    module.exports.instance = browserApp;
  }
}());
