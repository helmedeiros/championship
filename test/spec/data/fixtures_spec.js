'use strict';

var validator = require('../../../src/importer/validator');
var worldCup = require('../../../src/data/world_cup_2014');
var brasileirao = require('../../../src/data/brasileirao_2014');
var copaAmerica = require('../../../src/data/copa_america_2015');

describe('data/world_cup_2014 fixture', function () {

  it('passa pelo validator (schema válido)', function () {
    var result = validator.validate(worldCup);
    if (!result.valid) {
      throw new Error('Erros: ' + JSON.stringify(result.errors));
    }
    expect(result.valid).to.equal(true);
  });

  it('tem 32 seleções', function () {
    expect(worldCup.teams).to.have.length(32);
  });

  it('tem 64 partidas (48 grupos + 16 mata-mata)', function () {
    expect(worldCup.matches).to.have.length(64);
  });

  it('todos os times referenciados em partidas existem', function () {
    var ids = {};
    worldCup.teams.forEach(function (t) { ids[t.id] = true; });
    worldCup.matches.forEach(function (m) {
      expect(ids[m.home], 'home ' + m.home + ' não existe').to.equal(true);
      expect(ids[m.away], 'away ' + m.away + ' não existe').to.equal(true);
    });
  });

  it('inclui eventos no Brasil 1x7 Alemanha', function () {
    var braGer = worldCup.matches.filter(function (m) {
      return m.home === 'BRA' && m.away === 'GER';
    })[0];
    expect(braGer, 'partida BRA-GER deveria existir').to.not.equal(undefined);
    expect(braGer.events && braGer.events.length).to.be.above(5);
  });

});

describe('data/brasileirao_2014 fixture', function () {

  it('passa pelo validator (schema válido)', function () {
    var result = validator.validate(brasileirao);
    if (!result.valid) {
      throw new Error('Erros: ' + JSON.stringify(result.errors));
    }
    expect(result.valid).to.equal(true);
  });

  it('tem 20 clubes', function () {
    expect(brasileirao.teams).to.have.length(20);
  });

  it('todos os times referenciados em partidas existem', function () {
    var ids = {};
    brasileirao.teams.forEach(function (t) { ids[t.id] = true; });
    brasileirao.matches.forEach(function (m) {
      expect(ids[m.home], 'home ' + m.home).to.equal(true);
      expect(ids[m.away], 'away ' + m.away).to.equal(true);
    });
  });

});

describe('data/copa_america_2015 fixture', function () {

  it('passa pelo validator (schema válido)', function () {
    var result = validator.validate(copaAmerica);
    if (!result.valid) {
      throw new Error('Erros: ' + JSON.stringify(result.errors));
    }
    expect(result.valid).to.equal(true);
  });

  it('tem 12 seleções', function () {
    expect(copaAmerica.teams).to.have.length(12);
  });

  it('tem 26 partidas (18 grupos + 4 quartas + 2 semi + 2 finais)',
    function () {
      expect(copaAmerica.matches).to.have.length(26);
    });

  it('todos os times referenciados existem', function () {
    var ids = {};
    copaAmerica.teams.forEach(function (t) { ids[t.id] = true; });
    copaAmerica.matches.forEach(function (m) {
      expect(ids[m.home], 'home ' + m.home).to.equal(true);
      expect(ids[m.away], 'away ' + m.away).to.equal(true);
    });
  });

});
