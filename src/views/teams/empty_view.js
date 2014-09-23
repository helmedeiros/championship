module.exports = (function () {
  'use strict';

  var Marionette = require('backbone.marionette');

  return Marionette.ItemView.extend({
    tagName: 'tr',
    className: 'teams-empty',
    template: function () {
      return '<td colspan="5" class="text-muted">Nenhum time cadastrado.</td>';
    }
  });
}());
