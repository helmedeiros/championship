module.exports = (function () {
  'use strict';

  var Marionette = require('backbone.marionette');
  var escapeHtml = require('../helpers/escape_html');

  var FORMAT_LABELS = {
    'league': 'Pontos corridos',
    'double-round-robin': 'Pontos corridos (ida e volta)',
    'groups-knockout': 'Grupos + mata-mata',
    'knockout': 'Mata-mata'
  };

  return Marionette.ItemView.extend({

    tagName: 'tr',
    className: 'championship-row',

    template: function (data) {
      var showHref = data.id ? '#/campeonatos/' + encodeURIComponent(data.id) : '#';
      return '' +
        '<td class="championship-name">' +
          '<a href="' + showHref + '">' + escapeHtml(data.name) + '</a>' +
        '</td>' +
        '<td class="championship-season">' + escapeHtml(data.season) + '</td>' +
        '<td class="championship-country">' + escapeHtml(data.country) + '</td>' +
        '<td class="championship-format">' +
          escapeHtml(FORMAT_LABELS[data.format] || data.format) +
        '</td>';
    }

  });
}());
