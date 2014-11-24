'use strict';

var Matches = require('../../../src/collections/matches');

describe('collections/Matches', function () {

  it('ordena as partidas pelo horário de bola rolando', function () {
    var rodada = new Matches([
      { home: 'a', away: 'b', kickoff: '2014-09-21T18:30:00-03:00' },
      { home: 'c', away: 'd', kickoff: '2014-09-21T16:00:00-03:00' },
      { home: 'e', away: 'f', kickoff: '2014-09-22T20:00:00-03:00' }
    ]);
    expect(rodada.pluck('kickoff')).to.deep.equal([
      '2014-09-21T16:00:00-03:00',
      '2014-09-21T18:30:00-03:00',
      '2014-09-22T20:00:00-03:00'
    ]);
  });

  it('filtra partidas encerradas', function () {
    var rodada = new Matches([
      { home: 'a', away: 'b', status: 'finished' },
      { home: 'c', away: 'd', status: 'scheduled' },
      { home: 'e', away: 'f', status: 'finished' }
    ]);
    expect(rodada.finished()).to.have.length(2);
  });

  it('filtra partidas ao vivo (live e half)', function () {
    var rodada = new Matches([
      { home: 'a', away: 'b', status: 'live' },
      { home: 'c', away: 'd', status: 'half' },
      { home: 'e', away: 'f', status: 'scheduled' }
    ]);
    expect(rodada.live()).to.have.length(2);
  });

  it('byChampionship filtra partidas pelo id do campeonato', function () {
    var coll = new Matches([
      { home: 'a', away: 'b', championship: 'bra-2014' },
      { home: 'c', away: 'd', championship: 'bra-2014' },
      { home: 'e', away: 'f', championship: 'cm-2014' }
    ]);
    expect(coll.byChampionship('bra-2014')).to.have.length(2);
    expect(coll.byChampionship('cm-2014')).to.have.length(1);
  });

  it('byTeam encontra partidas como mandante ou visitante', function () {
    var coll = new Matches([
      { home: 'sao', away: 'cor' },
      { home: 'pal', away: 'sao' },
      { home: 'san', away: 'cor' }
    ]);
    expect(coll.byTeam('sao')).to.have.length(2);
    expect(coll.byTeam('cor')).to.have.length(2);
    expect(coll.byTeam('san')).to.have.length(1);
  });

});
