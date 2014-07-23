'use strict';

var Teams = require('../../../src/collections/teams');

describe('collections/Teams', function () {

  it('ordena os times alfabeticamente pelo nome', function () {
    var lista = new Teams([
      { name: 'Santos' },
      { name: 'Atlético-MG' },
      { name: 'Corinthians' }
    ]);
    expect(lista.pluck('name')).to.deep.equal([
      'Atlético-MG',
      'Corinthians',
      'Santos'
    ]);
  });

  it('mantém a ordenação ao adicionar um novo time', function () {
    var lista = new Teams([
      { name: 'Botafogo' },
      { name: 'Vasco' }
    ]);
    lista.add({ name: 'Fluminense' });
    expect(lista.pluck('name')).to.deep.equal([
      'Botafogo',
      'Fluminense',
      'Vasco'
    ]);
  });

});
