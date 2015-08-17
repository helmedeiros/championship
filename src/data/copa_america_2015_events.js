module.exports = (function () {
  'use strict';

  // Eventos da Copa América 2015 organizados por chave da partida.
  // Chave = HOME-AWAY-YYYY-MM-DD. Os artilheiros usados são os reais do
  // torneio (Vargas e Guerrero terminaram empatados com 4 gols cada).

  return {

    // ===== Grupo A =====
    'CHI-ECU-2015-06-11': [
      { type: 'goal',   half: 2, minute: 22, player: 'Arturo Vidal',
        text: '1x0 Chile — pênalti' },
      { type: 'goal',   half: 2, minute: 43, player: 'Eduardo Vargas',
        text: '2x0 Chile' }
    ],
    'MEX-BOL-2015-06-12': [
      { type: 'yellow', half: 1, minute: 30, player: 'Layún' },
      { type: 'comment', half: 2, minute: 47,
        text: 'Empate sem gols; Ochoa garante' }
    ],
    'ECU-BOL-2015-06-15': [
      { type: 'goal',   half: 1, minute: 29, player: 'Bejarano',
        text: '0x1 Bolívia' },
      { type: 'goal',   half: 1, minute: 44, player: 'Bolaños',
        text: '1x1 Equador' },
      { type: 'goal',   half: 2, minute:  8, player: 'Smedberg-Dalence',
        text: '1x2 Bolívia' },
      { type: 'goal',   half: 2, minute: 31, player: 'Martínez',
        text: '2x2 Equador' },
      { type: 'goal',   half: 2, minute: 39, player: 'Marcelo Moreno',
        text: '2x3 Bolívia' }
    ],
    'CHI-MEX-2015-06-16': [
      { type: 'goal',   half: 1, minute: 20, player: 'Arturo Vidal',
        text: '1x0 Chile — pênalti' },
      { type: 'goal',   half: 1, minute: 24, player: 'Beltrán (CT)',
        text: '1x1 México — gol contra' },
      { type: 'goal',   half: 2, minute:  7, player: 'Aquino',
        text: '1x2 México' },
      { type: 'goal',   half: 2, minute: 21, player: 'Alexis Sánchez',
        text: '2x2 Chile' },
      { type: 'goal',   half: 2, minute: 45, player: 'Vázquez',
        text: '2x3 México' },
      { type: 'goal',   half: 2, minute: 46, player: 'Eduardo Vargas',
        text: '3x3 Chile — empate dramático' }
    ],
    'MEX-ECU-2015-06-19': [
      { type: 'goal',   half: 1, minute: 24, player: 'Achilier',
        text: '0x1 Equador' },
      { type: 'goal',   half: 1, minute: 39, player: 'Bolaños',
        text: '1x1 México' },
      { type: 'goal',   half: 2, minute: 44, player: 'Caicedo',
        text: '1x2 Equador' }
    ],
    'CHI-BOL-2015-06-20': [
      { type: 'goal',   half: 1, minute: 24, player: 'Arturo Vidal',
        text: '1x0 Chile — pênalti' },
      { type: 'goal',   half: 2, minute:  6, player: 'Eduardo Vargas',
        text: '2x0 Chile' },
      { type: 'goal',   half: 2, minute: 21, player: 'Aránguiz',
        text: '3x0 Chile' },
      { type: 'goal',   half: 2, minute: 37, player: 'Aránguiz',
        text: '4x0 Chile' },
      { type: 'goal',   half: 2, minute: 46, player: 'Alexis Sánchez',
        text: '5x0 Chile — pênalti, encerra com goleada' }
    ]

  };
}());
