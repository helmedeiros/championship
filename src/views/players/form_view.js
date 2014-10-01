module.exports = (function () {
  'use strict';

  var Marionette = require('backbone.marionette');
  var template = require('./form_template');
  var escapeHtml = require('../helpers/escape_html');

  return Marionette.ItemView.extend({

    template: template,

    events: {
      'submit form.player-form': 'onSubmit',
      'click .cancel':           'onCancel'
    },

    onSubmit: function (e) {
      if (e && e.preventDefault) { e.preventDefault(); }
      var rawNumber = this.$('input[name="number"]').val();
      var number = rawNumber === '' ? null : parseInt(rawNumber, 10);
      var attrs = {
        name:        this.$('input[name="name"]').val(),
        nickname:    this.$('input[name="nickname"]').val(),
        number:      number,
        position:    this.$('select[name="position"]').val(),
        nationality: this.$('input[name="nationality"]').val()
      };
      if (!this.model.set(attrs, { validate: true })) {
        this.showError(this.model.validationError);
        this.trigger('form:invalid', this.model.validationError);
        return false;
      }
      this.clearError();
      this.model.save();
      this.trigger('form:saved', this.model);
      return true;
    },

    onCancel: function () {
      this.trigger('form:cancel');
    },

    showError: function (message) {
      this.clearError();
      this.$('form.player-form').prepend(
        '<div class="alert alert-danger form-error-banner">' +
          escapeHtml(message) +
        '</div>'
      );
    },

    clearError: function () {
      this.$('.form-error-banner').remove();
    }

  });
}());
