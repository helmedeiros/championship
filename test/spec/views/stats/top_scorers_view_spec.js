'use strict';

require('../../../helpers/dom')({ reset: true });

var MatchEvents = require('../../../../src/collections/match_events');
var TopScorersView = require('../../../../src/views/stats/top_scorers_view');

describe('views/stats/TopScorersView', function () {

  it('renderiza tabela com Jogador e Gols por linha', function () {
    var coll = new MatchEvents([
      { type: 'goal', player: 'pele' },
      { type: 'goal', player: 'pele' },
      { type: 'goal', player: 'romario' }
    ]);
    var view = new TopScorersView({ matchEvents: coll });
    view.render();
    expect(view.$('thead th')).to.have.length(3);
    expect(view.$('tbody tr')).to.have.length(2);
    expect(view.$('tbody tr').eq(0).find('td').eq(1).text()).to.equal('pele');
    expect(view.$('tbody tr').eq(0).find('td').eq(2).text()).to.equal('2');
  });

  it('mostra mensagem amigável quando não há gols', function () {
    var view = new TopScorersView({ matchEvents: new MatchEvents() });
    view.render();
    expect(view.$('tbody td').text()).to.match(/Nenhum gol/);
  });

});
