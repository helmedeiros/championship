module.exports = (function () {
  'use strict';

  var Marionette = require('backbone.marionette');

  return Marionette.ItemView.extend({

    className: 'home',

    template: function () {
      return '' +
        '<div class="jumbotron">' +
          '<h1>championship</h1>' +
          '<p class="lead">' +
            'Cadastre times, jogadores e campeonatos. Acompanhe partidas ao vivo ' +
            'e consulte o histórico de cada edição.' +
          '</p>' +
        '</div>' +
        '<div class="row home-cards">' +
          '<div class="col-md-4">' +
            '<div class="panel panel-default"><div class="panel-body">' +
              '<h3>Campeonatos</h3>' +
              '<p>Veja a tabela de pontos e o calendário.</p>' +
              '<a class="btn btn-primary" href="#/campeonatos">Ver campeonatos</a>' +
            '</div></div>' +
          '</div>' +
          '<div class="col-md-4">' +
            '<div class="panel panel-default"><div class="panel-body">' +
              '<h3>Times</h3>' +
              '<p>Cadastre clubes e seleções.</p>' +
              '<a class="btn btn-primary" href="#/times">Ver times</a>' +
            '</div></div>' +
          '</div>' +
          '<div class="col-md-4">' +
            '<div class="panel panel-default"><div class="panel-body">' +
              '<h3>Criar campeonato</h3>' +
              '<p>Defina formato, times e a data da primeira rodada.</p>' +
              '<a class="btn btn-success" href="#/admin/campeonatos/novo">' +
                'Novo campeonato' +
              '</a>' +
            '</div></div>' +
          '</div>' +
        '</div>';
    }

  });
}());
