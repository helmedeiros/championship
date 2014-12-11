'use strict';

var replay = require('../../../src/live/replay');

function makeFakeTimers() {
  var pending = [];
  var nextId = 0;
  var now = 0;
  function earliest() {
    if (pending.length === 0) { return null; }
    var sorted = pending.slice().sort(function (a, b) { return a.at - b.at; });
    return sorted[0];
  }
  function removeById(id) {
    pending = pending.filter(function (p) { return p.id !== id; });
  }
  function advance(ms) {
    var deadline = now + ms;
    var next = earliest();
    while (next && next.at <= deadline) {
      now = next.at;
      removeById(next.id);
      next.fn();
      next = earliest();
    }
    now = deadline;
  }
  return {
    setTimeout: function (fn, ms) {
      nextId = nextId + 1;
      pending.push({ id: nextId, fn: fn, at: now + ms });
      return nextId;
    },
    clearTimeout: function (id) {
      pending = pending.filter(function (p) { return p.id !== id; });
    },
    advance: advance,
    now: function () { return now; }
  };
}

describe('live/replay', function () {

  it('emite eventos na ordem (half, minute)', function () {
    var t = makeFakeTimers();
    var events = [
      { type: 'goal', half: 2, minute: 5 },
      { type: 'kickoff', half: 1, minute: 0 },
      { type: 'goal', half: 1, minute: 11 }
    ];
    var seen = [];
    replay.play(events, {
      onEvent: function (e) { seen.push(e.type + ':' + e.half + ':' + e.minute); },
      minuteDurationMs: 10,
      setTimeout: t.setTimeout,
      clearTimeout: t.clearTimeout
    });
    t.advance(10000);
    expect(seen).to.deep.equal(['kickoff:1:0', 'goal:1:11', 'goal:2:5']);
  });

  it('respeita velocidade (4x = 1/4 do tempo)', function () {
    var t = makeFakeTimers();
    var seen = [];
    replay.play([{ type: 'goal', half: 1, minute: 10 }], {
      speed: 4,
      minuteDurationMs: 100, // 1x → 100ms/min, 4x → 25ms/min
      onEvent: function () { seen.push(t.now()); },
      setTimeout: t.setTimeout,
      clearTimeout: t.clearTimeout
    });
    t.advance(250);
    expect(seen[0]).to.equal(250); // 10 min × 25ms
  });

  it('onComplete dispara após o último evento', function () {
    var t = makeFakeTimers();
    var done = false;
    replay.play([{ type: 'kickoff', half: 1, minute: 0 }], {
      onComplete: function () { done = true; },
      minuteDurationMs: 1,
      setTimeout: t.setTimeout,
      clearTimeout: t.clearTimeout
    });
    t.advance(100);
    expect(done).to.equal(true);
  });

  it('stop interrompe e marca finished', function () {
    var t = makeFakeTimers();
    var seen = [];
    var ctl = replay.play([
      { type: 'kickoff', half: 1, minute: 0 },
      { type: 'goal',    half: 1, minute: 50 }
    ], {
      onEvent: function (e) { seen.push(e.type); },
      minuteDurationMs: 10,
      setTimeout: t.setTimeout,
      clearTimeout: t.clearTimeout
    });
    t.advance(5);
    ctl.stop();
    t.advance(1000);
    expect(seen).to.deep.equal(['kickoff']);
    expect(ctl.state().finished).to.equal(true);
  });

});
