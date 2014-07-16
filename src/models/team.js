module.exports = (function () {
  'use strict';

  var Backbone = require('backbone');

  return Backbone.Model.extend({

    defaults: {
      name: '',
      short: ''
    },

    validate: function (attrs) {
      if (!attrs.name) {
        return 'O nome do time é obrigatório';
      }
    }

  });
}());
