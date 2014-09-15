'use strict';

require('../../helpers/dom')();

var Marionette = require('backbone.marionette');
var Backbone = require('backbone');
Backbone.$ = $;

var Controller = require('../../../src/app/controller');
var runtime = require('../../../src/app/runtime');

describe('app/Controller', function () {

  var app;
  var controller;

  beforeEach(function () {
    require('../../helpers/dom')({ reset: true });
    Backbone.$ = $;
    document.body.innerHTML =
      '<div id="regiao-navegacao"></div>' +
      '<div id="regiao-principal"></div>' +
      '<div id="regiao-mensagens"></div>';
    app = new Marionette.Application();
    app.addRegions(runtime.regions);
    controller = new Controller({ app: app, Marionette: Marionette });
  });

  it('renderiza placeholder na rota home', function () {
    controller.home();
    expect($('#regiao-principal h2').text()).to.equal('championship');
  });

  it('renderiza placeholder na rota teamsShow com id', function () {
    controller.teamsShow('santos');
    expect($('#regiao-principal h2').text()).to.equal('Time santos');
  });

  it('renderiza placeholder de notFound', function () {
    controller.notFound();
    expect($('#regiao-principal h2').text()).to.match(/não encontrada/);
  });

  it('responde aos handlers admin.* com prefixo no título', function () {
    controller['admin.teamsList']();
    expect($('#regiao-principal h2').text()).to.equal('Admin / admin.teamsList');
  });

});
