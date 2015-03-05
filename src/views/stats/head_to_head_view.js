module.exports = (function () {
  'use strict';

  var Marionette = require('backbone.marionette');
  var escapeHtml = require('../helpers/escape_html');
  var formatDate = require('../helpers/format_date');
  var h2h = require('../../stats/head_to_head');
  var Matches = require('../../collections/matches');

  return Marionette.ItemView.extend({

    className: 'head-to-head',

    initialize: function (options) {
      var opts = options || {};
      this.teamA = opts.teamA;
      this.teamB = opts.teamB;
      this.collection = opts.matches || null;
    },

    template: function (data) {
      var matchesHtml = data.summary.matches.map(function (m) {
        return '<li>' + escapeHtml(formatDate.formatDate(m.kickoff) || '?') +
          ' · ' + escapeHtml(m.home) + ' <strong>' + m.homeScore + ' x ' +
          m.awayScore + '</strong> ' + escapeHtml(m.away) + '</li>';
      }).join('');
      if (!matchesHtml) {
        matchesHtml = '<li class="text-muted">Nenhum confronto finalizado.</li>';
      }
      return '<header class="page-header"><h2>' +
          escapeHtml(data.teamA) + ' × ' + escapeHtml(data.teamB) +
        '</h2></header>' +
        '<div class="row h2h-summary">' +
          '<div class="col-md-3"><h4>Jogos</h4><p class="stat">' +
            data.summary.total + '</p></div>' +
          '<div class="col-md-3"><h4>' + escapeHtml(data.teamA) + '</h4>' +
            '<p class="stat">' + data.summary.winsA + ' V · ' +
            data.summary.goalsA + ' GP</p></div>' +
          '<div class="col-md-3"><h4>' + escapeHtml(data.teamB) + '</h4>' +
            '<p class="stat">' + data.summary.winsB + ' V · ' +
            data.summary.goalsB + ' GP</p></div>' +
          '<div class="col-md-3"><h4>Empates</h4><p class="stat">' +
            data.summary.draws + '</p></div>' +
        '</div>' +
        '<section class="h2h-matches">' +
          '<h3>Confrontos</h3>' +
          '<ul class="list-unstyled">' + matchesHtml + '</ul>' +
        '</section>';
    },

    serializeData: function () {
      var coll = this.collection;
      if (!coll) {
        coll = new Matches();
        try { coll.fetch(); } catch (e) {}
      }
      return {
        teamA: this.teamA,
        teamB: this.teamB,
        summary: h2h.summary(coll, this.teamA, this.teamB)
      };
    }

  });
}());
