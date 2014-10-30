module.exports = (function () {
  'use strict';

  var Marionette = require('backbone.marionette');

  return Marionette.ItemView.extend({
    tagName: 'tr',
    className: 'championships-empty',
    template: function () {
      return '<td colspan="4" class="text-muted">Nenhum campeonato cadastrado.</td>';
    }
  });
}());
