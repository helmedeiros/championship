module.exports = (function () {
  'use strict';

  var escapeHtml = require('./escape_html');

  function link(team, options) {
    if (!team) { return ''; }
    var label = options && options.label ? options.label : team;
    return '<a href="#/times/' + encodeURIComponent(team) + '">' +
      escapeHtml(label) + '</a>';
  }

  function h2hLink(teamA, teamB, label) {
    if (!teamA || !teamB) { return ''; }
    return '<a href="#/h2h/' + encodeURIComponent(teamA) + '/' +
      encodeURIComponent(teamB) + '">' + escapeHtml(label || 'h2h') + '</a>';
  }

  return { link: link, h2hLink: h2hLink };
}());
