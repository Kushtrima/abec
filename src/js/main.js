/* ==========================================================================
   ABEC Fassadenbau — main.js
   - Mobile menu toggle
   - Header style change on scroll
   - Reveal-on-scroll animations
   ========================================================================== */

(function () {
  'use strict';

  // ---------- Mobile menu ----------
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuClose  = document.getElementById('menu-close');

  const openMenu = () => {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('hidden');
    document.body.classList.add('menu-open');
  };
  const closeMenu = () => {
    if (!mobileMenu) return;
    mobileMenu.classList.add('hidden');
    document.body.classList.remove('menu-open');
  };

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', openMenu);
    if (menuClose) menuClose.addEventListener('click', closeMenu);

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    // Close on ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) closeMenu();
    });
  }

  // ---------- Header on scroll ----------
  const header = document.getElementById('site-header');
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 50) header.classList.add('is-scrolled');
      else header.classList.remove('is-scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ---------- Reveal on scroll ----------
  const revealEls = document.querySelectorAll('section > div, section h1, section h2, section article');
  if ('IntersectionObserver' in window && revealEls.length) {
    revealEls.forEach((el) => el.classList.add('reveal'));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    revealEls.forEach((el) => io.observe(el));
  } else {
    // Fallback: just show everything
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  // ---------- Year in footer (auto-update) ----------
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
