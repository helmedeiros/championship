/* jshint scripturl: true */
'use strict';

var bookmarklet = require('../../../src/share/bookmarklet');

describe('share/bookmarklet', function () {

  it('source é uma string IIFE javascript', function () {
    var src = bookmarklet.source();
    expect(src).to.match(/^\(function/);
    expect(src.slice(-2)).to.equal('()');
  });

  it('source referencia hash e role admin', function () {
    var src = bookmarklet.source();
    expect(src).to.match(/window\.location\.hash/);
    expect(src).to.match(/championship:role/);
    expect(src).to.match(/admin/);
  });

  it('url começa com javascript: e tem código encodado', function () {
    var url = bookmarklet.url();
    expect(url.indexOf('javascript:')).to.equal(0);
    expect(url).to.match(/function/);
    expect(url).to.match(/%20/);
  });

});
