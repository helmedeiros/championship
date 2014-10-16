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

  function assign(rounds, startDate, daysBetween) {
    if (!rounds || rounds.length === 0) { return []; }
    var start = startDate instanceof Date ? startDate : new Date(startDate);
    var step = daysBetween || 7;
    return rounds.map(function (round, idx) {
      var roundDate = addDays(start, idx * step);
      var iso = toIso(roundDate);
      return round.map(function (match) {
        var withDate = { home: match.home, away: match.away, kickoff: iso };
        if (match.stadium) { withDate.stadium = match.stadium; }
        return withDate;
      });
    });
  }

  return {
    assign: assign,
    toIso: toIso,
    addDays: addDays
  };
}());
