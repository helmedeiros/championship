module.exports = (function () {
  'use strict';

  // Distribui datas pelos jogos de cada rodada, partindo de startDate e
  // separando rodadas por daysBetween dias.

  function toIso(date) {
    var pad = function (n) { return n < 10 ? '0' + n : '' + n; };
    return date.getUTCFullYear() + '-' +
      pad(date.getUTCMonth() + 1) + '-' +
      pad(date.getUTCDate()) + 'T' +
      pad(date.getUTCHours()) + ':' +
      pad(date.getUTCMinutes()) + ':' +
      pad(date.getUTCSeconds()) + 'Z';
  }

  function addDays(date, days) {
    var copy = new Date(date.getTime());
    copy.setUTCDate(copy.getUTCDate() + days);
    return copy;
  }

  function matchKey(roundIdx, matchIdx) {
    return roundIdx + ':' + matchIdx;
  }

  function applyOverride(target, override) {
    if (!override) { return target; }
    if (override.kickoff) { target.kickoff = override.kickoff; }
    if (override.stadium) { target.stadium = override.stadium; }
    if (override.referee) { target.referee = override.referee; }
    return target;
  }

  function assign(rounds, startDate, daysBetween, overrides) {
    if (!rounds || rounds.length === 0) { return []; }
    var start = startDate instanceof Date ? startDate : new Date(startDate);
    var step = daysBetween || 7;
    var byKey = overrides || {};
    return rounds.map(function (round, rIdx) {
      var roundDate = addDays(start, rIdx * step);
      var iso = toIso(roundDate);
      return round.map(function (match, mIdx) {
        var withDate = { home: match.home, away: match.away, kickoff: iso };
        if (match.stadium) { withDate.stadium = match.stadium; }
        return applyOverride(withDate, byKey[matchKey(rIdx, mIdx)]);
      });
    });
  }

  return {
    assign: assign,
    toIso: toIso,
    addDays: addDays,
    matchKey: matchKey
  };
}());
