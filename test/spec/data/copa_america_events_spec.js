'use strict';

var copaAmerica = require('../../../src/data/copa_america_2015');
var topScorers = require('../../../src/stats/top_scorers');
var cards = require('../../../src/stats/cards_leaderboard');

function flatten(fix) {
  var all = [];
  fix.matches.forEach(function (m) {
    (m.events || []).forEach(function (ev) { all.push(ev); });
  });
  return all;
}

describe('data/copa_america_2015 events', function () {

  it('todas as 26 partidas têm eventos anexados', function () {
    var withEv = copaAmerica.matches.filter(function (m) {
      return m.events && m.events.length > 0;
    });
    expect(withEv.length).to.equal(26);
  });

  it('Paolo Guerrero é artilheiro (4 gols, dividido com Vargas)',
    function () {
      var ranking = topScorers.rank(flatten(copaAmerica), { limit: 3 });
      var top = ranking.map(function (r) { return r.player; });
      expect(top).to.include('Paolo Guerrero');
      expect(top).to.include('Eduardo Vargas');
      // ambos com 4 gols
      var guerrero = ranking.filter(function (r) {
        return r.player === 'Paolo Guerrero';
      })[0];
      expect(guerrero.goals).to.equal(4);
    });

  it('disciplina inclui o vermelho de Cavani (incidente Jara)',
    function () {
      var board = cards.rank(flatten(copaAmerica), { limit: 30 });
      var names = board.map(function (e) { return e.player; });
      expect(names).to.include('Cavani');
    });

});
