module.exports = (function () {
  'use strict';

  return function listTemplate() {
    return '' +
      '<thead>' +
        '<tr>' +
          '<th>Time</th>' +
          '<th>Sigla</th>' +
          '<th>Cidade</th>' +
          '<th>Estádio</th>' +
          '<th>Ações</th>' +
        '</tr>' +
      '</thead>' +
      '<tbody class="teams-rows"></tbody>' +
      '<tfoot>' +
        '<tr><td colspan="5" class="text-right">' +
          '<a class="btn btn-primary btn-sm" href="#/admin/times/novo">+ Novo time</a>' +
        '</td></tr>' +
      '</tfoot>';
  };
}());
