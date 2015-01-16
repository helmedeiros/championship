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
    },

    byRound: function (championshipId, roundNumber) {
      return this.filter(function (m) {
        return m.get('championship') === championshipId &&
               m.get('round') === roundNumber;
      });
    },

    rounds: function (championshipId) {
      var seen = {};
      this.each(function (m) {
        if (m.get('championship') === championshipId && m.get('round')) {
          seen[m.get('round')] = true;
        }
      });
      return Object.keys(seen).map(function (n) { return parseInt(n, 10); }).sort(
        function (a, b) { return a - b; }
      );
    }

  });
}());
