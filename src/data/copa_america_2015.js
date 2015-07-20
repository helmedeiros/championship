module.exports = (function () {
  'use strict';

  // Copa América 2015 — Chile. 12 seleções em 3 grupos de 4 +
  // mata-mata. Campeão: Chile (1×1 / 4×1 pen contra Argentina).
  // Aqui carregamos as 12 seleções e a fase de grupos completa
  // (18 jogos) + as 4 quartas + 2 semis + 3º lugar + final.

  function ctx(round, group, date) {
    return { round: round, group: group, date: date };
  }
  function m(home, hs, as, away, meta) {
    return {
      home: home, away: away,
      homeScore: hs, awayScore: as,
      status: 'finished',
      kickoff: meta.date,
      round: meta.round,
      group: meta.group
    };
  }

  return {
    championship: {
      id:      'copa-america-2015',
      name:    'Copa América 2015',
      season:  2015,
      country: 'CL',
      format:  'groups-knockout',
      tiebreakers: ['points', 'goal_diff', 'goals_for', 'head_to_head']
    },
    teams: [
      { id: 'CHI', name: 'Chile',     'short': 'CHI', stadium: 'Estadio Nacional' },
      { id: 'MEX', name: 'México',    'short': 'MEX' },
      { id: 'ECU', name: 'Equador',   'short': 'ECU' },
      { id: 'BOL', name: 'Bolívia',   'short': 'BOL' },
      { id: 'ARG', name: 'Argentina', 'short': 'ARG' },
      { id: 'URU', name: 'Uruguai',   'short': 'URU' },
      { id: 'PAR', name: 'Paraguai',  'short': 'PAR' },
      { id: 'JAM', name: 'Jamaica',   'short': 'JAM' },
      { id: 'BRA', name: 'Brasil',    'short': 'BRA' },
      { id: 'COL', name: 'Colômbia',  'short': 'COL' },
      { id: 'PER', name: 'Peru',      'short': 'PER' },
      { id: 'VEN', name: 'Venezuela', 'short': 'VEN' }
    ],
    matches: matchesBuild()
  };

  function matchesBuild() {
    return [
      // Grupo A
      m('CHI', 2, 0, 'ECU', ctx('grupos', 'A', '2015-06-11T22:30:00Z')),
      m('MEX', 0, 0, 'BOL', ctx('grupos', 'A', '2015-06-12T22:00:00Z')),
      m('ECU', 2, 3, 'BOL', ctx('grupos', 'A', '2015-06-15T22:00:00Z')),
      m('CHI', 3, 3, 'MEX', ctx('grupos', 'A', '2015-06-16T01:30:00Z')),
      m('MEX', 1, 2, 'ECU', ctx('grupos', 'A', '2015-06-19T22:00:00Z')),
      m('CHI', 5, 0, 'BOL', ctx('grupos', 'A', '2015-06-20T01:30:00Z')),
      // Grupo B
      m('URU', 1, 0, 'JAM', ctx('grupos', 'B', '2015-06-13T22:30:00Z')),
      m('ARG', 2, 2, 'PAR', ctx('grupos', 'B', '2015-06-14T01:30:00Z')),
      m('PAR', 1, 0, 'JAM', ctx('grupos', 'B', '2015-06-16T22:30:00Z')),
      m('ARG', 1, 0, 'URU', ctx('grupos', 'B', '2015-06-17T01:30:00Z')),
      m('URU', 1, 1, 'PAR', ctx('grupos', 'B', '2015-06-20T18:00:00Z')),
      m('ARG', 1, 0, 'JAM', ctx('grupos', 'B', '2015-06-20T22:30:00Z')),
      // Grupo C
      m('COL', 0, 1, 'VEN', ctx('grupos', 'C', '2015-06-14T22:30:00Z')),
      m('BRA', 2, 1, 'PER', ctx('grupos', 'C', '2015-06-15T01:30:00Z')),
      m('BRA', 0, 1, 'COL', ctx('grupos', 'C', '2015-06-18T01:30:00Z')),
      m('PER', 1, 0, 'VEN', ctx('grupos', 'C', '2015-06-18T22:30:00Z')),
      m('COL', 0, 0, 'PER', ctx('grupos', 'C', '2015-06-21T18:00:00Z')),
      m('BRA', 1, 2, 'VEN', ctx('grupos', 'C', '2015-06-21T22:00:00Z')),
      // Quartas
      m('CHI', 1, 0, 'URU', ctx('quartas', null, '2015-06-25T01:30:00Z')),
      m('BOL', 1, 3, 'PER', ctx('quartas', null, '2015-06-25T22:30:00Z')),
      m('ARG', 0, 0, 'COL', ctx('quartas', null, '2015-06-27T01:30:00Z')),
      m('BRA', 1, 1, 'PAR', ctx('quartas', null, '2015-06-28T01:30:00Z')),
      // Semis
      m('CHI', 2, 1, 'PER', ctx('semi',  null, '2015-06-30T01:30:00Z')),
      m('ARG', 6, 1, 'PAR', ctx('semi',  null, '2015-07-01T01:30:00Z')),
      // 3º lugar
      m('PER', 2, 0, 'PAR', ctx('terceiro', null, '2015-07-04T00:00:00Z')),
      // Final — Chile 0×0 Argentina, Chile campeão 4×1 nos pênaltis
      m('CHI', 0, 0, 'ARG', ctx('final', null, '2015-07-05T00:00:00Z'))
    ];
  }
}());
