'use strict';

var autoUpdate = require('../../../src/importer/auto_update');
var importer = require('../../../src/importer/importer');
var registry = require('../../../src/importer/registry');

function memStorage() {
  var data = {};
  var counter = 0;
  function bucket(b) { return data[b] || (data[b] = {}); }
  return {
    create: function (b, attrs) {
      counter = counter + 1;
      var id = attrs.id || ('id-' + counter);
      var rec = {}, k;
      for (k in attrs) {
        if (attrs.hasOwnProperty(k)) { rec[k] = attrs[k]; }
      }
      rec.id = id;
      bucket(b)[id] = rec;
      return rec;
    },
    read:    function (b, id) { return bucket(b)[id] || null; },
    list:    function (b) {
      return Object.keys(bucket(b)).map(function (k) { return bucket(b)[k]; });
    },
    update:  function (b, attrs) { bucket(b)[attrs.id] = attrs; return attrs; },
    destroy: function (b, id) { delete bucket(b)[id]; return true; }
  };
}

describe('importer/auto_update', function () {

  it('mantém campeonatos com version igual ou mais nova', function () {
    var s = memStorage();
    var fixture = registry.get('world-cup-2014');
    importer.importFixture(fixture, { storage: s });
    var before = s.list('matches').length;
    var results = autoUpdate.syncAll(s);
    var entry = results.filter(function (r) {
      return r.id === 'world-cup-2014';
    })[0];
    expect(entry.action).to.equal('kept');
    expect(s.list('matches').length).to.equal(before);
  });

  it('pula campeonatos que nunca foram importados', function () {
    var s = memStorage();
    var results = autoUpdate.syncAll(s);
    results.forEach(function (r) {
      expect(r.action).to.equal('skip');
    });
  });

  it('reimporta quando version local é menor que a do código', function () {
    var s = memStorage();
    var fixture = registry.get('world-cup-2014');
    importer.importFixture(fixture, { storage: s });
    // Simular cache antigo: rebaixar a version do campeonato salvo
    var existing = s.read('championships', 'world-cup-2014');
    existing.version = 1;
    s.update('championships', existing);
    // Apagar um evento pra simular dados desatualizados
    var anyEvent = s.list('match_events')[0];
    s.destroy('match_events', anyEvent.id);
    var eventsBefore = s.list('match_events').length;

    var results = autoUpdate.syncAll(s);
    var entry = results.filter(function (r) {
      return r.id === 'world-cup-2014';
    })[0];

    expect(entry.action).to.equal('updated');
    expect(entry.from).to.equal(1);
    expect(entry.to).to.equal(2);
    expect(s.list('match_events').length).to.be.above(eventsBefore);
    expect(s.read('championships', 'world-cup-2014').version).to.equal(2);
  });

});
