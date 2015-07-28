'use strict';

var encode = require('../../../src/share/encode');

describe('share/encode', function () {

  it('faz round-trip de objeto simples', function () {
    var input = { id: 'm-1', home: 'BRA', away: 'GER', score: [1, 7] };
    var encoded = encode.encode(input);
    expect(encoded).to.be.a('string');
    expect(encoded).to.not.match(/[+/=]/);
    var out = encode.decode(encoded);
    expect(out).to.deep.equal(input);
  });

  it('preserva caracteres unicode (acentos e símbolos)', function () {
    var input = { campeonato: 'Brasileirão', nota: 'Atlético-MG x São Paulo · ⚽' };
    var out = encode.decode(encode.encode(input));
    expect(out).to.deep.equal(input);
  });

  it('codifica arrays e tipos primitivos', function () {
    var input = [1, 2, 3, 'gol', { minute: 7, player: 'Müller' }];
    var out = encode.decode(encode.encode(input));
    expect(out).to.deep.equal(input);
  });

  it('rejeita payload nulo no encode', function () {
    expect(function () { encode.encode(null); }).to.throw();
  });

  it('rejeita string vazia no decode', function () {
    expect(function () { encode.decode(''); }).to.throw();
  });

  it('aceita decodificar string previamente padronizada com = removidos',
    function () {
      var input = { tag: 'short' };
      var enc = encode.encode(input);
      expect(encode.decode(enc)).to.deep.equal(input);
    });

});
