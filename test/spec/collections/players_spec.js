'use strict';

var Players = require('../../../src/collections/players');

describe('collections/Players', function () {

  it('ordena os jogadores pelo número da camisa', function () {
    var elenco = new Players([
      { name: 'Romário', number: 11 },
      { name: 'Taffarel', number: 1 },
      { name: 'Bebeto', number: 7 }
    ]);
    expect(elenco.pluck('name')).to.deep.equal(['Taffarel', 'Bebeto', 'Romário']);
  });

  it('coloca jogadores sem número ao final da lista', function () {
    var elenco = new Players([
      { name: 'Sem Número' },
      { name: 'Com Número', number: 9 }
    ]);
    expect(elenco.pluck('name')).to.deep.equal(['Com Número', 'Sem Número']);
  });

});
