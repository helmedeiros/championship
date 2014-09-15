(function () {
  'use strict';

  var runtime = require('./app/runtime');
  var routerConfig = require('./app/router');
  var Controller = require('./app/controller');
  var Teams = require('./collections/teams');
  var TeamsListView = require('./views/teams/list_view');
  var BaseModel = require('./persistence/base_model');
  var LocalStorageAdapter = require('./persistence/local_storage_adapter');

  var SEED_TEAMS = [
    { id: 'sao', name: 'São Paulo',   short: 'SAO',
      city: 'São Paulo', stadium: 'Morumbi' },
    { id: 'cor', name: 'Corinthians', short: 'COR',
      city: 'São Paulo', stadium: 'Arena Corinthians' },
    { id: 'san', name: 'Santos',      short: 'SAN',
      city: 'Santos',    stadium: 'Vila Belmiro' },
    { id: 'pal', name: 'Palmeiras',   short: 'PAL',
      city: 'São Paulo', stadium: 'Allianz Parque' }
  ];

  function seedTeams() {
    var storage = BaseModel.getStorage();
    if (!storage || storage.list('teams').length > 0) { return; }
    SEED_TEAMS.forEach(function (attrs) { storage.create('teams', attrs); });
  }

  function bindRouter(Backbone, controller) {
    var Router = Backbone.Router.extend({ routes: routerConfig.routes });
    var router = new Router();
    Object.keys(routerConfig.routes).forEach(function (route) {
      var handlerName = routerConfig.routes[route];
      var handler = controller[handlerName];
      if (typeof handler === 'function') {
        router.on('route:' + handlerName, handler.bind(controller));
      }
    });
    return router;
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

    var controller = new Controller({ app: app, Marionette: Marionette });

    controller.teamsList = function () {
      seedTeams();
      var teams = new Teams();
      teams.fetch();
      app.getRegion('mainRegion').show(new TeamsListView({ collection: teams }));
    };

    app.addInitializer(function () {
      BaseModel.setStorage(storageFactory());
    });

    app.on('start', function () {
      bindRouter(Backbone, controller);
      if (!Backbone.History.started) {
        Backbone.history.start();
      }
      if (!Backbone.history.fragment) {
        controller.home();
      }
    });

    return app;
  }

  module.exports = createApp;
  module.exports.createApp = createApp;

  // Auto-boot in real browser environments only.
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
