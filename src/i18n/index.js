module.exports = (function () {
  'use strict';

  var LOCALES = {
    'pt-br': require('./messages_pt_br'),
    'en':    require('./messages_en')
  };

  var KEY = 'championship:locale';
  var DEFAULT = 'pt-br';
  var current = DEFAULT;

  function readStorage() {
    if (typeof window === 'undefined' || !window.localStorage) { return null; }
    return window.localStorage.getItem(KEY);
  }

  function writeStorage(loc) {
    if (typeof window === 'undefined' || !window.localStorage) { return; }
    window.localStorage.setItem(KEY, loc);
  }

  function setLocale(loc) {
    if (!LOCALES.hasOwnProperty(loc)) {
      throw new Error('Locale desconhecido: ' + loc);
    }
    current = loc;
    writeStorage(loc);
  }

  function getLocale() {
    return current;
  }

  function bootstrap() {
    var stored = readStorage();
    if (stored && LOCALES.hasOwnProperty(stored)) { current = stored; }
  }

  function t(key) {
    var bundle = LOCALES[current] || LOCALES[DEFAULT];
    return bundle.hasOwnProperty(key) ? bundle[key] : key;
  }

  function locales() {
    return Object.keys(LOCALES);
  }

  bootstrap();

  return {
    t:         t,
    setLocale: setLocale,
    getLocale: getLocale,
    locales:   locales,
    DEFAULT:   DEFAULT
  };
}());
