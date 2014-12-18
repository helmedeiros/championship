'use strict';

var stats = require('../../../src/stats/match_stats');
var MatchEvents = require('../../../src/collections/match_events');

describe('stats/match_stats', function () {

  it('soma contadores por tipo de evento', function () {
    var summary = stats.summarize([
      { type: 'goal' }, { type: 'goal' },
      { type: 'yellow' },
      { type: 'red' },
      { type: 'sub' }, { type: 'sub' },
      { type: 'comment' },
      { type: 'kickoff' }, { type: 'full_time' }
    ]);
    expect(summary.counts.goal).to.equal(2);
    expect(summary.counts.yellow).to.equal(1);
    expect(summary.counts.red).to.equal(1);
    expect(summary.counts.sub).to.equal(2);
    expect(summary.goals).to.equal(2);
    expect(summary.cards).to.equal(2);
    expect(summary.substitutions).to.equal(2);
    expect(summary.ticks).to.equal(2);
  });

  it('inclui gol contra no total de gols', function () {
    var summary = stats.summarize([
      { type: 'goal' }, { type: 'own_goal' }
    ]);
    expect(summary.goals).to.equal(2);
  });

  it('aceita Backbone.Collection diretamente', function () {
    var coll = new MatchEvents([
      { type: 'goal' }, { type: 'yellow' }
    ]);
    var summary = stats.summarize(coll);
    expect(summary.goals).to.equal(1);
    expect(summary.cards).to.equal(1);
  });

  it('aceita lista vazia retornando zeros', function () {
    var summary = stats.summarize([]);
    expect(summary.goals).to.equal(0);
    expect(summary.cards).to.equal(0);
  });

});
