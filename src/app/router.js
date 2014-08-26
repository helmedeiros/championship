module.exports = (function () {
  'use strict';

  return {

    routes: {
      '':                       'home',
      'campeonatos':            'championshipsList',
      'campeonatos/:id':        'championshipsShow',
      'partidas/:id':           'matchShow',
      'times':                  'teamsList',
      'times/:id':              'teamsShow',
      'importar':               'importer',
      'admin':                  'admin.home',
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
