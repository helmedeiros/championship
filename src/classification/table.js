module.exports = (function () {
  'use strict';

  var tiebreakers = require('./tiebreakers');

  function freshRow(teamId) {
    return {
      team: teamId,
      played: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      points: 0,
      recentResults: []
    };
  }

  function applyResult(row, gf, ga) {
    row.played = row.played + 1;
    row.goalsFor = row.goalsFor + gf;
    row.goalsAgainst = row.goalsAgainst + ga;
    if (gf > ga) {
      row.wins = row.wins + 1;
      row.points = row.points + 3;
      row.recentResults.push('W');
    } else if (gf === ga) {
      row.draws = row.draws + 1;
      row.points = row.points + 1;
      row.recentResults.push('D');
    } else {
      row.losses = row.losses + 1;
      row.recentResults.push('L');
    }
    if (row.recentResults.length > 5) {
      row.recentResults.shift();
    }
  }

  function percentage(row) {
    if (row.played === 0) { return 0; }
    return Math.round((row.points / (row.played * 3)) * 100);
  }

  function tally(matches) {
    var rows = {};
    var finished = (matches || []).filter(function (m) {
      return m.status === 'finished';
    });

    finished.forEach(function (m) {
      if (!rows[m.home]) { rows[m.home] = freshRow(m.home); }
      if (!rows[m.away]) { rows[m.away] = freshRow(m.away); }
      applyResult(rows[m.home], m.homeScore, m.awayScore);
      applyResult(rows[m.away], m.awayScore, m.homeScore);
    });

    return Object.keys(rows).map(function (k) {
      var row = rows[k];
      row.percentage = percentage(row);
      return row;
    });
  }

  function compareRows(order, ctx) {
    return function (a, b) {
      var i;
      for (i = 0; i < order.length; i = i + 1) {
        var rule = tiebreakers.ruleFor(order[i]);
        if (!rule) { continue; }
        var diff = rule(b, ctx) - rule(a, ctx);
        if (diff !== 0) { return diff; }
      }
      var an = a.team || '';
      var bn = b.team || '';
      if (an < bn) { return -1; }
      if (an > bn) { return 1; }
      return 0;
    };
  }

  function classify(matches, options) {
    var opts = options || {};
    var order = opts.order || tiebreakers.DEFAULT_ORDER;
    return tally(matches).sort(compareRows(order, opts));
  }

  return {
    tally: tally,
    classify: classify
  };
}());
