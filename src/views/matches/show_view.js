module.exports = (function () {
  'use strict';

  var Marionette = require('backbone.marionette');
  var MatchEvents = require('../../collections/match_events');
  var HeaderView = require('./header_view');
  var TimelineView = require('./timeline_view');
  var BaseModel = require('../../persistence/base_model');
  var crossTab = require('../../live/cross_tab');

  return Marionette.LayoutView.extend({

    className: 'match-show',

    template: function (data) {
      var scoreboardHref = data.id ?
        '#/admin/partidas/' + encodeURIComponent(data.id) + '/scoreboard' :
        '#';
      return '' +
        '<section class="match-header-region"></section>' +
        '<div class="match-toolbar">' +
          '<a class="btn btn-sm btn-default match-open-scorer" href="' +
            scoreboardHref + '">Abrir scoreboard</a>' +
        '</div>' +
        '<div class="row">' +
          '<div class="col-md-8">' +
            '<h3>Linha do tempo</h3>' +
            '<section class="match-timeline-region"></section>' +
          '</div>' +
          '<div class="col-md-4">' +
            '<h3>Resumo</h3>' +
            '<p class="text-muted match-meta">' +
              'Campeonato: <strong class="match-championship"></strong>' +
            '</p>' +
            '<p class="text-muted match-events-count">' +
              '<strong class="events-count-num"></strong> evento(s) registrado(s)' +
            '</p>' +
          '</div>' +
        '</div>';
    },

    serializeData: function () {
      return { id: this.model.id };
    },

    regions: {
      headerRegion: '.match-header-region',
      timelineRegion: '.match-timeline-region'
    },

    initialize: function (options) {
      // Cuidado: não use `this.events` — Backbone.View já reserva esse nome
      // para o hash de eventos do DOM.
      this.matchEvents = (options && options.matchEvents) || this._loadEvents();
    },

    _loadEvents: function () {
      var storage = BaseModel.getStorage();
      if (!storage) { return new MatchEvents(); }
      var matchId = this.model.id;
      var raw = storage.list('match_events').filter(function (e) {
        return e.match === matchId;
      });
      return new MatchEvents(raw);
    },

    onRender: function () {
      this.$('.match-championship').text(this.model.get('championship') || '—');
      this.$('.events-count-num').text(this.matchEvents.length);
    },

    onShow: function () {
      this.getRegion('headerRegion').show(new HeaderView({ model: this.model }));
      this.getRegion('timelineRegion').show(
        new TimelineView({ collection: this.matchEvents })
      );
      this._bindLive();
    },

    _bindLive: function () {
      var view = this;
      var win = typeof window !== 'undefined' ? window : null;
      if (!win) { return; }
      this._unbindLive = crossTab.bind(win, 'championship', function (change) {
        if (change.bucket !== 'match_events') { return; }
        var fresh = view._loadEvents();
        view.matchEvents.reset(fresh.toJSON());
      });
    },

    onDestroy: function () {
      if (this._unbindLive) { this._unbindLive(); }
    }

  });
}());
