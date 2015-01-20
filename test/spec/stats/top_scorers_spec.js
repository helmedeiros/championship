'use strict';

var topScorers = require('../../../src/stats/top_scorers');

describe('stats/top_scorers', function () {

  it('agrupa gols por jogador em ordem decrescente', function () {
    var ranking = topScorers.rank([
      { type: 'goal', player: 'pele' },
      { type: 'goal', player: 'pele' },
      { type: 'goal', player: 'romario' },
      { type: 'goal', player: 'pele' }
    ]);
    expect(ranking).to.deep.equal([
      { player: 'pele', goals: 3 },
      { player: 'romario', goals: 1 }
    ]);
  });

  it('ignora gols contra (own_goal)', function () {
    var ranking = topScorers.rank([
      { type: 'goal',     player: 'a' },
      { type: 'own_goal', player: 'b' }
    ]);
    expect(ranking).to.have.length(1);
    expect(ranking[0].player).to.equal('a');
  });

  it('ignora eventos sem jogador', function () {
    var ranking = topScorers.rank([
      { type: 'goal' },
      { type: 'goal', player: 'x' }
    ]);
    expect(ranking).to.have.length(1);
    expect(ranking[0].player).to.equal('x');
  });

  it('em caso de empate ordena alfabeticamente pelo nome', function () {
    var ranking = topScorers.rank([
      { type: 'goal', player: 'zico' },
      { type: 'goal', player: 'ana' },
      { type: 'goal', player: 'marta' }
    ]);
    expect(ranking.map(function (r) { return r.player; }))
      .to.deep.equal(['ana', 'marta', 'zico']);
  });

});
