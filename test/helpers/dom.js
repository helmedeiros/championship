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

  function freshJquery(win) {
    // jQuery's UMD picks factory vs. instantiated based on global.document at
    // the time of first require. Force the factory path by temporarily
    // clearing global.document and the module cache so we can bind jQuery to
    // the NEW window/doc.
    var savedDoc = global.document;
    var savedWin = global.window;
    delete global.document;
    delete global.window;
    delete require.cache[require.resolve('jquery')];
    var factory = require('jquery');
    global.document = savedDoc;
    global.window = savedWin;
    return factory(win);
  }

  function activate(options) {
    var opts = options || {};
    if (current && !opts.reset) {
      return current;
    }

    var doc = jsdom.jsdom(
      '<!DOCTYPE html><html><head></head><body></body></html>'
    );
    var win = doc.defaultView;

    var $ = freshJquery(win);

    global.window = win;
    global.document = doc;
    global.navigator = win.navigator;
    global.$ = $;
    global.jQuery = $;

    Backbone.$ = $;

    // Backbone's History was instantiated before `window` existed (Node
    // import order), so it never picked up window.location/history. Recreate
    // it now that we have a real jsdom window.
    Backbone.history = new Backbone.History();
    Backbone.history.location = win.location;
    Backbone.history.history = win.history;

    // Marionette caches Deferred from Backbone.$ at module-load time. If
    // jQuery wasn't bound yet, that reference is undefined — re-wire it.
    var Marionette = require('backbone.marionette');
    Marionette.Deferred = Backbone.$.Deferred;

    current = win;
    return win;
  }

  module.exports = activate;
}());
