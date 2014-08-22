module.exports = (function () {
  'use strict';

  var BaseModel = require('../persistence/base_model');
  var messages = require('./messages/player');

  var POSITIONS = ['GOL', 'ZAG', 'LAT', 'VOL', 'MEI', 'ATA'];

  function isKnownPosition(value) {
    if (!value) { return true; }
    var i;
    for (i = 0; i < POSITIONS.length; i = i + 1) {
      if (POSITIONS[i] === value) { return true; }
    }
    return false;
  }

  function isValidNumber(value) {
    if (value === null || value === undefined || value === '') { return true; }
    if (typeof value !== 'number') { return false; }
    return value >= 1 && value <= 99 && value === Math.floor(value);
  }

  return BaseModel.extend({

    bucket: 'players',

    POSITIONS: POSITIONS,

    defaults: {
      name: '',
      nickname: '',
      position: '',
      number: null,
      photo: '',
      birthdate: null,
      nationality: ''
    },

    validate: function (attrs) {
      if (!attrs.name) {
        return messages.NAME_REQUIRED;
      }
      if (!isValidNumber(attrs.number)) {
        return messages.NUMBER_RANGE;
      }
      if (!isKnownPosition(attrs.position)) {
        return messages.POSITION_UNKNOWN;
      }
    }

  });
}());
