'use strict';

var app = require('../../src/app');

describe('app', function () {

  it('expõe o nome do módulo principal', function () {
    expect(app.NAME).to.equal('championship');
  });

  it('expõe a versão do módulo principal', function () {
    expect(app.VERSION).to.match(/^\d+\.\d+\.\d+$/);
  });

});
