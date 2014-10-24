'use strict';

var table = require('../../../src/classification/table');

function finished(home, hs, away, as) {
  return {
    status: 'finished',
    home: home, away: away,
    homeScore: hs, awayScore: as
  };
}

describe('classification/table', function () {

  it('ignora partidas que não estão finalizadas', function () {
    var rows = table.tally([
      finished('a', 2, 'b', 1),
      { status: 'scheduled', home: 'a', away: 'c' }
    ]);
    expect(rows).to.have.length(2);
    expect(rows.map(function (r) { return r.team; }).sort()).to.deep.equal(['a', 'b']);
  });

  it('atribui 3 pontos para vitória, 1 para empate, 0 para derrota', function () {
    var rows = table.tally([
      finished('a', 2, 'b', 1),
      finished('a', 1, 'c', 1),
      finished('b', 0, 'c', 3)
    ]);
    var by = {};
    rows.forEach(function (r) { by[r.team] = r; });
    expect(by.a.points).to.equal(4);
    expect(by.b.points).to.equal(0);
    expect(by.c.points).to.equal(4);
  });

  it('classifica por pontos (decrescente) como critério principal', function () {
    var ordered = table.classify([
      finished('a', 1, 'b', 0),
      finished('a', 2, 'c', 0),
      finished('b', 0, 'c', 0)
    ]);
    expect(ordered[0].team).to.equal('a');
    expect(ordered[0].points).to.equal(6);
  });

  it('desempata por SG quando pontos são iguais', function () {
    var ordered = table.classify([
      finished('a', 3, 'x', 0),   // a: +3
      finished('a', 0, 'y', 0),   // a: +3 ainda
      finished('b', 2, 'x', 0),   // b: +2
      finished('b', 0, 'y', 0),   // b: +2 ainda
      finished('x', 0, 'y', 0)    // x e y empatados
    ]);
    // a: pts=4 sg=+3, b: pts=4 sg=+2 → a primeiro
    expect(ordered[0].team).to.equal('a');
    expect(ordered[1].team).to.equal('b');
  });

  it('mantém últimos 5 resultados em recentResults', function () {
    var rows = table.tally([
      finished('a', 2, 'b', 1),
      finished('a', 1, 'b', 1),
      finished('b', 0, 'a', 2)
    ]);
    var rowA = rows.filter(function (r) { return r.team === 'a'; })[0];
    expect(rowA.recentResults).to.deep.equal(['W', 'D', 'W']);
  });

});
