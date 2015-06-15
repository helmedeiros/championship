module.exports = (function () {
  'use strict';

  var Marionette = require('backbone.marionette');
  var escapeHtml = require('../helpers/escape_html');

  return Marionette.ItemView.extend({

    className: 'error-view',

    template: function (data) {
      return '<div class="alert alert-danger">' +
        '<h4>' + escapeHtml(data.title) + '</h4>' +
        '<p>' + escapeHtml(data.message) + '</p>' +
        (data.details ?
          '<pre class="error-details">' + escapeHtml(data.details) + '</pre>' :
          '') +
      '</div>';
    },

    initialize: function (options) {
      var opts = options || {};
      this.title = opts.title || 'Ops';
      this.message = opts.message || 'Algo deu errado.';
      this.details = opts.details || '';
    },

    serializeData: function () {
      return { title: this.title, message: this.message, details: this.details };
    }

  });
}());
