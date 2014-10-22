'use strict';

var tiebreakers = require('../../../src/classification/tiebreakers');

describe('classification/tiebreakers', function () {

  it('expõe ordem padrão pontos → vitórias → SG → GP → confronto direto', function () {
    expect(tiebreakers.DEFAULT_ORDER).to.deep.equal([
      'points', 'wins', 'goal_diff', 'goals_for', 'head_to_head'
    ]);
  });

  it('regra points retorna campo points da linha', function () {
    expect(tiebreakers.ruleFor('points')({ points: 38 })).to.equal(38);
  });

  it('regra wins retorna campo wins', function () {
    expect(tiebreakers.ruleFor('wins')({ wins: 12 })).to.equal(12);
  });

  it('regra goal_diff retorna SG (GP - GC)', function () {
    expect(tiebreakers.ruleFor('goal_diff')({ goalsFor: 30, goalsAgainst: 12 }))
      .to.equal(18);
  });

  it('regra goals_for retorna GP', function () {
    expect(tiebreakers.ruleFor('goals_for')({ goalsFor: 42 })).to.equal(42);
  });

  it('regra head_to_head consulta contexto h2h por time', function () {
    var ctx = { h2h: { 'sao': { points: 4 }, 'cor': { points: 1 } } };
    expect(tiebreakers.ruleFor('head_to_head')({ team: 'sao' }, ctx)).to.equal(4);
    expect(tiebreakers.ruleFor('head_to_head')({ team: 'pal' }, ctx)).to.equal(0);
  });

});
