/*
 * Hygiene check: rejects commits that contain forbidden tokens.
 *
 * Forbidden tokens currently cover AI-tool name-drops and co-author trailers
 * that should not appear anywhere in tracked sources.
 */

(function () {
  'use strict';

  var fs = require('fs');
  var execSync = require('child_process').execSync;

  var FORBIDDEN = [
    /\bclaude\b/i,
    /\banthropic\b/i,
    /\bopenai\b/i,
    /\bgpt-?\d*\b/i,
    /\bcopilot\b/i,
    /Co-Authored-By:/
  ];

  var EXEMPT_PATHS = [
    'tools/hygiene.js'
  ];

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

  function isExempt(file) {
    var i;
    for (i = 0; i < EXEMPT_PATHS.length; i = i + 1) {
      if (EXEMPT_PATHS[i] === file) {
        return true;
      }
    }
    return false;
  }

  function check() {
    var failures = [];
    var files = stagedFiles();

    files.forEach(function (file) {
      if (isExempt(file)) { return; }
      if (!fs.existsSync(file)) { return; }
      var contents = fs.readFileSync(file, 'utf8');
      FORBIDDEN.forEach(function (re) {
        var match = contents.match(re);
        if (match) {
          failures.push(file + ' contém termo proibido: ' + match[0]);
        }
      });
    });

    if (failures.length > 0) {
      console.error('Higiene bloqueada:');
      failures.forEach(function (msg) { console.error('  ' + msg); });
      process.exit(1);
    }

    console.log('Higiene OK (' + files.length + ' arquivo(s) verificado(s))');
  }

  check();
}());
