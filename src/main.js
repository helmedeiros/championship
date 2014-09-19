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
  var routerConfig = require('./app/router');
  var Controller = require('./app/controller');
  var Team = require('./models/team');
  var Teams = require('./collections/teams');
  var TeamsListView = require('./views/teams/list_view');
  var TeamFormView = require('./views/teams/form_view');
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

  function bindRouter(BackboneRef, controller) {
    var Router = BackboneRef.Router.extend({ routes: routerConfig.routes });
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

    controller.teamsList = function () {
      seedTeams();
      var teams = new Teams();
      teams.fetch();
      app.getRegion('mainRegion').show(new TeamsListView({ collection: teams }));
    };

    controller['admin.teamNew'] = function () {
      var form = new TeamFormView({ model: new Team() });
      form.on('form:saved form:cancel', function () {
        BackboneDep.history.navigate('times', { trigger: true });
      });
      app.getRegion('mainRegion').show(form);
    };

    controller['admin.teamEdit'] = function (id) {
      var team = new Team({ id: id });
      team.fetch();
      var form = new TeamFormView({ model: team });
      form.on('form:saved form:cancel', function () {
        BackboneDep.history.navigate('times', { trigger: true });
      });
      app.getRegion('mainRegion').show(form);
    };

    app.addInitializer(function () {
      BaseModel.setStorage(storageFactory());
    });

    app.on('start', function () {
      bindRouter(BackboneDep, controller);
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
