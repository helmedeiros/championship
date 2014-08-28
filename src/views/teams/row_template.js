module.exports = (function () {
  'use strict';

  function escapeHtml(value) {
    return String(value === null || value === undefined ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  return function rowTemplate(data) {
    return '' +
      '<td class="team-name">' + escapeHtml(data.name) + '</td>' +
      '<td class="team-short">' + escapeHtml(data.short) + '</td>' +
      '<td class="team-city">' + escapeHtml(data.city) + '</td>' +
      '<td class="team-stadium">' + escapeHtml(data.stadium) + '</td>';
  };
}());
