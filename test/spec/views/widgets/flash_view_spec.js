'use strict';

require('../../../helpers/dom')({ reset: true });

var FlashView = require('../../../../src/views/widgets/flash_view');

describe('views/widgets/FlashView', function () {

  it('renderiza alerta com mensagem escapada e classe info por padrão', function () {
    var view = new FlashView({ message: 'Olá <b>mundo</b>' });
    view.render();
    var alert = view.$('.alert');
    expect(alert.hasClass('alert-info')).to.equal(true);
    expect(alert.text()).to.match(/Olá <b>mundo<\/b>/);
  });

  it('aplica a classe alert-success quando type=success', function () {
    var view = new FlashView({ message: 'ok', type: 'success' }).render();
    expect(view.$('.alert').hasClass('alert-success')).to.equal(true);
  });

  it('aplica a classe alert-danger quando type=error', function () {
    var view = new FlashView({ message: 'falhou', type: 'error' }).render();
    expect(view.$('.alert').hasClass('alert-danger')).to.equal(true);
  });

  it('dispara flash:dismissed quando o usuário clica em fechar', function () {
    var view = new FlashView({ message: 'x', timeoutMs: 0 }).render();
    var fired = sinon.spy();
    view.on('flash:dismissed', fired);
    view.$('.flash-dismiss').trigger('click');
    expect(fired.callCount).to.equal(1);
  });

  it('dispara flash:dismissed automaticamente após o timeout', function (done) {
    var view = new FlashView({ message: 'x', timeoutMs: 10 }).render();
    view.on('flash:dismissed', function () { done(); });
    view.onShow();
  });

});
