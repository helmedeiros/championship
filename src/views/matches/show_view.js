module.exports = (function () {
  'use strict';

  var Marionette = require('backbone.marionette');
  var MatchEvents = require('../../collections/match_events');
  var HeaderView = require('./header_view');
  var TimelineView = require('./timeline_view');
  var BaseModel = require('../../persistence/base_model');

  return Marionette.LayoutView.extend({

    className: 'match-show',

    template: function () {
      return '' +
        '<section class="match-header-region"></section>' +
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
          '</div>' +
        '</div>';
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
    },

    onShow: function () {
      this.getRegion('headerRegion').show(new HeaderView({ model: this.model }));
      this.getRegion('timelineRegion').show(
        new TimelineView({ collection: this.matchEvents })
      );
    }

  });
}());
