(() => {
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const init = () => {
    /* Replace old scroll-wall panels with the user's uploaded panel textures. */
    const newPanels = [
      'uv-panel-strip-01.webp','uv-panel-strip-02.webp','uv-panel-strip-03.webp','uv-panel-strip-04.webp','uv-panel-strip-05.webp',
      'uv-panel-strip-06.webp','uv-panel-strip-07.webp','uv-panel-strip-08.webp','uv-panel-strip-09.webp','uv-panel-strip-10.webp'
    ];
    $$('.uv-build-panel img').forEach((img, i) => {
      if (newPanels[i]) img.src = newPanels[i];
    });

    /* Turn major sections into panel-wall showroom scenes. */
    const skins = [
      ['.founder-intro', 'uv-panel-skin uv-panel-skin-walnut'],
      ['.showroom-story', 'uv-panel-skin uv-panel-skin-showroom'],
      ['.collections', 'uv-panel-skin uv-panel-skin-tv'],
      ['.panel-lab', 'uv-panel-skin uv-panel-skin-colors'],
      ['.experience', 'uv-panel-skin uv-panel-skin-walnut'],
      ['.visit-cta', 'uv-panel-skin uv-panel-skin-tv']
    ];
    skins.forEach(([selector, classNames]) => {
      const section = $(selector);
      if (!section) return;
      classNames.split(' ').forEach(c => section.classList.add(c));
      if (!$('.uv-profile-light', section)) {
        const light = document.createElement('span');
        light.className = 'uv-profile-light';
        light.setAttribute('aria-hidden','true');
        section.appendChild(light);
      }
    });

    /* Warm strip lights integrated around headings. */
    $$('.section-title-row h2, .founder-copy h2, .showroom-copy h2, .experience-heading h2, .visit-content h2')
      .forEach((heading, i) => {
        if (heading.classList.contains('uv-lit-heading')) return;
        heading.classList.add('uv-lit-heading');
        const line = document.createElement('i');
        line.className = `uv-heading-strip uv-heading-strip-${(i % 3) + 1}`;
        line.setAttribute('aria-hidden','true');
        heading.appendChild(line);
      });

    /* More floating jhumars lower on the homepage. */
    const lowerJhumars = [
      { target:'.founder-intro', image:'light-03.webp', cls:'uv-lower-jhumar-left' },
      { target:'.collections', image:'light-04.webp', cls:'uv-lower-jhumar-right' },
      { target:'.experience', image:'light-06.webp', cls:'uv-lower-jhumar-left uv-lower-jhumar-small' },
      { target:'.visit-cta', image:'light-01.webp', cls:'uv-lower-jhumar-right uv-lower-jhumar-deep' }
    ];

    lowerJhumars.forEach((item, i) => {
      const section = $(item.target);
      if (!section || $('.uv-lower-jhumar', section)) return;
      const deco = document.createElement('div');
      deco.className = `uv-lower-jhumar ${item.cls}`;
      deco.setAttribute('aria-hidden','true');
      deco.innerHTML = `<span><img src="${item.image}" alt=""></span>`;
      section.appendChild(deco);

      if (reducedMotion) {
        deco.classList.add('is-visible');
        return;
      }
      const observer = new IntersectionObserver(entries => {
        if (entries.some(e => e.isIntersecting)) {
          setTimeout(() => deco.classList.add('is-visible'), i * 120);
          observer.disconnect();
        }
      }, { threshold:.16 });
      observer.observe(section);
    });

    /* One BIG jhumar enters from above and moves down with first-page scroll. */
    const stage = $('.uv-wall-stage');
    const story = $('.uv-wall-story');
    if (stage && story && !$('.uv-big-jhumar', stage)) {
      const big = document.createElement('div');
      big.className = 'uv-big-jhumar';
      big.setAttribute('aria-hidden','true');
      big.innerHTML = `
        <span class="uv-big-jhumar-wire"></span>
        <span class="uv-big-jhumar-shell">
          <span class="uv-big-jhumar-glow"></span>
          <img src="light-01.webp" alt="">
        </span>`;
      stage.appendChild(big);

      if (reducedMotion) {
        big.style.opacity = '.45';
        big.style.transform = 'translate3d(0,90px,0)';
      } else {
        let ticking = false;
        const update = () => {
          ticking = false;
          const rect = story.getBoundingClientRect();
          const travel = Math.max(1, story.offsetHeight - innerHeight);
          const p = Math.min(1, Math.max(0, -rect.top / travel));
          const y = -120 + p * 355;
          const swing = Math.sin(p * Math.PI * 5) * 7;
          const fadeIn = Math.min(1, p / .06);
          const fadeOut = Math.min(1, (1 - p) / .12);
          big.style.opacity = String(Math.max(.02, Math.min(fadeIn, fadeOut) * .9));
          big.style.transform = `translate3d(0,${y}px,0) rotate(${swing}deg)`;
        };
        const request = () => {
          if (!ticking) {
            ticking = true;
            requestAnimationFrame(update);
          }
        };
        update();
        addEventListener('scroll', request, { passive:true });
        addEventListener('resize', request, { passive:true });
      }
    }
  };

  /* main.js creates the scroll wall synchronously; small delay also protects cached/mobile load. */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(init, 40), {once:true});
  } else {
    setTimeout(init, 40);
  }
})();