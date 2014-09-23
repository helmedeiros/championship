module.exports = (function () {
  'use strict';

  var escapeHtml = require('../helpers/escape_html');

  return function rowTemplate(data) {
    var editHref = data.id ? '#/admin/times/' + encodeURIComponent(data.id) : '#';
    return '' +
      '<td class="team-name">' + escapeHtml(data.name) + '</td>' +
      '<td class="team-short">' + escapeHtml(data.short) + '</td>' +
      '<td class="team-city">' + escapeHtml(data.city) + '</td>' +
      '<td class="team-stadium">' + escapeHtml(data.stadium) + '</td>' +
      '<td class="team-actions">' +
        '<a class="btn btn-default btn-xs" href="' + editHref + '">Editar</a>' +
      '</td>';
  };
}());
