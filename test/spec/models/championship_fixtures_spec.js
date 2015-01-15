'use strict';

var MemoryStorage = require('../../../src/persistence/memory_storage');
var BaseModel = require('../../../src/persistence/base_model');
var Championship = require('../../../src/models/championship');

describe('models/Championship.createFixtures', function () {

  var storage;

  beforeEach(function () {
    storage = new MemoryStorage();
    BaseModel.setStorage(storage);
  });

  it('gera partidas no formato liga e persiste no adaptador', function () {
    var champ = new Championship({
      id: 'bra-a-2014', name: 'Brasileirão', season: 2014, format: 'league'
    });
    champ.createFixtures(['a', 'b', 'c', 'd'], {
      startDate: '2014-04-19T16:00:00Z'
    });
    expect(storage.list('matches')).to.have.length(6); // 4 times → 6 jogos
    storage.list('matches').forEach(function (m) {
      expect(m.championship).to.equal('bra-a-2014');
      expect(m.status).to.equal('scheduled');
    });
  });

  it('gera partidas no formato double-round-robin (ida e volta)', function () {
    var champ = new Championship({
      id: 'bra-2014', name: 'Br', season: 2014, format: 'double-round-robin'
    });
    champ.createFixtures(['a', 'b', 'c', 'd']);
    expect(storage.list('matches')).to.have.length(12);
  });

  it('matches() retorna apenas partidas deste campeonato', function () {
    var champ = new Championship({ id: 'x', name: 'X', season: 2014 });
    champ.createFixtures(['a', 'b']);
    storage.create('matches', { championship: 'outro', home: 'z', away: 'y' });
    expect(champ.matches()).to.have.length(1);
  });

  it('grava número da rodada em cada partida (formato liga)', function () {
    var champ = new Championship({
      id: 'r', name: 'R', season: 2014, format: 'league'
    });
    champ.createFixtures(['a', 'b', 'c', 'd']);
    var rounds = storage.list('matches').map(function (m) { return m.round; });
    expect(Math.min.apply(null, rounds)).to.equal(1);
    expect(Math.max.apply(null, rounds)).to.equal(3);
  });

  it('grava nome do grupo em cada partida (formato groups-knockout)', function () {
    var teams = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    var champ = new Championship({
      id: 'gk', name: 'GK', season: 2014, format: 'groups-knockout'
    });
    champ.createFixtures(teams, { groupCount: 2 });
    var matches = storage.list('matches');
    var groups = matches.map(function (m) { return m.group; });
    expect(groups).to.include('Grupo A');
    expect(groups).to.include('Grupo B');
  });

});

describe('models/Championship.classification', function () {

  var storage;
  var champ;

  beforeEach(function () {
    storage = new MemoryStorage();
    BaseModel.setStorage(storage);
    champ = new Championship({ id: 'c', name: 'C', season: 2014 });
    storage.create('matches', {
      championship: 'c', status: 'finished',
      home: 'a', away: 'b', homeScore: 2, awayScore: 1
    });
    storage.create('matches', {
      championship: 'c', status: 'finished',
      home: 'a', away: 'c', homeScore: 1, awayScore: 1
    });
  });

  it('retorna linhas ordenadas por pontos', function () {
    var rows = champ.classification();
    expect(rows[0].team).to.equal('a');
    expect(rows[0].points).to.equal(4);
  });

  it('inclui aproveitamento percentual', function () {
    var rows = champ.classification();
    var rowA = rows.filter(function (r) { return r.team === 'a'; })[0];
    expect(rowA.percentage).to.equal(67);
  });

});
