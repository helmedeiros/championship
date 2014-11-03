'use strict';

require('../../../helpers/dom')({ reset: true });

var MemoryStorage = require('../../../../src/persistence/memory_storage');
var BaseModel = require('../../../../src/persistence/base_model');
var Championship = require('../../../../src/models/championship');
var Team = require('../../../../src/models/team');
var FormView = require('../../../../src/views/championships/form_view');

describe('views/championships/FormView', function () {

  beforeEach(function () {
    BaseModel.setStorage(new MemoryStorage());
  });

  function teams() {
    return [
      new Team({ id: 'a', name: 'A' }),
      new Team({ id: 'b', name: 'B' }),
      new Team({ id: 'c', name: 'C' })
    ];
  }

  it('renderiza campos de nome, temporada, país, formato e data', function () {
    var view = new FormView({
      model: new Championship(),
      availableTeams: teams()
    });
    view.render();
    expect(view.$('input[name="name"]')).to.have.length(1);
    expect(view.$('input[name="season"]')).to.have.length(1);
    expect(view.$('input[name="country"]')).to.have.length(1);
    expect(view.$('input[name="format"]')).to.have.length(4);
    expect(view.$('input[name="startDate"]')).to.have.length(1);
  });

  it('renderiza checkbox para cada time disponível', function () {
    var view = new FormView({
      model: new Championship(),
      availableTeams: teams()
    });
    view.render();
    expect(view.$('input[name="teamIds"]')).to.have.length(3);
  });

  it('dispara form:saved com lista de teamIds e startDate', function () {
    var view = new FormView({
      model: new Championship(),
      availableTeams: teams()
    }).render();
    document.body.appendChild(view.el);
    var saved = sinon.spy();
    view.on('form:saved', saved);
    view.$('input[name="name"]').val('Brasileirão');
    view.$('input[name="season"]').val('2014');
    view.$('input[name="format"][value="double-round-robin"]')[0].checked = true;
    view.$('input[name="teamIds"][value="a"]')[0].checked = true;
    view.$('input[name="teamIds"][value="b"]')[0].checked = true;
    view.$('input[name="startDate"]').val('2014-04-19');
    view.$('form.championship-form').submit();
    expect(saved.callCount).to.equal(1);
    var args = saved.firstCall.args;
    expect(args[0].get('format')).to.equal('double-round-robin');
    expect(args[1].teamIds).to.deep.equal(['a', 'b']);
    expect(args[1].startDate).to.equal('2014-04-19');
  });

  it('mostra erro de validação quando o nome falta', function () {
    var view = new FormView({
      model: new Championship(),
      availableTeams: teams()
    }).render();
    document.body.appendChild(view.el);
    view.$('form.championship-form').submit();
    expect(view.$('.form-error-banner')).to.have.length(1);
  });

});
