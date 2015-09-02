module.exports = (function () {
  'use strict';

  var Marionette = require('backbone.marionette');
  var escapeHtml = require('../helpers/escape_html');
  var ClassificationTableView = require('../classification/table_view');
  var TopScorersView = require('../stats/top_scorers_view');
  var TopAssistersView = require('../stats/top_assisters_view');
  var CardsLeaderboardView = require('../stats/cards_leaderboard_view');
  var MatchEvents = require('../../collections/match_events');
  var BaseModel = require('../../persistence/base_model');

  var FORMAT_LABELS = {
    'league': 'Pontos corridos',
    'double-round-robin': 'Pontos corridos (ida e volta)',
    'groups-knockout': 'Grupos + mata-mata',
    'knockout': 'Mata-mata'
  };

  return Marionette.LayoutView.extend({

    className: 'championship-show',

    template: function (data) {
      return '' +
        '<header class="page-header">' +
          '<h1>' + escapeHtml(data.name) +
          ' <small>' + escapeHtml(data.season) + ' · ' +
          escapeHtml(data.country) + '</small></h1>' +
          '<p class="format-badge">' +
          escapeHtml(FORMAT_LABELS[data.format] || data.format) +
          '</p>' +
        '</header>' +
        '<section class="classification-region"></section>' +
        '<section class="matches-summary">' +
          '<p class="text-muted">Total de partidas: <strong>' +
          data.totalMatches + '</strong> · finalizadas: <strong>' +
          data.finishedMatches + '</strong></p>' +
        '</section>' +
        '<div class="row">' +
          '<div class="col-md-4">' +
            '<section class="top-scorers-section">' +
              '<h3>Artilheiros</h3>' +
              '<div class="top-scorers-region"></div>' +
            '</section>' +
          '</div>' +
          '<div class="col-md-4">' +
            '<section class="top-assisters-section">' +
              '<h3>Assistências</h3>' +
              '<div class="top-assisters-region"></div>' +
            '</section>' +
          '</div>' +
          '<div class="col-md-4">' +
            '<section class="cards-leaderboard-section">' +
              '<h3>Disciplina</h3>' +
              '<div class="cards-region"></div>' +
            '</section>' +
          '</div>' +
        '</div>';
    },

    regions: {
      classificationRegion: '.classification-region',
      topScorersRegion:     '.top-scorers-region',
      topAssistersRegion:   '.top-assisters-region',
      cardsRegion:          '.cards-region'
    },

    serializeData: function () {
      var matches = this.model.matches();
      var finished = matches.filter(function (m) { return m.isFinished(); });
      return {
        name: this.model.get('name'),
        season: this.model.get('season') || '',
        country: this.model.get('country') || '',
        format: this.model.get('format'),
        totalMatches: matches.length,
        finishedMatches: finished.length
      };
    },

    zonesFor: function (totalRows) {
      // Brasileirão Série A vibe: top 4 → Libertadores, bottom 4 → rebaixamento.
      if (totalRows < 4) { return null; }
      return [
        { fromPos: 1, toPos: Math.min(4, totalRows), cssClass: 'zone-libertadores' },
        {
          fromPos: Math.max(1, totalRows - 3),
          toPos: totalRows,
          cssClass: 'zone-rebaixamento'
        }
      ];
    },

    _loadEventsForChampionship: function () {
      var storage = BaseModel.getStorage();
      if (!storage) { return new MatchEvents(); }
      var champId = this.model.id;
      var matchIds = {};
      storage.list('matches').forEach(function (m) {
        if (m.championship === champId) { matchIds[m.id] = true; }
      });
      var raw = storage.list('match_events').filter(function (e) {
        return matchIds[e.match];
      });
      return new MatchEvents(raw);
    },

    onShow: function () {
      var rows = this.model.classification();
      this.getRegion('classificationRegion').show(
        new ClassificationTableView({
          rows: rows,
          zones: this.zonesFor(rows.length)
        })
      );
      var events = this._loadEventsForChampionship();
      this.getRegion('topScorersRegion').show(
        new TopScorersView({ matchEvents: events })
      );
      this.getRegion('topAssistersRegion').show(
        new TopAssistersView({ matchEvents: events })
      );
      this.getRegion('cardsRegion').show(
        new CardsLeaderboardView({ matchEvents: events })
      );
    }

  });
}());
