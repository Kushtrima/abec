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
  // Only animate actual content items (headings, articles, images) — NOT large
  // wrapper divs. Wrappers staying at opacity:0 was hiding entire grids.
  const revealEls = document.querySelectorAll('section h1, section h2, section article');
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
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach((el) => io.observe(el));

    // Safety net: if anything is still hidden after 1.5s (prerender, screenshot
    // tools, disabled JS features, etc.), force it visible so content never
    // disappears for users.
    setTimeout(() => {
      document.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => {
        el.classList.add('is-visible');
      });
    }, 1500);
  } else {
    // No IntersectionObserver support — show everything immediately
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  // ---------- Year in footer (auto-update) ----------
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ==========================================================================
  // COOKIE CONSENT MODAL — categorized consent (Notwendig / Statistik / Externe Medien).
  // Choice stored as JSON in localStorage. Reopen from footer or ?reset-cookies=1.
  // ==========================================================================
  const CONSENT_KEY = 'abec-cookie-consent';

  // Allow reset via ?reset-cookies query param (testing)
  if (window.location.search.includes('reset-cookies')) {
    localStorage.removeItem(CONSENT_KEY);
  }

  const readConsent = () => {
    try {
      const raw = localStorage.getItem(CONSENT_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (typeof parsed === 'object' && parsed !== null) return parsed;
    } catch (_) { /* ignore */ }
    return null;
  };

  const saveConsent = (choices) => {
    const payload = { ...choices, essential: true, timestamp: new Date().toISOString() };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(payload));
    return payload;
  };

  const applyConsent = (c) => {
    if (c.external) {
      // Swap data-consent-src → src on iframes (Google Maps etc.)
      document.querySelectorAll('iframe[data-consent-src]').forEach((el) => {
        el.src = el.dataset.consentSrc;
        el.removeAttribute('data-consent-src');
      });
      document.querySelectorAll('.map-placeholder').forEach((el) => el.remove());
    }
    if (c.statistics) {
      // ---------- Analytics (uncomment & configure when ready) ----------
      // Plausible:
      //   var s = document.createElement('script');
      //   s.defer = true;
      //   s.setAttribute('data-domain', 'your-domain.ch');
      //   s.src = 'https://plausible.io/js/script.js';
      //   document.head.appendChild(s);
      //
      // Google Analytics 4:
      //   var s = document.createElement('script');
      //   s.async = true;
      //   s.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
      //   document.head.appendChild(s);
      //   window.dataLayer = window.dataLayer || [];
      //   function gtag(){dataLayer.push(arguments);}
      //   gtag('js', new Date());
      //   gtag('config', 'G-XXXXXXXXXX');
    }
  };

  const closeModal = () => {
    const m = document.getElementById('cookie-modal');
    if (!m) return;
    m.classList.add('cookie-modal-overlay--hiding');
    document.body.classList.remove('cookie-modal-open');
    setTimeout(() => m.remove(), 300);
  };

  const openModal = (initial) => {
    if (document.getElementById('cookie-modal')) return;
    const prev = initial || readConsent() || { statistics: false, external: false };

    const wrapper = document.createElement('div');
    wrapper.className = 'cookie-modal-overlay';
    wrapper.id = 'cookie-modal';
    wrapper.setAttribute('role', 'dialog');
    wrapper.setAttribute('aria-modal', 'true');
    wrapper.setAttribute('aria-label', 'Datenschutz-Einstellungen');

    wrapper.innerHTML = [
      '<div class="cookie-modal" role="document">',
        '<div class="cookie-modal-header">',
          '<p class="cookie-modal-eyebrow">Datenschutz</p>',
          '<h2>Ihre Privatsphäre</h2>',
        '</div>',
        '<div class="cookie-modal-body">',
          '<p class="cookie-intro">Wir verwenden Cookies und ähnliche Technologien, um unsere Website funktional zu halten, Ihre Nutzungserfahrung zu verbessern und – mit Ihrer Zustimmung – Inhalte Dritter einzubinden. Sie können Ihre Auswahl jederzeit anpassen.</p>',
          '<div class="cookie-category">',
            '<div class="cookie-category-text">',
              '<h3>Notwendig</h3>',
              '<p>Technisch erforderlich für die Grundfunktionen dieser Website. Diese Cookies können nicht deaktiviert werden.</p>',
            '</div>',
            '<label class="cookie-toggle" aria-label="Notwendige Cookies (immer aktiv)">',
              '<input type="checkbox" checked disabled />',
              '<span class="cookie-toggle-slider"></span>',
            '</label>',
          '</div>',
          '<div class="cookie-category">',
            '<div class="cookie-category-text">',
              '<h3>Statistik</h3>',
              '<p>Anonyme Nutzungsdaten helfen uns, die Website stetig zu verbessern. Keine personalisierte Identifikation.</p>',
            '</div>',
            '<label class="cookie-toggle">',
              '<input type="checkbox" data-category="statistics"' + (prev.statistics ? ' checked' : '') + ' />',
              '<span class="cookie-toggle-slider"></span>',
            '</label>',
          '</div>',
          '<div class="cookie-category">',
            '<div class="cookie-category-text">',
              '<h3>Externe Medien</h3>',
              '<p>Erlaubt das Einbinden von Diensten Dritter wie Google Maps zur Standortanzeige.</p>',
            '</div>',
            '<label class="cookie-toggle">',
              '<input type="checkbox" data-category="external"' + (prev.external ? ' checked' : '') + ' />',
              '<span class="cookie-toggle-slider"></span>',
            '</label>',
          '</div>',
          '<p class="cookie-modal-links"><a href="datenschutz.html">Datenschutzerklärung</a> · <a href="impressum.html">Impressum</a></p>',
        '</div>',
        '<div class="cookie-modal-actions">',
          '<button type="button" class="cookie-btn cookie-btn-ghost" data-action="reject-all">Alle ablehnen</button>',
          '<button type="button" class="cookie-btn cookie-btn-ghost" data-action="save">Auswahl speichern</button>',
          '<button type="button" class="cookie-btn cookie-btn-primary" data-action="accept-all">Alle akzeptieren</button>',
        '</div>',
      '</div>',
    ].join('');

    document.body.appendChild(wrapper);
    document.body.classList.add('cookie-modal-open');

    const finalize = (c) => {
      const saved = saveConsent(c);
      closeModal();
      applyConsent(saved);
    };

    wrapper.querySelector('[data-action="accept-all"]').addEventListener('click', () => {
      finalize({ statistics: true, external: true });
    });
    wrapper.querySelector('[data-action="reject-all"]').addEventListener('click', () => {
      finalize({ statistics: false, external: false });
    });
    wrapper.querySelector('[data-action="save"]').addEventListener('click', () => {
      finalize({
        statistics: wrapper.querySelector('[data-category="statistics"]').checked,
        external:   wrapper.querySelector('[data-category="external"]').checked,
      });
    });
  };

  // Exposed so footer link + map placeholder can reopen the modal
  window.openCookieSettings = () => openModal();

  const saved = readConsent();
  if (!saved) {
    openModal();
  } else {
    applyConsent(saved);
  }
})();
