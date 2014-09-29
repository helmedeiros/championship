module.exports = (function () {
  'use strict';

  return function listTemplate() {
    return '' +
      '<thead>' +
        '<tr>' +
          '<th>#</th>' +
          '<th>Foto</th>' +
          '<th>Nome</th>' +
          '<th>Apelido</th>' +
          '<th>Posição</th>' +
          '<th>País</th>' +
        '</tr>' +
      '</thead>' +
      '<tbody class="players-rows"></tbody>';
  };
}());
