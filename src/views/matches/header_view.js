module.exports = (function () {
  'use strict';

  var Marionette = require('backbone.marionette');
  var escapeHtml = require('../helpers/escape_html');

  var STATUS_LABEL = {
    scheduled: 'A iniciar',
    live: 'EM ANDAMENTO',
    half: 'INTERVALO',
    finished: 'ENCERRADO',
    postponed: 'ADIADA'
  };

  return Marionette.ItemView.extend({

    className: 'match-header',

    template: function (data) {
      return '' +
        '<div class="match-stadium-line text-muted">' +
          escapeHtml(data.stadium || '—') +
        '</div>' +
        '<div class="match-scoreboard">' +
          '<span class="team-home">' + escapeHtml(data.home) + '</span>' +
          '<span class="score-home">' + escapeHtml(data.homeScore) + '</span>' +
          '<span class="vs">×</span>' +
          '<span class="score-away">' + escapeHtml(data.awayScore) + '</span>' +
          '<span class="team-away">' + escapeHtml(data.away) + '</span>' +
        '</div>' +
        '<div class="match-status status-' + data.status + '">' +
          escapeHtml(STATUS_LABEL[data.status] || data.status) +
        '</div>';
    },

    modelEvents: {
      'change:status change:homeScore change:awayScore': 'render'
    }

  });
}());
