module.exports = (function () {
  'use strict';

  var Backbone = require('backbone');
  var Team = require('../models/team');

  return Backbone.Collection.extend({
    model: Team,
    comparator: 'name'
  });
}());
