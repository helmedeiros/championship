module.exports = (function () {
  'use strict';

  var Marionette = require('backbone.marionette');
  var escapeHtml = require('../helpers/escape_html');

  return Marionette.ItemView.extend({

    className: 'loading-view text-center',

    template: function (data) {
      return '<div class="loading-indicator">' +
        '<span class="loading-spinner">⏳</span> ' +
        '<span class="loading-label">' + escapeHtml(data.label) + '</span>' +
      '</div>';
    },

    initialize: function (options) {
      this.label = (options && options.label) || 'Carregando...';
    },

    serializeData: function () {
      return { label: this.label };
    }

  });
}());
