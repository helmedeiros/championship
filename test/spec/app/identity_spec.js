'use strict';

var identity = require('../../../src/app/identity');

describe('app/identity', function () {

  it('define o nome curto da aplicação', function () {
    expect(identity.NAME).to.equal('championship');
  });

  it('define a versão atual no formato semântico', function () {
    expect(identity.VERSION).to.match(/^\d+\.\d+\.\d+$/);
  });

});
