module.exports = (function () {
  'use strict';

  var Marionette = require('backbone.marionette');
  var escapeHtml = require('../helpers/escape_html');
  var topScorers = require('../../stats/top_scorers');

  return Marionette.ItemView.extend({

    className: 'top-scorers',

    initialize: function (options) {
      var opts = options || {};
      this.matchEvents = opts.matchEvents;
      this.limit = opts.limit || 10;
    },

    template: function (data) {
      var head = '<thead><tr><th>#</th><th>Jogador</th>' +
        '<th class="text-right">Gols</th></tr></thead>';
      if (!data.rows.length) {
        return '<table class="table">' + head +
          '<tbody><tr><td colspan="3" class="text-muted">' +
          'Nenhum gol marcado ainda.</td></tr></tbody></table>';
      }
      var body = data.rows.map(function (r, idx) {
        return '<tr><td>' + (idx + 1) + '</td>' +
          '<td>' + escapeHtml(r.player) + '</td>' +
          '<td class="text-right"><strong>' + r.goals + '</strong></td></tr>';
      }).join('');
      return '<table class="table table-striped">' + head +
        '<tbody>' + body + '</tbody></table>';
    },

    serializeData: function () {
      return {
        rows: topScorers.rank(this.matchEvents, { limit: this.limit })
      };
    }

  });
}());
