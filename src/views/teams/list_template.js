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
        '</tr>' +
      '</thead>' +
      '<tbody class="teams-rows"></tbody>';
  };
}());
