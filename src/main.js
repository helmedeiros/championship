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
  var Championship = require('./models/championship');
  var Championships = require('./collections/championships');
  var TeamsListView = require('./views/teams/list_view');
  var TeamFormView = require('./views/teams/form_view');
  var ChampionshipsListView = require('./views/championships/list_view');
  var ChampionshipShowView = require('./views/championships/show_view');
  var ChampionshipFormView = require('./views/championships/form_view');
  var FlashView = require('./views/widgets/flash_view');
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

  function seedChampionship() {
    var storage = BaseModel.getStorage();
    if (!storage || storage.list('championships').length > 0) { return; }
    seedTeams();
    storage.create('championships', {
      id: 'brasileirao-demo-2014',
      name: 'Brasileirão Demo 2014',
      season: 2014,
      country: 'BR',
      format: 'double-round-robin',
      tiebreakers: ['points', 'wins', 'goal_diff', 'goals_for', 'head_to_head']
    });
    var champ = new Championship({ id: 'brasileirao-demo-2014' });
    champ.fetch();
    champ.createFixtures(['sao', 'cor', 'san', 'pal'], {
      startDate: '2014-04-19T16:00:00Z',
      daysBetween: 7
    });
    // Pré-marca algumas partidas como finalizadas para popular a classificação.
    var saved = storage.list('matches').slice(0, 4);
    var sample = [
      { homeScore: 2, awayScore: 1 },
      { homeScore: 0, awayScore: 0 },
      { homeScore: 3, awayScore: 2 },
      { homeScore: 1, awayScore: 1 }
    ];
    saved.forEach(function (m, idx) {
      var s = sample[idx % sample.length];
      m.status = 'finished';
      m.homeScore = s.homeScore;
      m.awayScore = s.awayScore;
      storage.update('matches', m);
    });
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

  function wireTeamRoutes(app, controller, BackboneDep, flash) {
    controller.teamsList = function () {
      seedTeams();
      var teams = new Teams();
      teams.fetch();
      app.getRegion('mainRegion').show(new TeamsListView({ collection: teams }));
    };
    controller['admin.teamNew'] = function () {
      var form = new TeamFormView({ model: new Team() });
      form.on('form:saved', function () {
        flash('Time salvo com sucesso.', 'success');
        BackboneDep.history.navigate('times', { trigger: true });
      });
      form.on('form:cancel', function () {
        BackboneDep.history.navigate('times', { trigger: true });
      });
      app.getRegion('mainRegion').show(form);
    };
    controller['admin.teamEdit'] = function (id) {
      var team = new Team({ id: id });
      team.fetch();
      var form = new TeamFormView({ model: team });
      form.on('form:saved', function () {
        flash('Time atualizado.', 'success');
        BackboneDep.history.navigate('times', { trigger: true });
      });
      form.on('form:cancel', function () {
        BackboneDep.history.navigate('times', { trigger: true });
      });
      app.getRegion('mainRegion').show(form);
    };
  }

  function wireChampionshipRoutes(app, controller, BackboneDep, flash) {
    controller.championshipsList = function () {
      seedChampionship();
      var coll = new Championships();
      coll.fetch();
      app.getRegion('mainRegion').show(new ChampionshipsListView({ collection: coll }));
    };
    controller.championshipsShow = function (id) {
      var champ = new Championship({ id: id });
      champ.fetch();
      app.getRegion('mainRegion').show(new ChampionshipShowView({ model: champ }));
    };
    controller['admin.championshipNew'] = function () {
      var teams = new Teams();
      teams.fetch();
      var form = new ChampionshipFormView({
        model: new Championship(),
        availableTeams: teams.models
      });
      form.on('form:saved', function (champ, extras) {
        if (extras && extras.teamIds && extras.teamIds.length > 0) {
          try {
            champ.createFixtures(extras.teamIds, {
              startDate: extras.startDate || '2014-04-19T16:00:00Z',
              daysBetween: 7
            });
            flash('Campeonato criado com calendário gerado.', 'success');
          } catch (err) {
            flash('Campeonato salvo, mas o calendário falhou: ' + err.message, 'warning');
          }
        } else {
          flash('Campeonato salvo (sem calendário gerado).', 'info');
        }
        BackboneDep.history.navigate('campeonatos/' + champ.id, { trigger: true });
      });
      form.on('form:cancel', function () {
        BackboneDep.history.navigate('campeonatos', { trigger: true });
      });
      app.getRegion('mainRegion').show(form);
    };
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

    function flash(message, type) {
      var region = app.getRegion('flashRegion');
      if (!region) { return; }
      region.show(new FlashView({ message: message, type: type || 'info' }));
    }

    wireTeamRoutes(app, controller, BackboneDep, flash);
    wireChampionshipRoutes(app, controller, BackboneDep, flash);

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
