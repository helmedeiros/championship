module.exports = (function () {
  'use strict';

  var MONTHS_PT = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun',
                   'jul', 'ago', 'set', 'out', 'nov', 'dez'];

  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  function formatDate(value) {
    if (!value) { return ''; }
    var d = value instanceof Date ? value : new Date(value);
    if (isNaN(d.getTime())) { return ''; }
    return pad(d.getUTCDate()) + '/' + pad(d.getUTCMonth() + 1);
  }

  function formatDateTime(value) {
    if (!value) { return ''; }
    var d = value instanceof Date ? value : new Date(value);
    if (isNaN(d.getTime())) { return ''; }
    return pad(d.getUTCDate()) + '/' + pad(d.getUTCMonth() + 1) +
      ' · ' + pad(d.getUTCHours()) + ':' + pad(d.getUTCMinutes());
  }

  function formatLong(value) {
    if (!value) { return ''; }
    var d = value instanceof Date ? value : new Date(value);
    if (isNaN(d.getTime())) { return ''; }
    return d.getUTCDate() + ' de ' + MONTHS_PT[d.getUTCMonth()] +
      ' de ' + d.getUTCFullYear();
  }

  return {
    formatDate: formatDate,
    formatDateTime: formatDateTime,
    formatLong: formatLong
  };
}());
