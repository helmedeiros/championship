'use strict';

var groups = require('../../../src/scheduling/groups');

describe('scheduling/groups', function () {

  it('exige número de participantes divisível por groupCount', function () {
    expect(function () { groups.distribute(['a', 'b', 'c'], 2); }).to.throw(/divisível/);
  });

  it('nomeia os grupos A, B, C, ... em ordem', function () {
    var g = groups.distribute(['a', 'b', 'c', 'd'], 2);
    expect(g.map(function (x) { return x.name; })).to.deep.equal(['Grupo A', 'Grupo B']);
  });

  it('cria 8 grupos com 4 times cada (Copa do Mundo)', function () {
    var teams = [];
    var i;
    for (i = 1; i <= 32; i = i + 1) { teams.push('t' + i); }
    var g = groups.distribute(teams, 8);
    expect(g).to.have.length(8);
    g.forEach(function (grp) {
      expect(grp.participants).to.have.length(4);
    });
  });

  it('todos os participantes aparecem exatamente uma vez', function () {
    var teams = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    var g = groups.distribute(teams, 2);
    var seen = {};
    g.forEach(function (grp) {
      grp.participants.forEach(function (p) {
        expect(seen[p], 'participante duplicado: ' + p).to.equal(undefined);
        seen[p] = true;
      });
    });
    expect(Object.keys(seen).sort()).to.deep.equal(teams.sort());
  });

  it('exposes letterFor utility (0->A, 1->B, 25->Z)', function () {
    expect(groups.letterFor(0)).to.equal('A');
    expect(groups.letterFor(1)).to.equal('B');
    expect(groups.letterFor(25)).to.equal('Z');
  });

});
