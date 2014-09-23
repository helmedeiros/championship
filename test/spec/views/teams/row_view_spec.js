'use strict';

require('../../../helpers/dom')({ reset: true });

var Team = require('../../../../src/models/team');
var TeamRowView = require('../../../../src/views/teams/row_view');

describe('views/teams/RowView', function () {

  it('renderiza uma linha de tabela para um time', function () {
    var view = new TeamRowView({
      model: new Team({
        id: 'san',
        name: 'Santos',
        short: 'SAN',
        city: 'Santos',
        stadium: 'Vila Belmiro'
      })
    });
    view.render();
    expect(view.el.tagName.toLowerCase()).to.equal('tr');
    expect(view.$('.team-name').text()).to.equal('Santos');
    expect(view.$('.team-short').text()).to.equal('SAN');
    expect(view.$('.team-city').text()).to.equal('Santos');
    expect(view.$('.team-stadium').text()).to.equal('Vila Belmiro');
    expect(view.$('.team-actions a').attr('href')).to.equal('#/admin/times/san');
  });

  it('escapa caracteres estruturais de HTML para evitar XSS', function () {
    var view = new TeamRowView({
      model: new Team({ name: '<script>alert(1)</script>' })
    });
    view.render();
    expect(view.$('.team-name script').length).to.equal(0);
    expect(view.$('.team-name').text()).to.equal('<script>alert(1)</script>');
  });

  it('renderiza colunas vazias quando o time não tem cidade ou estádio', function () {
    var view = new TeamRowView({ model: new Team({ name: 'Sem Casa' }) });
    view.render();
    expect(view.$('.team-city').text()).to.equal('');
    expect(view.$('.team-stadium').text()).to.equal('');
  });

});
