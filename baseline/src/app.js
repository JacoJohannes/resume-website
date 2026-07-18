/**
 * Baseline — Application bootstrap: chrome (top bar, navigation, secondary menu)
 * and the render/route dispatcher.
 */
(function (B) {
  'use strict';
  const { el, clear } = B.lib;
  const C = B.components;
  const S = B.screens;
  const icon = C.icon;

  const root = document.getElementById('root');
  let mainEl = null;

  const NAV = [
    { path: 'overview', label: 'Overview', ico: 'home' },
    { path: 'plan', label: 'Plan', ico: 'target' },
    { path: 'results', label: 'All results', ico: 'list' },
    { path: 'summary', label: 'Summary', ico: 'print' },
  ];

  // Secondary menu (profile / privacy / methodology / delete)
  function buildMenu() {
    const menu = el('div', { class: 'menu', role: 'menu', hidden: true });
    const go = (to, label, ico, cls) => el('a', { href: '#/' + to, role: 'menuitem', class: cls || '', onClick: () => closeMenu() }, [icon(ico, 16), label]);
    menu.append(
      el('button', { role: 'menuitem', onClick: () => { closeMenu(); newReport(); } }, [icon('plus', 16), 'New report / upload']),
      el('div', { class: 'sep' }),
      go('profile', 'Profile & medications', 'file'),
      go('methodology', 'Methodology', 'info'),
      go('privacy', 'Privacy & data', 'shield'),
      el('div', { class: 'sep' }),
      el('button', { role: 'menuitem', class: 'danger', onClick: () => { closeMenu(); location.hash = '/privacy'; } }, [icon('trash', 16), 'Delete my data']),
    );
    return menu;
  }
  let menuOpen = false;
  let menuEl = null;
  function closeMenu() { if (menuEl) { menuEl.hidden = true; menuOpen = false; const b = document.getElementById('menu-btn'); if (b) b.setAttribute('aria-expanded', 'false'); } }
  // Return to the upload/landing screen to start fresh. Non-destructive: the
  // current report is cleared from view and replaced when a new one is chosen.
  function newReport() {
    B.lib.setState({ stage: 'landing', report: null, corrections: {}, actionStatus: {}, dismissedActions: [] });
    location.hash = '';
    B.render();
    window.scrollTo(0, 0);
  }
  function toggleMenu() { menuOpen = !menuOpen; menuEl.hidden = !menuOpen; const b = document.getElementById('menu-btn'); if (b) b.setAttribute('aria-expanded', String(menuOpen)); }
  document.addEventListener('click', (e) => { if (menuOpen && menuEl && !menuEl.parentNode.contains(e.target)) closeMenu(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

  function Topbar(showNav) {
    const brand = el('a', { href: showNav ? '#/overview' : '#', class: 'brand', style: 'text-decoration:none;color:inherit', 'aria-label': 'LabReview home' }, [
      el('img', { class: 'brand-lockup', src: './labreview-wordmark-v2.png', alt: '' }),
      B.lib.state.demoMode ? el('span', { class: 'demo-flag', text: 'urgent-demo' }) : null,
    ]);
    const right = el('div', { class: 'topbar-actions' });
    right.appendChild(el('a', { href: '../portfolio.html', class: 'btn ghost small portfolio-back', 'aria-label': 'Back to portfolio' }, [
      icon('arrowLeft', 16),
      el('span', { class: 'portfolio-back-wide', text: 'Back to portfolio' }),
      el('span', { class: 'portfolio-back-short', text: 'Portfolio' }),
    ]));
    if (showNav) {
      right.appendChild(el('button', { class: 'btn secondary small', onClick: () => newReport(), 'aria-label': 'Start a new report or upload' }, [icon('plus', 16), el('span', { class: 'new-label', text: 'New report' })]));
      menuEl = buildMenu();
      const menuWrap = el('div', { class: 'menu-wrap' }, [
        el('button', { class: 'iconbtn', id: 'menu-btn', 'aria-haspopup': 'true', 'aria-expanded': 'false', 'aria-label': 'More', onClick: (e) => { e.stopPropagation(); toggleMenu(); } }, [icon('dots', 20)]),
        menuEl,
      ]);
      right.appendChild(menuWrap);
    }
    return el('header', { class: 'topbar' }, [brand, right]);
  }

  function DesktopNav(activePath) {
    return el('nav', { class: 'nav', 'aria-label': 'Primary' }, NAV.map((n) =>
      el('a', { href: '#/' + n.path, 'aria-current': activePath === n.path ? 'page' : null, text: n.label })
    ));
  }
  function BottomNav(activePath) {
    return el('nav', { class: 'bottom-nav', 'aria-label': 'Primary' }, NAV.map((n) =>
      el('a', { href: '#/' + n.path, 'aria-current': activePath === n.path ? 'page' : null }, [icon(n.ico, 20), el('span', { text: n.label })])
    ));
  }

  // Mount a raw node into main (used during upload/processing).
  B.mount = function (node) {
    if (!mainEl) return B.render();
    clear(mainEl);
    mainEl.appendChild(node);
  };

  // Full render based on stage + route.
  B.render = function () {
    const state = B.lib.state;
    const r = B.lib.currentRoute();
    clear(root);

    // Manual entry is reachable from any pre-app stage (and from within the app).
    if (r.path === 'manual' && state.stage !== 'app') {
      root.appendChild(Topbar(false));
      mainEl = el('main', { class: 'main', id: 'main', tabindex: '-1' });
      root.appendChild(mainEl);
      mainEl.appendChild(S.ManualEntry());
      return;
    }

    // Public information pages must remain reachable before a report is
    // loaded. This is used by the landing page's privacy link.
    if (state.stage !== 'app' && ['privacy', 'methodology'].includes(r.path)) {
      root.appendChild(Topbar(false));
      mainEl = el('main', { class: 'main', id: 'main', tabindex: '-1' });
      root.appendChild(mainEl);
      mainEl.appendChild(routeContent(r));
      return;
    }

    // Pre-app stages: minimal chrome, flow screens.
    if (state.stage === 'landing' || state.stage === 'uploading' || state.stage === 'processing') {
      root.appendChild(Topbar(false));
      mainEl = el('main', { class: 'main', id: 'main', tabindex: '-1' });
      root.appendChild(mainEl);
      if (state.stage === 'landing') mainEl.appendChild(S.UploadFlow());
      // uploading/processing screens are mounted by the flow via B.mount; if we
      // land here directly, restart cleanly.
      else mainEl.appendChild(S.UploadFlow());
      return;
    }
    if (state.stage === 'parse-failed') {
      root.appendChild(Topbar(false));
      mainEl = el('main', { class: 'main', id: 'main', tabindex: '-1' });
      root.appendChild(mainEl);
      mainEl.appendChild(S.ParseFailed());
      return;
    }
    if (state.stage === 'extraction') {
      root.appendChild(Topbar(false));
      mainEl = el('main', { class: 'main', id: 'main', tabindex: '-1' });
      root.appendChild(mainEl);
      mainEl.appendChild(S.ExtractionReview());
      return;
    }

    // App stage: full chrome + routed content.
    const active = r.path;
    root.appendChild(Topbar(true));
    root.appendChild(DesktopNav(active));
    const wide = active === 'results' || active === 'summary';
    mainEl = el('main', { class: 'main' + (wide ? ' wide' : ''), id: 'main', tabindex: '-1' });
    root.appendChild(mainEl);
    mainEl.appendChild(routeContent(r));
    root.appendChild(BottomNav(active));

    // move focus to main region for screen readers on navigation, without
    // scrolling it under the sticky header (scroll is handled by the router).
    if (B._pendingFocus) { mainEl.focus({ preventScroll: true }); B._pendingFocus = false; }
  };

  function routeContent(r) {
    switch (r.path) {
      case 'overview': return S.Overview();
      case 'priority': return S.PriorityView(parseInt(r.param, 10) || 0);
      case 'marker': {
        if (!B.data.hasMarker(r.param)) return S.EmptyState('info', 'Result not in this report', 'That marker isn’t part of the results you’re viewing.');
        const bm = B.data.biomarker(r.param);
        return el('div', { class: 'fade-in' }, [
          el('div', { class: 'detail-nav' }, [el('a', { href: '#/results', class: 'back-link' }, [icon('arrowLeft', 16), 'All results'])]),
          S.BiomarkerDetail(bm),
        ]);
      }
      case 'manual': return S.ManualEntry();
      case 'plan': return S.ActionPlan();
      case 'results': return S.ResultsTable();
      case 'summary': return S.ClinicianSummary();
      case 'privacy': return S.PrivacyControls();
      case 'methodology': return S.Methodology();
      case 'profile': return S.Profile();
      case 'states': return S.StatesGallery();
      default: return S.Overview();
    }
  }

  // ── Boot ───────────────────────────────────────────────────────────────────
  // Manage scroll ourselves so content never restores under the sticky header.
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

  // Don't trap a returning visitor in the DEMO. Only auto-resume the user's own
  // data across visits; a demo (or empty) session always reopens at the upload
  // screen so new bloodwork can be entered.
  (function normalizeBootStage() {
    const s = B.lib.state;
    if (s.stage === 'app' && (!s.report || s.report.mode !== 'user')) {
      B.lib.setState({ stage: 'landing', report: null });
      if (location.hash && location.hash !== '#/') { try { history.replaceState(null, '', location.pathname + location.search); } catch (e) { location.hash = ''; } }
    }
  })();

  B.lib.startRouter((route) => {
    // If deep-linked into the app but no report loaded yet, send to landing.
    const stage = B.lib.state.stage;
    if (stage !== 'app' && ['overview', 'priority', 'marker', 'plan', 'results', 'summary'].includes(route.path)) {
      if (stage === 'landing') { B.render(); return; }
    }
    B._pendingFocus = true;
    B.render();
    window.scrollTo({ top: 0, behavior: B.lib.prefersReducedMotion() ? 'auto' : 'smooth' });
  });

  // Re-render on external state changes that aren't routed (e.g. delete).
  B.on('statechange', () => {});
})(window.Baseline);
