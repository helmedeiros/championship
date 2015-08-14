module.exports = (function () {
  'use strict';

  // Eventos do Brasileirão 2014 organizados por chave da partida.
  // Chave = HOME-AWAY-YYYY-MM-DD. As escalações usadas são reais do
  // elenco de 2014 (Borges/Júlio Baptista no Cruzeiro, Fred no Flu,
  // Ricardo Oliveira no Santos, Guerrero no Corinthians, etc.); os
  // minutos são aproximações para popular linha do tempo e artilharia.

  return {

    // ===== Rodada 38 (07/12/2014) =====
    'CRI-CRU-2014-12-07': [
      { type: 'goal',   half: 1, minute: 22, player: 'Borges',
        text: '0x1 Cruzeiro — campeão tranquilo' },
      { type: 'goal',   half: 2, minute: 17, player: 'Júlio Baptista',
        text: '0x2 Cruzeiro' }
    ],
    'BAH-COR-2014-12-07': [
      { type: 'goal',   half: 1, minute: 18, player: 'Élton',
        text: '1x0 Bahia' },
      { type: 'goal',   half: 2, minute:  4, player: 'Paolo Guerrero',
        text: '1x1 Corinthians' },
      { type: 'goal',   half: 2, minute: 31, player: 'Paolo Guerrero',
        text: '1x2 Corinthians' }
    ],
    'PAL-SPT-2014-12-07': [
      { type: 'goal',   half: 1, minute: 14, player: 'Henrique',
        text: '1x0 Palmeiras' },
      { type: 'goal',   half: 1, minute: 36, player: 'Wesley',
        text: '2x0 Palmeiras' },
      { type: 'goal',   half: 2, minute:  9, player: 'Cristaldo',
        text: '3x0 Palmeiras' },
      { type: 'goal',   half: 2, minute: 38, player: 'Mendieta',
        text: '4x0 Palmeiras — goleada e segue na elite' }
    ],
    'SAO-SAN-2014-12-07': [
      { type: 'goal',   half: 1, minute: 12, player: 'Ricardo Oliveira',
        text: '0x1 Santos' },
      { type: 'goal',   half: 1, minute: 41, player: 'Leandrinho',
        text: '0x2 Santos' },
      { type: 'goal',   half: 2, minute: 16, player: 'Ricardo Oliveira',
        text: '0x3 Santos' },
      { type: 'goal',   half: 2, minute: 38, player: 'Robinho',
        text: '0x4 Santos' }
    ],
    'FLU-CAP-2014-12-07': [
      { type: 'goal',   half: 1, minute:  9, player: 'Fred',
        text: '1x0 Fluminense' },
      { type: 'goal',   half: 1, minute: 31, player: 'Fred',
        text: '2x0 Fluminense' },
      { type: 'goal',   half: 1, minute: 44, player: 'Rafael Sóbis',
        text: '3x0 Fluminense' },
      { type: 'goal',   half: 2, minute: 20, player: 'Cícero',
        text: '4x0 Fluminense' },
      { type: 'goal',   half: 2, minute: 42, player: 'Fred',
        text: '5x0 Fluminense — hat-trick' }
    ],
    'INT-CFC-2014-12-07': [
      { type: 'goal',   half: 1, minute: 11, player: 'Forlán',
        text: '1x0 Internacional' },
      { type: 'goal',   half: 1, minute: 33, player: 'Robinho (CFC)',
        text: '1x1 Coritiba' },
      { type: 'goal',   half: 2, minute: 12, player: 'D´Alessandro',
        text: '2x1 Internacional' },
      { type: 'goal',   half: 2, minute: 41, player: 'Marcos Aurélio',
        text: '2x2 Coritiba' }
    ],
    'GRE-VAS-2014-12-07': [
      { type: 'goal',   half: 1, minute:  8, player: 'Barcos',
        text: '1x0 Grêmio' },
      { type: 'goal',   half: 1, minute: 18, player: 'Bernardo',
        text: '1x1 Vasco' },
      { type: 'goal',   half: 1, minute: 36, player: 'Riveros',
        text: '2x1 Grêmio' },
      { type: 'goal',   half: 2, minute:  5, player: 'Diego Renan',
        text: '2x2 Vasco' },
      { type: 'goal',   half: 2, minute: 24, player: 'Luan',
        text: '3x2 Grêmio' },
      { type: 'goal',   half: 2, minute: 31, player: 'Pedro Ken',
        text: '3x3 Vasco' },
      { type: 'goal',   half: 2, minute: 47, player: 'Yago Pikachu',
        text: '3x4 Vasco — vira no fim' }
    ],
    'CHA-CAM-2014-12-07': [
      { type: 'goal',   half: 1, minute: 17, player: 'Bruno Rangel',
        text: '1x0 Chapecoense' },
      { type: 'goal',   half: 1, minute: 34, player: 'Diego Tardelli',
        text: '1x1 Atlético-MG' },
      { type: 'goal',   half: 2, minute:  9, player: 'Camilo',
        text: '2x1 Chapecoense' },
      { type: 'goal',   half: 2, minute: 28, player: 'Tiago Real',
        text: '3x1 Chapecoense' },
      { type: 'goal',   half: 2, minute: 44, player: 'Hyoran',
        text: '4x1 Chapecoense' }
    ],
    'FIG-GOI-2014-12-07': [
      { type: 'goal',   half: 2, minute: 23, player: 'Pablo',
        text: '1x0 Figueirense' }
    ],
    'BOT-FLA-2014-12-07': [
      { type: 'yellow', half: 1, minute: 38, player: 'Bolatti' },
      { type: 'goal',   half: 2, minute: 26, player: 'Alecsandro',
        text: '0x1 Flamengo' }
    ],

    // ===== Clássicos e jogos marcantes do ano =====
    'COR-SAO-2014-08-10': [
      { type: 'goal',   half: 1, minute: 19, player: 'Paolo Guerrero',
        text: '1x0 Corinthians' },
      { type: 'goal',   half: 2, minute: 28, player: 'Alexandre Pato',
        text: '1x1 São Paulo' }
    ],
    'FLA-FLU-2014-09-07': [
      { type: 'goal',   half: 1, minute: 22, player: 'Hernane',
        text: '1x0 Flamengo' },
      { type: 'goal',   half: 2, minute: 11, player: 'Fred',
        text: '1x1 Fluminense' },
      { type: 'goal',   half: 2, minute: 37, player: 'Rafael Sóbis',
        text: '1x2 Fluminense' }
    ],
    'GRE-INT-2014-09-28': [
      { type: 'goal',   half: 1, minute: 14, player: 'Barcos',
        text: '1x0 Grêmio' },
      { type: 'goal',   half: 2, minute: 19, player: 'Riveros',
        text: '2x0 Grêmio' },
      { type: 'goal',   half: 2, minute: 41, player: 'D´Alessandro',
        text: '2x1 Internacional' }
    ],
    'CAM-CRU-2014-10-19': [
      { type: 'goal',   half: 2, minute: 16, player: 'Diego Tardelli',
        text: '1x0 Atlético-MG — clássico mineiro pro Galo' }
    ],
    'SAO-PAL-2014-11-09': [
      { type: 'goal',   half: 1, minute: 28, player: 'Pato',
        text: '1x0 São Paulo' },
      { type: 'goal',   half: 2, minute:  8, player: 'Henrique',
        text: '1x1 Palmeiras' },
      { type: 'goal',   half: 2, minute: 39, player: 'Ganso',
        text: '2x1 São Paulo — vitória no clássico' }
    ]

  };
}());
