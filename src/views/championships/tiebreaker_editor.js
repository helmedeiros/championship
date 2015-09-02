module.exports = (function () {
  'use strict';

  var Marionette = require('backbone.marionette');
  var escapeHtml = require('../helpers/escape_html');

  var ALL = [
    { key: 'points',        label: 'Pontos' },
    { key: 'wins',          label: 'Vitórias' },
    { key: 'goal_diff',     label: 'Saldo de gols (SG)' },
    { key: 'goals_for',     label: 'Gols pró (GP)' },
    { key: 'head_to_head',  label: 'Confronto direto' },
    { key: 'away_goals',    label: 'Gols fora de casa' },
    { key: 'yellow_cards',  label: 'Cartões amarelos (fair-play)' },
    { key: 'red_cards',     label: 'Cartões vermelhos (fair-play)' }
  ];

  function knownLabels() {
    var out = {};
    ALL.forEach(function (entry) { out[entry.key] = entry.label; });
    return out;
  }

  function reconcile(selected) {
    var seen = {};
    var ordered = [];
    (selected || []).forEach(function (key) {
      if (!seen[key]) { seen[key] = true; ordered.push(key); }
    });
    return ordered;
  }

  return Marionette.ItemView.extend({

    className: 'tiebreaker-editor',

    initialize: function (options) {
      var opts = options || {};
      this.selected = reconcile(opts.selected);
      this.labels = knownLabels();
    },

    template: function (data) {
      var rows = data.selected.map(function (key, idx) {
        var label = data.labels[key] || key;
        return '<li class="tiebreaker-item" data-key="' +
          escapeHtml(key) + '" data-index="' + idx + '">' +
          '<span class="tiebreaker-pos">' + (idx + 1) + '</span>' +
          '<span class="tiebreaker-label">' + escapeHtml(label) + '</span>' +
          '<span class="tiebreaker-actions">' +
            '<button type="button" class="btn btn-xs btn-default tb-up" ' +
                    'aria-label="Mover para cima">↑</button> ' +
            '<button type="button" class="btn btn-xs btn-default tb-down" ' +
                    'aria-label="Mover para baixo">↓</button> ' +
            '<button type="button" class="btn btn-xs btn-danger tb-remove" ' +
                    'aria-label="Remover critério">×</button>' +
          '</span>' +
          '</li>';
      }).join('');

      var available = data.all.filter(function (entry) {
        return data.selected.indexOf(entry.key) === -1;
      });
      var addOptions = available.map(function (entry) {
        return '<option value="' + escapeHtml(entry.key) + '">' +
          escapeHtml(entry.label) + '</option>';
      }).join('');

      return '<ol class="tiebreaker-list list-unstyled">' + rows + '</ol>' +
        (available.length === 0 ?
          '<p class="text-muted">Todos os critérios já estão na lista.</p>' :
          '<div class="tiebreaker-add">' +
            '<select class="form-control tb-add-select">' +
              '<option value="">Adicionar critério…</option>' +
              addOptions +
            '</select>' +
          '</div>');
    },

    serializeData: function () {
      return { selected: this.selected, labels: this.labels, all: ALL };
    },

    events: {
      'click .tb-up':         'onUp',
      'click .tb-down':       'onDown',
      'click .tb-remove':     'onRemove',
      'change .tb-add-select': 'onAdd'
    },

    indexFromEvent: function (e) {
      var node = e.currentTarget;
      while (node && node.getAttribute) {
        if (node.getAttribute('data-index') !== null) {
          return parseInt(node.getAttribute('data-index'), 10);
        }
        node = node.parentNode;
      }
      return -1;
    },

    onUp: function (e) {
      var idx = this.indexFromEvent(e);
      if (idx <= 0) { return; }
      var swap = this.selected[idx - 1];
      this.selected[idx - 1] = this.selected[idx];
      this.selected[idx] = swap;
      this.render();
      this.trigger('tiebreakers:changed', this.value());
    },

    onDown: function (e) {
      var idx = this.indexFromEvent(e);
      if (idx < 0 || idx >= this.selected.length - 1) { return; }
      var swap = this.selected[idx + 1];
      this.selected[idx + 1] = this.selected[idx];
      this.selected[idx] = swap;
      this.render();
      this.trigger('tiebreakers:changed', this.value());
    },

    onRemove: function (e) {
      var idx = this.indexFromEvent(e);
      if (idx < 0) { return; }
      this.selected.splice(idx, 1);
      this.render();
      this.trigger('tiebreakers:changed', this.value());
    },

    onAdd: function (e) {
      var key = e.currentTarget.value;
      if (!key) { return; }
      this.selected.push(key);
      this.render();
      this.trigger('tiebreakers:changed', this.value());
    },

    value: function () { return this.selected.slice(); }

  });
}());
