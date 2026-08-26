// ADPM Birmingham — shared behaviour

document.addEventListener('DOMContentLoaded', function () {
  // Gracefully hide any image that fails to load. This replaces
  // inline onerror="" attributes so pages can run under a strict
  // Content-Security-Policy (script-src 'self', no 'unsafe-inline').
  document.querySelectorAll('img').forEach(function (img) {
    img.addEventListener('error', function () {
      this.style.display = 'none';
    });
  });

  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Gallery lightbox (only present on gallery.html)
  var lightbox = document.querySelector('.lightbox');
  if (lightbox) {
    var frame = lightbox.querySelector('.lightbox-frame');
    var cap = lightbox.querySelector('.lightbox-cap');
    var closeBtn = lightbox.querySelector('.lightbox-close');

    document.querySelectorAll('.gallery-tile').forEach(function (tile) {
      tile.addEventListener('click', function () {
        var img = tile.querySelector('img');
        if (img) {
          frame.style.backgroundImage = "url('" + img.getAttribute('src') + "')";
        } else {
          frame.style.backgroundImage = getComputedStyle(tile).backgroundImage;
        }
        frame.style.backgroundSize = 'cover';
        frame.style.backgroundPosition = 'center';
        frame.textContent = '';
        cap.textContent = tile.getAttribute('data-caption') || '';
        lightbox.classList.add('open');
      });
    });
    function close() { lightbox.classList.remove('open'); }
    closeBtn.addEventListener('click', close);
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
  }

  // Gallery filter pills (only present on gallery.html)
  var pills = document.querySelectorAll('.filter-pill');
  if (pills.length) {
    pills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        pills.forEach(function (p) { p.classList.remove('active'); });
        pill.classList.add('active');
        var cat = pill.getAttribute('data-filter');
        document.querySelectorAll('.gallery-tile').forEach(function (tile) {
          var show = cat === 'all' || tile.getAttribute('data-cat') === cat;
          tile.style.display = show ? '' : 'none';
        });
      });
    });
  }

  // Contact form — friendly, non-destructive demo submit
  var form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var note = form.querySelector('.form-note');
      if (note) {
        note.textContent = "Message ready to send — connect this form to your email service to go live.";
        note.style.color = '#814D1E';
      }
    });
  }
});
