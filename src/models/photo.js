module.exports = (function () {
  'use strict';

  var BaseModel = require('../persistence/base_model');
  var messages = require('./messages/photo');

  var OWNER_TYPES = ['team', 'player', 'match', 'championship'];

  function contains(list, value) {
    var i;
    for (i = 0; i < list.length; i = i + 1) {
      if (list[i] === value) { return true; }
    }
    return false;
  }

  return BaseModel.extend({

    bucket: 'photos',

    OWNER_TYPES: OWNER_TYPES,

    defaults: {
      ownerType: 'team',
      ownerId: null,
      url: '',
      caption: '',
      tags: []
    },

    validate: function (attrs) {
      if (!attrs.url) {
        return messages.URL_REQUIRED;
      }
      if (!contains(OWNER_TYPES, attrs.ownerType)) {
        return messages.OWNER_TYPE_UNKNOWN;
      }
    }

  });
}());
