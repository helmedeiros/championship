module.exports = (function () {
  'use strict';

  // Propaga eventos entre abas via o evento `storage` do navegador.
  // Quando uma aba grava em localStorage com prefixo championship:, outras
  // abas recebem `storage` event automaticamente.

  function bind(targetWindow, prefix, onChange) {
    var win = targetWindow || (typeof window !== 'undefined' ? window : null);
    if (!win || typeof win.addEventListener !== 'function') {
      return function () {};
    }
    var handler = function (event) {
      if (!event || !event.key) { return; }
      if (event.key.indexOf(prefix + ':') !== 0) { return; }
      var bucket = event.key.substring(prefix.length + 1);
      var newValue = null;
      try {
        newValue = event.newValue ? JSON.parse(event.newValue) : null;
      } catch (err) {
        newValue = null;
      }
      onChange({ bucket: bucket, value: newValue, raw: event });
    };
    win.addEventListener('storage', handler);
    return function unbind() {
      win.removeEventListener('storage', handler);
    };
  }

  return { bind: bind };
}());
