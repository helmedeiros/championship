module.exports = (function () {
  'use strict';

  var BaseModel = require('../persistence/base_model');
  var messages = require('./messages/squad');

  function contains(list, value) {
    var i;
    for (i = 0; i < list.length; i = i + 1) {
      if (list[i] === value) { return true; }
    }
    return false;
  }

  return BaseModel.extend({

    bucket: 'squads',

    defaults: {
      team: null,
      championship: null,
      players: [],
      captain: null,
      formation: ''
    },

    validate: function (attrs) {
      if (!attrs.team) {
        return messages.TEAM_REQUIRED;
      }
      if (!attrs.championship) {
        return messages.CHAMPIONSHIP_REQUIRED;
      }
      if (attrs.captain && !contains(attrs.players || [], attrs.captain)) {
        return messages.CAPTAIN_NOT_IN_SQUAD;
      }
    },

    has: function (playerId) {
      return contains(this.get('players') || [], playerId);
    },

    setCaptain: function (playerId, options) {
      return this.set('captain', playerId, options);
    }

  });
}());
