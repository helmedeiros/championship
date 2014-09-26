'use strict';

require('../../../helpers/dom')({ reset: true });

var Player = require('../../../../src/models/player');
var PlayerRowView = require('../../../../src/views/players/row_view');

describe('views/players/RowView', function () {

  it('renderiza linha com número, nome, apelido, posição e nacionalidade', function () {
    var view = new PlayerRowView({
      model: new Player({
        name: 'Edson Arantes do Nascimento',
        nickname: 'Pelé',
        number: 10,
        position: 'ATA',
        nationality: 'BRA'
      })
    });
    view.render();
    expect(view.$('.player-number').text()).to.equal('10');
    expect(view.$('.player-name').text()).to.equal('Edson Arantes do Nascimento');
    expect(view.$('.player-nickname').text()).to.equal('Pelé');
    expect(view.$('.player-position').text()).to.equal('ATA');
    expect(view.$('.player-nationality').text()).to.equal('BRA');
  });

  it('mostra travessão quando jogador não tem número', function () {
    var view = new PlayerRowView({ model: new Player({ name: 'X' }) });
    view.render();
    expect(view.$('.player-number').text()).to.equal('–');
  });

  it('mostra placeholder quando jogador não tem foto', function () {
    var view = new PlayerRowView({ model: new Player({ name: 'X' }) });
    view.render();
    expect(view.$('.player-photo-empty').length).to.equal(1);
    expect(view.$('img.player-photo').length).to.equal(0);
  });

  it('renderiza tag img quando jogador tem foto data URL', function () {
    var view = new PlayerRowView({
      model: new Player({ name: 'X', photo: 'data:image/png;base64,abc' })
    });
    view.render();
    expect(view.$('img.player-photo').attr('src')).to.equal('data:image/png;base64,abc');
  });

});
