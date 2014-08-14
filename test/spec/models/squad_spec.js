'use strict';

var Squad = require('../../../src/models/squad');

describe('models/Squad', function () {

  it('vincula time e campeonato', function () {
    var elenco = new Squad({ team: 'sao', championship: 'brasileirao-2014' });
    expect(elenco.get('team')).to.equal('sao');
    expect(elenco.get('championship')).to.equal('brasileirao-2014');
  });

  it('mantém a lista de jogadores e o capitão', function () {
    var elenco = new Squad({
      team: 'a',
      championship: 'x',
      players: ['p1', 'p2', 'p3'],
      captain: 'p1',
      formation: '4-3-3'
    });
    expect(elenco.get('players')).to.deep.equal(['p1', 'p2', 'p3']);
    expect(elenco.get('captain')).to.equal('p1');
    expect(elenco.get('formation')).to.equal('4-3-3');
  });

  it('exige time no elenco', function () {
    var elenco = new Squad({ championship: 'x' });
    expect(elenco.isValid()).to.equal(false);
    expect(elenco.validationError).to.equal('O elenco precisa estar vinculado a um time');
  });

  it('exige campeonato no elenco', function () {
    var elenco = new Squad({ team: 'a' });
    expect(elenco.isValid()).to.equal(false);
    expect(elenco.validationError).to.equal(
      'O elenco precisa estar vinculado a um campeonato'
    );
  });

  it('responde se contém um jogador específico', function () {
    var elenco = new Squad({
      team: 'a', championship: 'x', players: ['p1', 'p2']
    });
    expect(elenco.has('p1')).to.equal(true);
    expect(elenco.has('p9')).to.equal(false);
  });

  it('rejeita capitão que não está no elenco', function () {
    var elenco = new Squad({
      team: 'a', championship: 'x', players: ['p1'], captain: 'p9'
    });
    expect(elenco.isValid()).to.equal(false);
    expect(elenco.validationError).to.equal('O capitão precisa fazer parte do elenco');
  });

  it('atualiza o capitão via setCaptain', function () {
    var elenco = new Squad({
      team: 'a', championship: 'x', players: ['p1', 'p2'], captain: 'p1'
    });
    elenco.setCaptain('p2');
    expect(elenco.get('captain')).to.equal('p2');
  });

});
