'use strict';

require('../../../helpers/dom')({ reset: true });

var Matches = require('../../../../src/collections/matches');
var ListView = require('../../../../src/views/matches/list_view');

describe('views/matches/ListView', function () {

  it('renderiza tabela com cabeçalho de 6 colunas', function () {
    var coll = new Matches([
      { id: '1', home: 'a', away: 'b', status: 'scheduled' },
      { id: '2', home: 'c', away: 'd', status: 'scheduled' }
    ]);
    var view = new ListView({ collection: coll });
    view.render();
    expect(view.$('thead th')).to.have.length(6);
    expect(view.$('tbody tr.match-row')).to.have.length(2);
  });

  it('mostra mensagem amigável quando não há partidas', function () {
    var view = new ListView({ collection: new Matches() });
    view.render();
    expect(view.$('tr.matches-empty')).to.have.length(1);
  });

});
