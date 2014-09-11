'use strict';

var LocalStorageAdapter = require('../../../src/persistence/local_storage_adapter');

function FakeStorage() {
  this.data = {};
  this.length = 0;
}
FakeStorage.prototype.getItem = function (k) { return this.data[k] || null; };
FakeStorage.prototype.setItem = function (k, v) {
  var existed = this.data.hasOwnProperty(k);
  this.data[k] = String(v);
  if (!existed) { this.length = this.length + 1; }
};
FakeStorage.prototype.removeItem = function (k) {
  if (this.data.hasOwnProperty(k)) {
    delete this.data[k];
    this.length = this.length - 1;
  }
};
FakeStorage.prototype.key = function (i) {
  return Object.keys(this.data)[i] || null;
};

describe('persistence/LocalStorageAdapter', function () {

  var store;
  var adapter;

  beforeEach(function () {
    store = new FakeStorage();
    adapter = new LocalStorageAdapter({ storage: store, prefix: 'cp' });
  });

  it('cria registros gravando JSON em localStorage', function () {
    var rec = adapter.create('teams', { name: 'Santos' });
    expect(rec.id).to.equal('1');
    expect(rec.name).to.equal('Santos');
    var raw = store.getItem('cp:teams');
    expect(JSON.parse(raw)).to.have.length(1);
  });

  it('lê e lista registros já persistidos', function () {
    adapter.create('teams', { name: 'A' });
    adapter.create('teams', { name: 'B' });
    expect(adapter.list('teams')).to.have.length(2);
    expect(adapter.read('teams', '1').name).to.equal('A');
  });

  it('atualiza registro existente preservando id', function () {
    adapter.create('teams', { id: 'fixo', name: 'Antigo' });
    adapter.update('teams', { id: 'fixo', name: 'Novo' });
    expect(adapter.read('teams', 'fixo').name).to.equal('Novo');
  });

  it('apaga registro do bucket', function () {
    adapter.create('teams', { id: 'x', name: 'X' });
    adapter.destroy('teams', 'x');
    expect(adapter.read('teams', 'x')).to.equal(null);
  });

  it('isola buckets', function () {
    adapter.create('teams', { id: 'a', name: 'Time' });
    adapter.create('players', { id: 'a', name: 'Jogador' });
    expect(adapter.read('teams', 'a').name).to.equal('Time');
    expect(adapter.read('players', 'a').name).to.equal('Jogador');
  });

  it('preserva o próximo id entre instâncias do adaptador', function () {
    adapter.create('teams', { name: 'A' });
    adapter.create('teams', { name: 'B' });
    var novo = new LocalStorageAdapter({ storage: store, prefix: 'cp' });
    var rec = novo.create('teams', { name: 'C' });
    expect(rec.id).to.equal('3');
  });

  it('reset limpa apenas chaves do prefixo configurado', function () {
    adapter.create('teams', { name: 'A' });
    store.setItem('outra-app:something', 'preserve me');
    adapter.reset();
    expect(adapter.list('teams')).to.have.length(0);
    expect(store.getItem('outra-app:something')).to.equal('preserve me');
  });

});
