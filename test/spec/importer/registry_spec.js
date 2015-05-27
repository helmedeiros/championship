'use strict';

var registry = require('../../../src/importer/registry');

describe('importer/registry', function () {

  it('lista os fixtures pré-embutidos', function () {
    var entries = registry.list();
    expect(entries.length).to.be.above(0);
    var ids = entries.map(function (e) { return e.id; });
    expect(ids).to.include('world-cup-2014');
    expect(ids).to.include('brasileirao-2014');
  });

  it('get retorna o fixture com a estrutura completa', function () {
    var f = registry.get('world-cup-2014');
    expect(f).to.not.equal(null);
    expect(f.teams).to.have.length(32);
  });

  it('get retorna null para id desconhecido', function () {
    expect(registry.get('xyz')).to.equal(null);
  });

});
