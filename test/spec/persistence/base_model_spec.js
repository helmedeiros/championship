'use strict';

var MemoryStorage = require('../../../src/persistence/memory_storage');
var BaseModel = require('../../../src/persistence/base_model');
var BaseCollection = require('../../../src/persistence/base_collection');

describe('persistence/BaseModel + BaseCollection', function () {

  var store;
  var Thing;
  var Things;

  beforeEach(function () {
    store = new MemoryStorage();
    BaseModel.setStorage(store);
    Thing = BaseModel.extend({ bucket: 'things', defaults: { name: '' } });
    Things = BaseCollection.extend({ model: Thing });
  });

  it('persiste novo modelo via save chamando o adaptador', function () {
    var t = new Thing({ name: 'Um' });
    t.save();
    var registros = store.list('things');
    expect(registros).to.have.length(1);
    expect(registros[0].name).to.equal('Um');
  });

  it('atualiza modelo existente preservando id', function () {
    var t = new Thing({ id: 'fixo', name: 'Antigo' });
    t.save();
    t.set('name', 'Novo');
    t.save();
    expect(store.read('things', 'fixo').name).to.equal('Novo');
  });

  it('remove modelo via destroy', function () {
    var t = new Thing({ id: 'x', name: 'X' });
    t.save();
    t.destroy();
    expect(store.read('things', 'x')).to.equal(null);
  });

  it('lê coleção carregando registros do adaptador', function () {
    store.create('things', { id: '1', name: 'A' });
    store.create('things', { id: '2', name: 'B' });
    var coll = new Things();
    coll.fetch();
    expect(coll.length).to.equal(2);
    expect(coll.pluck('name').sort()).to.deep.equal(['A', 'B']);
  });

  it('falha ao salvar modelo sem bucket definido', function () {
    var SemBucket = BaseModel.extend({});
    var m = new SemBucket({ name: 'X' });
    expect(function () { m.save(); }).to.throw(/bucket/);
  });

});
