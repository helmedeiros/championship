module.exports = (function () {
  'use strict';

  var escapeHtml = require('../helpers/escape_html');

  var POSITION_LABELS = {
    'GOL': 'Goleiro',
    'ZAG': 'Zagueiro',
    'LAT': 'Lateral',
    'VOL': 'Volante',
    'MEI': 'Meio-campo',
    'ATA': 'Atacante'
  };

  function field(name, label, value, type) {
    return '' +
      '<div class="form-group" data-field="' + name + '">' +
        '<label class="control-label" for="jogador-' + name + '">' + label + '</label>' +
        '<input type="' + (type || 'text') + '" id="jogador-' + name + '" ' +
               'name="' + name + '" class="form-control" value="' +
               escapeHtml(value) + '">' +
      '</div>';
  }

  function positionOptions(selected) {
    var html = '<option value="">—</option>';
    Object.keys(POSITION_LABELS).forEach(function (code) {
      var sel = code === selected ? ' selected' : '';
      html = html + '<option value="' + code + '"' + sel + '>' +
        code + ' — ' + POSITION_LABELS[code] + '</option>';
    });
    return html;
  }

  return function formTemplate(data) {
    return '' +
      '<form class="player-form form-horizontal">' +
        field('name', 'Nome', data.name) +
        field('nickname', 'Apelido', data.nickname) +
        field('number', 'Número', data.number === null ? '' : data.number, 'number') +
        '<div class="form-group" data-field="position">' +
          '<label class="control-label" for="jogador-position">Posição</label>' +
          '<select id="jogador-position" name="position" class="form-control">' +
            positionOptions(data.position) +
          '</select>' +
        '</div>' +
        field('nationality', 'Nacionalidade', data.nationality) +
        '<div class="form-actions">' +
          '<button type="submit" class="btn btn-primary">Salvar</button>' +
          '<button type="button" class="btn btn-default cancel">Cancelar</button>' +
        '</div>' +
      '</form>';
  };
}());
