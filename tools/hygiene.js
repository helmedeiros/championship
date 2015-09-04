/*
 * Verifica arquivos staged contra uma lista de padrões definida pelo
 * projeto. A lista vive fora do repositório; sem ela, o gate vira no-op.
 */

(function () {
  'use strict';

  var fs = require('fs');
  var path = require('path');
  var execSync = require('child_process').execSync;

  function loadPolicy() {
    var candidates = [
      path.join(process.cwd(), '..', '.plan', 'hygiene_tokens.json'),
      path.join(process.env.HOME || '', '.config', 'championship',
                'hygiene_tokens.json')
    ];
    var i, raw;
    for (i = 0; i < candidates.length; i = i + 1) {
      try {
        raw = fs.readFileSync(candidates[i], 'utf8');
        return JSON.parse(raw);
      } catch (err) {
        // próximo candidato
      }
    }
    return null;
  }

  function stagedFiles() {
    var raw;
    try {
      raw = execSync('git diff --cached --name-only --diff-filter=ACMR',
                     { encoding: 'utf8' });
    } catch (err) {
      return [];
    }
    return raw.split('\n').filter(Boolean);
  }

  function isExempt(file, exemptList) {
    var i;
    for (i = 0; i < exemptList.length; i = i + 1) {
      if (exemptList[i] === file) { return true; }
    }
    return false;
  }

  function check() {
    var policy = loadPolicy();
    if (!policy || !policy.patterns || policy.patterns.length === 0) {
      console.log('Política local ausente — verificação ignorada.');
      return;
    }

    var patterns = policy.patterns.map(function (p) {
      return new RegExp(p, 'i');
    });
    var exempt = policy.exempt || [];
    var files = stagedFiles();
    var failures = [];

    files.forEach(function (file) {
      if (isExempt(file, exempt)) { return; }
      if (!fs.existsSync(file)) { return; }
      var contents = fs.readFileSync(file, 'utf8');
      patterns.forEach(function (re) {
        var match = contents.match(re);
        if (match) {
          failures.push(file + ' :: padrão local violado');
        }
      });
    });

    if (failures.length > 0) {
      console.error('Verificação bloqueada:');
      failures.forEach(function (msg) { console.error('  ' + msg); });
      process.exit(1);
    }

    console.log('Verificação OK (' + files.length +
                ' arquivo(s) inspecionado(s))');
  }

  check();
}());
