'use strict';

var importer = require('../../../src/importer/importer');
var worldCup = require('../../../src/data/world_cup_2014');
var brasileirao = require('../../../src/data/brasileirao_2014');
var topScorers = require('../../../src/stats/top_scorers');

function memStorage() {
  var data = {};
  function bucket(b) { return data[b] || (data[b] = {}); }
  var counter = 0;
  return {
    create: function (b, attrs) {
      counter = counter + 1;
      var id = attrs.id || ('id-' + counter);
      bucket(b)[id] = Object.assign({}, attrs, { id: id });
      return bucket(b)[id];
    },
    read:   function (b, id) { return bucket(b)[id] || null; },
    list:   function (b) {
      return Object.keys(bucket(b)).map(function (k) { return bucket(b)[k]; });
    },
    update: function (b, attrs) {
      bucket(b)[attrs.id] = attrs;
      return attrs;
    },
    remove: function (b, id) { delete bucket(b)[id]; }
  };
}

function eventsFor(storage, champId) {
  var matchIds = {};
  storage.list('matches').forEach(function (m) {
    if (m.championship === champId) { matchIds[m.id] = true; }
  });
  return storage.list('match_events').filter(function (e) {
    return matchIds[e.match];
  });
}

describe('importer + top_scorers integration', function () {

  it('Copa 2014 populada produz James Rodríguez no topo', function () {
    var s = memStorage();
    var result = importer.importFixture(worldCup, { storage: s });
    expect(result.eventsCount).to.be.above(180);

    var ranking = topScorers.rank(
      eventsFor(s, 'world-cup-2014'),
      { limit: 1 }
    );
    expect(ranking[0].player).to.equal('James Rodríguez');
    expect(ranking[0].goals).to.equal(6);
  });

  it('Brasileirão 2014 populado coloca Fred na artilharia', function () {
    var s = memStorage();
    importer.importFixture(brasileirao, { storage: s });
    var ranking = topScorers.rank(
      eventsFor(s, 'brasileirao-2014'),
      { limit: 5 }
    );
    var fred = ranking.filter(function (r) {
      return r.player === 'Fred';
    })[0];
    expect(fred, 'Fred deve estar entre os 5 maiores').to.not.equal(undefined);
  });

});
