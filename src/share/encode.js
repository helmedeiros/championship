/*global Buffer, unescape, escape */
module.exports = (function () {
  'use strict';

  // Encode/decode de estado leve para a URL.
  // O payload é JSON, comprimido por URI encoding e codificado em
  // base64 url-safe (RFC 4648 §5). Tamanho típico de uma partida
  // com 30 eventos é abaixo de 1.5KB — entra confortável em um hash.

  function toUrlSafe(b64) {
    return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  function fromUrlSafe(s) {
    var b64 = s.replace(/-/g, '+').replace(/_/g, '/');
    while (b64.length % 4) { b64 = b64 + '='; }
    return b64;
  }

  function encode(payload) {
    if (payload === undefined || payload === null) {
      throw new Error('encode: payload obrigatório');
    }
    var json = JSON.stringify(payload);
    var b64;
    if (typeof window !== 'undefined' && window.btoa) {
      b64 = window.btoa(unescape(encodeURIComponent(json)));
    } else {
      b64 = new Buffer(json, 'utf8').toString('base64');
    }
    return toUrlSafe(b64);
  }

  function decode(encoded) {
    if (typeof encoded !== 'string' || encoded.length === 0) {
      throw new Error('decode: string obrigatória');
    }
    var b64 = fromUrlSafe(encoded);
    var json;
    if (typeof window !== 'undefined' && window.atob) {
      json = decodeURIComponent(escape(window.atob(b64)));
    } else {
      json = new Buffer(b64, 'base64').toString('utf8');
    }
    return JSON.parse(json);
  }

  return { encode: encode, decode: decode };
}());
