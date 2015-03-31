module.exports = (function () {
  'use strict';

  // Conta gols por jogador a partir de uma coleção/array de eventos.
  // Ignora gols-contra na contagem do jogador autor.

  function asArray(events) {
    if (!events) { return []; }
    if (typeof events.toArray === 'function') { return events.toArray(); }
    return events;
  }

  function getType(ev) {
    return ev && typeof ev.get === 'function' ? ev.get('type') : (ev || {}).type;
  }

  function getPlayer(ev) {
    return ev && typeof ev.get === 'function' ? ev.get('player') : (ev || {}).player;
  }

  function rank(events, options) {
    var list = asArray(events);
    var counts = {};
    list.forEach(function (ev) {
      var t = getType(ev);
      var player = getPlayer(ev);
      if (t !== 'goal') { return; }
      if (!player) { return; }
      counts[player] = (counts[player] || 0) + 1;
    });
    var sorted = Object.keys(counts).map(function (p) {
      return { player: p, goals: counts[p] };
    }).sort(function (a, b) {
      if (b.goals !== a.goals) { return b.goals - a.goals; }
      return a.player < b.player ? -1 : a.player > b.player ? 1 : 0;
    });
    var limit = options && options.limit;
    return limit ? sorted.slice(0, limit) : sorted;
  }

  return { rank: rank };
}());
