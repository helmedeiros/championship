module.exports = (function () {
  'use strict';

  // Copa do Mundo de 2014 — 32 seleções em 8 grupos de 4.
  // Estádios traduzidos para o português usado na transmissão brasileira.

  return {
    championship: {
      id:      'world-cup-2014',
      name:    'Copa do Mundo FIFA 2014',
      season:  2014,
      country: 'BR',
      format:  'groups-knockout',
      tiebreakers: ['points', 'wins', 'goal_diff', 'goals_for', 'head_to_head']
    },
    teams: [
      // Grupo A
      { id: 'BRA', name: 'Brasil',        'short': 'BRA' },
      { id: 'CRO', name: 'Croácia',       'short': 'CRO' },
      { id: 'MEX', name: 'México',        'short': 'MEX' },
      { id: 'CMR', name: 'Camarões',      'short': 'CMR' },
      // Grupo B
      { id: 'ESP', name: 'Espanha',       'short': 'ESP' },
      { id: 'NED', name: 'Holanda',       'short': 'NED' },
      { id: 'CHI', name: 'Chile',         'short': 'CHI' },
      { id: 'AUS', name: 'Austrália',     'short': 'AUS' },
      // Grupo C
      { id: 'COL', name: 'Colômbia',      'short': 'COL' },
      { id: 'GRE', name: 'Grécia',        'short': 'GRE' },
      { id: 'CIV', name: 'Costa do Marfim', 'short': 'CIV' },
      { id: 'JPN', name: 'Japão',         'short': 'JPN' },
      // Grupo D
      { id: 'URU', name: 'Uruguai',       'short': 'URU' },
      { id: 'CRC', name: 'Costa Rica',    'short': 'CRC' },
      { id: 'ENG', name: 'Inglaterra',    'short': 'ENG' },
      { id: 'ITA', name: 'Itália',        'short': 'ITA' },
      // Grupo E
      { id: 'SUI', name: 'Suíça',         'short': 'SUI' },
      { id: 'ECU', name: 'Equador',       'short': 'ECU' },
      { id: 'FRA', name: 'França',        'short': 'FRA' },
      { id: 'HON', name: 'Honduras',      'short': 'HON' },
      // Grupo F
      { id: 'ARG', name: 'Argentina',     'short': 'ARG' },
      { id: 'BIH', name: 'Bósnia',        'short': 'BIH' },
      { id: 'IRN', name: 'Irã',           'short': 'IRN' },
      { id: 'NGA', name: 'Nigéria',       'short': 'NGA' },
      // Grupo G
      { id: 'GER', name: 'Alemanha',      'short': 'GER' },
      { id: 'POR', name: 'Portugal',      'short': 'POR' },
      { id: 'GHA', name: 'Gana',          'short': 'GHA' },
      { id: 'USA', name: 'Estados Unidos', 'short': 'USA' },
      // Grupo H
      { id: 'BEL', name: 'Bélgica',       'short': 'BEL' },
      { id: 'ALG', name: 'Argélia',       'short': 'ALG' },
      { id: 'RUS', name: 'Rússia',        'short': 'RUS' },
      { id: 'KOR', name: 'Coreia do Sul', 'short': 'KOR' }
    ],
    matches: []
  };
}());
