module.exports = (function () {
  'use strict';

  var escapeHtml = require('../helpers/escape_html');

  var FORMAT_OPTIONS = [
    { value: 'league',              label: 'Pontos corridos' },
    { value: 'double-round-robin',  label: 'Pontos corridos (ida e volta)' },
    { value: 'groups-knockout',     label: 'Grupos + mata-mata' },
    { value: 'knockout',            label: 'Mata-mata' }
  ];

  function formatRadios(selected) {
    return FORMAT_OPTIONS.map(function (opt) {
      var checked = (opt.value === selected) ? ' checked' : '';
      return '<label class="radio">' +
        '<input type="radio" name="format" value="' + opt.value + '"' + checked + '> ' +
        opt.label +
      '</label>';
    }).join('');
  }

  function teamsCheckboxes(teams, selectedIds) {
    var selected = {};
    (selectedIds || []).forEach(function (id) { selected[id] = true; });
    return teams.map(function (team) {
      var id = team.id;
      var name = team.get ? team.get('name') : team.name;
      var checked = selected[id] ? ' checked' : '';
      return '<label class="checkbox">' +
        '<input type="checkbox" name="teamIds" value="' + escapeHtml(id) + '"' + checked + '> ' +
        escapeHtml(name) +
      '</label>';
    }).join('');
  }

  return function formTemplate(data) {
    return '' +
      '<form class="championship-form form-horizontal">' +
        '<div class="form-group">' +
          '<label for="champ-name">Nome</label>' +
          '<input type="text" id="champ-name" name="name" class="form-control" ' +
                 'value="' + escapeHtml(data.name) + '">' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="champ-season">Temporada</label>' +
          '<input type="number" id="champ-season" name="season" class="form-control" ' +
                 'value="' + escapeHtml(data.season === null ? '' : data.season) + '">' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="champ-country">País</label>' +
          '<input type="text" id="champ-country" name="country" class="form-control" ' +
                 'value="' + escapeHtml(data.country) + '">' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="champ-startDate">Data da 1ª rodada</label>' +
          '<input type="date" id="champ-startDate" name="startDate" class="form-control" ' +
                 'value="' + escapeHtml(data.startDate) + '">' +
        '</div>' +
        '<div class="form-group format-group">' +
          '<label>Formato</label>' +
          formatRadios(data.format) +
        '</div>' +
        '<div class="form-group teams-group">' +
          '<label>Times participantes</label>' +
          teamsCheckboxes(data.availableTeams || [], data.teamIds) +
        '</div>' +
        '<div class="form-group tiebreakers-group">' +
          '<label>Critérios de desempate (em ordem)</label>' +
          '<div class="tiebreaker-region"></div>' +
        '</div>' +
        '<div class="form-actions">' +
          '<button type="submit" class="btn btn-primary">Criar e gerar calendário</button>' +
          '<button type="button" class="btn btn-default cancel">Cancelar</button>' +
        '</div>' +
      '</form>';
  };
}());
