'use strict';

var brasileirao = require('../../../src/data/brasileirao_2014');
var topScorers = require('../../../src/stats/top_scorers');

function flatten(fix) {
  var all = [];
  fix.matches.forEach(function (m) {
    (m.events || []).forEach(function (ev) { all.push(ev); });
  });
  return all;
}

describe('data/brasileirao_2014 events', function () {

  it('todas as 15 partidas têm eventos anexados', function () {
    var withEv = brasileirao.matches.filter(function (m) {
      return m.events && m.events.length > 0;
    });
    expect(withEv.length).to.equal(15);
  });

  it('Fred aparece entre os artilheiros (clássico Fla-Flu e rodada 38)',
    function () {
      var ranking = topScorers.rank(flatten(brasileirao), { limit: 5 });
      var fred = ranking.filter(function (r) {
        return r.player === 'Fred';
      })[0];
      expect(fred, 'Fred deve aparecer no top 5').to.not.equal(undefined);
      expect(fred.goals).to.be.above(2);
    });

  it('Guerrero soma gols pelos jogos do Corinthians', function () {
    var ranking = topScorers.rank(flatten(brasileirao));
    var guerrero = ranking.filter(function (r) {
      return r.player === 'Paolo Guerrero';
    })[0];
    expect(guerrero).to.not.equal(undefined);
    expect(guerrero.goals).to.be.above(1);
  });

});
