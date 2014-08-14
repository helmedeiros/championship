module.exports = (function () {
  'use strict';

  var Backbone = require('backbone');
  var messages = require('./messages/squad');

  return Backbone.Model.extend({

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
    },

    has: function (playerId) {
      var players = this.get('players') || [];
      var i;
      for (i = 0; i < players.length; i = i + 1) {
        if (players[i] === playerId) { return true; }
      }
      return false;
    }

  });
}());
