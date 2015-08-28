module.exports = (function () {
  'use strict';

  // Conta assistências por jogador a partir de eventos do tipo 'goal'
  // com campo 'assist' preenchido. Ignora gols sem assistência atribuída
  // e eventos de gols-contra.

  function asArray(events) {
    if (!events) { return []; }
    if (typeof events.toArray === 'function') { return events.toArray(); }
    return events;
  }

  function fieldOf(ev, key) {
    if (ev && typeof ev.get === 'function') { return ev.get(key); }
    return (ev || {})[key];
  }

  function rank(events, options) {
    var list = asArray(events);
    var counts = {};
    list.forEach(function (ev) {
      if (fieldOf(ev, 'type') !== 'goal') { return; }
      var assister = fieldOf(ev, 'assist');
      if (!assister) { return; }
      counts[assister] = (counts[assister] || 0) + 1;
    });
    var sorted = Object.keys(counts).map(function (p) {
      return { player: p, assists: counts[p] };
    }).sort(function (a, b) {
      if (b.assists !== a.assists) { return b.assists - a.assists; }
      return a.player < b.player ? -1 : a.player > b.player ? 1 : 0;
    });
    var limit = options && options.limit;
    return limit ? sorted.slice(0, limit) : sorted;
  }

  return { rank: rank };
}());
