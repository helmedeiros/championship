module.exports = (function () {
  'use strict';

  var escapeHtml = require('../helpers/escape_html');

  function input(field, label, value) {
    return '' +
      '<div class="form-group" data-field="' + field + '">' +
        '<label class="control-label" for="time-' + field + '">' + label + '</label>' +
        '<input type="text" id="time-' + field + '" name="' + field + '" ' +
               'class="form-control" value="' + escapeHtml(value) + '">' +
        '<span class="help-block error-message"></span>' +
      '</div>';
  }

  return function formTemplate(data) {
    return '' +
      '<form class="team-form form-horizontal">' +
        input('name',    'Nome',    data.name) +
        input('short',   'Sigla',   data.short) +
        input('city',    'Cidade',  data.city) +
        input('stadium', 'Estádio', data.stadium) +
        '<div class="form-actions">' +
          '<button type="submit" class="btn btn-primary">Salvar</button>' +
          '<button type="button" class="btn btn-default cancel">Cancelar</button>' +
        '</div>' +
      '</form>';
  };
}());
