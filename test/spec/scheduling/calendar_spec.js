'use strict';

var calendar = require('../../../src/scheduling/calendar');

describe('scheduling/calendar', function () {

  it('atribui mesma data para todas as partidas da mesma rodada', function () {
    var rounds = [
      [{ home: 'a', away: 'b' }, { home: 'c', away: 'd' }],
      [{ home: 'a', away: 'c' }, { home: 'b', away: 'd' }]
    ];
    var dated = calendar.assign(rounds, '2014-04-19T16:00:00Z', 7);
    expect(dated[0][0].kickoff).to.equal('2014-04-19T16:00:00Z');
    expect(dated[0][1].kickoff).to.equal('2014-04-19T16:00:00Z');
    expect(dated[1][0].kickoff).to.equal('2014-04-26T16:00:00Z');
  });

  it('respeita daysBetween customizado', function () {
    var rounds = [[{ home: 'a', away: 'b' }], [{ home: 'a', away: 'c' }]];
    var dated = calendar.assign(rounds, '2014-04-19T16:00:00Z', 3);
    expect(dated[1][0].kickoff).to.equal('2014-04-22T16:00:00Z');
  });

  it('usa intervalo padrão de 7 dias quando não informado', function () {
    var rounds = [[{ home: 'a', away: 'b' }], [{ home: 'a', away: 'c' }]];
    var dated = calendar.assign(rounds, '2014-04-19T16:00:00Z');
    expect(dated[1][0].kickoff).to.equal('2014-04-26T16:00:00Z');
  });

  it('retorna lista vazia para rodadas vazias', function () {
    expect(calendar.assign([], '2014-04-19T16:00:00Z')).to.deep.equal([]);
  });

  it('preserva campos extras como estádio na partida original', function () {
    var rounds = [[{ home: 'a', away: 'b', stadium: 'Maracanã' }]];
    var dated = calendar.assign(rounds, '2014-06-12T17:00:00Z');
    expect(dated[0][0].stadium).to.equal('Maracanã');
  });

});
