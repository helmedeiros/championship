module.exports = (function () {
  'use strict';

  var Marionette = require('backbone.marionette');
  var template = require('./form_template');
  var escapeHtml = require('../helpers/escape_html');

  return Marionette.ItemView.extend({

    template: template,

    events: {
      'submit form.championship-form': 'onSubmit',
      'click .cancel': 'onCancel'
    },

    initialize: function (options) {
      var opts = options || {};
      this.availableTeams = opts.availableTeams || [];
    },

    serializeData: function () {
      return {
        name: this.model.get('name') || '',
        season: this.model.get('season'),
        country: this.model.get('country') || '',
        format: this.model.get('format') || 'league',
        startDate: this.model.get('startDate') || '',
        teamIds: this.model.get('teamIds') || [],
        availableTeams: this.availableTeams
      };
    },

    onSubmit: function (e) {
      if (e && e.preventDefault) { e.preventDefault(); }
      var checked = this.$('input[name="teamIds"]:checked').map(function () {
        return this.value;
      }).get();
      var rawSeason = this.$('input[name="season"]').val();
      var attrs = {
        name:    this.$('input[name="name"]').val(),
        season:  rawSeason === '' ? null : parseInt(rawSeason, 10),
        country: this.$('input[name="country"]').val(),
        format:  this.$('input[name="format"]:checked').val() || 'league'
      };
      if (!this.model.set(attrs, { validate: true })) {
        this.showError(this.model.validationError);
        this.trigger('form:invalid', this.model.validationError);
        return false;
      }
      this.clearError();
      this.model.save();
      this.trigger('form:saved', this.model, {
        teamIds: checked,
        startDate: this.$('input[name="startDate"]').val()
      });
      return true;
    },

    onCancel: function () { this.trigger('form:cancel'); },

    showError: function (message) {
      this.clearError();
      this.$('form.championship-form').prepend(
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
