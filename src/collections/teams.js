module.exports = (function () {
  'use strict';

  var BaseCollection = require('../persistence/base_collection');
  var Team = require('../models/team');

  return BaseCollection.extend({
    model: Team,
    comparator: 'name'
  });
}());
