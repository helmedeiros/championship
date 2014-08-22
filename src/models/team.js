module.exports = (function () {
  'use strict';

  var BaseModel = require('../persistence/base_model');
  var messages = require('./messages/team');

  return BaseModel.extend({

    bucket: 'teams',

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
