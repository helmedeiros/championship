module.exports = (function () {
  'use strict';

  var Backbone = require('backbone');
  var messages = require('./messages/match_event');

  var TYPES = [
    'kickoff',
    'goal',
    'own_goal',
    'yellow',
    'red',
    'sub',
    'var',
    'comment',
    'half_time',
    'full_time'
  ];

  var HALVES = [1, 2, 3, 4];

  function contains(list, value) {
    var i;
    for (i = 0; i < list.length; i = i + 1) {
      if (list[i] === value) { return true; }
    }
    return false;
  }

  return Backbone.Model.extend({

    TYPES: TYPES,
    HALVES: HALVES,

    defaults: {
      type: '',
      half: 1,
      minute: 0,
      player: null,
      text: ''
    },

    validate: function (attrs) {
      if (!attrs.type) {
        return messages.TYPE_REQUIRED;
      }
      if (!contains(TYPES, attrs.type)) {
        return messages.TYPE_UNKNOWN;
      }
      if (!contains(HALVES, attrs.half)) {
        return messages.HALF_UNKNOWN;
      }
      if (typeof attrs.minute !== 'number' || attrs.minute < 0 || attrs.minute > 120) {
        return messages.MINUTE_RANGE;
      }
    }

  });
}());
