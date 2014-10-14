module.exports = (function () {
  'use strict';

  // Distribuição de participantes em grupos:
  //   - groupCount grupos
  //   - participants.length deve ser divisível por groupCount
  //   - distribuição em zigzag (snake draft) para balancear pots:
  //       grupo 1: participantes 1, 8, 9, 16, ...
  //       grupo 2: participantes 2, 7, 10, 15, ...

  function letterFor(idx) {
    return String.fromCharCode(65 + idx); // 'A', 'B', ...
  }

  function distribute(participants, groupCount) {
    if (!groupCount || groupCount < 1) {
      throw new Error('groupCount precisa ser >= 1');
    }
    if (participants.length % groupCount !== 0) {
      throw new Error(
        'número de participantes (' + participants.length +
        ') não divisível por groupCount (' + groupCount + ')'
      );
    }

    var groups = [];
    var i;
    for (i = 0; i < groupCount; i = i + 1) {
      groups.push({ name: 'Grupo ' + letterFor(i), participants: [] });
    }

    var direction = 1;
    var idx = 0;
    participants.forEach(function (p, n) {
      groups[idx].participants.push(p);
      // snake: move idx with direction; bounce at edges
      if (direction === 1 && idx === groupCount - 1) {
        direction = -1;
      } else if (direction === -1 && idx === 0) {
        direction = 1;
      } else {
        idx = idx + direction;
      }
      if (n === 0 && groupCount > 1) {
        idx = 1;
        direction = 1;
      }
    });

    return groups;
  }

  var roundRobin = require('./round_robin');

  function generate(participants, groupCount) {
    var groupsList = distribute(participants, groupCount);
    return groupsList.map(function (group) {
      var schedule = roundRobin.generate(group.participants, { balanceHome: true });
      return {
        name: group.name,
        participants: group.participants,
        rounds: schedule.rounds
      };
    });
  }

  return {
    distribute: distribute,
    generate: generate,
    letterFor: letterFor
  };
}());
