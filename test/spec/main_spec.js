'use strict';

require('../helpers/dom')();

var MemoryStorage = require('../../src/persistence/memory_storage');
var BaseModel = require('../../src/persistence/base_model');
var Backbone = require('backbone');
var createApp = require('../../src/main');

describe('main/createApp', function () {

  beforeEach(function () {
    require('../helpers/dom')({ reset: true });
    document.body.innerHTML =
      '<div id="regiao-navegacao"></div>' +
      '<div id="regiao-principal"></div>' +
      '<div id="regiao-mensagens"></div>';
    if (Backbone.History.started) {
      Backbone.history.stop();
    }
  });

  function instance() {
    return createApp({
      Marionette: require('backbone.marionette'),
      Backbone: Backbone,
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

  it('renderiza a tela inicial após start', function () {
    var app = instance();
    app.start();
    expect($('#regiao-principal h2').text()).to.equal('championship');
  });

  it('semeia times demo e renderiza TeamsListView ao acessar #/times', function () {
    var app = instance();
    app.start();
    Backbone.history.navigate('times', { trigger: true });
    expect($('#regiao-principal table.teams-list').length).to.equal(1);
    expect($('#regiao-principal tbody tr.team-row').length).to.be.above(0);
  });

});
