module.exports = (function () {
  'use strict';

  var Marionette = require('backbone.marionette');
  var matchStats = require('../../stats/match_stats');

  return Marionette.ItemView.extend({

    className: 'match-stats',

    initialize: function (options) {
      this.matchEvents = options && options.matchEvents;
    },

    template: function (data) {
      var c = data.counts;
      function row(label, value) {
        return '<tr><td>' + label + '</td><td class="text-right"><strong>' +
               value + '</strong></td></tr>';
      }
      return '' +
        '<table class="table table-striped stats-summary">' +
          '<tbody>' +
            row('Gols',                   c.goal) +
            row('Gols contra',            c.own_goal) +
            row('Cartões amarelos',       c.yellow) +
            row('Cartões vermelhos',      c.red) +
            row('Substituições',          c.sub) +
            row('Consultas ao VAR',       c.var) +
            row('Comentários ao vivo',    c.comment) +
            row('Marcos da partida',
                c.kickoff + c.half_time + c.full_time) +
          '</tbody>' +
        '</table>';
    },

    serializeData: function () {
      return matchStats.summarize(this.matchEvents);
    },

    initialize_with_collection_listener: function () {
      // Re-render quando coleção mudar (listener separado é o jeito mais
      // 2014 de fazer; Marionette `collectionEvents` cobre a maior parte).
    },

    collectionEvents: {
      'add remove reset change': 'render'
    }

  });
}());
