module.exports = (function () {
  'use strict';

  var Marionette = require('backbone.marionette');
  var MatchEvents = require('../../collections/match_events');
  var HeaderView = require('./header_view');
  var TimelineView = require('./timeline_view');
  var StatsView = require('./stats_view');
  var BaseModel = require('../../persistence/base_model');
  var crossTab = require('../../live/cross_tab');
  var replay = require('../../live/replay');
  var shareEncode = require('../../share/encode');

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
            scoreboardHref + '">Abrir scoreboard</a> ' +
          '<button class="btn btn-sm btn-info match-replay" ' +
            'data-speed="4">Reviver (4×)</button> ' +
          '<button class="btn btn-sm btn-info match-replay" ' +
            'data-speed="16">Reviver (16×)</button> ' +
          '<button class="btn btn-sm btn-default match-share" ' +
            'aria-label="Copiar link de compartilhamento desta partida">' +
            'Copiar link' +
          '</button>' +
        '</div>' +
        '<ul class="nav nav-tabs match-tabs">' +
          '<li class="active" data-tab="timeline"><a href="#">Linha do tempo</a></li>' +
          '<li data-tab="stats"><a href="#">Estatísticas</a></li>' +
        '</ul>' +
        '<div class="tab-content match-tab-content">' +
          '<div class="tab-pane active" data-pane="timeline">' +
            '<section class="match-timeline-region"></section>' +
          '</div>' +
          '<div class="tab-pane" data-pane="stats" style="display:none">' +
            '<section class="match-stats-region"></section>' +
          '</div>' +
        '</div>' +
        '<aside class="match-meta">' +
          '<p class="text-muted">Campeonato: ' +
            '<strong class="match-championship"></strong></p>' +
          '<p class="text-muted">' +
            '<strong class="events-count-num"></strong> evento(s) registrado(s)' +
          '</p>' +
        '</aside>';
    },

    serializeData: function () {
      return { id: this.model.id };
    },

    regions: {
      headerRegion: '.match-header-region',
      timelineRegion: '.match-timeline-region',
      statsRegion: '.match-stats-region'
    },

    events: {
      'click .match-tabs li': 'onTabClick',
      'click .match-replay':  'onReplay',
      'click .match-share':   'onShare'
    },

    initialize: function (options) {
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
      this.getRegion('statsRegion').show(
        new StatsView({ collection: this.matchEvents, matchEvents: this.matchEvents })
      );
      this._bindLive();
    },

    onTabClick: function (e) {
      if (e && e.preventDefault) { e.preventDefault(); }
      var tab = e.currentTarget.getAttribute('data-tab');
      this.$('.match-tabs li').removeClass('active');
      this.$('.match-tabs li[data-tab="' + tab + '"]').addClass('active');
      this.$('.tab-pane').hide().removeClass('active');
      this.$('.tab-pane[data-pane="' + tab + '"]').show().addClass('active');
    },

    onShare: function (e) {
      if (e && e.preventDefault) { e.preventDefault(); }
      var snapshot = {
        match: this.model.toJSON(),
        events: this.matchEvents.toJSON()
      };
      var token = shareEncode.encode(snapshot);
      var win = typeof window !== 'undefined' ? window : null;
      if (!win || !win.location) { return; }
      var base = win.location.origin + win.location.pathname;
      var url = base + '#/partidas/compartilhada/' + token;
      this.trigger('match:share', url);
      try { win.prompt('Link para compartilhar:', url); } catch (err) {}
    },

    onReplay: function (e) {
      if (e && e.preventDefault) { e.preventDefault(); }
      var speed = parseInt(e.currentTarget.getAttribute('data-speed'), 10) || 4;
      if (this._replayCtl) { this._replayCtl.stop(); }
      var snapshot = this.matchEvents.toJSON();
      this.matchEvents.reset([]);
      var view = this;
      this._replayCtl = replay.play(snapshot, {
        speed: speed,
        minuteDurationMs: 1000,
        onEvent: function (ev) { view.matchEvents.add(ev); },
        onComplete: function () { view._replayCtl = null; }
      });
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
      if (this._replayCtl) { this._replayCtl.stop(); }
    }

  });
}());
