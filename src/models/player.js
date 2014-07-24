module.exports = (function () {
  'use strict';

  var Backbone = require('backbone');
  var messages = require('./messages/player');

  return Backbone.Model.extend({

    defaults: {
      name: '',
      nickname: '',
      position: '',
      number: null,
      photo: '',
      birthdate: null,
      nationality: ''
    },

    validate: function (attrs) {
      if (!attrs.name) {
        return messages.NAME_REQUIRED;
      }
    }

  });
}());
