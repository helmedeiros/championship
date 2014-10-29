module.exports = (function () {
  'use strict';

  var Marionette = require('backbone.marionette');
  var escapeHtml = require('../helpers/escape_html');

  function dotsFor(results) {
    return (results || []).map(function (r) {
      var color = r === 'W' ? 'green' : r === 'D' ? 'gray' : 'red';
      return '<span class="result-dot result-' + color + '">●</span>';
    }).join('');
  }

  function renderRow(row, idx) {
    var sg = row.goalsFor - row.goalsAgainst;
    return '<tr>' +
      '<td class="pos">' + (idx + 1) + '</td>' +
      '<td class="team">' + escapeHtml(row.team) + '</td>' +
      '<td class="p">' + row.points + '</td>' +
      '<td class="j">' + row.played + '</td>' +
      '<td class="v">' + row.wins + '</td>' +
      '<td class="e">' + row.draws + '</td>' +
      '<td class="d">' + row.losses + '</td>' +
      '<td class="gp">' + row.goalsFor + '</td>' +
      '<td class="gc">' + row.goalsAgainst + '</td>' +
      '<td class="sg">' + (sg > 0 ? '+' : '') + sg + '</td>' +
      '<td class="pct">' + row.percentage + '</td>' +
      '<td class="ultimos">' + dotsFor(row.recentResults) + '</td>' +
    '</tr>';
  }

  return Marionette.ItemView.extend({

    tagName: 'table',
    className: 'table table-striped classification-table',

    template: function (data) {
      var head = '<thead><tr>' +
        '<th>#</th><th>CLASSIFICAÇÃO</th>' +
        '<th>P</th><th>J</th><th>V</th><th>E</th><th>D</th>' +
        '<th>GP</th><th>GC</th><th>SG</th><th>%</th>' +
        '<th>ÚLTIMOS JOGOS</th>' +
      '</tr></thead>';
      var rows = (data.rows || []).map(renderRow).join('');
      return head + '<tbody>' + rows + '</tbody>';
    },

    serializeData: function () {
      return { rows: this.options.rows || [] };
    }

  });
}());
