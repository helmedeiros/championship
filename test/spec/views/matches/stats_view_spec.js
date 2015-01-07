'use strict';

require('../../../helpers/dom')({ reset: true });

var MatchEvents = require('../../../../src/collections/match_events');
var StatsView = require('../../../../src/views/matches/stats_view');

describe('views/matches/StatsView', function () {

  it('renderiza linhas de gols, cartões e substituições', function () {
    var coll = new MatchEvents([
      { type: 'goal' }, { type: 'goal' },
      { type: 'yellow' }, { type: 'red' },
      { type: 'sub' }
    ]);
    var view = new StatsView({ matchEvents: coll });
    view.render();
    var rows = view.$('tbody tr');
    expect(rows).to.have.length(8); // 8 categorias fixas
    var text = view.$('tbody').text();
    expect(text).to.match(/Gols/);
    expect(text).to.match(/Cartões amarelos/);
  });

  it('mostra valor correto para cada categoria', function () {
    var coll = new MatchEvents([
      { type: 'goal' }, { type: 'goal' }, { type: 'yellow' }
    ]);
    var view = new StatsView({ matchEvents: coll });
    view.render();
    var golLinha = view.$('tbody tr').filter(function () {
      return /Gols$/.test(this.firstChild.textContent);
    });
    expect(golLinha.find('strong').text()).to.equal('2');
  });

});
