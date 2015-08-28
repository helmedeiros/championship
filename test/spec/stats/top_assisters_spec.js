'use strict';

var topAssisters = require('../../../src/stats/top_assisters');

describe('stats/top_assisters', function () {

  it('conta assistências de eventos goal com campo assist', function () {
    var events = [
      { type: 'goal', player: 'A', assist: 'X' },
      { type: 'goal', player: 'B', assist: 'X' },
      { type: 'goal', player: 'C', assist: 'Y' },
      { type: 'goal', player: 'D' }
    ];
    var rank = topAssisters.rank(events);
    expect(rank).to.have.length(2);
    expect(rank[0]).to.deep.equal({ player: 'X', assists: 2 });
    expect(rank[1]).to.deep.equal({ player: 'Y', assists: 1 });
  });

  it('ignora eventos que não são gols', function () {
    var events = [
      { type: 'yellow', player: 'A', assist: 'X' },
      { type: 'goal',   player: 'B', assist: 'Y' }
    ];
    var rank = topAssisters.rank(events);
    expect(rank).to.have.length(1);
    expect(rank[0].player).to.equal('Y');
  });

  it('respeita o limit', function () {
    var events = [
      { type: 'goal', assist: 'A' },
      { type: 'goal', assist: 'B' },
      { type: 'goal', assist: 'A' },
      { type: 'goal', assist: 'C' }
    ];
    var rank = topAssisters.rank(events, { limit: 2 });
    expect(rank).to.have.length(2);
    expect(rank[0].player).to.equal('A');
    expect(rank[0].assists).to.equal(2);
  });

  it('desempata alfabeticamente', function () {
    var events = [
      { type: 'goal', assist: 'B' },
      { type: 'goal', assist: 'A' },
      { type: 'goal', assist: 'C' }
    ];
    var rank = topAssisters.rank(events);
    expect(rank.map(function (r) { return r.player; }))
      .to.deep.equal(['A', 'B', 'C']);
  });

});
