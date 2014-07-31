'use strict';

var Championship = require('../../../src/models/championship');

describe('models/Championship', function () {

  it('cria um campeonato com nome, temporada e país', function () {
    var campeonato = new Championship({
      name: 'Brasileirão Série A',
      season: 2014,
      country: 'BR'
    });
    expect(campeonato.get('name')).to.equal('Brasileirão Série A');
    expect(campeonato.get('season')).to.equal(2014);
    expect(campeonato.get('country')).to.equal('BR');
  });

  it('usa o formato liga como padrão', function () {
    var campeonato = new Championship({ name: 'X', season: 2015 });
    expect(campeonato.get('format')).to.equal('league');
  });

  it('exige nome do campeonato', function () {
    var campeonato = new Championship({ season: 2014 });
    expect(campeonato.isValid()).to.equal(false);
    expect(campeonato.validationError).to.equal('O nome do campeonato é obrigatório');
  });

  it('exige temporada do campeonato', function () {
    var campeonato = new Championship({ name: 'Copa' });
    expect(campeonato.isValid()).to.equal(false);
    expect(campeonato.validationError).to.equal('A temporada do campeonato é obrigatória');
  });

  it('aceita os formatos liga, ida e volta, grupos+mata-mata e mata-mata', function () {
    var formatos = ['league', 'double-round-robin', 'groups-knockout', 'knockout'];
    formatos.forEach(function (formato) {
      var campeonato = new Championship({ name: 'X', season: 2015, format: formato });
      expect(campeonato.isValid()).to.equal(true);
    });
  });

  it('rejeita formato desconhecido', function () {
    var campeonato = new Championship({ name: 'X', season: 2015, format: 'inventado' });
    expect(campeonato.isValid()).to.equal(false);
    expect(campeonato.validationError).to.equal('Formato de campeonato desconhecido');
  });

  it('expõe a lista de formatos suportados', function () {
    var c = new Championship({ name: 'X', season: 2015 });
    expect(c.FORMATS).to.deep.equal([
      'league', 'double-round-robin', 'groups-knockout', 'knockout'
    ]);
  });

});
