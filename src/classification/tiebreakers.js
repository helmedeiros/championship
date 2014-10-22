module.exports = (function () {
  'use strict';

  // Critérios de desempate retornam números: maior valor = melhor posição.
  // Quando dois times têm o mesmo valor, passa-se ao próximo critério.

  var RULES = {
    points:      function (row) { return row.points; },
    wins:        function (row) { return row.wins; },
    goal_diff:   function (row) { return row.goalsFor - row.goalsAgainst; },
    goals_for:   function (row) { return row.goalsFor; },
    head_to_head: function (row, context) {
      var h2h = context && context.h2h && context.h2h[row.team];
      return h2h ? h2h.points : 0;
    }
  };

  var DEFAULT_ORDER = [
    'points', 'wins', 'goal_diff', 'goals_for', 'head_to_head'
  ];

  function ruleFor(name) {
    return RULES[name];
  }

  return {
    RULES: RULES,
    DEFAULT_ORDER: DEFAULT_ORDER,
    ruleFor: ruleFor
  };
}());
