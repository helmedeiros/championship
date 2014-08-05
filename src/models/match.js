module.exports = (function () {
  'use strict';

  var Backbone = require('backbone');
  var messages = require('./messages/match');

  var STATUSES = ['scheduled', 'live', 'half', 'finished', 'postponed'];

  function isKnownStatus(value) {
    var i;
    for (i = 0; i < STATUSES.length; i = i + 1) {
      if (STATUSES[i] === value) { return true; }
    }
    return false;
  }

  return Backbone.Model.extend({

    STATUSES: STATUSES,

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
      if (!isKnownStatus(attrs.status)) {
        return messages.STATUS_UNKNOWN;
      }
    },

    isLive: function () {
      var s = this.get('status');
      return s === 'live' || s === 'half';
    },

    isFinished: function () {
      return this.get('status') === 'finished';
    }

  });
}());
