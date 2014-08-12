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

  it('aceita os tipos conhecidos (gol, cartões, sub, var, comentário, etc.)', function () {
    var tipos = ['kickoff', 'goal', 'own_goal', 'yellow', 'red', 'sub',
                 'var', 'comment', 'half_time', 'full_time'];
    tipos.forEach(function (t) {
      expect(new MatchEvent({ type: t }).isValid()).to.equal(true);
    });
  });

  it('rejeita tipo de evento desconhecido', function () {
    var ev = new MatchEvent({ type: 'salto' });
    expect(ev.isValid()).to.equal(false);
    expect(ev.validationError).to.equal('Tipo de evento desconhecido');
  });

  it('rejeita meio tempo fora dos valores válidos', function () {
    var ev = new MatchEvent({ type: 'goal', half: 5 });
    expect(ev.isValid()).to.equal(false);
    expect(ev.validationError).to.match(/Meio tempo inválido/);
  });

  it('rejeita minuto fora do intervalo 0-120', function () {
    var ev = new MatchEvent({ type: 'goal', minute: 121 });
    expect(ev.isValid()).to.equal(false);
    expect(ev.validationError).to.equal('O minuto do evento precisa estar entre 0 e 120');
  });

});
