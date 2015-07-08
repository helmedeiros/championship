'use strict';

var role = require('../../../src/app/role');

function fakeStorage() {
  var data = {};
  return {
    getItem: function (k) { return data.hasOwnProperty(k) ? data[k] : null; },
    setItem: function (k, v) { data[k] = String(v); },
    removeItem: function (k) { delete data[k]; }
  };
}

describe('app/role', function () {

  it('default é user quando nada foi gravado', function () {
    expect(role.current({ storage: fakeStorage() })).to.equal('user');
  });

  it('set grava o valor no storage e current devolve', function () {
    var s = fakeStorage();
    role.set('admin', { storage: s });
    expect(role.current({ storage: s })).to.equal('admin');
    expect(role.isAdmin({ storage: s })).to.equal(true);
  });

  it('rejeita roles desconhecidas', function () {
    expect(function () { role.set('root', { storage: fakeStorage() }); }).to.throw();
  });

  it('clear apaga a chave', function () {
    var s = fakeStorage();
    role.set('admin', { storage: s });
    role.clear({ storage: s });
    expect(role.current({ storage: s })).to.equal('user');
  });

  it('expõe lista de roles e default', function () {
    expect(role.ROLES).to.deep.equal(['user', 'admin']);
    expect(role.DEFAULT).to.equal('user');
  });

  it('isAdmin é false após clear', function () {
    var s = fakeStorage();
    role.set('admin', { storage: s });
    expect(role.isAdmin({ storage: s })).to.equal(true);
    role.clear({ storage: s });
    expect(role.isAdmin({ storage: s })).to.equal(false);
  });

  it('valores inválidos no storage caem no default', function () {
    var s = fakeStorage();
    s.setItem('championship:role', 'superuser');
    expect(role.current({ storage: s })).to.equal('user');
  });

});
