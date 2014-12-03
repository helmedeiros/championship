module.exports = (function () {
  'use strict';

  var Marionette = require('backbone.marionette');
  var escapeHtml = require('../helpers/escape_html');

  var ICONS = {
    goal:      '⚽',
    own_goal:  '⚽',
    yellow:    '🟨',
    red:       '🟥',
    sub:       '🔁',
    kickoff:   '⏱',
    half_time: '⏸',
    full_time: '⏹',
    var:       'VAR',
    comment:   '💬'
  };

  var TYPE_LABEL = {
    goal:      'Gol',
    own_goal:  'Gol contra',
    yellow:    'Amarelo',
    red:       'Vermelho',
    sub:       'Substituição',
    kickoff:   'Início',
    half_time: 'Intervalo',
    full_time: 'Fim de jogo',
    var:       'VAR',
    comment:   ''
  };

  return Marionette.ItemView.extend({

    tagName: 'li',
    className: 'event-item',

    template: function (data) {
      var minute = data.minute || 0;
      var half = data.half || 1;
      var label = TYPE_LABEL[data.type] || data.type;
      var icon = ICONS[data.type] || '·';
      return '' +
        '<span class="event-minute">' + minute + '<small>'+ half + 'T</small></span>' +
        '<span class="event-icon" data-type="' + data.type + '">' + icon + '</span>' +
        '<span class="event-body">' +
          (label ? '<strong>' + escapeHtml(label) + '</strong> ' : '') +
          escapeHtml(data.text || '') +
        '</span>';
    }

  });
}());
