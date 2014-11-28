module.exports = (function () {
  'use strict';

  var Marionette = require('backbone.marionette');

  return Marionette.ItemView.extend({
    tagName: 'tr',
    className: 'matches-empty',
    template: function () {
      return '<td colspan="6" class="text-muted">Nenhuma partida agendada.</td>';
    }
  });
}());
