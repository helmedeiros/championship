/*
 * Activates a fresh jsdom-backed window/document and wires Backbone to use
 * jQuery bound to that window. Returns the window so the spec can
 * `appendTo(window.document.body)` if needed.
 *
 * Idempotent within a single require() — subsequent calls reuse the same
 * window unless `reset: true` is passed.
 */

(function () {
  'use strict';

  var jsdom = require('jsdom');
  var Backbone = require('backbone');

  var current = null;

  function activate(options) {
    var opts = options || {};
    if (current && !opts.reset) {
      return current;
    }

    var doc = jsdom.jsdom(
      '<!DOCTYPE html><html><head></head><body></body></html>'
    );
    var win = doc.defaultView;
    var $ = require('jquery')(win);

    global.window = win;
    global.document = doc;
    global.navigator = win.navigator;
    global.$ = $;
    global.jQuery = $;

    Backbone.$ = $;

    current = win;
    return win;
  }

  module.exports = activate;
}());
