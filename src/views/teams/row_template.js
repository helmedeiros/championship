module.exports = (function () {
  'use strict';

  var escapeHtml = require('../helpers/escape_html');

  return function rowTemplate(data) {
    var editHref = data.id ? '#/admin/times/' + encodeURIComponent(data.id) : '#';
    var showHref = data.id ? '#/times/' + encodeURIComponent(data.id) : '#';
    var nameHtml = data.id ?
      '<a href="' + showHref + '">' + escapeHtml(data.name) + '</a>' :
      escapeHtml(data.name);
    return '' +
      '<td class="team-name">' + nameHtml + '</td>' +
      '<td class="team-short">' + escapeHtml(data.short) + '</td>' +
      '<td class="team-city">' + escapeHtml(data.city) + '</td>' +
      '<td class="team-stadium">' + escapeHtml(data.stadium) + '</td>' +
      '<td class="team-actions">' +
        '<a class="btn btn-default btn-xs team-action-edit" href="' + editHref + '">' +
          'Editar' +
        '</a> ' +
        '<button type="button" class="btn btn-danger btn-xs team-action-delete">' +
          'Excluir' +
        '</button>' +
      '</td>';
  };
}());
