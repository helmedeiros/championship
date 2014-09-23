'use strict';

require('../../../helpers/dom')({ reset: true });

var Teams = require('../../../../src/collections/teams');
var TeamsListView = require('../../../../src/views/teams/list_view');

describe('views/teams/ListView', function () {

  it('renderiza tabela com cabeçalho e uma linha por time', function () {
    var coll = new Teams([
      { name: 'Santos', short: 'SAN', city: 'Santos', stadium: 'Vila Belmiro' },
      { name: 'Corinthians', short: 'COR', city: 'São Paulo', stadium: 'Arena Corinthians' }
    ]);
    var view = new TeamsListView({ collection: coll });
    view.render();
    expect(view.el.tagName.toLowerCase()).to.equal('table');
    expect(view.$('thead th')).to.have.length(5);
    expect(view.$('tfoot a[href="#/admin/times/novo"]')).to.have.length(1);
    expect(view.$('tbody tr.team-row')).to.have.length(2);
  });

  it('mantém a ordenação alfabética da coleção', function () {
    var coll = new Teams([
      { name: 'Vasco' },
      { name: 'Atlético-MG' },
      { name: 'Flamengo' }
    ]);
    var view = new TeamsListView({ collection: coll });
    view.render();
    var names = view.$('tbody tr.team-row .team-name').map(function () {
      return this.textContent;
    }).get();
    expect(names).to.deep.equal(['Atlético-MG', 'Flamengo', 'Vasco']);
  });

  it('mostra mensagem amigável quando não há times', function () {
    var view = new TeamsListView({ collection: new Teams() });
    view.render();
    expect(view.$('tbody tr.team-row')).to.have.length(0);
    expect(view.$('tbody tr.teams-empty')).to.have.length(1);
    expect(view.$('tbody tr.teams-empty').text()).to.match(/Nenhum time/);
  });

});
