'use strict';

var scheduler = require('../../../src/scheduling/scheduler');

describe('scheduling/scheduler', function () {

  it('expõe a lista de formatos suportados', function () {
    expect(scheduler.FORMATS).to.include('league');
    expect(scheduler.FORMATS).to.include('double-round-robin');
    expect(scheduler.FORMATS).to.include('knockout');
    expect(scheduler.FORMATS).to.include('groups-knockout');
  });

  it('league delega para round_robin balanceado', function () {
    var s = scheduler.scheduleFor('league', ['a', 'b', 'c', 'd']);
    expect(s.format).to.equal('league');
    expect(s.rounds).to.have.length(3);
  });

  it('double-round-robin retorna 2x as rodadas', function () {
    var s = scheduler.scheduleFor('double-round-robin', ['a', 'b', 'c', 'd']);
    expect(s.format).to.equal('double-round-robin');
    expect(s.rounds).to.have.length(6);
  });

  it('knockout retorna bracket com rodadas nomeadas', function () {
    var s = scheduler.scheduleFor('knockout', ['a', 'b', 'c', 'd']);
    expect(s.format).to.equal('knockout');
    expect(s.bracket.rounds[0].label).to.equal('Semifinal');
  });

  it('groups-knockout retorna grupos com partidas internas', function () {
    var teams = [];
    var i;
    for (i = 1; i <= 32; i = i + 1) { teams.push('t' + i); }
    var s = scheduler.scheduleFor('groups-knockout', teams, { groupCount: 8 });
    expect(s.format).to.equal('groups-knockout');
    expect(s.groups).to.have.length(8);
    s.groups.forEach(function (g) {
      expect(g.rounds).to.have.length(3); // 4 times no grupo → 3 rodadas
    });
  });

  it('rejeita formato desconhecido', function () {
    expect(function () { scheduler.scheduleFor('xyz', ['a', 'b']); }).to.throw(/desconhecido/);
  });

});
