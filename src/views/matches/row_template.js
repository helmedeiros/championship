module.exports = (function () {
  'use strict';

  var escapeHtml = require('../helpers/escape_html');
  var formatDate = require('../helpers/format_date');
  var STATUS_LABEL = require('./status_labels').SHORT;

  function scoreBlock(data) {
    if (data.status === 'scheduled' || data.status === 'postponed') {
      var label = escapeHtml(formatDate.formatDateTime(data.kickoff));
      return '<span class="kickoff">' + label + '</span>';
    }
    return '<span class="score">' +
      escapeHtml(data.homeScore) + ' x ' + escapeHtml(data.awayScore) +
      '</span>';
  }

  function roundBadge(data) {
    if (!data.round) { return ''; }
    var label = data.group ?
      escapeHtml(data.group) + ' · R' + data.round :
      'Rodada ' + data.round;
    return '<small class="text-muted match-round">' + label + '</small>';
  }

  return function rowTemplate(data) {
    var showHref = data.id ? '#/partidas/' + encodeURIComponent(data.id) : '#';
    var statusBadge = STATUS_LABEL[data.status] || '';
    return '' +
      '<td class="match-home">' +
        escapeHtml(data.home) +
        (data.round ? ' ' + roundBadge(data) : '') +
      '</td>' +
      '<td class="match-score">' + scoreBlock(data) + '</td>' +
      '<td class="match-away">' + escapeHtml(data.away) + '</td>' +
      '<td class="match-stadium">' + escapeHtml(data.stadium || '') + '</td>' +
      '<td class="match-status">' +
        (statusBadge ?
          '<span class="badge status-' + data.status + '">' + statusBadge + '</span>'
          : '') +
      '</td>' +
      '<td class="match-actions">' +
        '<a class="btn btn-default btn-xs" href="' + showHref + '">Detalhes</a>' +
      '</td>';
  };
}());
