'use strict';

var crossTab = require('../../../src/live/cross_tab');

function FakeWindow() {
  this.handlers = {};
}
FakeWindow.prototype.addEventListener = function (name, fn) {
  this.handlers[name] = this.handlers[name] || [];
  this.handlers[name].push(fn);
};
FakeWindow.prototype.removeEventListener = function (name, fn) {
  this.handlers[name] = (this.handlers[name] || []).filter(function (h) { return h !== fn; });
};
FakeWindow.prototype.dispatch = function (name, event) {
  (this.handlers[name] || []).forEach(function (h) { h(event); });
};

describe('live/cross_tab', function () {

  var win;

  beforeEach(function () { win = new FakeWindow(); });

  it('chama callback ao detectar mudança em chave com prefixo', function () {
    var spy = sinon.spy();
    crossTab.bind(win, 'championship', spy);
    win.dispatch('storage', {
      key: 'championship:match_events',
      newValue: JSON.stringify([{ id: '1', type: 'goal' }])
    });
    expect(spy.callCount).to.equal(1);
    var arg = spy.firstCall.args[0];
    expect(arg.bucket).to.equal('match_events');
    expect(arg.value).to.deep.equal([{ id: '1', type: 'goal' }]);
  });

  it('ignora mudanças em chaves de outros prefixos', function () {
    var spy = sinon.spy();
    crossTab.bind(win, 'championship', spy);
    win.dispatch('storage', { key: 'outra-app:bucket', newValue: 'x' });
    expect(spy.callCount).to.equal(0);
  });

  it('lida com JSON inválido emitindo value=null', function () {
    var spy = sinon.spy();
    crossTab.bind(win, 'championship', spy);
    win.dispatch('storage', { key: 'championship:foo', newValue: 'not json' });
    expect(spy.firstCall.args[0].value).to.equal(null);
  });

  it('unbind remove o listener', function () {
    var spy = sinon.spy();
    var unbind = crossTab.bind(win, 'championship', spy);
    unbind();
    win.dispatch('storage', { key: 'championship:x', newValue: '{}' });
    expect(spy.callCount).to.equal(0);
  });

  it('retorna função no-op se window não tem addEventListener', function () {
    var unbind = crossTab.bind({}, 'championship', function () {});
    expect(unbind).to.be.a('function');
    unbind(); // não deve quebrar
  });

});
