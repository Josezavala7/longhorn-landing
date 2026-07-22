(function () {
  'use strict';

  var iso = document.getElementById('patioIso');
  if (!iso) return;

  var COLS = 9, ROWS = 7;
  var pavers = [];
  var placed = false;

  // Build paver grid
  iso.style.gridTemplateColumns = 'repeat(' + COLS + ', 1fr)';

  for (var r = 0; r < ROWS; r++) {
    for (var c = 0; c < COLS; c++) {
      var p = document.createElement('div');
      p.className = 'pv';
      // Diagonal wave: pavers in the same diagonal land together
      var delay = (r + c) * 70;
      p.style.transitionDelay = delay + 'ms';
      iso.appendChild(p);
      pavers.push(p);
    }
  }

  function triggerBuild() {
    if (placed) return;
    placed = true;
    pavers.forEach(function (p) { p.classList.add('pv--in'); });
  }

  function resetBuild() {
    placed = false;
    pavers.forEach(function (p) { p.classList.remove('pv--in'); });
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        triggerBuild();
      } else {
        // Reset so it replays when scrolled back into view
        resetBuild();
      }
    });
  }, { threshold: 0.18 });

  io.observe(document.querySelector('.patio-scene'));
})();
