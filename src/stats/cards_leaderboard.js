module.exports = (function () {
  'use strict';

  // Ranking de cartões por jogador a partir de eventos de partida.
  // Cartão vermelho conta como 2 (peso para ordenar disciplinares).

  function asArray(events) {
    if (!events) { return []; }
    if (typeof events.toArray === 'function') { return events.toArray(); }
    return events;
  }

  function getField(ev, name) {
    return ev && typeof ev.get === 'function' ? ev.get(name) : (ev || {})[name];
  }

  function rank(events) {
    var list = asArray(events);
    var counts = {};
    list.forEach(function (ev) {
      var t = getField(ev, 'type');
      var player = getField(ev, 'player');
      if (!player) { return; }
      if (t !== 'yellow' && t !== 'red') { return; }
      if (!counts[player]) { counts[player] = { yellow: 0, red: 0 }; }
      counts[player][t] = counts[player][t] + 1;
    });
    return Object.keys(counts).map(function (p) {
      var c = counts[p];
      return {
        player: p,
        yellow: c.yellow,
        red: c.red,
        score: c.yellow + 2 * c.red
      };
    }).sort(function (a, b) {
      if (b.score !== a.score) { return b.score - a.score; }
      if (b.red !== a.red) { return b.red - a.red; }
      return a.player < b.player ? -1 : a.player > b.player ? 1 : 0;
    });
  }

  return { rank: rank };
}());
