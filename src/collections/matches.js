module.exports = (function () {
  'use strict';

  var Backbone = require('backbone');
  var Match = require('../models/match');

  return Backbone.Collection.extend({

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
    }

  });
}());
