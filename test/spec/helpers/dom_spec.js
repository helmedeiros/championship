'use strict';

var activateDom = require('../../helpers/dom');

describe('helpers/dom', function () {

  it('disponibiliza window, document e jQuery após activate()', function () {
    var win = activateDom({ reset: true });
    expect(win).to.equal(global.window);
    expect(global.document).to.be.an('object');
    expect(global.$).to.be.a('function');
    expect(global.$.fn.jquery).to.match(/^2\./);
  });

  it('permite manipular o DOM via jQuery', function () {
    activateDom({ reset: true });
    global.document.body.innerHTML = '<div id="root"></div>';
    expect(global.$('#root').length).to.equal(1);
    global.$('#root').append('<span class="x">oi</span>');
    expect(global.$('#root .x').text()).to.equal('oi');
  });

  it('reutiliza a mesma janela quando chamada novamente sem reset', function () {
    var a = activateDom();
    var b = activateDom();
    expect(a).to.equal(b);
  });

});
