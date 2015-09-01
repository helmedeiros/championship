'use strict';

require('../../../helpers/dom')({ reset: true });

var MatchEvents = require('../../../../src/collections/match_events');
var TopAssistersView = require('../../../../src/views/stats/top_assisters_view');

describe('views/stats/TopAssistersView', function () {

  it('renderiza linha por assistente em ordem decrescente', function () {
    var events = new MatchEvents([
      { type: 'goal', player: 'A', assist: 'X' },
      { type: 'goal', player: 'B', assist: 'X' },
      { type: 'goal', player: 'C', assist: 'Y' }
    ]);
    var view = new TopAssistersView({ matchEvents: events });
    view.render();
    var rows = view.$('tbody tr');
    expect(rows.length).to.equal(2);
    expect(rows.eq(0).find('td').eq(1).text()).to.equal('X');
    expect(rows.eq(0).find('td').eq(2).text().trim()).to.equal('2');
  });

  it('mostra mensagem amigável quando não há assistências', function () {
    var view = new TopAssistersView({ matchEvents: new MatchEvents() });
    view.render();
    expect(view.$('tbody td').text()).to.match(/Nenhuma assistência/);
  });

  it('respeita limit passado nas opções', function () {
    var events = new MatchEvents([
      { type: 'goal', assist: 'A' }, { type: 'goal', assist: 'B' },
      { type: 'goal', assist: 'C' }, { type: 'goal', assist: 'D' }
    ]);
    var view = new TopAssistersView({ matchEvents: events, limit: 2 });
    view.render();
    expect(view.$('tbody tr').length).to.equal(2);
  });

});
