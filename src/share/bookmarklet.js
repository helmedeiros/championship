/*global alert */
module.exports = (function () {
  'use strict';

  // Bookmarklet "abrir scoreboard": detecta a partida atual a partir do
  // hash (#/partidas/:id ou #/partidas/compartilhada/:token), define
  // role=admin no localStorage e navega para o scoreboard correspondente.

  var SOURCE = function () {
    var hash = window.location.hash || '';
    var detail = hash.match(/^#\/partidas\/([^/]+)$/);
    var shared = hash.match(/^#\/partidas\/compartilhada\/([^/]+)$/);
    var matchId = detail ? detail[1] : shared ? shared[1] : null;
    if (!matchId) {
      alert('Abra primeiro a página de uma partida.');
      return;
    }
    window.localStorage.setItem('championship:role', 'admin');
    var base = window.location.origin + window.location.pathname;
    window.location.href = base + '#/admin/partidas/' +
      encodeURIComponent(matchId) + '/scoreboard';
  };

  function source() {
    return '(' + SOURCE.toString() + ')()';
  }

  function url() {
    /* jshint scripturl: true */
    return 'javascript:' + encodeURIComponent(source());
  }

  return { source: source, url: url };
}());
