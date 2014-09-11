'use strict';

require('../helpers/dom')();

var MemoryStorage = require('../../src/persistence/memory_storage');
var BaseModel = require('../../src/persistence/base_model');
var createApp = require('../../src/main');

describe('main/createApp', function () {

  beforeEach(function () {
    require('../helpers/dom')();
    document.body.innerHTML =
      '<div id="regiao-navegacao"></div>' +
      '<div id="regiao-principal"></div>' +
      '<div id="regiao-mensagens"></div>';
  });

  function instance() {
    return createApp({
      Marionette: require('backbone.marionette'),
      Backbone: require('backbone'),
      $: $,
      storageFactory: function () { return new MemoryStorage(); }
    });
  }

  it('cria uma Marionette.Application com as regiões esperadas', function () {
    var app = instance();
    expect(app.getRegion('mainRegion')).to.be.an('object');
    expect(app.getRegion('navRegion')).to.be.an('object');
    expect(app.getRegion('flashRegion')).to.be.an('object');
  });

  it('configura o adaptador de armazenamento durante start', function () {
    var app = instance();
    app.start();
    expect(BaseModel.getStorage()).to.be.an('object');
    expect(BaseModel.getStorage().list).to.be.a('function');
  });

  it('renderiza tela de boas-vindas após start', function () {
    var app = instance();
    app.start();
    expect($('#regiao-principal .jumbotron').length).to.equal(1);
    expect($('#regiao-principal h1').text()).to.equal('championship');
    expect($('#regiao-principal a.btn').attr('href')).to.equal('#/times');
  });

});
