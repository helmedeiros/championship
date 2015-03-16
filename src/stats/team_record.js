module.exports = (function () {
  'use strict';

  // Carreira de um time considerando todas as partidas finalizadas.

  function asArray(matches) {
    if (!matches) { return []; }
    if (typeof matches.toArray === 'function') { return matches.toArray(); }
    return matches;
  }

  function getField(m, name) {
    return m && typeof m.get === 'function' ? m.get(name) : (m || {})[name];
  }

  function recordOutcome(record, gf, ga) {
    record.played = record.played + 1;
    record.goalsFor = record.goalsFor + gf;
    record.goalsAgainst = record.goalsAgainst + ga;
    if (gf > ga) {
      record.wins = record.wins + 1;
      record.points = record.points + 3;
    } else if (gf < ga) {
      record.losses = record.losses + 1;
    } else {
      record.draws = record.draws + 1;
      record.points = record.points + 1;
    }
  }

  function isFinishedTeamMatch(m, teamId) {
    if (getField(m, 'status') !== 'finished') { return false; }
    var home = getField(m, 'home');
    var away = getField(m, 'away');
    return home === teamId || away === teamId;
  }

  function recordChampionship(record, champ) {
    if (!champ) { return; }
    record.championships[champ] = (record.championships[champ] || 0) + 1;
  }

  function processOne(record, m, teamId) {
    if (!isFinishedTeamMatch(m, teamId)) { return; }
    var isHome = getField(m, 'home') === teamId;
    var hs = getField(m, 'homeScore') || 0;
    var as = getField(m, 'awayScore') || 0;
    recordOutcome(record, isHome ? hs : as, isHome ? as : hs);
    recordChampionship(record, getField(m, 'championship'));
  }

  function aggregate(matches, teamId) {
    var record = {
      team: teamId,
      played: 0, wins: 0, draws: 0, losses: 0,
      goalsFor: 0, goalsAgainst: 0,
      points: 0,
      championships: {}
    };
    asArray(matches).forEach(function (m) { processOne(record, m, teamId); });
    return record;
  }

  return { aggregate: aggregate };
}());
