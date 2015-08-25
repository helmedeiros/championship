module.exports = (function () {
  'use strict';

  var BaseModel = require('../persistence/base_model');
  var validator = require('./validator');

  function importChampionship(storage, data) {
    return storage.create('championships', data);
  }

  function wipeChampionship(storage, championshipId) {
    var existing = storage.read('championships', championshipId);
    if (!existing) { return; }
    storage.list('matches').forEach(function (m) {
      if (m.championship !== championshipId) { return; }
      storage.list('match_events').forEach(function (ev) {
        if (ev.match === m.id) { storage.destroy('match_events', ev.id); }
      });
      storage.destroy('matches', m.id);
    });
    storage.destroy('championships', championshipId);
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

  function alreadyImported(storage, championshipId) {
    var existing = storage.read('championships', championshipId);
    return existing !== null && existing !== undefined;
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

    if (alreadyImported(storage, fixture.championship.id) && !opts.overwrite) {
      var dup = new Error('Campeonato já importado: ' + fixture.championship.id);
      dup.code = 'DUPLICATE';
      throw dup;
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

  return {
    importFixture:    importFixture,
    wipeChampionship: wipeChampionship
  };
}());
