'use strict';

var roundRobin = require('../../../src/scheduling/round_robin');

describe('scheduling/round_robin', function () {

  it('retorna lista vazia se há menos de 2 participantes', function () {
    expect(roundRobin.generate([]).rounds).to.deep.equal([]);
    expect(roundRobin.generate(['a']).rounds).to.deep.equal([]);
  });

  it('gera 1 rodada com 1 partida para 2 times', function () {
    var schedule = roundRobin.generate(['a', 'b']);
    expect(schedule.rounds).to.have.length(1);
    expect(schedule.rounds[0]).to.have.length(1);
    expect(schedule.rounds[0][0]).to.deep.equal({ home: 'a', away: 'b' });
  });

  it('gera 3 rodadas com 2 partidas para 4 times', function () {
    var schedule = roundRobin.generate(['a', 'b', 'c', 'd']);
    expect(schedule.rounds).to.have.length(3);
    schedule.rounds.forEach(function (r) {
      expect(r).to.have.length(2);
    });
  });

  it('inclui cada par de participantes exatamente uma vez', function () {
    var teams = ['a', 'b', 'c', 'd', 'e', 'f'];
    var schedule = roundRobin.generate(teams);
    var pairs = {};
    schedule.rounds.forEach(function (round) {
      round.forEach(function (match) {
        var key = [match.home, match.away].sort().join(':');
        expect(pairs[key], 'par duplicado: ' + key).to.equal(undefined);
        pairs[key] = true;
      });
    });
    // C(6,2) = 15 pares únicos
    expect(Object.keys(pairs)).to.have.length(15);
  });

  it('insere bye quando número de participantes é ímpar', function () {
    var schedule = roundRobin.generate(['a', 'b', 'c']);
    expect(schedule.byeUsed).to.equal(true);
    expect(schedule.rounds).to.have.length(3);
    schedule.rounds.forEach(function (r) {
      expect(r.length).to.be.below(2);
    });
  });

  it('não usa bye quando número de participantes é par', function () {
    var schedule = roundRobin.generate(['a', 'b', 'c', 'd']);
    expect(schedule.byeUsed).to.equal(false);
  });

});
