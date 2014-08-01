'use strict';

var Championships = require('../../../src/collections/championships');

describe('collections/Championships', function () {

  it('ordena por temporada decrescente', function () {
    var lista = new Championships([
      { name: 'A', season: 2013 },
      { name: 'B', season: 2015 },
      { name: 'C', season: 2014 }
    ]);
    expect(lista.pluck('season')).to.deep.equal([2015, 2014, 2013]);
  });

  it('em temporadas iguais, ordena alfabeticamente pelo nome', function () {
    var lista = new Championships([
      { name: 'Copa do Brasil', season: 2014 },
      { name: 'Brasileirão Série A', season: 2014 },
      { name: 'Libertadores', season: 2014 }
    ]);
    expect(lista.pluck('name')).to.deep.equal([
      'Brasileirão Série A',
      'Copa do Brasil',
      'Libertadores'
    ]);
  });

});
