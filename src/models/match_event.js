module.exports = (function () {
  'use strict';

  var Backbone = require('backbone');
  var messages = require('./messages/match_event');

  return Backbone.Model.extend({

    defaults: {
      type: '',
      half: 1,
      minute: 0,
      player: null,
      text: ''
    },

    validate: function (attrs) {
      if (!attrs.type) {
        return messages.TYPE_REQUIRED;
      }
    }

  });
}());
