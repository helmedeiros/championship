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

  it('navega para #/campeonatos e renderiza a lista (com seed demo)', function (done) {
    var bundle = fs.readFileSync(BUNDLE, 'utf8');
    var html = '<!DOCTYPE html><html><body>' +
      '<div id="regiao-navegacao"></div>' +
      '<div id="regiao-mensagens"></div>' +
      '<div id="regiao-principal"><h1>Carregando&hellip;</h1></div>' +
      '</body></html>';
    var doc = jsdom.jsdom(html, { url: 'http://localhost/#/campeonatos' });
    var win = doc.defaultView;
    polyfillLocalStorage(win);
    try { win.eval(bundle); } catch (e) { return done(e); }
    setTimeout(function () {
      var region = doc.getElementById('regiao-principal');
      try {
        var table = region.querySelector('table.championships-list');
        expect(table, 'deveria haver lista de campeonatos').to.not.equal(null);
        var rows = region.querySelectorAll('tbody tr.championship-row');
        expect(rows.length, 'deveria haver pelo menos o campeonato demo').to.be.above(0);
        done();
      } catch (a) { done(a); }
    }, 400);
  });

  it('navega para o detalhe do campeonato demo e mostra classificação', function (done) {
    var bundle = fs.readFileSync(BUNDLE, 'utf8');
    var html = '<!DOCTYPE html><html><body>' +
      '<div id="regiao-navegacao"></div>' +
      '<div id="regiao-mensagens"></div>' +
      '<div id="regiao-principal"><h1>Carregando&hellip;</h1></div>' +
      '</body></html>';
    var doc = jsdom.jsdom(html, { url: 'http://localhost/#/campeonatos' });
    var win = doc.defaultView;
    polyfillLocalStorage(win);
    try { win.eval(bundle); } catch (e) { return done(e); }
    setTimeout(function () {
      // first land on /campeonatos to seed, then navigate to detail
      win.location.hash = '#/campeonatos/brasileirao-demo-2014';
      setTimeout(function () {
        var region = doc.getElementById('regiao-principal');
        try {
          var h1 = region.querySelector('h1');
          expect(h1, 'deveria ter título h1').to.not.equal(null);
          expect(h1.textContent).to.match(/Brasileirão/);
          var table = region.querySelector('table.classification-table');
          expect(table, 'classification-table deveria existir').to.not.equal(null);
          var rows = region.querySelectorAll('table.classification-table tbody tr');
          expect(rows.length, 'deveria haver linhas de classificação').to.be.above(0);
          done();
        } catch (a) { done(a); }
      }, 300);
    }, 300);
  });

  it('clicar na tab Estatísticas no match show mostra tabela de stats', function (done) {
    var bundle = fs.readFileSync(BUNDLE, 'utf8');
    var html = '<!DOCTYPE html><html><body>' +
      '<div id="regiao-navegacao"></div>' +
      '<div id="regiao-mensagens"></div>' +
      '<div id="regiao-principal"><h1>Carregando&hellip;</h1></div>' +
      '</body></html>';
    var doc = jsdom.jsdom(html, { url: 'http://localhost/#/campeonatos' });
    var win = doc.defaultView;
    polyfillLocalStorage(win);
    try { win.eval(bundle); } catch (e) { return done(e); }
    setTimeout(function () {
      var raw = win.localStorage.getItem('championship:matches');
      var matches = raw ? JSON.parse(raw) : [];
      expect(matches.length).to.be.above(0);
      win.location.hash = '#/partidas/' + matches[0].id;
      setTimeout(function () {
        var region = doc.getElementById('regiao-principal');
        try {
          var tab = region.querySelector('.match-tabs li[data-tab="stats"]');
          expect(tab, 'deveria existir tab Estatísticas').to.not.equal(null);
          var ev = doc.createEvent('MouseEvents');
          ev.initEvent('click', true, true);
          tab.dispatchEvent(ev);
          setTimeout(function () {
            var stats = region.querySelector('table.stats-summary');
            expect(stats, 'tab Estatísticas deveria mostrar tabela').to.not.equal(null);
            done();
          }, 100);
        } catch (a) { done(a); }
      }, 300);
    }, 300);
  });

  it('navega para o scoreboard admin e renderiza ScorerView', function (done) {
    var bundle = fs.readFileSync(BUNDLE, 'utf8');
    var html = '<!DOCTYPE html><html><body>' +
      '<div id="regiao-navegacao"></div>' +
      '<div id="regiao-mensagens"></div>' +
      '<div id="regiao-principal"><h1>Carregando&hellip;</h1></div>' +
      '</body></html>';
    var doc = jsdom.jsdom(html, { url: 'http://localhost/#/campeonatos' });
    var win = doc.defaultView;
    polyfillLocalStorage(win);
    // Configura como admin para passar pelo gate de rotas admin/*.
    win.localStorage.setItem('championship:role', 'admin');
    try { win.eval(bundle); } catch (e) { return done(e); }
    setTimeout(function () {
      // need a real match id: grab the first match of the seeded championship
      var raw = win.localStorage.getItem('championship:matches');
      var matches = raw ? JSON.parse(raw) : [];
      expect(matches.length, 'seed deveria ter criado partidas').to.be.above(0);
      var firstId = matches[0].id;
      win.location.hash = '#/admin/partidas/' + firstId + '/scoreboard';
      setTimeout(function () {
        var region = doc.getElementById('regiao-principal');
        try {
          expect(region.querySelector('.scorer'), 'scorer deveria renderizar')
            .to.not.equal(null);
          expect(region.querySelector('.goal-home'), 'botão gol mandante').to.not.equal(null);
          expect(region.querySelector('.goal-away'), 'botão gol visitante').to.not.equal(null);
          done();
        } catch (a) { done(a); }
      }, 300);
    }, 300);
  });

  it('navega para #/partidas e renderiza tabela de partidas', function (done) {
    var bundle = fs.readFileSync(BUNDLE, 'utf8');
    var html = '<!DOCTYPE html><html><body>' +
      '<div id="regiao-navegacao"></div>' +
      '<div id="regiao-mensagens"></div>' +
      '<div id="regiao-principal"><h1>Carregando&hellip;</h1></div>' +
      '</body></html>';
    var doc = jsdom.jsdom(html, { url: 'http://localhost/#/partidas' });
    var win = doc.defaultView;
    polyfillLocalStorage(win);
    try { win.eval(bundle); } catch (e) { return done(e); }
    setTimeout(function () {
      var region = doc.getElementById('regiao-principal');
      try {
        var table = region.querySelector('table.matches-list');
        expect(table, 'tabela matches-list deveria existir').to.not.equal(null);
        var rows = region.querySelectorAll('tbody tr.match-row');
        expect(rows.length, 'partidas semeadas deveriam aparecer').to.be.above(0);
        done();
      } catch (a) { done(a); }
    }, 400);
  });

  it('navega para perfil de time e mostra estatísticas', function (done) {
    var bundle = fs.readFileSync(BUNDLE, 'utf8');
    var html = '<!DOCTYPE html><html><body>' +
      '<div id="regiao-navegacao"></div>' +
      '<div id="regiao-mensagens"></div>' +
      '<div id="regiao-principal"><h1>Carregando&hellip;</h1></div>' +
      '</body></html>';
    var doc = jsdom.jsdom(html, { url: 'http://localhost/#/times/sao' });
    var win = doc.defaultView;
    polyfillLocalStorage(win);
    try { win.eval(bundle); } catch (e) { return done(e); }
    setTimeout(function () {
      var region = doc.getElementById('regiao-principal');
      try {
        var profile = region.querySelector('.team-profile');
        expect(profile, 'team-profile deveria renderizar').to.not.equal(null);
        var stats = region.querySelectorAll('.team-stats .stat');
        expect(stats.length, 'deveria mostrar pelo menos 6 stats').to.be.above(5);
        done();
      } catch (a) { done(a); }
    }, 400);
  });

  it('navega para #/h2h/sao/cor e renderiza confrontos', function (done) {
    var bundle = fs.readFileSync(BUNDLE, 'utf8');
    var html = '<!DOCTYPE html><html><body>' +
      '<div id="regiao-navegacao"></div>' +
      '<div id="regiao-mensagens"></div>' +
      '<div id="regiao-principal"><h1>Carregando&hellip;</h1></div>' +
      '</body></html>';
    var doc = jsdom.jsdom(html, { url: 'http://localhost/#/h2h/sao/cor' });
    var win = doc.defaultView;
    polyfillLocalStorage(win);
    try { win.eval(bundle); } catch (e) { return done(e); }
    setTimeout(function () {
      var region = doc.getElementById('regiao-principal');
      try {
        var h2h = region.querySelector('.head-to-head');
        expect(h2h, 'head-to-head deveria renderizar').to.not.equal(null);
        done();
      } catch (a) { done(a); }
    }, 400);
  });

  it('navega para #/importar e mostra cartões de fixtures prontos', function (done) {
    var bundle = fs.readFileSync(BUNDLE, 'utf8');
    var html = '<!DOCTYPE html><html><body>' +
      '<div id="regiao-navegacao"></div>' +
      '<div id="regiao-mensagens"></div>' +
      '<div id="regiao-principal"><h1>Carregando&hellip;</h1></div>' +
      '</body></html>';
    var doc = jsdom.jsdom(html, { url: 'http://localhost/#/importar' });
    var win = doc.defaultView;
    polyfillLocalStorage(win);
    try { win.eval(bundle); } catch (e) { return done(e); }
    setTimeout(function () {
      var region = doc.getElementById('regiao-principal');
      try {
        var importer = region.querySelector('.importer');
        expect(importer, 'importer view deveria renderizar').to.not.equal(null);
        var buttons = region.querySelectorAll('.import-btn');
        expect(buttons.length, 'deveria haver botões de importação').to.be.above(1);
        done();
      } catch (a) { done(a); }
    }, 400);
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

  it('home mostra cartão "AO VIVO" com a partida em andamento do demo',
    function (done) {
      var bundle = fs.readFileSync(BUNDLE, 'utf8');
      var html = '<!DOCTYPE html><html><body>' +
        '<div id="regiao-navegacao"></div>' +
        '<div id="regiao-mensagens"></div>' +
        '<div id="regiao-principal"><h1>Carregando&hellip;</h1></div>' +
        '</body></html>';
      var doc = jsdom.jsdom(html, { url: 'http://localhost/#/' });
      var win = doc.defaultView;
      polyfillLocalStorage(win);
      try { win.eval(bundle); } catch (err) { return done(err); }
      setTimeout(function () {
        try {
          var region = doc.getElementById('regiao-principal');
          var label = region.querySelector('.highlight-label');
          expect(label, 'rótulo de destaque deveria existir')
            .to.not.equal(null);
          expect(label.textContent, 'destaque deveria estar AO VIVO')
            .to.match(/AO VIVO/);
          done();
        } catch (a) { done(a); }
      }, 400);
    });

  it('rota partidas/compartilhada/:token renderiza a partida do link',
    function (done) {
      // payload pré-encodado: BRA 1x7 GER + 2 eventos.
      // gerado por share/encode.encode no Node.
      var encode = require('../../src/share/encode');
      var payload = {
        match: {
          id: 'shared-bra-ger',
          home: 'BRA', away: 'GER',
          homeScore: 1, awayScore: 7,
          status: 'finished',
          kickoff: '2014-07-08T21:00:00Z'
        },
        events: [
          { type: 'goal', minute: 11, half: 1, player: 'Müller' },
          { type: 'goal', minute: 23, half: 1, player: 'Klose' }
        ]
      };
      var token = encode.encode(payload);
      var bundle = fs.readFileSync(BUNDLE, 'utf8');
      var html = '<!DOCTYPE html><html><body>' +
        '<div id="regiao-navegacao"></div>' +
        '<div id="regiao-mensagens"></div>' +
        '<div id="regiao-principal"><h1>Carregando&hellip;</h1></div>' +
        '</body></html>';
      var doc = jsdom.jsdom(html, {
        url: 'http://localhost/#/partidas/compartilhada/' + token
      });
      var win = doc.defaultView;
      polyfillLocalStorage(win);
      try { win.eval(bundle); } catch (err) { return done(err); }
      setTimeout(function () {
        try {
          var region = doc.getElementById('regiao-principal');
          var content = region.innerHTML;
          expect(content, 'região não deveria continuar em Carregando')
            .to.not.match(/Carregando/);
          expect(content, 'BRA deveria aparecer no header').to.match(/BRA/);
          expect(content, 'GER deveria aparecer no header').to.match(/GER/);
          done();
        } catch (a) { done(a); }
      }, 400);
    });

  it('admin gate redireciona usuário não-admin para /admin/setup', function (done) {
    var bundle = fs.readFileSync(BUNDLE, 'utf8');
    var html = '<!DOCTYPE html><html><body>' +
      '<div id="regiao-navegacao"></div>' +
      '<div id="regiao-mensagens"></div>' +
      '<div id="regiao-principal"><h1>Carregando&hellip;</h1></div>' +
      '</body></html>';
    var doc = jsdom.jsdom(html,
      { url: 'http://localhost/#/admin/campeonatos/novo' });
    var win = doc.defaultView;
    polyfillLocalStorage(win);
    // não setar role → permanece como user
    try { win.eval(bundle); } catch (e) { return done(e); }
    setTimeout(function () {
      try {
        expect(win.location.hash).to.match(/admin\/setup/);
        var region = doc.getElementById('regiao-principal');
        expect(region.querySelector('.admin-setup'),
          'admin-setup deveria renderizar').to.not.equal(null);
        done();
      } catch (a) { done(a); }
    }, 400);
  });

});
