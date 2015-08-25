module.exports = (function () {
  'use strict';

  // Atualizador silencioso: para cada fixture já importado no storage,
  // compara a version persistida com a version atual no código. Se a
  // versão local for menor (ou ausente), apaga o campeonato em cascata
  // e reimporta. Fixtures que o usuário nunca importou ficam intactos.

  var registry = require('./registry');
  var importer = require('./importer');

  function syncOne(storage, entry) {
    var fixture = entry.load();
    var champId = fixture.championship.id;
    var existing = storage.read('championships', champId);
    if (!existing) {
      return { id: champId, action: 'skip', reason: 'não importado' };
    }
    var currentVersion = fixture.championship.version || 1;
    var storedVersion = existing.version || 1;
    if (storedVersion >= currentVersion) {
      return { id: champId, action: 'kept', version: storedVersion };
    }
    importer.wipeChampionship(storage, champId);
    importer.importFixture(fixture, { storage: storage });
    return {
      id: champId, action: 'updated',
      from: storedVersion, to: currentVersion
    };
  }

  function syncAll(storage) {
    if (!storage) { return []; }
    return registry.list().map(function (entry) {
      var full = registry.get(entry.id);
      return syncOne(storage, {
        id:   entry.id,
        load: function () { return full; }
      });
    });
  }

  return {
    syncAll: syncAll,
    syncOne: syncOne
  };
}());
