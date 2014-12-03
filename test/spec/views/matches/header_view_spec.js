'use strict';

require('../../../helpers/dom')({ reset: true });

var Match = require('../../../../src/models/match');
var HeaderView = require('../../../../src/views/matches/header_view');

describe('views/matches/HeaderView', function () {

  it('renderiza times, placar, estádio e status', function () {
    var view = new HeaderView({
      model: new Match({
        home: 'BRA', away: 'ALE', stadium: 'Mineirão',
        status: 'finished', homeScore: 1, awayScore: 7
      })
    });
    view.render();
    expect(view.$('.team-home').text()).to.equal('BRA');
    expect(view.$('.score-home').text()).to.equal('1');
    expect(view.$('.score-away').text()).to.equal('7');
    expect(view.$('.team-away').text()).to.equal('ALE');
    expect(view.$('.match-stadium-line').text()).to.equal('Mineirão');
    expect(view.$('.match-status').text()).to.equal('ENCERRADO');
  });

  it('re-renderiza ao mudar status ou placar', function () {
    var m = new Match({ home: 'a', away: 'b', status: 'scheduled' });
    var view = new HeaderView({ model: m });
    view.render();
    expect(view.$('.match-status').text()).to.equal('A iniciar');
    m.set('status', 'live');
    expect(view.$('.match-status').text()).to.equal('EM ANDAMENTO');
    m.set('homeScore', 2);
    expect(view.$('.score-home').text()).to.equal('2');
  });

});
