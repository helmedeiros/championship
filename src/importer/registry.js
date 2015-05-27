module.exports = (function () {
  'use strict';

  // Catálogo dos fixtures pré-embutidos.
  // Cada entrada referencia o módulo só quando solicitada para evitar custo
  // de import desnecessário em quem só precisa da lista.

  var ENTRIES = [
    {
      id:     'world-cup-2014',
      label:  'Copa do Mundo FIFA 2014',
      load:   function () { return require('../data/world_cup_2014'); }
    },
    {
      id:     'brasileirao-2014',
      label:  'Brasileirão Série A 2014',
      load:   function () { return require('../data/brasileirao_2014'); }
    }
  ];

  function list() {
    return ENTRIES.map(function (e) {
      return { id: e.id, label: e.label };
    });
  }

  function get(id) {
    var entry = ENTRIES.filter(function (e) { return e.id === id; })[0];
    return entry ? entry.load() : null;
  }

  return { list: list, get: get };
}());
