module.exports = (function () {
  'use strict';

  // Classic "circle method" round-robin generator. For n participants:
  //   - if n is odd, insert a BYE so every round has n/2 matches and one
  //     participant rests
  //   - produces n-1 rounds (with bye, n rounds)
  //   - fixes participant at index 0, rotates the rest
  //
  // Options:
  //   balanceHome: alternate home/away across rounds so each participant
  //                plays roughly half as home and half as away.

  function rotate(arr) {
    if (arr.length < 2) { return arr.slice(); }
    var rotated = arr.slice();
    rotated.splice(1, 0, rotated.pop());
    return rotated;
  }

  function swap(match) {
    return { home: match.away, away: match.home };
  }

  function balance(rounds) {
    return rounds.map(function (round, idx) {
      if (idx % 2 === 0) { return round; }
      return round.map(swap);
    });
  }

  function pairRound(pool) {
    var matches = [];
    var size = pool.length;
    var m;
    var home;
    var away;
    for (m = 0; m < size / 2; m = m + 1) {
      home = pool[m];
      away = pool[size - 1 - m];
      if (home !== null && away !== null) {
        matches.push({ home: home, away: away });
      }
    }
    return matches;
  }

  function withBye(participants) {
    var pool = participants.slice();
    var byeInserted = false;
    if (pool.length % 2 === 1) {
      pool.push(null);
      byeInserted = true;
    }
    return { pool: pool, byeInserted: byeInserted };
  }

  function generate(participants, options) {
    if (!participants || participants.length < 2) {
      return { rounds: [], byeUsed: false };
    }

    var opts = options || {};
    var prepared = withBye(participants);
    var current = prepared.pool.slice();
    var totalRounds = prepared.pool.length - 1;
    var rounds = [];

    var r;
    for (r = 0; r < totalRounds; r = r + 1) {
      rounds.push(pairRound(current));
      current = rotate(current);
    }

    if (opts.balanceHome) { rounds = balance(rounds); }

    return { rounds: rounds, byeUsed: prepared.byeInserted };
  }

  return {
    generate: generate
  };
}());
