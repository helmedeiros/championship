'use strict';

require('../../../helpers/dom')({ reset: true });

var MatchEvents = require('../../../../src/collections/match_events');
var CardsView = require('../../../../src/views/stats/cards_leaderboard_view');

describe('views/stats/CardsLeaderboardView', function () {

  it('renderiza linhas por jogador com amarelos e vermelhos', function () {
    var coll = new MatchEvents([
      { type: 'yellow', player: 'a' },
      { type: 'red',    player: 'b' }
    ]);
    var view = new CardsView({ matchEvents: coll });
    view.render();
    var rows = view.$('tbody tr');
    expect(rows).to.have.length(2);
  });

  it('mostra mensagem amigável quando não há cartões', function () {
    var view = new CardsView({ matchEvents: new MatchEvents() });
    view.render();
    expect(view.$('tbody td').text()).to.match(/Nenhum cartão/);
  });

});
