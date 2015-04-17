module.exports = (function () {
  'use strict';

  var BaseModel = require('../persistence/base_model');
  var validator = require('./validator');

  function importChampionship(storage, data) {
    return storage.create('championships', data);
  }

  function importTeams(storage, teams) {
    return teams.map(function (t) { return storage.create('teams', t); });
  }

  function matchAttrs(match, championshipId) {
    return {
      id:           match.id,
      home:         match.home,
      away:         match.away,
      kickoff:      match.kickoff || null,
      stadium:      match.stadium || '',
      round:        match.round || null,
      group:        match.group || null,
      status:       match.status || 'scheduled',
      homeScore:    match.homeScore || 0,
      awayScore:    match.awayScore || 0,
      championship: championshipId
    };
  }

  function eventAttrs(ev, matchId) {
    return {
      match:  matchId,
      type:   ev.type,
      half:   ev.half || 1,
      minute: ev.minute || 0,
      player: ev.player || null,
      text:   ev.text || ''
    };
  }

  function importMatch(storage, championshipId, match) {
    var saved = storage.create('matches', matchAttrs(match, championshipId));
    (match.events || []).forEach(function (ev) {
      storage.create('match_events', eventAttrs(ev, saved.id));
    });
    return saved;
  }

  function importFixture(fixture, options) {
    var opts = options || {};
    var storage = opts.storage || BaseModel.getStorage();
    if (!storage) { throw new Error('storage não configurado'); }

    var validation = opts.skipValidation ? { valid: true } : validator.validate(fixture);
    if (!validation.valid) {
      var err = new Error('Fixture inválido');
      err.errors = validation.errors;
      throw err;
    }

    var champ = importChampionship(storage, fixture.championship);
    var teams = importTeams(storage, fixture.teams);
    var matches = fixture.matches.map(function (m) {
      return importMatch(storage, champ.id, m);
    });

    return {
      championship: champ,
      teamsCount: teams.length,
      matchesCount: matches.length,
      eventsCount: matches.reduce(function (acc, m, idx) {
        var src = fixture.matches[idx];
        return acc + ((src && src.events) ? src.events.length : 0);
      }, 0)
    };
  }

  return { importFixture: importFixture };
}());
