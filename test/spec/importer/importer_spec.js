'use strict';

var MemoryStorage = require('../../../src/persistence/memory_storage');
var BaseModel = require('../../../src/persistence/base_model');
var importer = require('../../../src/importer/importer');

describe('importer/importer', function () {

  var storage;

  beforeEach(function () {
    storage = new MemoryStorage();
    BaseModel.setStorage(storage);
  });

  function smallFixture() {
    return {
      championship: {
        id: 'demo-2014', name: 'Demo 2014', season: 2014, format: 'league'
      },
      teams: [
        { id: 'a', name: 'Time A' },
        { id: 'b', name: 'Time B' }
      ],
      matches: [
        {
          home: 'a', away: 'b', kickoff: '2014-04-19T16:00:00Z',
          status: 'finished', homeScore: 2, awayScore: 1,
          events: [
            { type: 'kickoff', half: 1, minute: 0 },
            { type: 'goal',    half: 1, minute: 12, player: 'pele' }
          ]
        }
      ]
    };
  }

  it('persiste championship, teams e matches no storage', function () {
    importer.importFixture(smallFixture());
    expect(storage.list('championships')).to.have.length(1);
    expect(storage.list('teams')).to.have.length(2);
    expect(storage.list('matches')).to.have.length(1);
  });

  it('persiste match_events vinculados à partida', function () {
    importer.importFixture(smallFixture());
    var events = storage.list('match_events');
    expect(events).to.have.length(2);
    var matchId = storage.list('matches')[0].id;
    events.forEach(function (e) {
      expect(e.match).to.equal(matchId);
    });
  });

  it('retorna contagens de teams/matches/events importados', function () {
    var summary = importer.importFixture(smallFixture());
    expect(summary.teamsCount).to.equal(2);
    expect(summary.matchesCount).to.equal(1);
    expect(summary.eventsCount).to.equal(2);
    expect(summary.championship.id).to.equal('demo-2014');
  });

  it('lança erro quando fixture é inválido', function () {
    var bad = { championship: { id: 'x', name: 'X' } }; // sem teams nem matches
    expect(function () { importer.importFixture(bad); }).to.throw(/inválido/);
  });

  it('skipValidation:true ignora schema (útil para internals)', function () {
    var minimal = {
      championship: { id: 'x', name: 'X', season: 2014, format: 'league' },
      teams: [], matches: []
    };
    expect(function () {
      importer.importFixture(minimal, { skipValidation: true });
    }).to.not.throw();
  });

  it('bloqueia importação de campeonato já existente', function () {
    importer.importFixture(smallFixture());
    expect(function () {
      importer.importFixture(smallFixture());
    }).to.throw(/já importado/);
  });

  it('permite reimportar com overwrite:true', function () {
    importer.importFixture(smallFixture());
    expect(function () {
      importer.importFixture(smallFixture(), { overwrite: true });
    }).to.not.throw();
  });

});
