module.exports = (function () {
  'use strict';

  // Eventos da Copa América 2015 organizados por chave da partida.
  // Chave = HOME-AWAY-YYYY-MM-DD. Os artilheiros usados são os reais do
  // torneio (Vargas e Guerrero terminaram empatados com 4 gols cada).

  return {

    // ===== Grupo B =====
    'URU-JAM-2015-06-13': [
      { type: 'goal',   half: 2, minute:  7, player: 'Cristian Rodríguez',
        text: '1x0 Uruguai' }
    ],
    'ARG-PAR-2015-06-14': [
      { type: 'goal',   half: 1, minute: 28, player: 'Agüero',
        text: '1x0 Argentina' },
      { type: 'goal',   half: 1, minute: 35, player: 'Messi',
        text: '2x0 Argentina — pênalti' },
      { type: 'goal',   half: 2, minute: 15, player: 'Barrios',
        text: '2x1 Paraguai' },
      { type: 'goal',   half: 2, minute: 44, player: 'Pablo González',
        text: '2x2 Paraguai — empate no fim' }
    ],
    'PAR-JAM-2015-06-16': [
      { type: 'goal',   half: 1, minute: 33, player: 'Roque Santa Cruz',
        text: '1x0 Paraguai' }
    ],
    'ARG-URU-2015-06-17': [
      { type: 'red',    half: 1, minute: 38, player: 'Cavani',
        text: 'Cotovelada em Otamendi' },
      { type: 'goal',   half: 2, minute: 12, player: 'Agüero',
        text: '1x0 Argentina' }
    ],
    'URU-PAR-2015-06-20': [
      { type: 'goal',   half: 2, minute:  5, player: 'Da Silva',
        text: '1x0 Uruguai' },
      { type: 'goal',   half: 2, minute: 18, player: 'Estigarribia',
        text: '1x1 Paraguai' }
    ],
    'ARG-JAM-2015-06-20': [
      { type: 'goal',   half: 1, minute: 10, player: 'Higuaín',
        text: '1x0 Argentina' }
    ],

    // ===== Grupo C =====
    'COL-VEN-2015-06-14': [
      { type: 'goal',   half: 2, minute: 17, player: 'Vizcarrondo',
        text: '0x1 Venezuela — zaga vinotinto resolve' }
    ],
    'BRA-PER-2015-06-15': [
      { type: 'goal',   half: 1, minute:  3, player: 'Cueva',
        text: '0x1 Peru' },
      { type: 'goal',   half: 1, minute: 39, player: 'Neymar',
        assist: 'Daniel Alves', text: '1x1 Brasil' },
      { type: 'goal',   half: 2, minute: 46, player: 'Douglas Costa',
        text: '2x1 Brasil — vira no apagar das luzes' }
    ],
    'BRA-COL-2015-06-18': [
      { type: 'goal',   half: 1, minute: 36, player: 'Murillo',
        text: '0x1 Colômbia' },
      { type: 'red',    half: 2, minute: 47, player: 'Neymar',
        text: 'Discussão após o apito final — suspenso' }
    ],
    'PER-VEN-2015-06-18': [
      { type: 'goal',   half: 2, minute: 27, player: 'Pizarro',
        text: '1x0 Peru' }
    ],
    'COL-PER-2015-06-21': [
      { type: 'yellow', half: 2, minute: 12, player: 'Falcao' },
      { type: 'comment', half: 2, minute: 47,
        text: 'Sem gols; Colômbia e Peru se classificam' }
    ],
    'BRA-VEN-2015-06-21': [
      { type: 'goal',   half: 1, minute: 24, player: 'Miku',
        text: '0x1 Venezuela' },
      { type: 'goal',   half: 2, minute:  6, player: 'Thiago Silva',
        text: '1x1 Brasil' },
      { type: 'goal',   half: 2, minute: 25, player: 'Roberto Firmino',
        text: '2x1 Brasil — segue em 1º do grupo' }
    ],

    // ===== Quartas de Final =====
    'CHI-URU-2015-06-25': [
      { type: 'red',    half: 2, minute: 18, player: 'Cavani',
        text: '2º amarelo após confusão com Jara' },
      { type: 'goal',   half: 2, minute: 36, player: 'Mauricio Isla',
        text: '1x0 Chile — classifica' }
    ],
    'BOL-PER-2015-06-25': [
      { type: 'goal',   half: 1, minute: 20, player: 'Cueva',
        text: '0x1 Peru' },
      { type: 'goal',   half: 1, minute: 44, player: 'Marcelo Moreno',
        text: '1x1 Bolívia — pênalti' },
      { type: 'goal',   half: 2, minute: 29, player: 'Paolo Guerrero',
        text: '1x2 Peru' },
      { type: 'goal',   half: 2, minute: 38, player: 'Paolo Guerrero',
        text: '1x3 Peru — vaga na semifinal' }
    ],
    'ARG-COL-2015-06-27': [
      { type: 'kickoff',   half: 1, minute:  0, text: 'Início da partida' },
      { type: 'half_time', half: 1, minute: 47, text: 'Intervalo' },
      { type: 'comment',   half: 4, minute: 30,
        text: 'Argentina vence 5x4 nos pênaltis (Cuadrado perdeu)' }
    ],
    'BRA-PAR-2015-06-28': [
      { type: 'goal',   half: 1, minute: 15, player: 'Robinho',
        text: '1x0 Brasil' },
      { type: 'goal',   half: 2, minute: 27, player: 'Derlis González',
        text: '1x1 Paraguai — pênalti' },
      { type: 'comment', half: 4, minute: 30,
        text: 'Paraguai vence 4x3 nos pênaltis; Brasil eliminado' }
    ],

    // ===== Semifinais =====
    'CHI-PER-2015-06-30': [
      { type: 'red',    half: 1, minute: 21, player: 'Carlos Zambrano' },
      { type: 'goal',   half: 1, minute: 42, player: 'Eduardo Vargas',
        assist: 'Marcelo Díaz', text: '1x0 Chile' },
      { type: 'goal',   half: 2, minute: 14, player: 'Eduardo Vargas',
        assist: 'Aránguiz', text: '2x0 Chile' },
      { type: 'goal',   half: 2, minute: 15, player: 'Paolo Guerrero',
        text: '2x1 Peru' },
      { type: 'red',    half: 2, minute: 33, player: 'Gary Medel' }
    ],
    'ARG-PAR-2015-07-01': [
      { type: 'goal',   half: 1, minute: 15, player: 'Pastore',
        text: '1x0 Argentina' },
      { type: 'goal',   half: 1, minute: 16, player: 'Lucena',
        text: '1x1 Paraguai' },
      { type: 'goal',   half: 1, minute: 26, player: 'Di María',
        text: '2x1 Argentina' },
      { type: 'goal',   half: 1, minute: 28, player: 'Agüero',
        text: '3x1 Argentina' },
      { type: 'goal',   half: 1, minute: 32, player: 'Higuaín',
        text: '4x1 Argentina' },
      { type: 'goal',   half: 2, minute:  8, player: 'Higuaín',
        text: '5x1 Argentina' },
      { type: 'goal',   half: 2, minute: 15, player: 'Lavezzi',
        text: '6x1 Argentina — goleada histórica' }
    ],

    // ===== Disputa de 3º — Peru 2×0 Paraguai =====
    'PER-PAR-2015-07-04': [
      { type: 'goal',   half: 2, minute:  3, player: 'Paolo Guerrero',
        text: '1x0 Peru' },
      { type: 'goal',   half: 2, minute: 43, player: 'André Carrillo',
        text: '2x0 Peru — Guerrero artilheiro do torneio (4 gols)' }
    ],

    // ===== Final — Chile 0×0 Argentina (4x1 pen) =====
    'CHI-ARG-2015-07-05': [
      { type: 'kickoff',   half: 1, minute:  0,
        text: 'Início da final em Santiago' },
      { type: 'half_time', half: 1, minute: 47, text: 'Intervalo' },
      { type: 'comment',   half: 2, minute: 47,
        text: 'Sem gols no tempo regulamentar; vai pra prorrogação' },
      { type: 'comment',   half: 4, minute: 30,
        text: 'Bravo brilha; Chile 4x1 nos pênaltis — campeão pela 1ª vez' },
      { type: 'full_time', half: 4, minute: 31, text: 'Chile campeão!' }
    ],

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
        assist: 'Arturo Vidal', text: '2x2 Chile' },
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
