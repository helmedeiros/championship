module.exports = (function () {
  'use strict';

  // Brasileirão Série A 2014 — 20 clubes em pontos corridos com ida e volta.
  // O campeão foi o Cruzeiro com 80 pontos. Aqui usamos um subconjunto das
  // partidas mais marcantes do campeonato para popular a tela rapidamente.

  var EVENTS = require('./brasileirao_2014_events');

  function attachEvents(list) {
    list.forEach(function (m) {
      var key = m.home + '-' + m.away + '-' + m.kickoff.slice(0, 10);
      if (EVENTS[key]) { m.events = EVENTS[key]; }
    });
    return list;
  }

  return {
    championship: {
      id:      'brasileirao-2014',
      name:    'Brasileirão Série A 2014',
      season:  2014,
      country: 'BR',
      version: 2,
      format:  'double-round-robin',
      tiebreakers: ['points', 'wins', 'goal_diff', 'goals_for', 'head_to_head']
    },
    teams: [
      { id: 'CRU', name: 'Cruzeiro',       'short': 'CRU', city: 'Belo Horizonte',
        stadium: 'Mineirão' },
      { id: 'SAO', name: 'São Paulo',      'short': 'SAO', city: 'São Paulo',
        stadium: 'Morumbi' },
      { id: 'INT', name: 'Internacional',  'short': 'INT', city: 'Porto Alegre',
        stadium: 'Beira-Rio' },
      { id: 'COR', name: 'Corinthians',    'short': 'COR', city: 'São Paulo',
        stadium: 'Arena Corinthians' },
      { id: 'CAM', name: 'Atlético-MG',    'short': 'CAM', city: 'Belo Horizonte',
        stadium: 'Independência' },
      { id: 'GRE', name: 'Grêmio',         'short': 'GRE', city: 'Porto Alegre',
        stadium: 'Arena do Grêmio' },
      { id: 'FLU', name: 'Fluminense',     'short': 'FLU', city: 'Rio de Janeiro',
        stadium: 'Maracanã' },
      { id: 'VAS', name: 'Vasco da Gama',  'short': 'VAS', city: 'Rio de Janeiro',
        stadium: 'São Januário' },
      { id: 'BOT', name: 'Botafogo',       'short': 'BOT', city: 'Rio de Janeiro',
        stadium: 'Engenhão' },
      { id: 'GOI', name: 'Goiás',          'short': 'GOI', city: 'Goiânia',
        stadium: 'Serra Dourada' },
      { id: 'CFC', name: 'Coritiba',       'short': 'CFC', city: 'Curitiba',
        stadium: 'Couto Pereira' },
      { id: 'PAL', name: 'Palmeiras',      'short': 'PAL', city: 'São Paulo',
        stadium: 'Allianz Parque' },
      { id: 'SPT', name: 'Sport',          'short': 'SPT', city: 'Recife',
        stadium: 'Ilha do Retiro' },
      { id: 'CAP', name: 'Atlético-PR',    'short': 'CAP', city: 'Curitiba',
        stadium: 'Arena da Baixada' },
      { id: 'BAH', name: 'Bahia',          'short': 'BAH', city: 'Salvador',
        stadium: 'Arena Fonte Nova' },
      { id: 'FIG', name: 'Figueirense',    'short': 'FIG', city: 'Florianópolis',
        stadium: 'Orlando Scarpelli' },
      { id: 'CHA', name: 'Chapecoense',    'short': 'CHA', city: 'Chapecó',
        stadium: 'Arena Condá' },
      { id: 'SAN', name: 'Santos',         'short': 'SAN', city: 'Santos',
        stadium: 'Vila Belmiro' },
      { id: 'FLA', name: 'Flamengo',       'short': 'FLA', city: 'Rio de Janeiro',
        stadium: 'Maracanã' },
      { id: 'CRI', name: 'Criciúma',       'short': 'CRI', city: 'Criciúma',
        stadium: 'Heriberto Hülse' }
    ],
    matches: attachEvents(matchesBuild())
  };

  function r(home, hs, as, away, meta) {
    return {
      home: home, away: away,
      homeScore: hs, awayScore: as,
      status: 'finished',
      kickoff: meta[1],
      round: meta[0],
      group: null
    };
  }
  function rd(round, date) { return [round, date]; }

  function matchesBuild() {
    return [
      // Última rodada (38) — Cruzeiro já campeão, decisões de zona
      r('CRI', 0, 2, 'CRU', rd(38, '2014-12-07T19:00:00Z')),
      r('BAH', 1, 2, 'COR', rd(38, '2014-12-07T19:00:00Z')),
      r('PAL', 4, 0, 'SPT', rd(38, '2014-12-07T19:00:00Z')),
      r('SAO', 0, 4, 'SAN', rd(38, '2014-12-07T19:00:00Z')),
      r('FLU', 5, 0, 'CAP', rd(38, '2014-12-07T19:00:00Z')),
      r('INT', 2, 2, 'CFC', rd(38, '2014-12-07T19:00:00Z')),
      r('GRE', 3, 4, 'VAS', rd(38, '2014-12-07T19:00:00Z')),
      r('CHA', 4, 1, 'CAM', rd(38, '2014-12-07T19:00:00Z')),
      r('FIG', 1, 0, 'GOI', rd(38, '2014-12-07T19:00:00Z')),
      r('BOT', 0, 1, 'FLA', rd(38, '2014-12-07T19:00:00Z')),
      // Recortes de outros confrontos marcantes do ano
      r('COR', 1, 1, 'SAO', rd(12, '2014-08-10T16:00:00Z')),
      r('FLA', 1, 2, 'FLU', rd(15, '2014-09-07T16:00:00Z')),
      r('GRE', 2, 1, 'INT', rd(18, '2014-09-28T16:00:00Z')),
      r('CAM', 1, 0, 'CRU', rd(22, '2014-10-19T16:00:00Z')),
      r('SAO', 2, 1, 'PAL', rd(27, '2014-11-09T17:00:00Z'))
    ];
  }
}());
