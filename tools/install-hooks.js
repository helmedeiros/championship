/*
 * Copies tracked hook scripts from .githooks/ into .git/hooks/ and makes them
 * executable. Idempotent. Safe to run after every `npm install`.
 */

(function () {
  'use strict';

  var fs = require('fs');
  var path = require('path');
  var execSync = require('child_process').execSync;

  var ROOT;
  try {
    ROOT = execSync('git rev-parse --show-toplevel', { encoding: 'utf8' }).trim();
  } catch (err) {
    console.log('[install-hooks] not inside a git working tree; skipping.');
    return;
  }

  var src = path.join(ROOT, '.githooks');
  var dest = path.join(ROOT, '.git', 'hooks');

  if (!fs.existsSync(src)) {
    console.log('[install-hooks] no .githooks/ directory; skipping.');
    return;
  }
  if (!fs.existsSync(dest)) {
    console.log('[install-hooks] no .git/hooks/ directory; skipping.');
    return;
  }

  fs.readdirSync(src).forEach(function (name) {
    if (name.charAt(0) === '.') { return; }
    var from = path.join(src, name);
    var to = path.join(dest, name);
    fs.writeFileSync(to, fs.readFileSync(from));
    fs.chmodSync(to, parseInt('755', 8));
    console.log('[install-hooks] installed ' + name);
  });
}());
