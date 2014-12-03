'use strict';

require('../../../helpers/dom')({ reset: true });

var MatchEvents = require('../../../../src/collections/match_events');
var TimelineView = require('../../../../src/views/matches/timeline_view');

describe('views/matches/TimelineView', function () {

  it('renderiza um item por evento', function () {
    var coll = new MatchEvents([
      { type: 'kickoff', half: 1, minute: 0 },
      { type: 'goal', half: 1, minute: 11, text: 'Neymar' },
      { type: 'half_time', half: 1, minute: 47 }
    ]);
    var view = new TimelineView({ collection: coll });
    view.render();
    expect(view.$('li.event-item')).to.have.length(3);
  });

  it('coloca evento mais recente no topo', function () {
    var coll = new MatchEvents([
      { type: 'kickoff', half: 1, minute: 0 },
      { type: 'goal', half: 1, minute: 11, text: 'Neymar' }
    ]);
    var view = new TimelineView({ collection: coll });
    view.render();
    var topMinute = view.$('li.event-item').first().find('.event-minute').text();
    expect(topMinute).to.match(/^11/);
  });

  it('atualiza quando um novo evento é adicionado à coleção', function () {
    var coll = new MatchEvents([{ type: 'kickoff', half: 1, minute: 0 }]);
    var view = new TimelineView({ collection: coll });
    view.render();
    coll.add({ type: 'goal', half: 2, minute: 22 });
    expect(view.$('li.event-item')).to.have.length(2);
  });

});
