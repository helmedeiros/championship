module.exports = (function () {
  'use strict';

  var BaseModel = require('../persistence/base_model');
  var messages = require('./messages/championship');

  var FORMATS = ['league', 'double-round-robin', 'groups-knockout', 'knockout'];

  function isKnownFormat(value) {
    var i;
    for (i = 0; i < FORMATS.length; i = i + 1) {
      if (FORMATS[i] === value) { return true; }
    }
    return false;
  }

  return BaseModel.extend({

    bucket: 'championships',

    FORMATS: FORMATS,

    defaults: {
      name: '',
      season: null,
      country: '',
      format: 'league',
      tiebreakers: ['points', 'wins', 'goal_diff', 'goals_for', 'head_to_head']
    },

    validate: function (attrs) {
      if (!attrs.name) {
        return messages.NAME_REQUIRED;
      }
      if (!attrs.season) {
        return messages.SEASON_REQUIRED;
      }
      if (!isKnownFormat(attrs.format)) {
        return messages.FORMAT_UNKNOWN;
      }
    }

  });
}());
