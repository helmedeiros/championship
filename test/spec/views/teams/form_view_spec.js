'use strict';

require('../../../helpers/dom')({ reset: true });

var MemoryStorage = require('../../../../src/persistence/memory_storage');
var BaseModel = require('../../../../src/persistence/base_model');
var Team = require('../../../../src/models/team');
var TeamFormView = require('../../../../src/views/teams/form_view');

describe('views/teams/FormView', function () {

  beforeEach(function () {
    BaseModel.setStorage(new MemoryStorage());
  });

  it('renderiza inputs para nome, sigla, cidade e estádio', function () {
    var view = new TeamFormView({ model: new Team() });
    view.render();
    expect(view.$('input[name="name"]')).to.have.length(1);
    expect(view.$('input[name="short"]')).to.have.length(1);
    expect(view.$('input[name="city"]')).to.have.length(1);
    expect(view.$('input[name="stadium"]')).to.have.length(1);
  });

  it('pré-popula inputs quando o modelo já tem dados', function () {
    var view = new TeamFormView({
      model: new Team({ name: 'Santos', city: 'Santos', stadium: 'Vila Belmiro' })
    });
    view.render();
    expect(view.$('input[name="name"]').val()).to.equal('Santos');
    expect(view.$('input[name="city"]').val()).to.equal('Santos');
    expect(view.$('input[name="stadium"]').val()).to.equal('Vila Belmiro');
  });

  it('dispara form:saved e persiste o time quando o submit é válido', function () {
    var view = new TeamFormView({ model: new Team() }).render();
    document.body.appendChild(view.el);
    var saved = sinon.spy();
    view.on('form:saved', saved);
    view.$('input[name="name"]').val('Corinthians');
    view.$('input[name="short"]').val('COR');
    view.$('form.team-form').submit();
    expect(saved).to.have.been.calledOnce;
    var stored = BaseModel.getStorage().list('teams');
    expect(stored).to.have.length(1);
    expect(stored[0].name).to.equal('Corinthians');
  });

  it('dispara form:invalid e não persiste quando o nome falta', function () {
    var view = new TeamFormView({ model: new Team() }).render();
    document.body.appendChild(view.el);
    var invalid = sinon.spy();
    var saved = sinon.spy();
    view.on('form:invalid', invalid);
    view.on('form:saved', saved);
    view.$('form.team-form').submit();
    expect(invalid).to.have.been.calledOnce;
    expect(saved).to.not.have.been.called;
    expect(BaseModel.getStorage().list('teams')).to.have.length(0);
  });

  it('exibe banner de erro quando a validação falha', function () {
    var view = new TeamFormView({ model: new Team() }).render();
    document.body.appendChild(view.el);
    view.$('form.team-form').submit();
    expect(view.$('.form-error-banner')).to.have.length(1);
    expect(view.$('.form-error-banner').text()).to.match(/nome do time/);
  });

  it('limpa o banner de erro quando a submissão seguinte é válida', function () {
    var view = new TeamFormView({ model: new Team() }).render();
    document.body.appendChild(view.el);
    view.$('form.team-form').submit();
    expect(view.$('.form-error-banner')).to.have.length(1);
    view.$('input[name="name"]').val('Palmeiras');
    view.$('form.team-form').submit();
    expect(view.$('.form-error-banner')).to.have.length(0);
  });

  it('dispara form:cancel ao clicar em Cancelar', function () {
    var view = new TeamFormView({ model: new Team() }).render();
    document.body.appendChild(view.el);
    var canceled = sinon.spy();
    view.on('form:cancel', canceled);
    view.$('.cancel').trigger('click');
    expect(canceled).to.have.been.calledOnce;
  });

});
