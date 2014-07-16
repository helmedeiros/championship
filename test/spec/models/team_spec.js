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

});
