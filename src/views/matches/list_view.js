module.exports = (function () {
  'use strict';

  var Marionette = require('backbone.marionette');
  var RowView = require('./row_view');
  var EmptyView = require('./empty_view');

  return Marionette.CompositeView.extend({

    tagName: 'table',
    className: 'table table-striped matches-list',

    template: function () {
      return '' +
        '<thead><tr>' +
          '<th>Mandante</th>' +
          '<th class="text-center">Placar/Horário</th>' +
          '<th>Visitante</th>' +
          '<th>Estádio</th>' +
          '<th>Status</th>' +
          '<th>Ações</th>' +
        '</tr></thead>' +
        '<tbody class="matches-rows"></tbody>';
    },

    childView: RowView,
    emptyView: EmptyView,
    childViewContainer: 'tbody.matches-rows'

  });
}());
