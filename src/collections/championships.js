module.exports = (function () {
  'use strict';

  var Backbone = require('backbone');
  var Championship = require('../models/championship');

  return Backbone.Collection.extend({

    model: Championship,

    comparator: function (a, b) {
      var sa = a.get('season') || 0;
      var sb = b.get('season') || 0;
      if (sa !== sb) {
        return sb - sa;
      }
      var na = a.get('name') || '';
      var nb = b.get('name') || '';
      if (na < nb) { return -1; }
      if (na > nb) { return 1; }
      return 0;
    }

  });
}());
