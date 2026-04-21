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

  // ==========================================================================
  // COOKIE CONSENT BANNER — gates external services like Google Maps
  // Stores choice in localStorage. To revoke, clear storage or reload with
  // ?reset-cookies=1 in the URL.
  // ==========================================================================
  const CONSENT_KEY = 'abec-cookie-consent';

  // Allow reset via ?reset-cookies query param (handy for testing)
  if (window.location.search.includes('reset-cookies')) {
    localStorage.removeItem(CONSENT_KEY);
  }

  const consent = localStorage.getItem(CONSENT_KEY);

  const loadGatedContent = () => {
    // Swap data-consent-src → src on iframes (Google Maps etc.)
    document.querySelectorAll('iframe[data-consent-src]').forEach((el) => {
      el.src = el.dataset.consentSrc;
      el.removeAttribute('data-consent-src');
    });
    // Remove any map placeholders
    document.querySelectorAll('.map-placeholder').forEach((el) => el.remove());

    // ---------- Analytics (enable by providing the config below) ----------
    // Plausible (privacy-friendly, no cookies — could also be loaded without
    // consent, but we defer to consent for consistency):
    //   injectScript({
    //     src: 'https://plausible.io/js/script.js',
    //     defer: true,
    //     'data-domain': 'your-domain.ch'
    //   });
    //
    // Google Analytics 4:
    //   injectScript({ src: 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX', async: true });
    //   window.dataLayer = window.dataLayer || [];
    //   function gtag(){dataLayer.push(arguments);}
    //   gtag('js', new Date());
    //   gtag('config', 'G-XXXXXXXXXX');
  };

  const injectBanner = () => {
    if (document.getElementById('cookie-banner')) return;
    const banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Cookie-Einstellungen');
    banner.innerHTML = [
      '<div class="cookie-banner-inner">',
        '<div class="cookie-banner-text">',
          '<p class="cookie-banner-title">Wir verwenden Cookies</p>',
          '<p>Diese Website verwendet Cookies und externe Dienste (z.B. Google Maps), um Ihnen das bestmögliche Erlebnis zu bieten. Details finden Sie in unserer <a href="datenschutz.html">Datenschutzerklärung</a>.</p>',
        '</div>',
        '<div class="cookie-banner-actions">',
          '<button type="button" class="cookie-btn-reject" id="cookie-reject">Ablehnen</button>',
          '<button type="button" class="cookie-btn-accept" id="cookie-accept">Akzeptieren</button>',
        '</div>',
      '</div>',
    ].join('');
    document.body.appendChild(banner);

    const removeBanner = () => {
      banner.classList.add('cookie-banner--hidden');
      setTimeout(() => banner.remove(), 300);
    };

    document.getElementById('cookie-accept').addEventListener('click', () => {
      localStorage.setItem(CONSENT_KEY, 'accepted');
      removeBanner();
      loadGatedContent();
    });
    document.getElementById('cookie-reject').addEventListener('click', () => {
      localStorage.setItem(CONSENT_KEY, 'rejected');
      removeBanner();
    });
  };

  if (consent === 'accepted') {
    loadGatedContent();
  } else if (consent !== 'rejected') {
    // First visit — show banner
    injectBanner();
  }
  // If rejected, stay silent — user can revoke via ?reset-cookies=1
})();
