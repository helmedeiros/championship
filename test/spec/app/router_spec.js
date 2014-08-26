'use strict';

var router = require('../../../src/app/router');

describe('app/router', function () {

  it('mapeia a raiz para o handler home', function () {
    expect(router.routes['']).to.equal('home');
  });

  it('expõe rotas públicas para campeonatos, times e partidas', function () {
    expect(router.routes.campeonatos).to.equal('championshipsList');
    expect(router.routes.times).to.equal('teamsList');
    expect(router.routes['partidas/:id']).to.equal('matchShow');
  });

  it('separa handlers da área admin pelo prefixo admin.', function () {
    var pubAdmin = Object.keys(router.routes).filter(function (route) {
      return route.indexOf(router.adminPrefix) === 0;
    });
    expect(pubAdmin.length).to.be.above(0);
    pubAdmin.forEach(function (route) {
      expect(router.routes[route]).to.match(/^admin\./);
    });
  });

  it('expõe handler para rota de não encontrado', function () {
    expect(router.routes['nao-encontrado']).to.equal('notFound');
  });

});
