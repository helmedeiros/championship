module.exports = (function () {
  'use strict';

  // Sparkline minimalista em SVG. Recebe lista de resultados ['W','D','L',...]
  // e devolve <svg> com bolinhas coloridas.

  function colorFor(r) {
    if (r === 'W') { return '#1f7a1f'; }
    if (r === 'D') { return '#aaaaaa'; }
    return '#c0392b';
  }

  function render(results, options) {
    var opts = options || {};
    var size = opts.size || 8;
    var gap = opts.gap || 4;
    var list = (results || []).slice(-10);
    var width = list.length * (size + gap);
    var svg = '<svg class="sparkline" width="' + width + '" height="' +
      size + '" viewBox="0 0 ' + width + ' ' + size + '">';
    list.forEach(function (r, i) {
      var cx = i * (size + gap) + size / 2;
      var cy = size / 2;
      svg = svg + '<circle cx="' + cx + '" cy="' + cy + '" r="' +
        (size / 2) + '" fill="' + colorFor(r) + '"/>';
    });
    return svg + '</svg>';
  }

  return { render: render };
}());
