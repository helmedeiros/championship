'use strict';

var h2h = require('../../../src/stats/head_to_head');

function finished(home, hs, away, as) {
  return {
    status: 'finished',
    home: home, away: away,
    homeScore: hs, awayScore: as
  };
}

describe('stats/head_to_head', function () {

  it('soma vitórias, empates e gols entre dois times', function () {
    var s = h2h.summary([
      finished('sao', 2, 'cor', 1),  // sao win
      finished('cor', 1, 'sao', 1),  // draw
      finished('sao', 0, 'cor', 3),  // cor win
      finished('cor', 2, 'pal', 0)   // irrelevante
    ], 'sao', 'cor');
    expect(s.total).to.equal(3);
    expect(s.winsA).to.equal(1);
    expect(s.winsB).to.equal(1);
    expect(s.draws).to.equal(1);
    expect(s.goalsA).to.equal(3);
    expect(s.goalsB).to.equal(5);
  });

  it('considera partidas em qualquer mando', function () {
    var s = h2h.summary([
      finished('a', 1, 'b', 0),
      finished('b', 2, 'a', 1)
    ], 'a', 'b');
    expect(s.total).to.equal(2);
    expect(s.winsA).to.equal(1);
    expect(s.winsB).to.equal(1);
  });

  it('ignora partidas não finalizadas', function () {
    var s = h2h.summary([
      { status: 'scheduled', home: 'a', away: 'b', homeScore: 0, awayScore: 0 },
      finished('a', 2, 'b', 1)
    ], 'a', 'b');
    expect(s.total).to.equal(1);
  });

  it('retorna lista vazia quando os times nunca se enfrentaram', function () {
    var s = h2h.summary([
      finished('x', 1, 'y', 0)
    ], 'a', 'b');
    expect(s.total).to.equal(0);
    expect(s.matches).to.have.length(0);
  });

});
