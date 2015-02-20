'use strict';

var cards = require('../../../src/stats/cards_leaderboard');

describe('stats/cards_leaderboard', function () {

  it('conta amarelos e vermelhos por jogador', function () {
    var ranking = cards.rank([
      { type: 'yellow', player: 'a' },
      { type: 'yellow', player: 'a' },
      { type: 'red',    player: 'b' }
    ]);
    var byName = {};
    ranking.forEach(function (r) { byName[r.player] = r; });
    expect(byName.a.yellow).to.equal(2);
    expect(byName.a.red).to.equal(0);
    expect(byName.b.yellow).to.equal(0);
    expect(byName.b.red).to.equal(1);
  });

  it('vermelho conta como 2 na pontuação disciplinar', function () {
    var ranking = cards.rank([
      { type: 'red',    player: 'rough' },
      { type: 'yellow', player: 'mild' },
      { type: 'yellow', player: 'mild' }
    ]);
    expect(ranking[0].player).to.equal('rough');
    expect(ranking[0].score).to.equal(2);
    expect(ranking[1].score).to.equal(2);
    // rough vence porque tem vermelho (tiebreak)
  });

  it('ignora eventos sem jogador e tipos não-cartão', function () {
    var ranking = cards.rank([
      { type: 'goal',   player: 'gol' },
      { type: 'yellow' },
      { type: 'red',    player: 'r' }
    ]);
    expect(ranking).to.have.length(1);
    expect(ranking[0].player).to.equal('r');
  });

});
