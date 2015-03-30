module.exports = (function () {
  'use strict';

  var Marionette = require('backbone.marionette');
  var escapeHtml = require('../helpers/escape_html');
  var teamLink = require('../helpers/team_link');
  var STATUS_LABEL = require('./status_labels').LONG;

  return Marionette.ItemView.extend({

    className: 'match-header',

    template: function (data) {
      return '' +
        '<div class="match-stadium-line text-muted">' +
          escapeHtml(data.stadium || '—') +
        '</div>' +
        '<div class="match-scoreboard">' +
          '<span class="team-home">' + teamLink.link(data.home) + '</span>' +
          '<span class="score-home">' + escapeHtml(data.homeScore) + '</span>' +
          '<span class="vs">×</span>' +
          '<span class="score-away">' + escapeHtml(data.awayScore) + '</span>' +
          '<span class="team-away">' + teamLink.link(data.away) + '</span>' +
        '</div>' +
        '<div class="match-status status-' + data.status + '">' +
          escapeHtml(STATUS_LABEL[data.status] || data.status) +
        '</div>' +
        '<div class="match-h2h-link text-center">' +
          teamLink.h2hLink(data.home, data.away, 'ver histórico do confronto') +
        '</div>';
    },

    modelEvents: {
      'change:status change:homeScore change:awayScore': 'render'
    }

  });
}());
