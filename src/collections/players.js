module.exports = (function () {
  'use strict';

  var Backbone = require('backbone');
  var Player = require('../models/player');

  return Backbone.Collection.extend({

    model: Player,

    comparator: function (player) {
      var number = player.get('number');
      return number === null || number === undefined ? 9999 : number;
    }

  });
}());
