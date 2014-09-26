module.exports = (function () {
  'use strict';

  var escapeHtml = require('../helpers/escape_html');

  return function rowTemplate(data) {
    var number = (data.number === null || data.number === undefined) ?
      '–' : escapeHtml(data.number);
    var photoCell = data.photo ?
      '<img class="player-photo" src="' + data.photo + '" alt="" width="32">' :
      '<span class="player-photo-empty text-muted">—</span>';
    return '' +
      '<td class="player-number">' + number + '</td>' +
      '<td class="player-photo-cell">' + photoCell + '</td>' +
      '<td class="player-name">' + escapeHtml(data.name) + '</td>' +
      '<td class="player-nickname">' + escapeHtml(data.nickname) + '</td>' +
      '<td class="player-position">' + escapeHtml(data.position) + '</td>' +
      '<td class="player-nationality">' + escapeHtml(data.nationality) + '</td>';
  };
}());
