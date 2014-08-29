module.exports = (function () {
  'use strict';

  var Marionette = require('backbone.marionette');
  var template = require('./list_template');
  var TeamRowView = require('./row_view');

  return Marionette.CompositeView.extend({

    tagName: 'table',
    className: 'table table-striped table-hover teams-list',
    template: template,

    childView: TeamRowView,
    childViewContainer: 'tbody.teams-rows'

  });
}());
