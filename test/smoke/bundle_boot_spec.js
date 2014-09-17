'use strict';

var fs = require('fs');
var path = require('path');
var jsdom = require('jsdom');
var chai = require('chai');
var expect = chai.expect;

var BUNDLE = path.join(__dirname, '..', '..', 'dist', 'bundle.js');

// jsdom 5.x doesn't ship window.localStorage. Real browsers always have it,
// so the bundle is correct to expect it — we just patch the test environment.
function polyfillLocalStorage(win) {
  if (win.localStorage) { return; }
  var data = {};
  win.localStorage = {
    get length() { return Object.keys(data).length; },
    getItem: function (k) { return data.hasOwnProperty(k) ? data[k] : null; },
    setItem: function (k, v) { data[k] = String(v); },
    removeItem: function (k) { delete data[k]; },
    key: function (i) { return Object.keys(data)[i] || null; },
    clear: function () { data = {}; }
  };
}

describe('smoke/bundle', function () {

  this.timeout(8000);

  it('produziu dist/bundle.js a partir de grunt build', function () {
    expect(fs.existsSync(BUNDLE)).to.equal(true);
    var stat = fs.statSync(BUNDLE);
    expect(stat.size).to.be.above(100000);
  });

  it('boota no navegador (jsdom) e renderiza tela inicial em #regiao-principal', function (done) {
    var bundle = fs.readFileSync(BUNDLE, 'utf8');

    var html = '<!DOCTYPE html><html><body>' +
      '<div id="regiao-navegacao"></div>' +
      '<div id="regiao-mensagens"></div>' +
      '<div id="regiao-principal"><h1>Carregando&hellip;</h1></div>' +
      '</body></html>';

    var doc = jsdom.jsdom(html);
    var win = doc.defaultView;
    polyfillLocalStorage(win);

    try {
      win.eval(bundle);
    } catch (err) {
      return done(new Error('bundle.js explodiu ao bootar: ' + err.message));
    }

    setTimeout(function () {
      var html2 = doc.getElementById('regiao-principal').innerHTML;
      try {
        expect(html2, 'região principal continua "Carregando"').to.not.match(/Carregando/);
        expect(html2.length, 'conteúdo deveria ser substituído').to.be.above(40);
        expect(html2, 'tela inicial deveria mencionar championship').to.match(/championship/i);
        done();
      } catch (assertion) {
        done(assertion);
      }
    }, 300);
  });

  it('navega para #/times e renderiza a tabela TeamsListView', function (done) {
    var bundle = fs.readFileSync(BUNDLE, 'utf8');

    var html = '<!DOCTYPE html><html><body>' +
      '<div id="regiao-navegacao"></div>' +
      '<div id="regiao-mensagens"></div>' +
      '<div id="regiao-principal"><h1>Carregando&hellip;</h1></div>' +
      '</body></html>';

    var doc = jsdom.jsdom(html, { url: 'http://localhost/#/times' });
    var win = doc.defaultView;
    polyfillLocalStorage(win);

    try {
      win.eval(bundle);
    } catch (err) {
      return done(new Error('bundle.js explodiu ao bootar: ' + err.message));
    }

    setTimeout(function () {
      var region = doc.getElementById('regiao-principal');
      try {
        var table = region.querySelector('table.teams-list');
        expect(table, 'tabela teams-list deveria existir').to.not.equal(null);
        var rows = region.querySelectorAll('tbody tr.team-row');
        expect(rows.length, 'deveria haver linhas semeadas').to.be.above(0);
        done();
      } catch (assertion) {
        done(assertion);
      }
    }, 300);
  });

});
