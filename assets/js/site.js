(function () {
  'use strict';

  // Mobile menu
  var burger = document.querySelector('.header-burger');
  if (burger) {
    var openLabel = burger.querySelector('.label-open');
    var closeLabel = burger.querySelector('.label-close');
    var setOpen = function (open) {
      document.body.classList.toggle('menu-open', open);
      burger.setAttribute('aria-expanded', String(open));
      if (openLabel) openLabel.hidden = open;
      if (closeLabel) closeLabel.hidden = !open;
    };
    burger.addEventListener('click', function () {
      setOpen(!document.body.classList.contains('menu-open'));
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 768) setOpen(false);
    });
  }

  // Accordion
  document.querySelectorAll('.accordion-trigger').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.accordion-item');
      var open = !item.classList.contains('is-open');
      item.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', String(open));
    });
  });

  // Click-to-load video tiles (Instagram reel)
  document.querySelectorAll('[data-embed]').forEach(function (el) {
    el.addEventListener('click', function () {
      var iframe = document.createElement('iframe');
      iframe.src = el.getAttribute('data-embed');
      iframe.allow = 'autoplay; encrypted-media; picture-in-picture';
      iframe.setAttribute('allowfullscreen', '');
      iframe.title = el.getAttribute('aria-label') || 'Video';
      var wrap = document.createElement('div');
      wrap.appendChild(iframe);
      el.replaceWith(wrap);
    }, { once: true });
  });
})();
