module.exports = (function () {
  'use strict';

  var roundRobin = require('./round_robin');

  // Pontos corridos com turno e returno (e.g. Brasileirão).
  // No returno os mandos são invertidos em relação ao turno.

  function generate(participants) {
    var first = roundRobin.generate(participants, { balanceHome: true });
    var returnRounds = first.rounds.map(function (round) {
      return round.map(function (m) { return { home: m.away, away: m.home }; });
    });
    return {
      rounds: first.rounds.concat(returnRounds),
      byeUsed: first.byeUsed,
      legs: 2
    };
  }

  return { generate: generate };
}());
