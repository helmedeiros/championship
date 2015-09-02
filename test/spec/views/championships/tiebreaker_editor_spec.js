'use strict';

require('../../../helpers/dom')({ reset: true });

var Editor = require(
  '../../../../src/views/championships/tiebreaker_editor'
);

describe('views/championships/TiebreakerEditor', function () {

  it('renderiza um item por critério na ordem atual', function () {
    var view = new Editor({
      selected: ['points', 'goal_diff', 'goals_for']
    });
    view.render();
    var items = view.$('.tiebreaker-item');
    expect(items.length).to.equal(3);
    expect(items.eq(0).attr('data-key')).to.equal('points');
    expect(items.eq(2).attr('data-key')).to.equal('goals_for');
  });

  it('move um critério para cima ao clicar ↑', function () {
    var view = new Editor({
      selected: ['points', 'goal_diff', 'goals_for']
    });
    view.render();
    var captured = null;
    view.on('tiebreakers:changed', function (val) { captured = val; });
    view.$('.tiebreaker-item[data-key="goal_diff"] .tb-up').click();
    expect(view.value()).to.deep.equal([
      'goal_diff', 'points', 'goals_for'
    ]);
    expect(captured).to.deep.equal(view.value());
  });

  it('remove um critério ao clicar ×', function () {
    var view = new Editor({
      selected: ['points', 'wins', 'goal_diff']
    });
    view.render();
    view.$('.tiebreaker-item[data-key="wins"] .tb-remove').click();
    expect(view.value()).to.deep.equal(['points', 'goal_diff']);
  });

  it('adiciona um critério selecionado no dropdown', function () {
    var view = new Editor({ selected: ['points'] });
    view.render();
    var select = view.$('.tb-add-select')[0];
    select.value = 'away_goals';
    view.$('.tb-add-select').trigger('change');
    expect(view.value()).to.include('away_goals');
  });

  it('deduplica seleção inicial', function () {
    var view = new Editor({
      selected: ['points', 'points', 'goal_diff', 'goal_diff']
    });
    expect(view.value()).to.deep.equal(['points', 'goal_diff']);
  });

});
