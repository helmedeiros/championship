'use strict';

require('../../../helpers/dom')({ reset: true });

var MemoryStorage = require('../../../../src/persistence/memory_storage');
var BaseModel = require('../../../../src/persistence/base_model');
var Match = require('../../../../src/models/match');
var ScorerView = require('../../../../src/views/matches/scorer_view');

describe('views/matches/ScorerView', function () {

  var storage;
  var match;

  beforeEach(function () {
    storage = new MemoryStorage();
    BaseModel.setStorage(storage);
    match = new Match({
      id: 'm1', home: 'BRA', away: 'CRO', status: 'scheduled',
      homeScore: 0, awayScore: 0
    });
    storage.create('matches', match.toJSON());
  });

  it('renderiza placar atual e botões de ação', function () {
    var view = new ScorerView({ model: match });
    view.render();
    expect(view.$('.team-home').text()).to.equal('BRA');
    expect(view.$('.team-away').text()).to.equal('CRO');
    expect(view.$('.goal-home').length).to.equal(1);
    expect(view.$('.goal-away').length).to.equal(1);
  });

  it('incrementa placar do mandante e cria evento ao clicar +Gol mandante', function () {
    var view = new ScorerView({ model: match }).render();
    document.body.appendChild(view.el);
    view.$('.goal-home').trigger('click');
    expect(match.get('homeScore')).to.equal(1);
    expect(storage.list('match_events')).to.have.length(1);
    expect(storage.list('match_events')[0].type).to.equal('goal');
  });

  it('emite scorer:event quando um evento é registrado', function () {
    var view = new ScorerView({ model: match }).render();
    document.body.appendChild(view.el);
    var spy = sinon.spy();
    view.on('scorer:event', spy);
    view.$('.yellow-away').trigger('click');
    expect(spy.callCount).to.equal(1);
  });

  it('envia comentário ao clicar Enviar', function () {
    var view = new ScorerView({ model: match }).render();
    document.body.appendChild(view.el);
    view.$('.comment-input').val('Pressão do BRA');
    view.$('.comment-send').trigger('click');
    var ev = storage.list('match_events')[0];
    expect(ev.type).to.equal('comment');
    expect(ev.text).to.equal('Pressão do BRA');
  });

  it('encerra a partida ao clicar Encerrar', function () {
    var view = new ScorerView({ model: match }).render();
    document.body.appendChild(view.el);
    view.$('.scorer-status button[data-status="finished"]').trigger('click');
    expect(match.get('status')).to.equal('finished');
    var events = storage.list('match_events').map(function (e) { return e.type; });
    expect(events).to.include('full_time');
  });

});
