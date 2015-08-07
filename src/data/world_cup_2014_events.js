module.exports = (function () {
  'use strict';

  // Eventos da Copa do Mundo 2014 organizados por chave da partida.
  // Chave = HOME-AWAY-YYYY-MM-DD (data ISO do dia em UTC).
  // O fixture principal (world_cup_2014.js) anexa esses eventos a cada
  // match na hora da exportação, mantendo o arquivo de matches enxuto.

  return {

    // ===== Grupo A =====
    'BRA-CRO-2014-06-12': [
      { type: 'goal',   half: 1, minute: 11, player: 'Marcelo (CT)',
        text: '0x1 — gol contra de Marcelo abre a Copa' },
      { type: 'yellow', half: 1, minute: 27, player: 'Neymar' },
      { type: 'goal',   half: 1, minute: 29, player: 'Neymar',
        text: '1x1 Brasil' },
      { type: 'goal',   half: 2, minute: 26, player: 'Neymar',
        text: '2x1 Brasil — pênalti' },
      { type: 'goal',   half: 2, minute: 46, player: 'Oscar',
        text: '3x1 Brasil — fecha o placar' }
    ],
    'MEX-CMR-2014-06-13': [
      { type: 'yellow', half: 1, minute: 36, player: 'Assou-Ekotto' },
      { type: 'goal',   half: 2, minute: 16, player: 'Peralta',
        text: '1x0 México' }
    ],
    'BRA-MEX-2014-06-17': [
      { type: 'yellow', half: 1, minute: 25, player: 'Rafael Márquez' },
      { type: 'yellow', half: 2, minute: 25, player: 'Hulk' },
      { type: 'comment', half: 2, minute: 35,
        text: 'Ochoa faz defesas espetaculares e garante o empate' }
    ],
    'CMR-CRO-2014-06-18': [
      { type: 'goal',   half: 1, minute: 11, player: 'Olić',
        text: '0x1 Croácia' },
      { type: 'red',    half: 1, minute: 40, player: 'Alex Song',
        text: 'Cotovelada em Mandžukić' },
      { type: 'goal',   half: 2, minute:  3, player: 'Perišić',
        text: '0x2 Croácia' },
      { type: 'goal',   half: 2, minute: 16, player: 'Mandžukić',
        text: '0x3 Croácia' },
      { type: 'goal',   half: 2, minute: 28, player: 'Mandžukić',
        text: '0x4 Croácia' }
    ],
    'CMR-BRA-2014-06-23': [
      { type: 'goal',   half: 1, minute: 17, player: 'Neymar',
        text: '0x1 Brasil' },
      { type: 'goal',   half: 1, minute: 26, player: 'Matip',
        text: '1x1 Camarões' },
      { type: 'goal',   half: 1, minute: 35, player: 'Neymar',
        text: '1x2 Brasil' },
      { type: 'goal',   half: 2, minute:  4, player: 'Fred',
        text: '1x3 Brasil' },
      { type: 'goal',   half: 2, minute: 39, player: 'Fernandinho',
        text: '1x4 Brasil' }
    ],
    'CRO-MEX-2014-06-23': [
      { type: 'goal',   half: 2, minute: 27, player: 'Rafael Márquez',
        text: '0x1 México' },
      { type: 'goal',   half: 2, minute: 30, player: 'Guardado',
        text: '0x2 México' },
      { type: 'goal',   half: 2, minute: 37, player: 'Hernández',
        text: '0x3 México' },
      { type: 'goal',   half: 2, minute: 42, player: 'Perišić',
        text: '1x3 Croácia' }
    ],

    // ===== Grupo B =====
    'ESP-NED-2014-06-13': [
      { type: 'goal',   half: 1, minute: 27, player: 'Xabi Alonso',
        text: '1x0 Espanha — pênalti' },
      { type: 'goal',   half: 1, minute: 44, player: 'Van Persie',
        text: '1x1 Holanda — voadora histórica' },
      { type: 'goal',   half: 2, minute:  8, player: 'Robben',
        text: '1x2 Holanda' },
      { type: 'goal',   half: 2, minute: 19, player: 'De Vrij',
        text: '1x3 Holanda' },
      { type: 'goal',   half: 2, minute: 27, player: 'Van Persie',
        text: '1x4 Holanda' },
      { type: 'goal',   half: 2, minute: 35, player: 'Robben',
        text: '1x5 Holanda — humilhação dos atuais campeões' }
    ],
    'CHI-AUS-2014-06-13': [
      { type: 'goal',   half: 1, minute: 12, player: 'Sánchez',
        text: '1x0 Chile' },
      { type: 'goal',   half: 1, minute: 14, player: 'Valdivia',
        text: '2x0 Chile' },
      { type: 'goal',   half: 1, minute: 35, player: 'Cahill',
        text: '2x1 Austrália' },
      { type: 'goal',   half: 2, minute: 47, player: 'Beausejour',
        text: '3x1 Chile' }
    ],
    'AUS-NED-2014-06-18': [
      { type: 'goal',   half: 1, minute: 20, player: 'Robben',
        text: '0x1 Holanda' },
      { type: 'goal',   half: 1, minute: 21, player: 'Cahill',
        text: '1x1 Austrália — pintura' },
      { type: 'goal',   half: 2, minute:  9, player: 'Jedinak',
        text: '2x1 Austrália — pênalti' },
      { type: 'goal',   half: 2, minute: 13, player: 'Van Persie',
        text: '2x2 Holanda' },
      { type: 'goal',   half: 2, minute: 23, player: 'Depay',
        text: '2x3 Holanda' }
    ],
    'ESP-CHI-2014-06-18': [
      { type: 'goal',   half: 1, minute: 20, player: 'Vargas',
        text: '0x1 Chile' },
      { type: 'goal',   half: 1, minute: 43, player: 'Aránguiz',
        text: '0x2 Chile — Espanha eliminada' }
    ],
    'AUS-ESP-2014-06-23': [
      { type: 'goal',   half: 1, minute: 36, player: 'Villa',
        text: '0x1 Espanha' },
      { type: 'goal',   half: 2, minute: 24, player: 'Torres',
        text: '0x2 Espanha' },
      { type: 'goal',   half: 2, minute: 37, player: 'Mata',
        text: '0x3 Espanha' }
    ],
    'NED-CHI-2014-06-23': [
      { type: 'goal',   half: 2, minute: 32, player: 'Fer',
        text: '1x0 Holanda' },
      { type: 'goal',   half: 2, minute: 47, player: 'Depay',
        text: '2x0 Holanda' }
    ],

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
