module.exports = (function () {
  'use strict';

  var Marionette = require('backbone.marionette');
  var escapeHtml = require('../helpers/escape_html');

  var TYPE_TO_CLASS = {
    success: 'alert-success',
    info:    'alert-info',
    warning: 'alert-warning',
    error:   'alert-danger',
    danger:  'alert-danger'
  };

  return Marionette.ItemView.extend({

    className: 'flash-banner',

    template: function (data) {
      var cls = TYPE_TO_CLASS[data.type] || 'alert-info';
      return '<div class="alert ' + cls + '" role="alert">' +
        '<button type="button" class="close flash-dismiss" aria-label="fechar">' +
          '&times;' +
        '</button>' +
        escapeHtml(data.message) +
      '</div>';
    },

    events: {
      'click .flash-dismiss': 'dismiss'
    },

    initialize: function (options) {
      var opts = options || {};
      this.message = opts.message || '';
      this.type = opts.type || 'info';
      this.timeoutMs = opts.timeoutMs === undefined ? 3000 : opts.timeoutMs;
    },

    serializeData: function () {
      return { message: this.message, type: this.type };
    },

    onShow: function () {
      if (this.timeoutMs > 0) {
        var view = this;
        this._timer = setTimeout(function () { view.dismiss(); }, this.timeoutMs);
      }
    },

    dismiss: function () {
      if (this._timer) {
        clearTimeout(this._timer);
        this._timer = null;
      }
      this.trigger('flash:dismissed');
      if (this.$el) { this.$el.remove(); }
    }

  });
}());
