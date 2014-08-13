module.exports = (function () {
  'use strict';

  var Backbone = require('backbone');
  var MatchEvent = require('../models/match_event');

  return Backbone.Collection.extend({

    model: MatchEvent,

    comparator: function (event) {
      var half = event.get('half') || 0;
      var minute = event.get('minute') || 0;
      return half * 1000 + minute;
    },

    goals: function () {
      return this.filter(function (e) {
        var t = e.get('type');
        return t === 'goal' || t === 'own_goal';
      });
    },

    cards: function () {
      return this.filter(function (e) {
        var t = e.get('type');
        return t === 'yellow' || t === 'red';
      });
    }

  });
}());
