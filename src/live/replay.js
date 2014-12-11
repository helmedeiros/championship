module.exports = (function () {
  'use strict';

  // Replay de eventos no tempo de jogo. Cada minuto de jogo dura
  // minuteDurationMs/velocidade milissegundos no tempo real.

  function ordered(events) {
    return events.slice().sort(function (a, b) {
      var ha = (a.half || 1) * 1000 + (a.minute || 0);
      var hb = (b.half || 1) * 1000 + (b.minute || 0);
      return ha - hb;
    });
  }

  function noop() {}

  function resolveTimers(opts) {
    var setT = opts.setTimeout ||
      (typeof setTimeout !== 'undefined' ? setTimeout : null);
    var clearT = opts.clearTimeout ||
      (typeof clearTimeout !== 'undefined' ? clearTimeout : null);
    if (!setT) {
      throw new Error('setTimeout indisponível: passe options.setTimeout');
    }
    return { setT: setT, clearT: clearT };
  }

  function resolveOptions(opts) {
    var speed = opts.speed || 1;
    return {
      minuteMs: (opts.minuteDurationMs || 1000) / speed,
      onEvent: opts.onEvent || noop,
      onTick: opts.onTick || noop,
      onComplete: opts.onComplete || noop
    };
  }

  function play(events, options) {
    var opts = options || {};
    var cfg = resolveOptions(opts);
    var timers = resolveTimers(opts);
    var queue = ordered(events);
    var idx = 0;
    var startedAt = 0;
    var elapsed = 0;
    var timer = null;
    var paused = false;

    function targetFor(ev) {
      return ((ev.half - 1) * 45 + ev.minute) * cfg.minuteMs;
    }

    function schedule() {
      if (idx >= queue.length) { cfg.onComplete(); return; }
      var next = queue[idx];
      var delay = Math.max(0, targetFor(next) - elapsed);
      startedAt = Date.now();
      timer = timers.setT(function () {
        elapsed = elapsed + (Date.now() - startedAt);
        cfg.onEvent(next);
        cfg.onTick({ minute: next.minute, half: next.half });
        idx = idx + 1;
        if (!paused) { schedule(); }
      }, delay);
    }

    schedule();

    return {
      stop: function () {
        if (timer && timers.clearT) { timers.clearT(timer); }
        timer = null;
        idx = queue.length;
      },
      pause: function () {
        if (timer && timers.clearT) { timers.clearT(timer); }
        timer = null;
        paused = true;
        elapsed = elapsed + (Date.now() - startedAt);
      },
      resume: function () {
        paused = false;
        schedule();
      },
      state: function () {
        return {
          paused: paused,
          finished: idx >= queue.length,
          totalEvents: queue.length,
          index: idx
        };
      }
    };
  }

  return { play: play };
}());
