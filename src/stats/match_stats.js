module.exports = (function () {
  'use strict';

  // Estatísticas agregadas a partir dos eventos de uma partida.
  // Inputs aceitos: array de objetos { type, ... } ou Backbone.Collection.

  function asArray(events) {
    if (!events) { return []; }
    if (typeof events.toArray === 'function') { return events.toArray(); }
    return events;
  }

  function getType(ev) {
    return ev && typeof ev.get === 'function' ? ev.get('type') : (ev || {}).type;
  }

  function summarize(events) {
    var list = asArray(events);
    var counts = {
      goal: 0, own_goal: 0,
      yellow: 0, red: 0,
      sub: 0, var: 0, comment: 0,
      kickoff: 0, half_time: 0, full_time: 0
    };
    list.forEach(function (ev) {
      var t = getType(ev);
      if (counts.hasOwnProperty(t)) { counts[t] = counts[t] + 1; }
    });
    return {
      counts: counts,
      goals: counts.goal + counts.own_goal,
      cards: counts.yellow + counts.red,
      substitutions: counts.sub,
      commentsOnly: counts.comment,
      ticks: counts.kickoff + counts.half_time + counts.full_time
    };
  }

  return {
    summarize: summarize
  };
}());
