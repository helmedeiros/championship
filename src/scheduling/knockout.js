module.exports = (function () {
  'use strict';

  // Single-elimination bracket. Power-of-two participant count for now;
  // odd counts can pad with byes in a later commit.

  function isPowerOfTwo(n) {
    return n > 0 && (n & (n - 1)) === 0;
  }

  function labelForRound(remaining, totalRounds, roundIdx) {
    if (remaining === 2) { return 'Final'; }
    if (remaining === 4) { return 'Semifinal'; }
    if (remaining === 8) { return 'Quartas de final'; }
    if (remaining === 16) { return 'Oitavas de final'; }
    if (remaining === 32) { return 'Décima sextas de final'; }
    return 'Rodada ' + (roundIdx + 1) + ' de ' + totalRounds;
  }

  function buildPlaceholders(roundIdx, count) {
    var out = [];
    var i;
    for (i = 0; i < count; i = i + 1) {
      out.push({ placeholder: 'W' + (roundIdx + 1) + '.' + (i + 1) });
    }
    return out;
  }

  function buildMatches(current) {
    var matches = [];
    var i;
    for (i = 0; i < current.length / 2; i = i + 1) {
      matches.push({ home: current[i], away: current[current.length - 1 - i] });
    }
    return matches;
  }

  function generate(participants) {
    var n = participants ? participants.length : 0;
    if (!isPowerOfTwo(n)) {
      throw new Error('mata-mata exige número de participantes potência de 2 (recebeu ' + n + ')');
    }

    var rounds = [];
    var current = participants.slice();
    var totalRounds = Math.log(n) / Math.log(2);
    var roundIdx = 0;

    while (current.length > 1) {
      var label = labelForRound(current.length, totalRounds, roundIdx);
      var matches = buildMatches(current);
      rounds.push({ label: label, matches: matches });
      current = buildPlaceholders(roundIdx, matches.length);
      roundIdx = roundIdx + 1;
    }

    return { rounds: rounds, totalRounds: totalRounds };
  }

  return { generate: generate };
}());
