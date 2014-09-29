module.exports = (function () {
  'use strict';

  var Marionette = require('backbone.marionette');
  var template = require('./list_template');
  var PlayerRowView = require('./row_view');
  var PlayersEmptyView = require('./empty_view');

  return Marionette.CompositeView.extend({

    tagName: 'table',
    className: 'table table-striped table-hover players-list',
    template: template,

    childView: PlayerRowView,
    emptyView: PlayersEmptyView,
    childViewContainer: 'tbody.players-rows'

  });
}());
