'use strict';

var sparkline = require('../../../../src/views/helpers/sparkline');

describe('views/helpers/sparkline', function () {

  it('renderiza um círculo por resultado', function () {
    var svg = sparkline.render(['W', 'D', 'L']);
    var matches = svg.match(/<circle/g) || [];
    expect(matches).to.have.length(3);
  });

  it('atribui cores diferentes para W/D/L', function () {
    var svg = sparkline.render(['W', 'D', 'L']);
    expect(svg).to.contain('#1f7a1f');
    expect(svg).to.contain('#aaaaaa');
    expect(svg).to.contain('#c0392b');
  });

  it('limita a 10 resultados mais recentes', function () {
    var arr = [];
    var i;
    for (i = 0; i < 15; i = i + 1) { arr.push('W'); }
    var svg = sparkline.render(arr);
    var matches = svg.match(/<circle/g) || [];
    expect(matches).to.have.length(10);
  });

  it('produz svg vazio para lista vazia', function () {
    var svg = sparkline.render([]);
    expect(svg).to.match(/^<svg/);
    expect(svg.match(/<circle/g)).to.equal(null);
  });

});
