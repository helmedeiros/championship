module.exports = (function () {
  'use strict';

  var Backbone = require('backbone');
  var messages = require('./messages/match');

  return Backbone.Model.extend({

    defaults: {
      home: null,
      away: null,
      kickoff: null,
      stadium: '',
      referee: '',
      status: 'scheduled',
      homeScore: 0,
      awayScore: 0
    },

    validate: function (attrs) {
      if (!attrs.home || !attrs.away) {
        return messages.TEAMS_REQUIRED;
      }
      if (attrs.home === attrs.away) {
        return messages.TEAMS_SAME;
      }
    }

  });
}());
