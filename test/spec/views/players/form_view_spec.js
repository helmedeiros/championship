'use strict';

require('../../../helpers/dom')({ reset: true });

var MemoryStorage = require('../../../../src/persistence/memory_storage');
var BaseModel = require('../../../../src/persistence/base_model');
var Player = require('../../../../src/models/player');
var PlayerFormView = require('../../../../src/views/players/form_view');

describe('views/players/FormView', function () {

  beforeEach(function () {
    BaseModel.setStorage(new MemoryStorage());
  });

  it('renderiza inputs e seletor de posição traduzido', function () {
    var view = new PlayerFormView({ model: new Player() });
    view.render();
    expect(view.$('input[name="name"]')).to.have.length(1);
    expect(view.$('input[name="nickname"]')).to.have.length(1);
    expect(view.$('input[name="number"]')).to.have.length(1);
    expect(view.$('select[name="position"]')).to.have.length(1);
    expect(view.$('input[name="nationality"]')).to.have.length(1);
    var labels = view.$('select[name="position"] option').map(function () {
      return this.value;
    }).get();
    expect(labels).to.include('GOL');
    expect(labels).to.include('ZAG');
    expect(labels).to.include('ATA');
  });

  it('pré-popula campos quando o modelo já existe', function () {
    var view = new PlayerFormView({
      model: new Player({
        name: 'Romário', nickname: 'Baixinho', number: 11,
        position: 'ATA', nationality: 'BRA'
      })
    });
    view.render();
    expect(view.$('input[name="name"]').val()).to.equal('Romário');
    expect(view.$('input[name="number"]').val()).to.equal('11');
    expect(view.$('select[name="position"]').val()).to.equal('ATA');
  });

  it('dispara form:saved e persiste no submit válido', function () {
    var view = new PlayerFormView({ model: new Player() }).render();
    document.body.appendChild(view.el);
    var saved = sinon.spy();
    view.on('form:saved', saved);
    view.$('input[name="name"]').val('Pelé');
    view.$('input[name="number"]').val('10');
    view.$('select[name="position"]').val('ATA');
    view.$('form.player-form').submit();
    expect(saved.callCount).to.equal(1);
    expect(BaseModel.getStorage().list('players')).to.have.length(1);
  });

  it('mostra banner de erro quando o nome falta', function () {
    var view = new PlayerFormView({ model: new Player() }).render();
    document.body.appendChild(view.el);
    view.$('form.player-form').submit();
    expect(view.$('.form-error-banner')).to.have.length(1);
    expect(view.$('.form-error-banner').text()).to.match(/nome do jogador/);
  });

});
