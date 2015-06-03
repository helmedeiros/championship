module.exports = (function () {
  'use strict';

  var routerConfig = require('./router');
  var Team = require('../models/team');
  var Teams = require('../collections/teams');
  var Championship = require('../models/championship');
  var Championships = require('../collections/championships');
  var TeamsListView = require('../views/teams/list_view');
  var TeamFormView = require('../views/teams/form_view');
  var TeamProfileView = require('../views/teams/profile_view');
  var HeadToHeadView = require('../views/stats/head_to_head_view');
  var HomeView = require('../views/home_view');
  var ChampionshipsListView = require('../views/championships/list_view');
  var ChampionshipShowView = require('../views/championships/show_view');
  var ChampionshipFormView = require('../views/championships/form_view');
  var Match = require('../models/match');
  var Matches = require('../collections/matches');
  var MatchShowView = require('../views/matches/show_view');
  var MatchesListView = require('../views/matches/list_view');
  var ScorerView = require('../views/matches/scorer_view');
  var ImporterView = require('../views/importer_view');
  var role = require('./role');
  var BaseModel = require('../persistence/base_model');

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

  function bindRouter(BackboneRef, controller, options) {
    var opts = options || {};
    var flash = opts.flash;
    var Router = BackboneRef.Router.extend({ routes: routerConfig.routes });
    var router = new Router();
    Object.keys(routerConfig.routes).forEach(function (route) {
      var handlerName = routerConfig.routes[route];
      var handler = controller[handlerName];
      if (typeof handler !== 'function') { return; }
      var bound = handler.bind(controller);
      var guarded = handlerName.indexOf('admin.') === 0 ? function () {
        if (!role.isAdmin()) {
          if (flash) { flash('Acesso restrito à área admin.', 'warning'); }
          BackboneRef.history.navigate('admin/setup', { trigger: true });
          return;
        }
        bound.apply(null, arguments);
      } : bound;
      router.on('route:' + handlerName, guarded);
    });
    return router;
  }

  function wireHome(app, controller) {
    controller.home = function () {
      app.getRegion('mainRegion').show(new HomeView());
    };
  }

  function wireTeamRoutes(app, controller, BackboneDep, flash) {
    controller.teamsList = function () {
      seedTeams();
      var teams = new Teams();
      teams.fetch();
      app.getRegion('mainRegion').show(new TeamsListView({ collection: teams }));
    };
    controller.teamsShow = function (id) {
      var team = new Team({ id: id });
      team.fetch();
      app.getRegion('mainRegion').show(new TeamProfileView({ model: team }));
    };
    controller.h2hShow = function (teamA, teamB) {
      app.getRegion('mainRegion').show(
        new HeadToHeadView({ teamA: teamA, teamB: teamB })
      );
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
            flash('Campeonato salvo, mas calendário falhou: ' + err.message, 'warning');
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

  function wireMatchRoutes(app, controller, flash) {
    controller.matchesList = function () {
      seedChampionship();
      var coll = new Matches();
      coll.fetch();
      app.getRegion('mainRegion').show(new MatchesListView({ collection: coll }));
    };
    controller.matchShow = function (id) {
      var match = new Match({ id: id });
      match.fetch();
      app.getRegion('mainRegion').show(new MatchShowView({ model: match }));
    };
    controller['admin.scoreboard'] = function (id) {
      var match = new Match({ id: id });
      match.fetch();
      var scorer = new ScorerView({ model: match });
      scorer.on('scorer:event', function (ev) {
        if (flash) {
          flash('Evento registrado: ' + ev.get('type'), 'info');
        }
      });
      app.getRegion('mainRegion').show(scorer);
    };
  }

  function wireImporter(app, controller, BackboneDep, flash) {
    controller.importer = function () {
      var view = new ImporterView();
      view.on('importer:done', function (summary) {
        if (flash) {
          flash('Importado ' + summary.championship.name + '.', 'success');
        }
      });
      app.getRegion('mainRegion').show(view);
    };
  }

  function wireAll(app, controller, BackboneDep, flash) {
    wireHome(app, controller);
    wireTeamRoutes(app, controller, BackboneDep, flash);
    wireChampionshipRoutes(app, controller, BackboneDep, flash);
    wireMatchRoutes(app, controller, flash);
    wireImporter(app, controller, BackboneDep, flash);
  }

  return {
    wireAll: wireAll,
    bindRouter: bindRouter,
    seedTeams: seedTeams,
    seedChampionship: seedChampionship
  };
}());
