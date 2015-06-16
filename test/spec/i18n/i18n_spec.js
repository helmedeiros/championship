'use strict';

var i18n = require('../../../src/i18n');

describe('i18n', function () {

  beforeEach(function () { i18n.setLocale('pt-br'); });

  it('traduz chaves para pt-br por padrão', function () {
    expect(i18n.t('common.save')).to.equal('Salvar');
    expect(i18n.t('match.live')).to.equal('AO VIVO');
  });

  it('traduz para en após setLocale', function () {
    i18n.setLocale('en');
    expect(i18n.t('common.save')).to.equal('Save');
    expect(i18n.t('match.live')).to.equal('LIVE');
  });

  it('retorna a chave quando não há tradução', function () {
    expect(i18n.t('chave.que.nao.existe')).to.equal('chave.que.nao.existe');
  });

  it('rejeita locale desconhecido', function () {
    expect(function () { i18n.setLocale('xy'); }).to.throw(/desconhecido/);
  });

  it('expõe lista de locales suportados', function () {
    expect(i18n.locales()).to.include('pt-br');
    expect(i18n.locales()).to.include('en');
  });

});
