module.exports = (function () {
  'use strict';

  var identity = require('./identity');

  return {

    name: identity.NAME,
    version: identity.VERSION,

    regions: {
      navRegion:    '#regiao-navegacao',
      mainRegion:   '#regiao-principal',
      flashRegion:  '#regiao-mensagens'
    },

    defaultRoute: '',
    notFoundRoute: 'nao-encontrado'

  };
}());
