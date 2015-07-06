module.exports = (function () {
  'use strict';

  var Marionette = require('backbone.marionette');
  var role = require('../app/role');

  return Marionette.ItemView.extend({

    className: 'admin-setup',

    template: function (data) {
      var isAdmin = data.role === 'admin';
      return '<header class="page-header"><h1>Área administrativa</h1></header>' +
        '<p class="text-muted">Sua role atual é <strong>' + data.role +
          '</strong>. Esta separação é apenas de interface — qualquer pessoa ' +
          'com acesso ao navegador pode trocar.' +
        '</p>' +
        '<div class="admin-setup-actions">' +
          (isAdmin ?
            '<button class="btn btn-default leave-admin" ' +
                    'aria-label="Sair do modo administrador">' +
              'Sair da área admin' +
            '</button>' :
            '<button class="btn btn-primary become-admin" ' +
                    'aria-label="Entrar no modo administrador">' +
              'Entrar como admin' +
            '</button>') +
        '</div>';
    },

    serializeData: function () {
      return { role: role.current() };
    },

    events: {
      'click .become-admin': 'onBecome',
      'click .leave-admin':  'onLeave'
    },

    onBecome: function () {
      role.set('admin');
      this.render();
      this.trigger('role:changed', 'admin');
    },

    onLeave: function () {
      role.clear();
      this.render();
      this.trigger('role:changed', 'user');
    }

  });
}());
