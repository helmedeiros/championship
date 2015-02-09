module.exports = (function () {
  'use strict';

  var Marionette = require('backbone.marionette');
  var escapeHtml = require('../helpers/escape_html');
  var MatchEvent = require('../../models/match_event');
  var MatchEvents = require('../../collections/match_events');
  var BaseModel = require('../../persistence/base_model');

  function loadEvents(matchId) {
    var storage = BaseModel.getStorage();
    if (!storage) { return new MatchEvents(); }
    return new MatchEvents(
      storage.list('match_events').filter(function (e) { return e.match === matchId; })
    );
  }

  return Marionette.ItemView.extend({

    className: 'scorer',

    template: function (data) {
      return '' +
        '<div class="scorer-board well">' +
          '<span class="team-home">' + escapeHtml(data.home) + '</span> ' +
          '<strong class="score-home">' + escapeHtml(data.homeScore) + '</strong>' +
          ' × ' +
          '<strong class="score-away">' + escapeHtml(data.awayScore) + '</strong> ' +
          '<span class="team-away">' + escapeHtml(data.away) + '</span> ' +
          '<span class="badge status-' + data.status + '">' + data.status + '</span>' +
        '</div>' +
        '<div class="scorer-clock">' +
          '<button class="btn btn-default btn-xs tick-minute">+1 min</button> ' +
          '<span class="minute-display">' +
            escapeHtml(data.halfCounter) + 'T · ' +
            escapeHtml(data.minuteCounter) + '\'' +
          '</span>' +
        '</div>' +
        '<div class="scorer-status btn-group">' +
          '<button class="btn btn-default" data-status="live">Iniciar 1T</button>' +
          '<button class="btn btn-default" data-status="half">Intervalo</button>' +
          '<button class="btn btn-default" data-status="live">Iniciar 2T</button>' +
          '<button class="btn btn-default" data-status="finished">Encerrar</button>' +
        '</div>' +
        '<div class="scorer-goals">' +
          '<input type="text" class="form-control player-input" ' +
                 'placeholder="Autor do gol (opcional)">' +
          '<button class="btn btn-success goal-home">+ Gol mandante</button> ' +
          '<button class="btn btn-success goal-away">+ Gol visitante</button>' +
        '</div>' +
        '<div class="scorer-cards">' +
          '<button class="btn btn-warning yellow-home">Amarelo M</button> ' +
          '<button class="btn btn-warning yellow-away">Amarelo V</button> ' +
          '<button class="btn btn-danger red-home">Vermelho M</button> ' +
          '<button class="btn btn-danger red-away">Vermelho V</button>' +
        '</div>' +
        '<div class="scorer-sub">' +
          '<input type="text" class="form-control sub-in" ' +
                 'placeholder="Entra">' +
          '<input type="text" class="form-control sub-out" ' +
                 'placeholder="Sai">' +
          '<button class="btn btn-info sub-confirm">Substituição</button>' +
        '</div>' +
        '<div class="scorer-comment">' +
          '<div class="input-group">' +
            '<input type="text" class="form-control comment-input" ' +
                   'placeholder="Comentário ao vivo (Enter)">' +
            '<span class="input-group-btn">' +
              '<button class="btn btn-primary comment-send">Enviar</button>' +
            '</span>' +
          '</div>' +
        '</div>';
    },

    events: {
      'click .scorer-status button': 'onStatus',
      'click .goal-home':   'goalHome',
      'click .goal-away':   'goalAway',
      'click .yellow-home': 'yellowHome',
      'click .yellow-away': 'yellowAway',
      'click .red-home':    'redHome',
      'click .red-away':    'redAway',
      'click .sub-confirm': 'sendSub',
      'click .tick-minute': 'tickMinute',
      'click .comment-send': 'sendComment',
      'keypress .comment-input': 'commentKey'
    },

    serializeData: function () {
      return {
        home: this.model.get('home'),
        away: this.model.get('away'),
        homeScore: this.model.get('homeScore'),
        awayScore: this.model.get('awayScore'),
        status: this.model.get('status'),
        minuteCounter: this.minuteCounter,
        halfCounter: this.halfCounter
      };
    },

    tickMinute: function () {
      this.minuteCounter = this.minuteCounter + 1;
      this.render();
    },

    modelEvents: {
      'change': 'render'
    },

    initialize: function () {
      this.matchEvents = loadEvents(this.model.id);
      this.minuteCounter = 0;
      this.halfCounter = 1;
    },

    _addEvent: function (type, text, player) {
      var ev = new MatchEvent({
        type: type,
        half: this.halfCounter,
        minute: this.minuteCounter,
        text: text || '',
        player: player || null,
        match: this.model.id
      });
      ev.save();
      this.matchEvents.add(ev);
      this.trigger('scorer:event', ev);
    },

    _consumePlayer: function () {
      var input = this.$('.player-input');
      var value = input.val() || '';
      input.val('');
      return value || null;
    },

    onStatus: function (e) {
      var status = e.currentTarget.getAttribute('data-status');
      this.model.save({ status: status });
      if (status === 'live' && this.halfCounter < 2 &&
          $(e.currentTarget).text().match(/2T/)) {
        this.halfCounter = 2;
        this.minuteCounter = 0;
        this._addEvent('kickoff', 'Início do 2º tempo');
      } else if (status === 'live') {
        this._addEvent('kickoff', 'Início do 1º tempo');
      } else if (status === 'half') {
        this._addEvent('half_time', 'Fim do 1º tempo');
      } else if (status === 'finished') {
        this._addEvent('full_time', 'Fim de jogo');
      }
    },

    goalHome: function () {
      var player = this._consumePlayer();
      this.model.save({ homeScore: this.model.get('homeScore') + 1 });
      var text = player ?
        'Gol do mandante: ' + player :
        'Gol do mandante';
      this._addEvent('goal', text, player);
    },

    goalAway: function () {
      var player = this._consumePlayer();
      this.model.save({ awayScore: this.model.get('awayScore') + 1 });
      var text = player ?
        'Gol do visitante: ' + player :
        'Gol do visitante';
      this._addEvent('goal', text, player);
    },

    yellowHome: function () { this._addEvent('yellow', 'Amarelo no mandante'); },
    yellowAway: function () { this._addEvent('yellow', 'Amarelo no visitante'); },
    redHome:    function () { this._addEvent('red',    'Vermelho no mandante'); },
    redAway:    function () { this._addEvent('red',    'Vermelho no visitante'); },

    sendComment: function () {
      var text = this.$('.comment-input').val();
      if (!text) { return; }
      this._addEvent('comment', text);
      this.$('.comment-input').val('');
    },

    sendSub: function () {
      var incoming = this.$('.sub-in').val() || '';
      var outgoing = this.$('.sub-out').val() || '';
      if (!incoming && !outgoing) { return; }
      this.$('.sub-in').val('');
      this.$('.sub-out').val('');
      this._addEvent('sub',
        'Entra ' + (incoming || '?') + ', sai ' + (outgoing || '?'),
        incoming || null);
    },

    commentKey: function (e) {
      if (e.which === 13) { this.sendComment(); }
    }

  });
}());
