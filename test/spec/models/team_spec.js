'use strict';

var Team = require('../../../src/models/team');

describe('models/Team', function () {

  it('cria um time com nome e nome curto', function () {
    var time = new Team({ name: 'São Paulo', short: 'SAO' });
    expect(time.get('name')).to.equal('São Paulo');
    expect(time.get('short')).to.equal('SAO');
  });

  it('usa valores padrão vazios quando instanciado sem atributos', function () {
    var time = new Team();
    expect(time.get('name')).to.equal('');
    expect(time.get('short')).to.equal('');
  });

  it('considera inválido quando o nome está em branco', function () {
    var time = new Team();
    expect(time.isValid()).to.equal(false);
    expect(time.validationError).to.equal('O nome do time é obrigatório');
  });

  it('considera válido quando o nome está preenchido', function () {
    var time = new Team({ name: 'Corinthians' });
    expect(time.isValid()).to.equal(true);
  });

  it('mantém cores, estádio, cidade e ano de fundação', function () {
    var time = new Team({
      name: 'Santos',
      colors: ['#FFFFFF', '#000000'],
      stadium: 'Vila Belmiro',
      city: 'Santos',
      foundedAt: 1912
    });
    expect(time.get('colors')).to.deep.equal(['#FFFFFF', '#000000']);
    expect(time.get('stadium')).to.equal('Vila Belmiro');
    expect(time.get('city')).to.equal('Santos');
    expect(time.get('foundedAt')).to.equal(1912);
  });

});
