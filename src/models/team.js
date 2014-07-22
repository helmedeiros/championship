module.exports = (function () {
  'use strict';

  var Backbone = require('backbone');
  var messages = require('./messages/team');

  return Backbone.Model.extend({

    defaults: {
      name: '',
      short: '',
      colors: [],
      stadium: '',
      city: '',
      foundedAt: null
    },

    validate: function (attrs) {
      if (!attrs.name) {
        return messages.NAME_REQUIRED;
      }
    }

  });
}());
