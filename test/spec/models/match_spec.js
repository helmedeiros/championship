'use strict';

var Match = require('../../../src/models/match');

describe('models/Match', function () {

  it('cria uma partida com mandante, visitante e horário', function () {
    var partida = new Match({
      home: 'sao',
      away: 'cor',
      kickoff: '2014-09-21T18:30:00-03:00'
    });
    expect(partida.get('home')).to.equal('sao');
    expect(partida.get('away')).to.equal('cor');
    expect(partida.get('kickoff')).to.equal('2014-09-21T18:30:00-03:00');
  });

  it('começa com status scheduled e placar zerado', function () {
    var partida = new Match({ home: 'a', away: 'b' });
    expect(partida.get('status')).to.equal('scheduled');
    expect(partida.get('homeScore')).to.equal(0);
    expect(partida.get('awayScore')).to.equal(0);
  });

  it('exige os dois times', function () {
    var partida = new Match({ home: 'a' });
    expect(partida.isValid()).to.equal(false);
    expect(partida.validationError).to.equal(
      'A partida precisa dos times mandante e visitante'
    );
  });

  it('rejeita partida com o mesmo time como mandante e visitante', function () {
    var partida = new Match({ home: 'a', away: 'a' });
    expect(partida.isValid()).to.equal(false);
    expect(partida.validationError).to.equal(
      'Mandante e visitante não podem ser o mesmo time'
    );
  });

});
