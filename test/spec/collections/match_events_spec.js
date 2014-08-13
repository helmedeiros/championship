'use strict';

var MatchEvents = require('../../../src/collections/match_events');

describe('collections/MatchEvents', function () {

  it('ordena os eventos por meio tempo e depois minuto', function () {
    var feed = new MatchEvents([
      { type: 'goal', half: 2, minute: 5 },
      { type: 'goal', half: 1, minute: 40 },
      { type: 'goal', half: 1, minute: 10 },
      { type: 'goal', half: 2, minute: 22 }
    ]);
    var ordem = feed.map(function (e) {
      return e.get('half') + ':' + e.get('minute');
    });
    expect(ordem).to.deep.equal(['1:10', '1:40', '2:5', '2:22']);
  });

  it('filtra apenas gols (gol e gol contra)', function () {
    var feed = new MatchEvents([
      { type: 'goal' },
      { type: 'yellow' },
      { type: 'own_goal' },
      { type: 'comment' }
    ]);
    expect(feed.goals()).to.have.length(2);
  });

  it('filtra apenas cartões (amarelo e vermelho)', function () {
    var feed = new MatchEvents([
      { type: 'yellow' },
      { type: 'goal' },
      { type: 'red' },
      { type: 'sub' }
    ]);
    expect(feed.cards()).to.have.length(2);
  });

});
