module.exports = (function () {
  'use strict';

  var Marionette = require('backbone.marionette');
  var template = require('./row_template');

  return Marionette.ItemView.extend({

    tagName: 'tr',
    className: 'team-row',
    template: template,

    events: {
      'click .team-action-delete': 'onDelete'
    },

    onDelete: function (e) {
      if (e && e.preventDefault) { e.preventDefault(); }
      var name = this.model.get('name') || 'este time';
      if (typeof window !== 'undefined' && typeof window.confirm === 'function') {
        if (!window.confirm('Excluir ' + name + '?')) { return; }
      }
      this.model.destroy();
    }

  });
}());
