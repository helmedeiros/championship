'use strict';

require('../../../helpers/dom')({ reset: true });

var Marionette = require('backbone.marionette');
var MemoryStorage = require('../../../../src/persistence/memory_storage');
var BaseModel = require('../../../../src/persistence/base_model');
var Championship = require('../../../../src/models/championship');
var ShowView = require('../../../../src/views/championships/show_view');

describe('views/championships/ShowView', function () {

  var storage;
  var champ;

  beforeEach(function () {
    storage = new MemoryStorage();
    BaseModel.setStorage(storage);
    champ = new Championship({
      id: 'bra', name: 'Brasileirão', season: 2014,
      country: 'BR', format: 'double-round-robin'
    });
    storage.create('matches', {
      championship: 'bra', status: 'finished',
      home: 'a', away: 'b', homeScore: 2, awayScore: 1
    });
  });

  it('renderiza header com nome, temporada e país', function () {
    var view = new ShowView({ model: champ });
    view.render();
    expect(view.$('h1').text()).to.match(/Brasileirão/);
    expect(view.$('h1 small').text()).to.match(/2014/);
    expect(view.$('h1 small').text()).to.match(/BR/);
  });

  it('mostra rótulo legível do formato', function () {
    var view = new ShowView({ model: champ });
    view.render();
    expect(view.$('.format-badge').text()).to.equal('Pontos corridos (ida e volta)');
  });

  it('mostra contagem de partidas total e finalizadas', function () {
    var view = new ShowView({ model: champ });
    view.render();
    expect(view.$('.matches-summary').text()).to.match(/Total de partidas: 1/);
    expect(view.$('.matches-summary').text()).to.match(/finalizadas: 1/);
  });

  it('renderiza classificação após onShow', function () {
    document.body.innerHTML = '<div id="root"></div>';
    var region = new Marionette.Region({ el: '#root' });
    var view = new ShowView({ model: champ });
    region.show(view);
    expect(view.$('.classification-table').length).to.equal(1);
    expect(view.$('.classification-table tbody tr').length).to.equal(2);
  });

});
