module.exports = (function () {
  'use strict';

  var Marionette = require('backbone.marionette');

  return Marionette.ItemView.extend({
    tagName: 'tr',
    className: 'players-empty',
    template: function () {
      return '<td colspan="6" class="text-muted">Nenhum jogador cadastrado.</td>';
    }
  });
}());
