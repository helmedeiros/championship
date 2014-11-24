module.exports = (function () {
  'use strict';

  var BaseCollection = require('../persistence/base_collection');
  var Match = require('../models/match');

  return BaseCollection.extend({

    model: Match,

    comparator: function (match) {
      var kickoff = match.get('kickoff');
      if (!kickoff) {
        return Infinity;
      }
      return new Date(kickoff).getTime();
    },

    finished: function () {
      return this.filter(function (m) { return m.isFinished(); });
    },

    live: function () {
      return this.filter(function (m) { return m.isLive(); });
    },

    byChampionship: function (championshipId) {
      return this.filter(function (m) {
        return m.get('championship') === championshipId;
      });
    },

    byTeam: function (teamId) {
      return this.filter(function (m) {
        return m.get('home') === teamId || m.get('away') === teamId;
      });
    }

  });
}());
