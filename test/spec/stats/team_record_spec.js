'use strict';

var teamRecord = require('../../../src/stats/team_record');

function finished(home, hs, away, as, championship) {
  return {
    status: 'finished', championship: championship || null,
    home: home, away: away,
    homeScore: hs, awayScore: as
  };
}

describe('stats/team_record', function () {

  it('agrega partidas mandantes e visitantes do time', function () {
    var r = teamRecord.aggregate([
      finished('sao', 2, 'cor', 1),
      finished('pal', 1, 'sao', 1),
      finished('sao', 0, 'pal', 0)
    ], 'sao');
    expect(r.played).to.equal(3);
    expect(r.wins).to.equal(1);
    expect(r.draws).to.equal(2);
    expect(r.losses).to.equal(0);
    expect(r.points).to.equal(5);
    expect(r.goalsFor).to.equal(3);
    expect(r.goalsAgainst).to.equal(2);
  });

  it('ignora partidas que não envolvem o time', function () {
    var r = teamRecord.aggregate([
      finished('a', 1, 'b', 0),
      finished('c', 2, 'd', 2)
    ], 'sao');
    expect(r.played).to.equal(0);
  });

  it('agrupa contagem de partidas por campeonato', function () {
    var r = teamRecord.aggregate([
      finished('sao', 2, 'a', 1, 'bra-2014'),
      finished('a', 1, 'sao', 2, 'bra-2014'),
      finished('sao', 0, 'b', 1, 'copa-do-brasil-2014')
    ], 'sao');
    expect(r.championships['bra-2014']).to.equal(2);
    expect(r.championships['copa-do-brasil-2014']).to.equal(1);
  });

});
