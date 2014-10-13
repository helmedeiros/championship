'use strict';

var knockout = require('../../../src/scheduling/knockout');

describe('scheduling/knockout', function () {

  it('exige número de participantes potência de 2', function () {
    expect(function () { knockout.generate(['a', 'b', 'c']); }).to.throw(/potência de 2/);
    expect(function () { knockout.generate(['a', 'b', 'c', 'd', 'e']); }).to.throw();
  });

  it('gera 1 rodada (Final) para 2 participantes', function () {
    var bracket = knockout.generate(['a', 'b']);
    expect(bracket.rounds).to.have.length(1);
    expect(bracket.rounds[0].label).to.equal('Final');
    expect(bracket.rounds[0].matches[0]).to.deep.equal({ home: 'a', away: 'b' });
  });

  it('gera Semifinal + Final para 4 participantes', function () {
    var bracket = knockout.generate(['a', 'b', 'c', 'd']);
    expect(bracket.rounds).to.have.length(2);
    expect(bracket.rounds[0].label).to.equal('Semifinal');
    expect(bracket.rounds[1].label).to.equal('Final');
  });

  it('chave 8 times tem rótulos Quartas/Semi/Final', function () {
    var bracket = knockout.generate(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']);
    expect(bracket.rounds.map(function (r) { return r.label; }))
      .to.deep.equal(['Quartas de final', 'Semifinal', 'Final']);
  });

  it('pareia 1 vs N, 2 vs N-1, etc., na primeira rodada', function () {
    var bracket = knockout.generate(['a', 'b', 'c', 'd']);
    expect(bracket.rounds[0].matches).to.deep.equal([
      { home: 'a', away: 'd' },
      { home: 'b', away: 'c' }
    ]);
  });

  it('usa placeholders W1.1, W1.2, ... para vencedores das rodadas seguintes', function () {
    var bracket = knockout.generate(['a', 'b', 'c', 'd']);
    expect(bracket.rounds[1].matches[0].home).to.deep.equal({ placeholder: 'W1.1' });
    expect(bracket.rounds[1].matches[0].away).to.deep.equal({ placeholder: 'W1.2' });
  });

});
