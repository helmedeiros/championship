module.exports = (function () {
  'use strict';

  // Brasileirão Série A 2014 — 20 clubes em pontos corridos com ida e volta.
  // O campeão foi o Cruzeiro com 80 pontos. Aqui usamos um subconjunto das
  // partidas mais marcantes do campeonato para popular a tela rapidamente.

  return {
    championship: {
      id:      'brasileirao-2014',
      name:    'Brasileirão Série A 2014',
      season:  2014,
      country: 'BR',
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
    matches: []
  };
}());
