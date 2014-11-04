module.exports = (function () {
  'use strict';

  var Marionette = require('backbone.marionette');
  var escapeHtml = require('../helpers/escape_html');
  var ClassificationTableView = require('../classification/table_view');

  var FORMAT_LABELS = {
    'league': 'Pontos corridos',
    'double-round-robin': 'Pontos corridos (ida e volta)',
    'groups-knockout': 'Grupos + mata-mata',
    'knockout': 'Mata-mata'
  };

  return Marionette.LayoutView.extend({

    className: 'championship-show',

    template: function (data) {
      return '' +
        '<header class="page-header">' +
          '<h1>' + escapeHtml(data.name) +
          ' <small>' + escapeHtml(data.season) + ' · ' +
          escapeHtml(data.country) + '</small></h1>' +
          '<p class="format-badge">' +
          escapeHtml(FORMAT_LABELS[data.format] || data.format) +
          '</p>' +
        '</header>' +
        '<section class="classification-region"></section>' +
        '<section class="matches-summary">' +
          '<p class="text-muted">Total de partidas: <strong>' +
          data.totalMatches + '</strong> · finalizadas: <strong>' +
          data.finishedMatches + '</strong></p>' +
        '</section>';
    },

    regions: {
      classificationRegion: '.classification-region'
    },

    serializeData: function () {
      var matches = this.model.matches();
      var finished = matches.filter(function (m) { return m.isFinished(); });
      return {
        name: this.model.get('name'),
        season: this.model.get('season') || '',
        country: this.model.get('country') || '',
        format: this.model.get('format'),
        totalMatches: matches.length,
        finishedMatches: finished.length
      };
    },

    onShow: function () {
      var rows = this.model.classification();
      this.getRegion('classificationRegion').show(
        new ClassificationTableView({ rows: rows })
      );
    }

  });
}());
