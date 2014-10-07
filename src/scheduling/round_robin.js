module.exports = (function () {
  'use strict';

  // Classic "circle method" round-robin generator. For n participants:
  //   - if n is odd, insert a BYE so every round has n/2 matches and one
  //     participant rests
  //   - produces n-1 rounds (with bye, n rounds)
  //   - fixes participant at index 0, rotates the rest

  function rotate(arr) {
    if (arr.length < 2) { return arr.slice(); }
    var rotated = arr.slice();
    rotated.splice(1, 0, rotated.pop());
    return rotated;
  }

  function generate(participants) {
    if (!participants || participants.length < 2) {
      return { rounds: [], byeUsed: false };
    }

    var pool = participants.slice();
    var byeInserted = false;
    if (pool.length % 2 === 1) {
      pool.push(null);
      byeInserted = true;
    }

    var totalRounds = pool.length - 1;
    var matchesPerRound = pool.length / 2;
    var current = pool.slice();
    var rounds = [];

    var r;
    var m;
    var round;
    var home;
    var away;
    for (r = 0; r < totalRounds; r = r + 1) {
      round = [];
      for (m = 0; m < matchesPerRound; m = m + 1) {
        home = current[m];
        away = current[current.length - 1 - m];
        if (home !== null && away !== null) {
          round.push({ home: home, away: away });
        }
      }
      rounds.push(round);
      current = rotate(current);
    }

    return {
      rounds: rounds,
      byeUsed: byeInserted
    };
  }

  return {
    generate: generate
  };
}());
