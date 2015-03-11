module.exports = (function () {
  'use strict';

  var Marionette = require('backbone.marionette');
  var escapeHtml = require('../helpers/escape_html');
  var sparkline = require('../helpers/sparkline');

  function dotsFor(results) {
    return sparkline.render(results, { size: 9, gap: 3 });
  }

  function zoneFor(zones, position) {
    if (!zones) { return ''; }
    var i;
    for (i = 0; i < zones.length; i = i + 1) {
      if (position >= zones[i].fromPos && position <= zones[i].toPos) {
        return zones[i].cssClass;
      }
    }
    return '';
  }

  function renderRow(row, idx, zones, total) {
    var position = idx + 1;
    var sg = row.goalsFor - row.goalsAgainst;
    var zoneCls = zoneFor(zones, position);
    var trophy = (position === 1 && total > 1 && row.played > 0) ?
      ' <span class="trophy" title="Líder">🏆</span>' : '';
    return '<tr class="' + zoneCls + '">' +
      '<td class="pos">' + position + '</td>' +
      '<td class="team">' + escapeHtml(row.team) + trophy + '</td>' +
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
      var zones = data.zones;
      var total = (data.rows || []).length;
      var rows = (data.rows || []).map(function (row, idx) {
        return renderRow(row, idx, zones, total);
      }).join('');
      return head + '<tbody>' + rows + '</tbody>';
    },

    serializeData: function () {
      return {
        rows: this.options.rows || [],
        zones: this.options.zones || null
      };
    }

  });
}());
