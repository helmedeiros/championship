module.exports = (function () {
  'use strict';

  var Marionette = require('backbone.marionette');
  var escapeHtml = require('../helpers/escape_html');
  var Matches = require('../../collections/matches');
  var sparkline = require('../helpers/sparkline');

  function statCol(label, value) {
    return '<div class="col-md-2"><h4>' + label + '</h4>' +
      '<p class="stat">' + value + '</p></div>';
  }

  function summarize(matches, teamId) {
    var played = 0;
    var wins = 0;
    var draws = 0;
    var losses = 0;
    var goalsFor = 0;
    var goalsAgainst = 0;
    var recent = [];
    matches.forEach(function (m) {
      if (m.get('status') !== 'finished') { return; }
      played = played + 1;
      var home = m.get('home') === teamId;
      var gf = home ? m.get('homeScore') : m.get('awayScore');
      var ga = home ? m.get('awayScore') : m.get('homeScore');
      goalsFor = goalsFor + gf;
      goalsAgainst = goalsAgainst + ga;
      if (gf > ga) { wins = wins + 1; recent.push('W'); }
      else if (gf < ga) { losses = losses + 1; recent.push('L'); }
      else { draws = draws + 1; recent.push('D'); }
    });
    if (recent.length > 10) { recent = recent.slice(-10); }
    return {
      played: played, wins: wins, draws: draws, losses: losses,
      goalsFor: goalsFor, goalsAgainst: goalsAgainst,
      points: wins * 3 + draws,
      recent: recent
    };
  }

  return Marionette.ItemView.extend({

    className: 'team-profile',

    template: function (data) {
      return '' +
        '<header class="page-header">' +
          '<h1>' + escapeHtml(data.name) +
            ' <small>' + escapeHtml(data.city || '') + '</small></h1>' +
          '<p class="text-muted">' +
            (data.stadium ? 'Estádio: ' + escapeHtml(data.stadium) + ' · ' : '') +
            (data.foundedAt ? 'Fundado em ' + escapeHtml(data.foundedAt) : '') +
          '</p>' +
        '</header>' +
        '<div class="row team-stats">' +
          statCol('Jogos', data.stats.played) +
          statCol('Vitórias', data.stats.wins) +
          statCol('Empates', data.stats.draws) +
          statCol('Derrotas', data.stats.losses) +
          statCol('Pontos', data.stats.points) +
          statCol('SG', data.stats.goalsFor - data.stats.goalsAgainst) +
        '</div>' +
        '<section class="recent-results">' +
          '<h3>Últimos resultados</h3>' +
          '<div class="recent-dots">' +
            (data.stats.recent.length ?
              sparkline.render(data.stats.recent, { size: 14, gap: 6 }) :
              '<span class="text-muted">sem partidas finalizadas</span>') +
          '</div>' +
        '</section>';
    },

    serializeData: function () {
      var teamId = this.model.id;
      var coll = new Matches();
      try { coll.fetch(); } catch (e) {}
      var team = coll.byTeam(teamId);
      return {
        name: this.model.get('name') || teamId,
        city: this.model.get('city'),
        stadium: this.model.get('stadium'),
        foundedAt: this.model.get('foundedAt'),
        stats: summarize(team, teamId)
      };
    }

  });
}());
