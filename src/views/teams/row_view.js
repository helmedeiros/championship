module.exports = (function () {
  'use strict';

  var Marionette = require('backbone.marionette');
  var template = require('./row_template');

  return Marionette.ItemView.extend({

    tagName: 'tr',
    className: 'team-row',
    template: template

  });
}());
