module.exports = (function () {
  'use strict';

  var Marionette = require('backbone.marionette');
  var EventItemView = require('./event_item_view');

  return Marionette.CollectionView.extend({

    tagName: 'ol',
    className: 'event-timeline list-unstyled',
    childView: EventItemView,

    // Newest event on top.
    attachHtml: function (collectionView, childView) {
      collectionView.$el.prepend(childView.el);
    }

  });
}());
