module.exports = (function () {
  'use strict';

  var BaseCollection = require('../persistence/base_collection');
  var Player = require('../models/player');

  return BaseCollection.extend({

    model: Player,

    comparator: function (player) {
      var number = player.get('number');
      return number === null || number === undefined ? 9999 : number;
    }

  });
}());
