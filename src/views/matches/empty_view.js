module.exports = (function () {
  'use strict';

  var Marionette = require('backbone.marionette');
  var i18n = require('../../i18n');

  return Marionette.ItemView.extend({
    tagName: 'tr',
    className: 'matches-empty',
    template: function () {
      return '<td colspan="6" class="text-muted" role="status">' +
        i18n.t('common.empty') + '</td>';
    }
  });
}());
