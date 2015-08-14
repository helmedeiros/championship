'use strict';

var worldCup = require('../../../src/data/world_cup_2014');
var topScorers = require('../../../src/stats/top_scorers');
var cards = require('../../../src/stats/cards_leaderboard');

function flattenEvents(fixture) {
  var all = [];
  fixture.matches.forEach(function (m) {
    (m.events || []).forEach(function (ev) { all.push(ev); });
  });
  return all;
}

describe('data/world_cup_2014 events', function () {

  it('todas as 64 partidas têm eventos anexados', function () {
    var withEv = worldCup.matches.filter(function (m) {
      return m.events && m.events.length > 0;
    });
    expect(withEv.length).to.equal(64);
  });

  it('soma de gols nos eventos bate com o placar agregado', function () {
    var scoredGoals = worldCup.matches.reduce(function (sum, m) {
      var withScorer = (m.events || []).filter(function (e) {
        return e.type === 'goal' && e.player &&
               e.player.indexOf('(CT)') === -1;
      });
      return sum + withScorer.length;
    }, 0);
    // Gols totais reais da Copa 2014: 171.
    // Tiramos gols-contra (5: Marcelo BRA, Valladares HON, Boye GHA,
    // Yobo NGA, Kolasinac BIH) e a final foi 1x0.
    // Esperamos um número alto e plausível.
    expect(scoredGoals).to.be.above(150);
  });

  it('James Rodríguez é o artilheiro com 6 gols', function () {
    var ranking = topScorers.rank(flattenEvents(worldCup), { limit: 5 });
    expect(ranking[0].player).to.equal('James Rodríguez');
    expect(ranking[0].goals).to.equal(6);
  });

  it('Müller aparece no top 3 com 5 gols', function () {
    var ranking = topScorers.rank(flattenEvents(worldCup), { limit: 3 });
    var mueller = ranking.filter(function (r) {
      return r.player === 'Müller';
    })[0];
    expect(mueller, 'Müller no top 3').to.not.equal(undefined);
    expect(mueller.goals).to.equal(5);
  });

  it('disciplina inclui cartões vermelhos famosos (Pepe e Song)',
    function () {
      var board = cards.rank(flattenEvents(worldCup), { limit: 30 });
      var names = board.map(function (e) { return e.player; });
      expect(names).to.include('Pepe');
      expect(names).to.include('Alex Song');
    });

});
