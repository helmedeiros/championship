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

});
