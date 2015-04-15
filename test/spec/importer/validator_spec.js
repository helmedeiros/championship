'use strict';

var validator = require('../../../src/importer/validator');

describe('importer/validator', function () {

  function fixture(overrides) {
    var base = {
      championship: {
        id: 'demo', name: 'Demo', season: 2014, format: 'league'
      },
      teams: [
        { id: 'a', name: 'Time A' },
        { id: 'b', name: 'Time B' }
      ],
      matches: [
        { home: 'a', away: 'b', status: 'finished', homeScore: 1, awayScore: 0 }
      ]
    };
    var k;
    if (overrides) {
      for (k in overrides) {
        if (overrides.hasOwnProperty(k)) { base[k] = overrides[k]; }
      }
    }
    return base;
  }

  it('aceita fixture válido mínimo', function () {
    var result = validator.validate(fixture());
    expect(result.valid).to.equal(true);
    expect(result.errors).to.have.length(0);
  });

  it('rejeita fixture sem teams', function () {
    var result = validator.validate(fixture({ teams: undefined }));
    expect(result.valid).to.equal(false);
    expect(result.errors.length).to.be.above(0);
  });

  it('rejeita formato desconhecido', function () {
    var f = fixture();
    f.championship.format = 'inventado';
    var result = validator.validate(f);
    expect(result.valid).to.equal(false);
  });

  it('rejeita partida sem mandante ou visitante', function () {
    var f = fixture();
    f.matches = [{ home: 'a' }];
    var result = validator.validate(f);
    expect(result.valid).to.equal(false);
  });

  it('aceita match events com tipos conhecidos', function () {
    var f = fixture();
    f.matches[0].events = [
      { type: 'kickoff', half: 1, minute: 0 },
      { type: 'goal',    half: 1, minute: 23, player: 'pele' }
    ];
    var result = validator.validate(f);
    expect(result.valid).to.equal(true);
  });

  it('rejeita match event com tipo desconhecido', function () {
    var f = fixture();
    f.matches[0].events = [{ type: 'salto' }];
    var result = validator.validate(f);
    expect(result.valid).to.equal(false);
  });

});
