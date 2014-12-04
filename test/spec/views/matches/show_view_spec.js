'use strict';

require('../../../helpers/dom')({ reset: true });

var Marionette = require('backbone.marionette');
var MemoryStorage = require('../../../../src/persistence/memory_storage');
var BaseModel = require('../../../../src/persistence/base_model');
var Match = require('../../../../src/models/match');
var MatchEvents = require('../../../../src/collections/match_events');
var ShowView = require('../../../../src/views/matches/show_view');

describe('views/matches/ShowView', function () {

  beforeEach(function () {
    BaseModel.setStorage(new MemoryStorage());
  });

  it('renderiza header e timeline na sequência correta', function () {
    document.body.innerHTML = '<div id="root"></div>';
    var region = new Marionette.Region({ el: '#root' });
    var match = new Match({
      id: 'm1', home: 'a', away: 'b', championship: 'c1',
      status: 'live', homeScore: 1, awayScore: 0
    });
    var events = new MatchEvents([
      { type: 'kickoff', half: 1, minute: 0 },
      { type: 'goal', half: 1, minute: 23, text: 'Pelé' }
    ]);
    var view = new ShowView({ model: match, matchEvents: events });
    region.show(view);
    expect(view.$('.match-header .team-home').text()).to.equal('a');
    expect(view.$('.event-timeline li.event-item')).to.have.length(2);
  });

  it('carrega eventos do storage filtrando por id da partida', function () {
    document.body.innerHTML = '<div id="root"></div>';
    var region = new Marionette.Region({ el: '#root' });
    var storage = BaseModel.getStorage();
    storage.create('match_events', { match: 'm1', type: 'goal', half: 1, minute: 5 });
    storage.create('match_events', { match: 'm1', type: 'goal', half: 2, minute: 30 });
    storage.create('match_events', { match: 'm2', type: 'goal', half: 1, minute: 1 });
    var match = new Match({ id: 'm1', home: 'a', away: 'b', status: 'finished' });
    var view = new ShowView({ model: match });
    region.show(view);
    expect(view.$('.event-timeline li.event-item')).to.have.length(2);
  });

  it('mostra campeonato no resumo', function () {
    document.body.innerHTML = '<div id="root"></div>';
    var region = new Marionette.Region({ el: '#root' });
    var view = new ShowView({
      model: new Match({ id: 'm', home: 'a', away: 'b', championship: 'copa-2014' }),
      matchEvents: new MatchEvents()
    });
    region.show(view);
    expect(view.$('.match-championship').text()).to.equal('copa-2014');
  });

});
