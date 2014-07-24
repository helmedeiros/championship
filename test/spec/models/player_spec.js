'use strict';

var Player = require('../../../src/models/player');

describe('models/Player', function () {

  it('cria um jogador com nome e apelido', function () {
    var jogador = new Player({ name: 'Edson Arantes do Nascimento', nickname: 'Pelé' });
    expect(jogador.get('name')).to.equal('Edson Arantes do Nascimento');
    expect(jogador.get('nickname')).to.equal('Pelé');
  });

  it('aceita posição, número, foto e nacionalidade', function () {
    var jogador = new Player({
      name: 'Neymar Jr',
      position: 'ATA',
      number: 10,
      photo: 'neymar.jpg',
      nationality: 'BRA'
    });
    expect(jogador.get('position')).to.equal('ATA');
    expect(jogador.get('number')).to.equal(10);
    expect(jogador.get('photo')).to.equal('neymar.jpg');
    expect(jogador.get('nationality')).to.equal('BRA');
  });

  it('considera inválido quando o nome está em branco', function () {
    var jogador = new Player();
    expect(jogador.isValid()).to.equal(false);
    expect(jogador.validationError).to.equal('O nome do jogador é obrigatório');
  });

});
