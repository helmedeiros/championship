'use strict';

var MatchEvent = require('../../../src/models/match_event');

describe('models/MatchEvent', function () {

  it('cria um evento com tipo, meio tempo e minuto', function () {
    var ev = new MatchEvent({ type: 'goal', half: 2, minute: 22, player: 'undav' });
    expect(ev.get('type')).to.equal('goal');
    expect(ev.get('half')).to.equal(2);
    expect(ev.get('minute')).to.equal(22);
    expect(ev.get('player')).to.equal('undav');
  });

  it('aceita texto descritivo livre', function () {
    var ev = new MatchEvent({ type: 'comment', text: 'Pressão do mandante' });
    expect(ev.get('text')).to.equal('Pressão do mandante');
  });

  it('exige tipo do evento', function () {
    var ev = new MatchEvent({});
    expect(ev.isValid()).to.equal(false);
    expect(ev.validationError).to.equal('O tipo do evento é obrigatório');
  });

});
