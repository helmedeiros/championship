module.exports = (function () {
  'use strict';

  // Histórico de confrontos entre dois times.
  // matches: array (ou Collection) de partidas finalizadas.

  function asArray(matches) {
    if (!matches) { return []; }
    if (typeof matches.toArray === 'function') { return matches.toArray(); }
    return matches;
  }

  function getField(m, name) {
    return m && typeof m.get === 'function' ? m.get(name) : (m || {})[name];
  }

  function involves(home, away, teamA, teamB) {
    if (home === teamA && away === teamB) { return 'home'; }
    if (home === teamB && away === teamA) { return 'away'; }
    return null;
  }

  function recordOutcome(result, ga, gb) {
    result.goalsA = result.goalsA + ga;
    result.goalsB = result.goalsB + gb;
    if (ga > gb) { result.winsA = result.winsA + 1; }
    else if (gb > ga) { result.winsB = result.winsB + 1; }
    else { result.draws = result.draws + 1; }
  }

  function processMatch(result, m, teamA, teamB) {
    if (getField(m, 'status') !== 'finished') { return; }
    var home = getField(m, 'home');
    var away = getField(m, 'away');
    var perspective = involves(home, away, teamA, teamB);
    if (!perspective) { return; }
    var hs = getField(m, 'homeScore') || 0;
    var as = getField(m, 'awayScore') || 0;
    var ga = perspective === 'home' ? hs : as;
    var gb = perspective === 'home' ? as : hs;
    result.total = result.total + 1;
    recordOutcome(result, ga, gb);
    result.matches.push({
      home: home, away: away, homeScore: hs, awayScore: as,
      kickoff: getField(m, 'kickoff')
    });
  }

  function summary(matches, teamA, teamB) {
    var result = {
      total: 0,
      winsA: 0, winsB: 0, draws: 0,
      goalsA: 0, goalsB: 0,
      matches: []
    };
    asArray(matches).forEach(function (m) {
      processMatch(result, m, teamA, teamB);
    });
    return result;
  }

  return { summary: summary };
}());
