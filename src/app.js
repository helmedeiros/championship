module.exports = (function () {
  'use strict';

  var identity = require('./app/identity');

  return {
    NAME: identity.NAME,
    VERSION: identity.VERSION
  };
}());
