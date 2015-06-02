module.exports = (function () {
  'use strict';

  // Identidade do usuário corrente. Apenas separação de UI, não é segurança:
  // toda a aplicação roda no navegador e localStorage é mutável pelo dono.
  // A chave guardada é 'championship:role' = 'admin' | 'user'.

  var KEY = 'championship:role';
  var DEFAULT = 'user';
  var ROLES = ['user', 'admin'];

  function getStorage(opts) {
    var override = opts && opts.storage;
    if (override) { return override; }
    return typeof window !== 'undefined' ? window.localStorage : null;
  }

  function current(opts) {
    var storage = getStorage(opts);
    if (!storage) { return DEFAULT; }
    var value = storage.getItem(KEY);
    return ROLES.indexOf(value) === -1 ? DEFAULT : value;
  }

  function set(value, opts) {
    if (ROLES.indexOf(value) === -1) {
      throw new Error('Role inválida: ' + value);
    }
    var storage = getStorage(opts);
    if (storage) { storage.setItem(KEY, value); }
  }

  function isAdmin(opts) {
    return current(opts) === 'admin';
  }

  function clear(opts) {
    var storage = getStorage(opts);
    if (storage) { storage.removeItem(KEY); }
  }

  return {
    KEY: KEY,
    DEFAULT: DEFAULT,
    ROLES: ROLES,
    current: current,
    set: set,
    isAdmin: isAdmin,
    clear: clear
  };
}());
