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

  const homeHero = $('.hero.hero-v2');

  if (homeHero) {
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = 'scroll-wall.css';
    document.head.appendChild(css);

    const panelImages = [
      'panel-01.webp','panel-02.webp','panel-03.webp','panel-04.webp','panel-05.webp',
      'panel-06.webp','panel-07.webp','panel-08.webp','panel-09.webp','panel-10.webp'
    ];

    const story = document.createElement('section');
    story.className = 'uv-wall-story';
    story.setAttribute('aria-label', 'Scroll to build the UV Interio wall');
    story.innerHTML = `
      <div class="uv-wall-stage">
        <div class="uv-wall-ambient" aria-hidden="true"></div>
        <div class="uv-wall-topline"><span>UV INTERIO / MATERIAL STORY</span><span class="uv-wall-count">01 / 10</span></div>
        <div class="uv-wall-copy"><p>SCROLL TO BUILD</p><h2>One panel.<br>One decision.<br><em>One wall transformed.</em></h2></div>
        <div class="uv-wall-frame" aria-hidden="true">
          <div class="uv-wall-base"></div>
          <div class="uv-wall-panels">
            ${panelImages.map((src, i) => `
              <div class="uv-build-panel" data-build-panel="${i}">
                <img src="${src}" alt="">
                <span>${String(i + 1).padStart(2,'0')}</span>
              </div>`).join('')}
          </div>
          <div class="uv-wall-logo"><strong><span>UV</span> INTERIO</strong><small>AAPKE SAPNO KA GHAR</small></div>
        </div>
        <div class="uv-wall-direction"><i></i><span>KEEP SCROLLING</span></div>
        <div class="uv-wall-progress"><i></i></div>
      </div>`;
    homeHero.before(story);

    const panels = $$('.uv-build-panel', story);
    const count = $('.uv-wall-count', story);
    const copy = $('.uv-wall-copy', story);
    const logo = $('.uv-wall-logo', story);
    const progressBar = $('.uv-wall-progress i', story);
    const direction = $('.uv-wall-direction', story);
    const wallBase = $('.uv-wall-base', story);

    const clamp = (n, min = 0, max = 1) => Math.min(max, Math.max(min, n));
    let ticking = false;

    const updateWallStory = () => {
      ticking = false;
      const rect = story.getBoundingClientRect();
      const travel = Math.max(1, story.offsetHeight - innerHeight);
      const progress = clamp(-rect.top / travel);
      if (progressBar) progressBar.style.transform = `scaleX(${progress})`;

      const panelPhaseEnd = 0.78;
      const panelSlice = panelPhaseEnd / panels.length;

      panels.forEach((panel, i) => {
        const start = i * panelSlice;
        const local = clamp((progress - start) / (panelSlice * 0.88));
        const ease = 1 - Math.pow(1 - local, 3);
        const fromLeft = i % 2 === 0;
        const x = (fromLeft ? -118 : 118) * (1 - ease);
        const rotate = (fromLeft ? -8 : 8) * (1 - ease);
        const scale = 0.93 + ease * 0.07;
        panel.style.transform = `translate3d(${x}vw,0,0) rotate(${rotate}deg) scale(${scale})`;
        panel.style.opacity = String(clamp(local * 1.4));
        panel.style.filter = `saturate(${0.72 + ease * 0.28}) brightness(${0.78 + ease * 0.22})`;
      });

      const reached = Math.min(10, Math.max(1, Math.floor(progress / panelSlice) + 1));
      if (count) count.textContent = `${String(reached).padStart(2,'0')} / 10`;

      const final = clamp((progress - 0.80) / 0.16);
      const finalEase = 1 - Math.pow(1 - final, 3);
      if (logo) {
        logo.style.opacity = String(finalEase);
        logo.style.transform = `translate(-50%,-50%) scale(${0.88 + finalEase * 0.12})`;
        logo.style.filter = `blur(${(1-finalEase)*10}px)`;
      }
      if (copy) {
        const fade = clamp(1 - progress / 0.42);
        copy.style.opacity = String(fade);
        copy.style.transform = `translateY(${-26 * progress}px)`;
      }
      if (direction) direction.style.opacity = String(clamp(1 - progress / 0.72));
      if (wallBase) wallBase.style.opacity = String(0.24 + finalEase * 0.52);
      story.classList.toggle('is-complete', final > 0.55);
    };

    const requestUpdate = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateWallStory);
      }
    };

    updateWallStory();
    addEventListener('scroll', requestUpdate, { passive: true });
    addEventListener('resize', requestUpdate, { passive: true });

    if (reducedMotion) {
      story.classList.add('reduced-motion');
      panels.forEach(panel => {
        panel.style.transform = 'none';
        panel.style.opacity = '1';
        panel.style.filter = 'none';
      });
      if (logo) {
        logo.style.opacity = '1';
        logo.style.transform = 'translate(-50%,-50%) scale(1)';
        logo.style.filter = 'none';
      }
    }
  }

  /* =========================================================
     UV INTERIO — 3 FLOATING JHUMARS
     Three subtle chandelier moments across the homepage.
     They enter from different directions, then gently float.
     ========================================================= */
  if ($('.hero.hero-v2')) {
    const jhumarCss = document.createElement('link');
    jhumarCss.rel = 'stylesheet';
    jhumarCss.href = 'floating-jhumars.css';
    document.head.appendChild(jhumarCss);

    const jhumarItems = [
      { target: '.hero.hero-v2', image: 'light-01.webp', className: 'uv-jhumar-one', label: 'Grand Crystal Cascade' },
      { target: '.collections', image: 'light-06.webp', className: 'uv-jhumar-two', label: 'Halo Ring Light' },
      { target: '.lighting-edit', image: 'light-07.webp', className: 'uv-jhumar-three', label: 'Crystal Drum' }
    ];

    jhumarItems.forEach((item, index) => {
      const section = $(item.target);
      if (!section) return;

      section.classList.add('uv-jhumar-host');

      const deco = document.createElement('div');
      deco.className = `uv-floating-jhumar ${item.className}`;
      deco.setAttribute('aria-hidden', 'true');
      deco.innerHTML = `
        <span class="uv-jhumar-float">
          <span class="uv-jhumar-glow"></span>
          <img src="${item.image}" alt="">
          <small>${String(index + 1).padStart(2,'0')} / ${item.label}</small>
        </span>`;
      section.appendChild(deco);
    });

    const jhumarObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        $$('.uv-floating-jhumar', entry.target).forEach(el => el.classList.add('is-visible'));
        jhumarObserver.unobserve(entry.target);
      });
    }, { threshold: 0.22 });

    $$('.uv-jhumar-host').forEach(section => jhumarObserver.observe(section));
  }

})();
