module.exports = (function () {
  'use strict';

  // Eventos da Copa do Mundo 2014 organizados por chave da partida.
  // Chave = HOME-AWAY-YYYY-MM-DD (data ISO do dia em UTC).
  // O fixture principal (world_cup_2014.js) anexa esses eventos a cada
  // match na hora da exportação, mantendo o arquivo de matches enxuto.

  return {

    // ===== Semifinal — Brasil 1×7 Alemanha =====
    'BRA-GER-2014-07-08': [
      { type: 'kickoff',   half: 1, minute:  0, text: 'Início da partida' },
      { type: 'goal',      half: 1, minute: 11, player: 'Müller',
        text: '0x1 Alemanha' },
      { type: 'goal',      half: 1, minute: 23, player: 'Klose',
        text: '0x2 Alemanha — Klose maior artilheiro de copas' },
      { type: 'goal',      half: 1, minute: 24, player: 'Kroos',
        text: '0x3 Alemanha' },
      { type: 'goal',      half: 1, minute: 26, player: 'Kroos',
        text: '0x4 Alemanha' },
      { type: 'goal',      half: 1, minute: 29, player: 'Khedira',
        text: '0x5 Alemanha' },
      { type: 'half_time', half: 1, minute: 47, text: 'Intervalo' },
      { type: 'goal',      half: 2, minute: 24, player: 'Schürrle',
        text: '0x6 Alemanha' },
      { type: 'goal',      half: 2, minute: 34, player: 'Schürrle',
        text: '0x7 Alemanha' },
      { type: 'goal',      half: 2, minute: 45, player: 'Oscar',
        text: '1x7 Brasil — gol de honra' },
      { type: 'full_time', half: 2, minute: 47, text: 'Fim de jogo' }
    ],

    // ===== Final — Alemanha 1×0 Argentina =====
    'GER-ARG-2014-07-13': [
      { type: 'kickoff',   half: 1, minute:  0, text: 'Início da final' },
      { type: 'half_time', half: 1, minute: 47, text: 'Intervalo' },
      { type: 'goal',      half: 3, minute: 23, player: 'Götze',
        text: 'Götze marca aos 113 — Alemanha campeã' },
      { type: 'full_time', half: 4, minute: 30, text: 'Alemanha tetracampeã!' }
    ]

  };
}());
