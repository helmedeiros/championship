'use strict';

require('../../../helpers/dom')({ reset: true });

var Championships = require('../../../../src/collections/championships');
var ListView = require('../../../../src/views/championships/list_view');

describe('views/championships/ListView', function () {

  it('renderiza tabela com cabeçalho de 4 colunas', function () {
    var coll = new Championships([
      { id: 'bra-2014', name: 'Brasileirão', season: 2014,
        country: 'BR', format: 'double-round-robin' },
      { id: 'cm-2014', name: 'Copa do Mundo', season: 2014,
        country: 'BR', format: 'groups-knockout' }
    ]);
    var view = new ListView({ collection: coll });
    view.render();
    expect(view.$('thead th')).to.have.length(4);
    expect(view.$('tbody tr.championship-row')).to.have.length(2);
  });

  it('cada linha leva ao detalhe do campeonato via href', function () {
    var coll = new Championships([
      { id: 'cm', name: 'X', season: 2014, country: 'BR', format: 'league' }
    ]);
    var view = new ListView({ collection: coll });
    view.render();
    expect(view.$('tbody a').attr('href')).to.equal('#/campeonatos/cm');
  });

  it('mostra mensagem amigável quando não há campeonatos', function () {
    var view = new ListView({ collection: new Championships() });
    view.render();
    expect(view.$('tr.championships-empty')).to.have.length(1);
  });

  it('mostra rótulo legível para os formatos', function () {
    var coll = new Championships([
      { id: 'bra', name: 'Br', season: 2014, country: 'BR', format: 'double-round-robin' }
    ]);
    var view = new ListView({ collection: coll });
    view.render();
    expect(view.$('.championship-format').text()).to.equal('Pontos corridos (ida e volta)');
  });

});
