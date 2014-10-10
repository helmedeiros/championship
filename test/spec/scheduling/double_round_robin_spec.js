'use strict';

var doubleRR = require('../../../src/scheduling/double_round_robin');

describe('scheduling/double_round_robin', function () {

  it('gera turno e returno (2 vezes o número de rodadas do simples)', function () {
    var schedule = doubleRR.generate(['a', 'b', 'c', 'd']);
    expect(schedule.rounds).to.have.length(6);
    expect(schedule.legs).to.equal(2);
  });

  it('returno inverte mando de campo do turno', function () {
    var schedule = doubleRR.generate(['a', 'b', 'c', 'd']);
    var half = schedule.rounds.length / 2;
    schedule.rounds.slice(0, half).forEach(function (round, i) {
      round.forEach(function (m, j) {
        var ret = schedule.rounds[half + i][j];
        expect(ret.home).to.equal(m.away);
        expect(ret.away).to.equal(m.home);
      });
    });
  });

  it('cada par de participantes joga exatamente 2 vezes (ida e volta)', function () {
    var teams = ['a', 'b', 'c', 'd', 'e', 'f'];
    var schedule = doubleRR.generate(teams);
    var counts = {};
    schedule.rounds.forEach(function (round) {
      round.forEach(function (m) {
        var key = [m.home, m.away].sort().join(':');
        counts[key] = (counts[key] || 0) + 1;
      });
    });
    expect(Object.keys(counts)).to.have.length(15);
    Object.keys(counts).forEach(function (k) {
      expect(counts[k]).to.equal(2);
    });
  });

});
