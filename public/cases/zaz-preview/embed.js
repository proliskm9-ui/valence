document.documentElement.classList.add('is-embed');

var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var revealObserver = null;

function runCountUp(el) {
  var target = parseInt(el.getAttribute('data-count'), 10) || 0;
  var suffix = el.getAttribute('data-suffix') || '';
  if (prefersReducedMotion) {
    el.textContent = target + suffix;
    return;
  }
  var dur = 1200;
  var start = null;
  function step(ts) {
    if (!start) start = ts;
    var p = Math.min((ts - start) / dur, 1);
    var eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(eased * target) + suffix;
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function initCountUp() {
  document.querySelectorAll('[data-count]').forEach(runCountUp);
}

function initMarquee() {
  var track = document.querySelector('.marquee-track');
  if (!track) return;
  track.innerHTML = track.innerHTML + track.innerHTML;
}

function revealShow(el) {
  if (!el || el.classList.contains('in')) return;
  el.classList.add('in');
  if (revealObserver) revealObserver.unobserve(el);
}

function initReveal() {
  var items = document.querySelectorAll('.reveal:not(.in)');
  if (!items.length) return;

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    items.forEach(revealShow);
    return;
  }

  if (window.matchMedia('(max-width: 899px)').matches) {
    items.forEach(revealShow);
    return;
  }

  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) revealShow(entry.target);
        });
      },
      { threshold: 0.01, rootMargin: '64px 0px 64px 0px' },
    );
  }

  items.forEach(function (el) {
    revealObserver.observe(el);
  });
}

function initImageSkeletons() {
  document.querySelectorAll('.photo-slot.has-img').forEach(function (shell) {
    var img = shell.querySelector(':scope > img');
    if (!img) return;

    function showImage() {
      shell.classList.add('is-image-loaded');
      shell.classList.remove('is-image-error');
    }

    function showFallback() {
      shell.classList.add('is-image-error');
      shell.classList.remove('is-image-loaded');
    }

    if (img.complete) {
      if (img.naturalWidth > 0) showImage();
      else showFallback();
      return;
    }

    img.addEventListener('load', showImage, { once: true });
    img.addEventListener('error', showFallback, { once: true });
  });
}

document.addEventListener('DOMContentLoaded', function () {
  initCountUp();
  initMarquee();
  initReveal();
  initImageSkeletons();
});
