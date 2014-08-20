'use strict';

var MemoryStorage = require('../../../src/persistence/memory_storage');

describe('persistence/MemoryStorage', function () {

  var store;

  beforeEach(function () {
    store = new MemoryStorage();
  });

  it('cria registro atribuindo id incremental', function () {
    var rec = store.create('teams', { name: 'Santos' });
    expect(rec.id).to.equal('1');
    expect(rec.name).to.equal('Santos');
  });

  it('usa id fornecido se já existir', function () {
    var rec = store.create('teams', { id: 'sao', name: 'São Paulo' });
    expect(rec.id).to.equal('sao');
  });

  it('lê registro pelo id', function () {
    store.create('teams', { id: 'a', name: 'A' });
    expect(store.read('teams', 'a').name).to.equal('A');
    expect(store.read('teams', 'inexistente')).to.equal(null);
  });

  it('lista todos os registros de um bucket', function () {
    store.create('teams', { name: 'A' });
    store.create('teams', { name: 'B' });
    expect(store.list('teams')).to.have.length(2);
  });

  it('atualiza registro existente', function () {
    store.create('teams', { id: 'a', name: 'A' });
    store.update('teams', { id: 'a', name: 'A Novo' });
    expect(store.read('teams', 'a').name).to.equal('A Novo');
  });

  it('apaga registro pelo id', function () {
    store.create('teams', { id: 'a', name: 'A' });
    store.destroy('teams', 'a');
    expect(store.read('teams', 'a')).to.equal(null);
  });

  it('isola buckets diferentes', function () {
    store.create('teams', { id: 'a', name: 'Time A' });
    store.create('players', { id: 'a', name: 'Jogador A' });
    expect(store.read('teams', 'a').name).to.equal('Time A');
    expect(store.read('players', 'a').name).to.equal('Jogador A');
  });

  it('limpa todos os buckets com reset', function () {
    store.create('teams', { name: 'A' });
    store.reset();
    expect(store.list('teams')).to.have.length(0);
  });

});
