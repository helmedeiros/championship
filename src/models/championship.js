module.exports = (function () {
  'use strict';

  var Backbone = require('backbone');
  var messages = require('./messages/championship');

  return Backbone.Model.extend({

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
    }

  });
}());
