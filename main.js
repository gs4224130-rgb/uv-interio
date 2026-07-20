(() => {
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];

  const header = $('[data-header]');
  const menuButton = $('[data-menu-toggle]');
  const nav = $('[data-nav]');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const setHeader = () => header?.classList.toggle('scrolled', scrollY > 40);
  setHeader();
  addEventListener('scroll', setHeader, { passive: true });

  menuButton?.addEventListener('click', () => {
    const open = nav?.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(Boolean(open)));
    document.body.classList.toggle('menu-open', Boolean(open));
  });
  $$('.site-nav a').forEach(a => a.addEventListener('click', () => {
    nav?.classList.remove('open');
    document.body.classList.remove('menu-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  }));

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  $$('.reveal').forEach(el => revealObserver.observe(el));

  const panelGrid = $('#panel-grid');
  const lightStrip = $('#light-strip');
  const catalog = window.UV_CATALOG || { panels: [], lights: [] };

  if (panelGrid) {
    panelGrid.innerHTML = catalog.panels.map((item, i) => `
      <article class="panel-card reveal" data-category="${item.category}">
        <span class="panel-number">${String(i + 1).padStart(2, '0')}</span>
        <div class="panel-media"><img src="${item.image}" alt="${item.name} panel finish sample at UV Interio" loading="lazy"></div>
        <div class="panel-info"><span>${item.tag}</span><h3>${item.name}</h3></div>
      </article>`).join('');
    $$('.panel-card.reveal', panelGrid).forEach(el => revealObserver.observe(el));
  }

  if (lightStrip) {
    lightStrip.innerHTML = catalog.lights.map((item, i) => `
      <article class="light-card reveal">
        <img src="${item.image}" alt="${item.name} lighting style at UV Interio" loading="lazy">
        <div class="light-info"><span>${String(i + 1).padStart(2, '0')} / ${item.type}</span><h3>${item.name}</h3></div>
      </article>`).join('');
    $$('.light-card.reveal', lightStrip).forEach(el => revealObserver.observe(el));
  }

  $$('[data-filter]').forEach(button => button.addEventListener('click', () => {
    $$('[data-filter]').forEach(b => b.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    $$('.panel-card', panelGrid).forEach(card => card.classList.toggle('is-hidden', filter !== 'all' && card.dataset.category !== filter));
  }));

  if (!reducedMotion) {
    const hero = $('.hero-parallax img');
    addEventListener('scroll', () => {
      if (hero && scrollY < innerHeight) hero.style.translate = `0 ${scrollY * 0.08}px`;
    }, { passive: true });

    $$('.tilt-card').forEach(card => {
      card.addEventListener('pointermove', e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - .5;
        const y = (e.clientY - r.top) / r.height - .5;
        card.style.transform = `perspective(900px) rotateX(${y * -3}deg) rotateY(${x * 3}deg)`;
      });
      card.addEventListener('pointerleave', () => card.style.transform = '');
    });

    const glow = $('.cursor-glow');
    addEventListener('pointermove', e => {
      if (glow) { glow.style.left = `${e.clientX}px`; glow.style.top = `${e.clientY}px`; }
    }, { passive: true });
  }

  $('#year') && ($('#year').textContent = new Date().getFullYear());

  const form = $('[data-demo-form]');
  form?.addEventListener('submit', e => {
    e.preventDefault();
    const note = $('.form-note', form);
    if (note) note.textContent = 'Form layout is ready. Connect Formspree, Netlify Forms or your backend before going live with submissions.';
  });
})();
