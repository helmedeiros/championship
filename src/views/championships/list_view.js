module.exports = (function () {
  'use strict';

  var Marionette = require('backbone.marionette');
  var RowView = require('./row_view');
  var EmptyView = require('./empty_view');

  return Marionette.CompositeView.extend({

    tagName: 'table',
    className: 'table table-striped championships-list',

    template: function () {
      return '' +
        '<thead><tr>' +
          '<th>Campeonato</th>' +
          '<th>Temporada</th>' +
          '<th>País</th>' +
          '<th>Formato</th>' +
        '</tr></thead>' +
        '<tbody class="championships-rows"></tbody>' +
        '<tfoot><tr><td colspan="4" class="text-right">' +
          '<a class="btn btn-primary btn-sm" href="#/admin/campeonatos/novo">' +
            '+ Novo campeonato' +
          '</a>' +
        '</td></tr></tfoot>';
    },

    childView: RowView,
    emptyView: EmptyView,
    childViewContainer: 'tbody.championships-rows'

  });
}());
