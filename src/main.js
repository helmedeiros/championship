/* global process */
(function () {
  'use strict';

  // CRITICAL ORDER: jQuery must be on Backbone.$ BEFORE Marionette is required,
  // because Marionette captures Backbone.$.Deferred at its own module-load
  // time. Loading Marionette first leaves Marionette.Deferred undefined and
  // every Marionette.Application instantiation explodes.
  var Backbone = require('backbone');
  var jq = require('jquery');
  if (typeof jq.fn === 'undefined' && typeof window !== 'undefined') {
    jq = jq(window);
  }
  Backbone.$ = jq;

  // Now safe to load Marionette and anything that transitively pulls it in.
  var Marionette = require('backbone.marionette');
  if (typeof Marionette.Deferred !== 'function') {
    Marionette.Deferred = jq.Deferred;
  }

  var identity = require('./app/identity');
  var runtime = require('./app/runtime');
  var Controller = require('./app/controller');
  var wireRoutes = require('./app/wire_routes');
  var FlashView = require('./views/widgets/flash_view');
  var BaseModel = require('./persistence/base_model');
  var LocalStorageAdapter = require('./persistence/local_storage_adapter');

  function createApp(deps) {
    var MarionetteDep = (deps && deps.Marionette) || Marionette;
    var BackboneDep = (deps && deps.Backbone) || Backbone;
    var $ = (deps && deps.$) || jq;
    var storageFactory = (deps && deps.storageFactory) ||
      function () { return new LocalStorageAdapter(); };

    BackboneDep.$ = $;
    if (typeof MarionetteDep.Deferred !== 'function') {
      MarionetteDep.Deferred = $.Deferred;
    }

    var app = new MarionetteDep.Application();
    app.addRegions(runtime.regions);

    var controller = new Controller({ app: app, Marionette: MarionetteDep });

    function flash(message, type) {
      var region = app.getRegion('flashRegion');
      if (!region) { return; }
      region.show(new FlashView({ message: message, type: type || 'info' }));
    }

    wireRoutes.wireAll(app, controller, BackboneDep, flash);

    app.addInitializer(function () {
      BaseModel.setStorage(storageFactory());
    });

    app.on('start', function () {
      wireRoutes.bindRouter(BackboneDep, controller);
      if (!BackboneDep.History.started) {
        BackboneDep.history.start();
      }
      if (!BackboneDep.history.fragment) {
        controller.home();
      }
    });

    return app;
  }

  module.exports = createApp;
  module.exports.createApp = createApp;
  module.exports.identity = identity;

  // Auto-boot in real browser environments. Detect Node by process.versions.node
  // (browserify never sets that, even though it shims `process` itself).
  var isNode = typeof process !== 'undefined' &&
               process.versions &&
               process.versions.node;
  if (!isNode &&
      typeof window !== 'undefined' &&
      typeof window.document !== 'undefined') {
    var browserApp = createApp({
      Marionette: Marionette,
      Backbone: Backbone,
      $: jq
    });
    jq(function () { browserApp.start(); });
    module.exports.instance = browserApp;
  }
}());
