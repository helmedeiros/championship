module.exports = (function () {
  'use strict';

  var Marionette = require('backbone.marionette');
  var escapeHtml = require('./helpers/escape_html');
  var formatDate = require('./helpers/format_date');
  var Matches = require('../collections/matches');
  var Teams = require('../collections/teams');
  var Championships = require('../collections/championships');

  function countTeams() {
    try {
      var coll = new Teams();
      coll.fetch();
      return coll.length;
    } catch (e) { return 0; }
  }

  function countChampionships() {
    try {
      var coll = new Championships();
      coll.fetch();
      return coll.length;
    } catch (e) { return 0; }
  }

  function pickHighlight() {
    var coll = new Matches();
    try { coll.fetch(); } catch (e) { return null; }
    var live = coll.live();
    if (live.length > 0) {
      return { match: live[0], label: 'AO VIVO' };
    }
    var pending = coll.filter(function (m) {
      var s = m.get('status');
      return s === 'scheduled' || s === 'postponed';
    });
    if (pending.length > 0) {
      pending.sort(function (a, b) {
        var ka = new Date(a.get('kickoff') || 0).getTime();
        var kb = new Date(b.get('kickoff') || 0).getTime();
        return ka - kb;
      });
      return { match: pending[0], label: 'Próxima' };
    }
    return null;
  }

  function recentFinishedHtml() {
    var coll = new Matches();
    try { coll.fetch(); } catch (e) { return ''; }
    var finished = coll.finished();
    if (finished.length === 0) {
      return '<li class="text-muted">Nenhum jogo finalizado.</li>';
    }
    finished.sort(function (a, b) {
      return new Date(b.get('kickoff') || 0).getTime() -
             new Date(a.get('kickoff') || 0).getTime();
    });
    return finished.slice(0, 3).map(function (m) {
      return '<li><a href="#/partidas/' + encodeURIComponent(m.id) + '">' +
        escapeHtml(m.get('home')) +
        ' <strong>' + m.get('homeScore') + ' x ' + m.get('awayScore') +
        '</strong> ' + escapeHtml(m.get('away')) +
      '</a></li>';
    }).join('');
  }

  function highlightHtml() {
    var highlight = pickHighlight();
    if (!highlight) {
      return '<p class="text-muted">Nenhuma partida agendada ainda.</p>';
    }
    var m = highlight.match;
    return '' +
      '<p class="text-muted highlight-label">' + highlight.label + '</p>' +
      '<h4>' +
        '<a href="#/partidas/' + encodeURIComponent(m.id) + '">' +
          escapeHtml(m.get('home')) + ' × ' + escapeHtml(m.get('away')) +
        '</a>' +
      '</h4>' +
      '<p class="text-muted">' +
        escapeHtml(formatDate.formatDateTime(m.get('kickoff')) || '—') +
        (m.get('stadium') ? ' · ' + escapeHtml(m.get('stadium')) : '') +
      '</p>';
  }

  return Marionette.ItemView.extend({

    className: 'home',

    template: function () {
      return '' +
        '<div class="jumbotron">' +
          '<h1>championship</h1>' +
          '<p class="lead">' +
            'Cadastre times, jogadores e campeonatos. Acompanhe partidas ao vivo ' +
            'e consulte o histórico de cada edição.' +
          '</p>' +
        '</div>' +
        '<div class="row home-cards">' +
          '<div class="col-md-4">' +
            '<div class="panel panel-default"><div class="panel-body">' +
              '<h3>Campeonatos <span class="badge home-count-champs">' +
                countChampionships() + '</span></h3>' +
              '<p>Veja a tabela de pontos e o calendário.</p>' +
              '<a class="btn btn-primary" href="#/campeonatos">Ver campeonatos</a>' +
            '</div></div>' +
          '</div>' +
          '<div class="col-md-4">' +
            '<div class="panel panel-default"><div class="panel-body">' +
              '<h3>Times <span class="badge home-count-teams">' +
                countTeams() + '</span></h3>' +
              '<p>Cadastre clubes e seleções.</p>' +
              '<a class="btn btn-primary" href="#/times">Ver times</a>' +
            '</div></div>' +
          '</div>' +
          '<div class="col-md-4">' +
            '<div class="panel panel-default home-highlight">' +
              '<div class="panel-body">' +
                '<h3>Partida em destaque</h3>' +
                highlightHtml() +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="row home-recent">' +
          '<div class="col-md-12">' +
            '<h3>Últimos resultados</h3>' +
            '<ul class="list-unstyled recent-finished">' +
              recentFinishedHtml() +
            '</ul>' +
          '</div>' +
        '</div>';
    }

  });
}());
