module.exports = (function () {
  'use strict';

  return {

    routes: {
      '':                       'home',
      'campeonatos':            'championshipsList',
      'campeonatos/:id':        'championshipsShow',
      'partidas':               'matchesList',
      'partidas/:id':           'matchShow',
      'partidas/compartilhada/:token': 'matchShared',
      'times':                  'teamsList',
      'times/:id':              'teamsShow',
      'h2h/:teamA/:teamB':      'h2hShow',
      'importar':               'importer',
      'admin':                  'admin.home',
      'admin/setup':            'adminSetup',
      'admin/campeonatos':      'admin.championshipsList',
      'admin/campeonatos/novo': 'admin.championshipNew',
      'admin/times':            'admin.teamsList',
      'admin/times/novo':       'admin.teamNew',
      'admin/times/:id':        'admin.teamEdit',
      'admin/partidas/:id/scoreboard': 'admin.scoreboard',
      'nao-encontrado':         'notFound'
    },

    adminPrefix: 'admin/'

  };
}());
