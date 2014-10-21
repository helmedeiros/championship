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

  it('aplica calendário quando startDate é informado', function () {
    var s = scheduler.scheduleFor('league', ['a', 'b', 'c', 'd'], {
      startDate: '2014-04-19T16:00:00Z',
      daysBetween: 7
    });
    expect(s.rounds[0][0].kickoff).to.equal('2014-04-19T16:00:00Z');
    expect(s.rounds[1][0].kickoff).to.equal('2014-04-26T16:00:00Z');
  });

  it('aplica calendário também a partidas internas de grupos', function () {
    var teams = [];
    var i;
    for (i = 1; i <= 8; i = i + 1) { teams.push('t' + i); }
    var s = scheduler.scheduleFor('groups-knockout', teams, {
      groupCount: 2,
      startDate: '2014-06-12T17:00:00Z',
      daysBetween: 5
    });
    expect(s.groups[0].rounds[0][0].kickoff).to.equal('2014-06-12T17:00:00Z');
    expect(s.groups[0].rounds[1][0].kickoff).to.equal('2014-06-17T17:00:00Z');
  });

});
