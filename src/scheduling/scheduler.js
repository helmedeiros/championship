module.exports = (function () {
  'use strict';

  var roundRobin = require('./round_robin');
  var doubleRR = require('./double_round_robin');
  var groups = require('./groups');
  var knockout = require('./knockout');
  var calendar = require('./calendar');

  var FORMATS = {
    'league': function (teams) {
      var schedule = roundRobin.generate(teams, { balanceHome: true });
      return { format: 'league', rounds: schedule.rounds, byeUsed: schedule.byeUsed };
    },
    'double-round-robin': function (teams) {
      var schedule = doubleRR.generate(teams);
      return {
        format: 'double-round-robin',
        rounds: schedule.rounds,
        byeUsed: schedule.byeUsed
      };
    },
    'knockout': function (teams) {
      var bracket = knockout.generate(teams);
      return { format: 'knockout', bracket: bracket };
    },
    'groups-knockout': function (teams, options) {
      var opts = options || {};
      var groupCount = opts.groupCount || 8;
      var groupStage = groups.generate(teams, groupCount);
      return { format: 'groups-knockout', groups: groupStage };
    }
  };

  function withCalendar(result, options) {
    if (!options || !options.startDate) { return result; }
    var step = options.daysBetween || 7;
    var overrides = options.overrides;
    if (result.rounds) {
      result.rounds = calendar.assign(result.rounds, options.startDate, step, overrides);
    }
    if (result.groups) {
      result.groups = result.groups.map(function (group) {
        return {
          name: group.name,
          participants: group.participants,
          rounds: calendar.assign(group.rounds, options.startDate, step, overrides)
        };
      });
    }
    return result;
  }

  function scheduleFor(format, teams, options) {
    var fn = FORMATS[format];
    if (!fn) {
      throw new Error('formato desconhecido: ' + format);
    }
    return withCalendar(fn(teams, options), options);
  }

  return {
    scheduleFor: scheduleFor,
    FORMATS: Object.keys(FORMATS)
  };
}());
