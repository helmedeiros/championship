module.exports = (function () {
  'use strict';

  var Marionette = require('backbone.marionette');
  var escapeHtml = require('../helpers/escape_html');
  var cards = require('../../stats/cards_leaderboard');

  return Marionette.ItemView.extend({

    className: 'cards-leaderboard',

    initialize: function (options) {
      this.matchEvents = options && options.matchEvents;
    },

    template: function (data) {
      var head = '<thead><tr><th>#</th><th>Jogador</th>' +
        '<th class="text-center"><span class="badge bg-warning">A</span></th>' +
        '<th class="text-center"><span class="badge bg-danger">V</span></th>' +
        '</tr></thead>';
      if (!data.rows.length) {
        return '<table class="table">' + head +
          '<tbody><tr><td colspan="4" class="text-muted">' +
          'Nenhum cartão registrado ainda.</td></tr></tbody></table>';
      }
      var body = data.rows.map(function (r, idx) {
        return '<tr>' +
          '<td>' + (idx + 1) + '</td>' +
          '<td>' + escapeHtml(r.player) + '</td>' +
          '<td class="text-center">' + r.yellow + '</td>' +
          '<td class="text-center">' + r.red + '</td>' +
        '</tr>';
      }).join('');
      return '<table class="table table-striped">' + head +
        '<tbody>' + body + '</tbody></table>';
    },

    serializeData: function () {
      return { rows: cards.rank(this.matchEvents) };
    }

  });
}());
