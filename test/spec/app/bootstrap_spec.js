'use strict';

var bootstrap = require('../../../src/app/bootstrap').bootstrap;

describe('app/bootstrap', function () {

  it('combina identidade, regiões e rotas em uma única configuração', function () {
    var config = bootstrap();
    expect(config.name).to.equal('championship');
    expect(config.version).to.match(/^\d+\.\d+\.\d+$/);
    expect(config.regions.mainRegion).to.equal('#regiao-principal');
    expect(config.routes['']).to.equal('home');
    expect(config.adminPrefix).to.equal('admin/');
  });

  it('permite sobrescrever rota padrão e rota de não encontrado', function () {
    var config = bootstrap({ defaultRoute: 'home', notFoundRoute: '404' });
    expect(config.defaultRoute).to.equal('home');
    expect(config.notFoundRoute).to.equal('404');
  });

});
