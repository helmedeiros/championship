'use strict';

require('../../../helpers/dom')({ reset: true });

var Match = require('../../../../src/models/match');
var RowView = require('../../../../src/views/matches/row_view');

describe('views/matches/RowView', function () {

  it('renderiza colunas com mandante, visitante, estádio e placar', function () {
    var view = new RowView({
      model: new Match({
        id: 'm1', home: 'sao', away: 'cor',
        stadium: 'Morumbi', status: 'finished',
        homeScore: 2, awayScore: 1
      })
    });
    view.render();
    expect(view.$('.match-home').text()).to.equal('sao');
    expect(view.$('.match-away').text()).to.equal('cor');
    expect(view.$('.match-stadium').text()).to.equal('Morumbi');
    expect(view.$('.match-score').text()).to.equal('2 x 1');
  });

  it('mostra horário formatado quando partida está agendada', function () {
    var view = new RowView({
      model: new Match({
        id: 'm2', home: 'a', away: 'b',
        kickoff: '2014-09-21T18:30:00Z', status: 'scheduled'
      })
    });
    view.render();
    expect(view.$('.match-score').text()).to.equal('21/09 · 18:30');
  });

  it('mostra badge AO VIVO quando partida está live', function () {
    var view = new RowView({
      model: new Match({ id: 'm3', home: 'a', away: 'b', status: 'live' })
    });
    view.render();
    expect(view.$('.match-status .badge').text()).to.equal('AO VIVO');
    expect(view.$('.match-status .badge').hasClass('status-live')).to.equal(true);
  });

  it('mostra link Detalhes para a partida', function () {
    var view = new RowView({
      model: new Match({ id: 'xy', home: 'a', away: 'b' })
    });
    view.render();
    expect(view.$('.match-actions a').attr('href')).to.equal('#/partidas/xy');
  });

});
