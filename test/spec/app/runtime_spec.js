'use strict';

var runtime = require('../../../src/app/runtime');

describe('app/runtime', function () {

  it('herda nome e versão do módulo de identidade', function () {
    expect(runtime.name).to.equal('championship');
    expect(runtime.version).to.match(/^\d+\.\d+\.\d+$/);
  });

  it('declara as regiões da aplicação Marionette', function () {
    expect(runtime.regions).to.have.keys('navRegion', 'mainRegion', 'flashRegion');
    expect(runtime.regions.mainRegion).to.equal('#regiao-principal');
  });

  it('expõe a rota padrão e a rota de não encontrado', function () {
    expect(runtime.defaultRoute).to.equal('');
    expect(runtime.notFoundRoute).to.equal('nao-encontrado');
  });

});
