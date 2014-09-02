'use strict';

var escapeHtml = require('../../../../src/views/helpers/escape_html');

describe('views/helpers/escape_html', function () {

  it('escapa caracteres estruturais', function () {
    expect(escapeHtml('<script>')).to.equal('&lt;script&gt;');
    expect(escapeHtml('a & b')).to.equal('a &amp; b');
  });

  it('escapa aspas duplas e simples', function () {
    expect(escapeHtml('"hi"')).to.equal('&quot;hi&quot;');
    expect(escapeHtml('o\'que')).to.equal('o&#39;que');
  });

  it('converte null e undefined em string vazia', function () {
    expect(escapeHtml(null)).to.equal('');
    expect(escapeHtml(undefined)).to.equal('');
  });

  it('converte números em string sem alteração', function () {
    expect(escapeHtml(42)).to.equal('42');
  });

});
