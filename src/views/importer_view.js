module.exports = (function () {
  'use strict';

  var Marionette = require('backbone.marionette');
  var escapeHtml = require('./helpers/escape_html');
  var importer = require('../importer/importer');
  var worldCup = require('../data/world_cup_2014');
  var brasileirao = require('../data/brasileirao_2014');

  var FIXTURES = [
    { id: 'world-cup-2014', label: 'Copa do Mundo 2014', data: worldCup },
    { id: 'brasileirao-2014', label: 'Brasileirão Série A 2014', data: brasileirao }
  ];

  return Marionette.ItemView.extend({

    className: 'importer',

    template: function () {
      var cards = FIXTURES.map(function (f) {
        return '<div class="col-md-6">' +
          '<div class="panel panel-default"><div class="panel-body">' +
            '<h3>' + escapeHtml(f.label) + '</h3>' +
            '<p>id: <code>' + escapeHtml(f.id) + '</code> · times: ' +
              f.data.teams.length + ' · partidas: ' + f.data.matches.length +
            '</p>' +
            '<button class="btn btn-primary import-btn" ' +
                   'data-fixture="' + escapeHtml(f.id) + '">' +
              'Importar' +
            '</button>' +
          '</div></div>' +
        '</div>';
      }).join('');
      return '<header class="page-header">' +
          '<h1>Importar dados de exemplo</h1>' +
          '<p class="text-muted">' +
            'Carrega um conjunto pronto de campeonato, times e partidas no ' +
            '<code>localStorage</code>. Útil para popular a aplicação ' +
            'rapidamente para demonstração.' +
          '</p>' +
        '</header>' +
        '<div class="row">' + cards + '</div>' +
        '<div class="importer-result"></div>';
    },

    events: {
      'click .import-btn': 'onImport'
    },

    onImport: function (e) {
      if (e && e.preventDefault) { e.preventDefault(); }
      var id = e.currentTarget.getAttribute('data-fixture');
      var fixture = FIXTURES.filter(function (f) { return f.id === id; })[0];
      if (!fixture) { return; }
      try {
        var summary = importer.importFixture(fixture.data);
        this.showSuccess(fixture.label, summary);
        this.trigger('importer:done', summary);
      } catch (err) {
        this.showError(err);
      }
    },

    showSuccess: function (label, summary) {
      this.$('.importer-result').html(
        '<div class="alert alert-success">' +
          '<strong>' + escapeHtml(label) + ' importado.</strong> ' +
          summary.teamsCount + ' times, ' +
          summary.matchesCount + ' partidas, ' +
          summary.eventsCount + ' eventos · ' +
          '<a href="#/campeonatos/' + encodeURIComponent(summary.championship.id) +
          '">ver campeonato</a>' +
        '</div>'
      );
    },

    showError: function (err) {
      var details = (err.errors || []).map(function (e) {
        return e.path + ' ' + e.message;
      }).join('<br>') || escapeHtml(err.message);
      this.$('.importer-result').html(
        '<div class="alert alert-danger">' +
          '<strong>Falha na importação:</strong><br>' +
          details +
        '</div>'
      );
    }

  });
}());
