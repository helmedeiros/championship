'use strict';

var f = require('../../../../src/views/helpers/format_date');

describe('views/helpers/format_date', function () {

  it('formatDate retorna DD/MM', function () {
    expect(f.formatDate('2014-09-21T16:00:00Z')).to.equal('21/09');
    expect(f.formatDate('2014-12-07T00:00:00Z')).to.equal('07/12');
  });

  it('formatDateTime retorna DD/MM · HH:MM', function () {
    expect(f.formatDateTime('2014-09-21T18:30:00Z')).to.equal('21/09 · 18:30');
  });

  it('formatLong retorna "D de mês de AAAA"', function () {
    expect(f.formatLong('2014-06-12T17:00:00Z')).to.equal('12 de jun de 2014');
    expect(f.formatLong('2014-12-25T17:00:00Z')).to.equal('25 de dez de 2014');
  });

  it('retorna string vazia para valores nulos ou inválidos', function () {
    expect(f.formatDate(null)).to.equal('');
    expect(f.formatDate('')).to.equal('');
    expect(f.formatDate('not-a-date')).to.equal('');
    expect(f.formatDateTime(undefined)).to.equal('');
    expect(f.formatLong(null)).to.equal('');
  });

});
