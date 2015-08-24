module.exports = (function () {
  'use strict';

  // Copa do Mundo de 2014 — 32 seleções em 8 grupos de 4.
  // Datas no formato ISO em UTC; os jogos reais começavam normalmente às
  // 13:00, 16:00 ou 17:00 horário de Brasília.

  var EVENTS = require('./world_cup_2014_events');

  function m(home, hs, as, away, meta) {
    return {
      home: home, away: away,
      homeScore: hs, awayScore: as,
      status: 'finished',
      kickoff: meta[2],
      round: meta[0],
      group: meta[1]
    };
  }
  function ctx(round, group, date) {
    return [round, group, date];
  }
  function attachEvents(matches) {
    matches.forEach(function (match) {
      var key = match.home + '-' + match.away + '-' + match.kickoff.slice(0, 10);
      if (EVENTS[key]) { match.events = EVENTS[key]; }
    });
    return matches;
  }

  var GROUP_MATCHES = [
    // Grupo A
    m('BRA', 3, 1, 'CRO', ctx(1, 'Grupo A', '2014-06-12T20:00:00Z')),
    m('MEX', 1, 0, 'CMR', ctx(1, 'Grupo A', '2014-06-13T16:00:00Z')),
    m('BRA', 0, 0, 'MEX', ctx(2, 'Grupo A', '2014-06-17T19:00:00Z')),
    m('CMR', 0, 4, 'CRO', ctx(2, 'Grupo A', '2014-06-18T22:00:00Z')),
    m('CMR', 1, 4, 'BRA', ctx(3, 'Grupo A', '2014-06-23T20:00:00Z')),
    m('CRO', 1, 3, 'MEX', ctx(3, 'Grupo A', '2014-06-23T20:00:00Z')),
    // Grupo B
    m('ESP', 1, 5, 'NED', ctx(1, 'Grupo B', '2014-06-13T19:00:00Z')),
    m('CHI', 3, 1, 'AUS', ctx(1, 'Grupo B', '2014-06-13T22:00:00Z')),
    m('AUS', 2, 3, 'NED', ctx(2, 'Grupo B', '2014-06-18T16:00:00Z')),
    m('ESP', 0, 2, 'CHI', ctx(2, 'Grupo B', '2014-06-18T19:00:00Z')),
    m('AUS', 0, 3, 'ESP', ctx(3, 'Grupo B', '2014-06-23T16:00:00Z')),
    m('NED', 2, 0, 'CHI', ctx(3, 'Grupo B', '2014-06-23T16:00:00Z')),
    // Grupo C
    m('COL', 3, 0, 'GRE', ctx(1, 'Grupo C', '2014-06-14T16:00:00Z')),
    m('CIV', 2, 1, 'JPN', ctx(1, 'Grupo C', '2014-06-14T22:00:00Z')),
    m('COL', 2, 1, 'CIV', ctx(2, 'Grupo C', '2014-06-19T16:00:00Z')),
    m('JPN', 0, 0, 'GRE', ctx(2, 'Grupo C', '2014-06-19T22:00:00Z')),
    m('COL', 4, 1, 'JPN', ctx(3, 'Grupo C', '2014-06-24T20:00:00Z')),
    m('GRE', 2, 1, 'CIV', ctx(3, 'Grupo C', '2014-06-24T20:00:00Z')),
    // Grupo D
    m('URU', 1, 3, 'CRC', ctx(1, 'Grupo D', '2014-06-14T19:00:00Z')),
    m('ENG', 1, 2, 'ITA', ctx(1, 'Grupo D', '2014-06-14T22:00:00Z')),
    m('URU', 2, 1, 'ENG', ctx(2, 'Grupo D', '2014-06-19T19:00:00Z')),
    m('ITA', 0, 1, 'CRC', ctx(2, 'Grupo D', '2014-06-20T16:00:00Z')),
    m('ITA', 0, 1, 'URU', ctx(3, 'Grupo D', '2014-06-24T16:00:00Z')),
    m('CRC', 0, 0, 'ENG', ctx(3, 'Grupo D', '2014-06-24T16:00:00Z')),
    // Grupo E
    m('SUI', 2, 1, 'ECU', ctx(1, 'Grupo E', '2014-06-15T16:00:00Z')),
    m('FRA', 3, 0, 'HON', ctx(1, 'Grupo E', '2014-06-15T19:00:00Z')),
    m('SUI', 2, 5, 'FRA', ctx(2, 'Grupo E', '2014-06-20T19:00:00Z')),
    m('HON', 1, 2, 'ECU', ctx(2, 'Grupo E', '2014-06-20T22:00:00Z')),
    m('HON', 0, 3, 'SUI', ctx(3, 'Grupo E', '2014-06-25T20:00:00Z')),
    m('ECU', 0, 0, 'FRA', ctx(3, 'Grupo E', '2014-06-25T20:00:00Z')),
    // Grupo F
    m('ARG', 2, 1, 'BIH', ctx(1, 'Grupo F', '2014-06-15T22:00:00Z')),
    m('IRN', 0, 0, 'NGA', ctx(1, 'Grupo F', '2014-06-16T19:00:00Z')),
    m('ARG', 1, 0, 'IRN', ctx(2, 'Grupo F', '2014-06-21T16:00:00Z')),
    m('NGA', 1, 0, 'BIH', ctx(2, 'Grupo F', '2014-06-21T22:00:00Z')),
    m('NGA', 2, 3, 'ARG', ctx(3, 'Grupo F', '2014-06-25T16:00:00Z')),
    m('BIH', 3, 1, 'IRN', ctx(3, 'Grupo F', '2014-06-25T16:00:00Z')),
    // Grupo G
    m('GER', 4, 0, 'POR', ctx(1, 'Grupo G', '2014-06-16T16:00:00Z')),
    m('GHA', 1, 2, 'USA', ctx(1, 'Grupo G', '2014-06-16T22:00:00Z')),
    m('GER', 2, 2, 'GHA', ctx(2, 'Grupo G', '2014-06-21T19:00:00Z')),
    m('USA', 2, 2, 'POR', ctx(2, 'Grupo G', '2014-06-22T22:00:00Z')),
    m('USA', 0, 1, 'GER', ctx(3, 'Grupo G', '2014-06-26T16:00:00Z')),
    m('POR', 2, 1, 'GHA', ctx(3, 'Grupo G', '2014-06-26T16:00:00Z')),
    // Grupo H
    m('BEL', 2, 1, 'ALG', ctx(1, 'Grupo H', '2014-06-17T16:00:00Z')),
    m('RUS', 1, 1, 'KOR', ctx(1, 'Grupo H', '2014-06-17T22:00:00Z')),
    m('BEL', 1, 0, 'RUS', ctx(2, 'Grupo H', '2014-06-22T16:00:00Z')),
    m('KOR', 2, 4, 'ALG', ctx(2, 'Grupo H', '2014-06-22T19:00:00Z')),
    m('KOR', 0, 1, 'BEL', ctx(3, 'Grupo H', '2014-06-26T20:00:00Z')),
    m('ALG', 1, 1, 'RUS', ctx(3, 'Grupo H', '2014-06-26T20:00:00Z'))
  ];

  var KNOCKOUT_MATCHES = [
    // Oitavas
    m('BRA', 1, 1, 'CHI', ctx(4, 'Oitavas',   '2014-06-28T17:00:00Z')),
    m('COL', 2, 0, 'URU', ctx(4, 'Oitavas',   '2014-06-28T21:00:00Z')),
    m('NED', 2, 1, 'MEX', ctx(4, 'Oitavas',   '2014-06-29T17:00:00Z')),
    m('CRC', 1, 1, 'GRE', ctx(4, 'Oitavas',   '2014-06-29T21:00:00Z')),
    m('FRA', 2, 0, 'NGA', ctx(4, 'Oitavas',   '2014-06-30T17:00:00Z')),
    m('GER', 2, 1, 'ALG', ctx(4, 'Oitavas',   '2014-06-30T21:00:00Z')),
    m('ARG', 1, 0, 'SUI', ctx(4, 'Oitavas',   '2014-07-01T17:00:00Z')),
    m('BEL', 2, 1, 'USA', ctx(4, 'Oitavas',   '2014-07-01T21:00:00Z')),
    // Quartas
    m('FRA', 0, 1, 'GER', ctx(5, 'Quartas',   '2014-07-04T17:00:00Z')),
    m('BRA', 2, 1, 'COL', ctx(5, 'Quartas',   '2014-07-04T21:00:00Z')),
    m('ARG', 1, 0, 'BEL', ctx(5, 'Quartas',   '2014-07-05T17:00:00Z')),
    m('NED', 0, 0, 'CRC', ctx(5, 'Quartas',   '2014-07-05T21:00:00Z')),
    // Semifinais
    m('BRA', 1, 7, 'GER', ctx(6, 'Semifinais', '2014-07-08T21:00:00Z')),
    m('NED', 0, 0, 'ARG', ctx(6, 'Semifinais', '2014-07-09T21:00:00Z')),
    // Terceiro lugar
    m('BRA', 0, 3, 'NED', ctx(7, 'Disputa de 3º', '2014-07-12T21:00:00Z')),
    // Final
    m('GER', 1, 0, 'ARG', ctx(7, 'Final',      '2014-07-13T19:00:00Z'))
  ];

  return {
    championship: {
      id:      'world-cup-2014',
      name:    'Copa do Mundo FIFA 2014',
      season:  2014,
      country: 'BR',
      version: 2,
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
    matches: attachEvents(GROUP_MATCHES.concat(KNOCKOUT_MATCHES))
  };
}());
