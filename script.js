document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const year = document.getElementById('year');
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  requestAnimationFrame(() => {
    body.classList.add('is-ready');
  });

  document.querySelectorAll('.reveal').forEach((item) => {
    item.classList.add('is-visible');
  });

  document.querySelectorAll('a[href]').forEach((link) => {
    link.addEventListener('click', (event) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        link.target === '_blank' ||
        link.hasAttribute('download')
      ) {
        return;
      }

      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
        return;
      }

      const targetUrl = new URL(link.href, window.location.href);
      const isInternal = targetUrl.origin === window.location.origin;
      const isSamePage = targetUrl.pathname === window.location.pathname && targetUrl.hash === window.location.hash;

      if (!isInternal || isSamePage || reduceMotion) {
        return;
      }

      event.preventDefault();
      body.classList.add('is-transitioning');

      window.setTimeout(() => {
        window.location.href = targetUrl.href;
      }, 260);
    });
  });
});
