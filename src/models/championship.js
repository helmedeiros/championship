module.exports = (function () {
  'use strict';

  var BaseModel = require('../persistence/base_model');
  var messages = require('./messages/championship');
  var scheduler = require('../scheduling/scheduler');
  var Matches = require('../collections/matches');
  var table = require('../classification/table');

  var FORMATS = ['league', 'double-round-robin', 'groups-knockout', 'knockout'];

  function isKnownFormat(value) {
    var i;
    for (i = 0; i < FORMATS.length; i = i + 1) {
      if (FORMATS[i] === value) { return true; }
    }
    return false;
  }

  return BaseModel.extend({

    bucket: 'championships',

    FORMATS: FORMATS,

    defaults: {
      name: '',
      season: null,
      country: '',
      format: 'league',
      tiebreakers: ['points', 'wins', 'goal_diff', 'goals_for', 'head_to_head']
    },

    validate: function (attrs) {
      if (!attrs.name) {
        return messages.NAME_REQUIRED;
      }
      if (!attrs.season) {
        return messages.SEASON_REQUIRED;
      }
      if (!isKnownFormat(attrs.format)) {
        return messages.FORMAT_UNKNOWN;
      }
    },

    createFixtures: function (teamIds, options) {
      var opts = options || {};
      var storage = BaseModel.getStorage();
      if (!storage) { throw new Error('storage não configurado'); }
      var schedule = scheduler.scheduleFor(this.get('format'), teamIds, opts);
      var champId = this.id || this.cid;
      var saved = [];
      function pushRound(matches, roundIdx, groupName) {
        matches.forEach(function (m) {
          saved.push(storage.create('matches', {
            home: m.home, away: m.away,
            kickoff: m.kickoff || null,
            stadium: m.stadium || '',
            championship: champId,
            round: roundIdx + 1,
            group: groupName || null,
            status: 'scheduled',
            homeScore: 0, awayScore: 0
          }));
        });
      }
      if (schedule.rounds) {
        schedule.rounds.forEach(function (r, i) { pushRound(r, i); });
      }
      if (schedule.groups) {
        schedule.groups.forEach(function (group) {
          group.rounds.forEach(function (r, i) { pushRound(r, i, group.name); });
        });
      }
      if (schedule.bracket) {
        schedule.bracket.rounds.forEach(function (round, i) {
          pushRound(round.matches, i, round.label);
        });
      }
      return saved;
    },

    matches: function () {
      var coll = new Matches();
      coll.fetch();
      var champId = this.id || this.cid;
      return coll.filter(function (m) { return m.get('championship') === champId; });
    },

    classification: function () {
      var raw = this.matches().map(function (m) { return m.toJSON(); });
      return table.classify(raw, { order: this.get('tiebreakers') });
    }

  });
}());
