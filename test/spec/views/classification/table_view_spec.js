'use strict';

require('../../../helpers/dom')({ reset: true });

var TableView = require('../../../../src/views/classification/table_view');

describe('views/classification/TableView', function () {

  it('renderiza cabeçalho com 12 colunas no estilo Brasileirão', function () {
    var view = new TableView({ rows: [] });
    view.render();
    expect(view.$('thead th')).to.have.length(12);
  });

  it('renderiza uma linha por time com posição numerada', function () {
    var rows = [
      { team: 'a', points: 6, played: 2, wins: 2, draws: 0, losses: 0,
        goalsFor: 3, goalsAgainst: 0, percentage: 100, recentResults: ['W', 'W'] },
      { team: 'b', points: 1, played: 2, wins: 0, draws: 1, losses: 1,
        goalsFor: 1, goalsAgainst: 2, percentage: 17, recentResults: ['D', 'L'] }
    ];
    var view = new TableView({ rows: rows });
    view.render();
    var tbodyRows = view.$('tbody tr');
    expect(tbodyRows).to.have.length(2);
    expect(view.$('tbody tr').eq(0).find('.pos').text()).to.equal('1');
    expect(view.$('tbody tr').eq(0).find('.team').text()).to.equal('a');
    expect(view.$('tbody tr').eq(0).find('.p').text()).to.equal('6');
    expect(view.$('tbody tr').eq(0).find('.pct').text()).to.equal('100');
  });

  it('mostra SG com sinal de mais para saldo positivo', function () {
    var view = new TableView({ rows: [{
      team: 'a', points: 3, played: 1, wins: 1, draws: 0, losses: 0,
      goalsFor: 3, goalsAgainst: 0, percentage: 100, recentResults: []
    }] });
    view.render();
    expect(view.$('tbody .sg').text()).to.equal('+3');
  });

  it('renderiza pontos coloridos para últimos resultados', function () {
    var view = new TableView({ rows: [{
      team: 'a', points: 0, played: 2, wins: 0, draws: 0, losses: 2,
      goalsFor: 0, goalsAgainst: 4, percentage: 0,
      recentResults: ['L', 'L']
    }] });
    view.render();
    expect(view.$('.ultimos .result-red')).to.have.length(2);
  });

  it('aplica classe de zona às linhas conforme posição', function () {
    var rows = [];
    var i;
    for (i = 1; i <= 8; i = i + 1) {
      rows.push({
        team: 't' + i, points: 0, played: 0, wins: 0, draws: 0, losses: 0,
        goalsFor: 0, goalsAgainst: 0, percentage: 0, recentResults: []
      });
    }
    var view = new TableView({
      rows: rows,
      zones: [
        { fromPos: 1, toPos: 2, cssClass: 'zone-libertadores' },
        { fromPos: 7, toPos: 8, cssClass: 'zone-rebaixamento' }
      ]
    });
    view.render();
    expect(view.$('tbody tr').eq(0).hasClass('zone-libertadores')).to.equal(true);
    expect(view.$('tbody tr').eq(1).hasClass('zone-libertadores')).to.equal(true);
    expect(view.$('tbody tr').eq(2).hasClass('zone-libertadores')).to.equal(false);
    expect(view.$('tbody tr').eq(6).hasClass('zone-rebaixamento')).to.equal(true);
    expect(view.$('tbody tr').eq(7).hasClass('zone-rebaixamento')).to.equal(true);
  });

});
