'use strict';

require('../../../helpers/dom')({ reset: true });

var Players = require('../../../../src/collections/players');
var PlayersListView = require('../../../../src/views/players/list_view');

describe('views/players/ListView', function () {

  it('renderiza tabela com cabeçalho de 6 colunas e linhas por jogador', function () {
    var elenco = new Players([
      { name: 'Taffarel', number: 1, position: 'GOL' },
      { name: 'Cafu', number: 2, position: 'LAT' },
      { name: 'Romário', number: 11, position: 'ATA' }
    ]);
    var view = new PlayersListView({ collection: elenco });
    view.render();
    expect(view.$('thead th')).to.have.length(6);
    expect(view.$('tbody tr.player-row')).to.have.length(3);
  });

  it('mantém a ordenação por número da coleção', function () {
    var elenco = new Players([
      { name: 'C', number: 9 },
      { name: 'A', number: 1 },
      { name: 'B', number: 3 }
    ]);
    var view = new PlayersListView({ collection: elenco });
    view.render();
    var nums = view.$('tbody tr.player-row .player-number').map(function () {
      return this.textContent;
    }).get();
    expect(nums).to.deep.equal(['1', '3', '9']);
  });

  it('mostra mensagem amigável quando não há jogadores', function () {
    var view = new PlayersListView({ collection: new Players() });
    view.render();
    expect(view.$('tbody tr.players-empty')).to.have.length(1);
    expect(view.$('tbody tr.players-empty').text()).to.match(/Nenhum jogador/);
  });

});
