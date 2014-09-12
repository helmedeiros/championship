module.exports = (function () {
  'use strict';

  function Controller(deps) {
    this.app = deps.app;
    this.Marionette = deps.Marionette;
  }

  function placeholder(Marionette, title, body) {
    return new (Marionette.ItemView.extend({
      template: function () {
        return '<h2>' + title + '</h2><p class="lead">' + body + '</p>';
      }
    }))();
  }

  Controller.prototype._show = function (view) {
    var main = this.app.getRegion('mainRegion');
    if (main) { main.show(view); }
  };

  Controller.prototype.home = function () {
    this._show(placeholder(this.Marionette, 'championship',
      'Bem-vindo. Navegue pelos times e campeonatos no menu.'));
  };

  Controller.prototype.championshipsList = function () {
    this._show(placeholder(this.Marionette, 'Campeonatos',
      'Em breve: lista de campeonatos.'));
  };

  Controller.prototype.championshipsShow = function (id) {
    this._show(placeholder(this.Marionette, 'Campeonato ' + id,
      'Em breve: detalhes do campeonato.'));
  };

  Controller.prototype.matchShow = function (id) {
    this._show(placeholder(this.Marionette, 'Partida ' + id,
      'Em breve: ao vivo e estatísticas da partida.'));
  };

  Controller.prototype.teamsShow = function (id) {
    this._show(placeholder(this.Marionette, 'Time ' + id,
      'Em breve: detalhes do time.'));
  };

  Controller.prototype.importer = function () {
    this._show(placeholder(this.Marionette, 'Importar',
      'Em breve: importação de Copa do Mundo e Brasileirão.'));
  };

  Controller.prototype.notFound = function () {
    this._show(placeholder(this.Marionette, 'Página não encontrada',
      'A rota acessada não existe ou ainda não foi implementada.'));
  };

  // Admin handlers reuse the same placeholder pattern for now.
  ['admin.home', 'admin.championshipsList', 'admin.championshipNew',
   'admin.teamsList', 'admin.teamNew', 'admin.teamEdit',
   'admin.scoreboard'].forEach(function (name) {
    Controller.prototype[name] = function () {
      this._show(placeholder(this.Marionette, 'Admin / ' + name,
        'Em breve: ferramenta da área administrativa.'));
    };
  });

  module.exports = Controller;
  return Controller;
}());
