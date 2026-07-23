(() => {
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => [...root.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const panels = [
{id:'UVF-01',name:'Ivory Goldline',color:'Ivory White + Warm Gold',tone:'light',finish:'Soft woodgrain / gold line',image:'fluted-01.webp'},
{id:'UVF-02',name:'Smoked Walnut',color:'Deep Walnut + Brass',tone:'wood',finish:'Rich woodgrain / gold line',image:'fluted-02.webp'},
{id:'UVF-03',name:'Pale Ash Goldline',color:'Pale Ash + Warm Gold',tone:'light',finish:'Light woodgrain / gold line',image:'fluted-03.webp'},
{id:'UVF-04',name:'Espresso Goldline',color:'Espresso Brown + Brass',tone:'wood',finish:'Dark wood / gold line',image:'fluted-04.webp'},
{id:'UVF-05',name:'Graphite Stone Gold',color:'Graphite Grey + Gold',tone:'dark',finish:'Stone texture / gold line',image:'fluted-05.webp'},
{id:'UVF-06',name:'Pearl Stone Gold',color:'Pearl Grey + Gold',tone:'stone',finish:'Soft stone / gold line',image:'fluted-06.webp'},
{id:'UVF-07',name:'Concrete Luxe Gold',color:'Concrete Grey + Brass',tone:'stone',finish:'Textured concrete / gold line',image:'fluted-07.webp'},
{id:'UVF-08',name:'Mist Grey Goldline',color:'Soft Grey + Gold',tone:'light',finish:'Minimal matte / gold line',image:'fluted-08.webp'},
{id:'UVF-09',name:'Frost Vein Gold',color:'Frost Grey + Gold Vein',tone:'stone',finish:'Veined texture / gold line',image:'fluted-09.webp'},
{id:'UVF-10',name:'Charcoal Goldline',color:'Charcoal + Gold',tone:'dark',finish:'Deep matte / gold line',image:'fluted-10.webp'},
{id:'UVF-11',name:'Calacatta Line',color:'Marble White + Gold',tone:'stone',finish:'Marble vein / gold line',image:'fluted-11.webp'},
{id:'UVF-12',name:'Auburn Walnut Gold',color:'Auburn Brown + Brass',tone:'wood',finish:'Warm wood / gold line',image:'fluted-12.webp'},
{id:'UVF-13',name:'Cloud White Gold',color:'Soft White + Gold',tone:'light',finish:'Clean neutral / gold line',image:'fluted-13.webp'},
{id:'UVF-14',name:'Natural Oak Blackline',color:'Natural Oak + Black',tone:'wood',finish:'Oak grain / black line',image:'fluted-14.webp'},
{id:'UVF-15',name:'Burnt Teak Blackline',color:'Burnt Teak + Black',tone:'wood',finish:'Smoked wood / black line',image:'fluted-15.webp'},
{id:'UVF-16',name:'Smoked Teak Blackline',color:'Smoked Brown + Black',tone:'dark',finish:'Deep wood / black line',image:'fluted-16.webp'},
{id:'UVF-17',name:'Silver Marble Black',color:'Silver Grey + Black',tone:'stone',finish:'Marble line / black groove',image:'fluted-17.webp'},
{id:'UVF-18',name:'Ivory Marble Black',color:'Ivory + Gold Vein + Black',tone:'stone',finish:'Light marble / black groove',image:'fluted-18.webp'},
{id:'UVF-19',name:'Noir Marble Gold',color:'Black + Gold Vein',tone:'dark',finish:'Dark marble / gold accent',image:'fluted-19.webp'},
{id:'UVF-20',name:'Honey Oak Blackline',color:'Honey Oak + Black',tone:'wood',finish:'Golden wood / black groove',image:'fluted-20.webp'},
{id:'UVF-21',name:'Rustic Walnut Blackline',color:'Rustic Brown + Black',tone:'wood',finish:'Weathered wood / black groove',image:'fluted-21.webp'},
{id:'UVF-22',name:'Pearl White Blackline',color:'Pearl White + Black',tone:'light',finish:'Bright texture / black groove',image:'fluted-22.webp'},
{id:'UVF-23',name:'Champagne Linen Black',color:'Champagne Beige + Black',tone:'light',finish:'Fine textile look / black groove',image:'fluted-23.webp'},
{id:'UVF-24',name:'Greige Stone Black',color:'Warm Greige + Black',tone:'stone',finish:'Soft stone / black groove',image:'fluted-24.webp'},
{id:'UVF-25',name:'Golden Oak Blackline',color:'Golden Oak + Black',tone:'wood',finish:'Warm oak / black groove',image:'fluted-25.webp'},
{id:'UVF-26',name:'Terracotta Wood Black',color:'Terracotta Brown + Black',tone:'wood',finish:'Red-brown wood / black groove',image:'fluted-26.webp'}
  ];

  const jhumars = [
{name:'Leaffall Cascade',type:'Modern Statement',image:'jhumar-collection-01.webp'},
{name:'Crystal Atrium Tower',type:'Grand Crystal',image:'jhumar-collection-02.webp'},
{name:'Noir Prism Halo',type:'Black + Gold Crystal',image:'jhumar-collection-03.webp'},
{name:'Imperial Crystal Drop',type:'Classic Crystal',image:'jhumar-collection-04.webp'},
{name:'Grand Heritage Crown',type:'Luxury Classic',image:'jhumar-collection-05.webp'},
{name:'Lotus Bloom Crystal',type:'Sculptural Gold',image:'jhumar-collection-06.webp'},
{name:'Royal Gold Cascade',type:'Heritage Crystal',image:'jhumar-collection-07.webp'}
  ];

  let activeTone = 'all';
  let activeQuery = '';

  const normalise = v => (v || '').toLowerCase().trim();

  function filteredPanels() {
    const q = normalise(activeQuery);
    return panels.filter(p => {
      const toneOK = activeTone === 'all' || p.tone === activeTone;
      const hay = normalise(`${p.name} ${p.color} ${p.finish} ${p.id} ${p.tone}`);
      return toneOK && (!q || hay.includes(q));
    });
  }

  function renderPremiumCollection() {
    const lab = $('#panel-lab');
    if (!lab) return;

    lab.classList.add('uv-premium-lab');
    lab.innerHTML = `
      <div class="container uv-premium-shell">
        <div class="uv-collection-kicker reveal">
          <span>04 / MATERIAL LIBRARY</span>
          <span>26 REAL FLUTED FINISHES</span>
        </div>

        <div class="uv-collection-head reveal">
          <div>
            <p class="eyebrow dark">THE FLUTED EDIT / 2026</p>
            <h2>Materials with <em>main-character energy.</em></h2>
            <p class="uv-collection-intro">A tactile edit of wood, marble, stone, metallic lines and soft neutrals. Search by colour, mood or finish — then see the real sample in the showroom.</p>
          </div>
          <div class="uv-result-badge"><strong id="uv-result-count">26</strong><span>finishes</span></div>
        </div>

        <div class="uv-collection-toolbar reveal">
          <label class="uv-collection-search">
            <span>⌕</span>
            <input id="uv-collection-search" type="search" placeholder="Search walnut, marble, grey, gold..." autocomplete="off">
            <kbd>ESC</kbd>
          </label>
          <div class="uv-tone-filters" role="group" aria-label="Filter panel collection">
            <button class="active" data-tone="all">All</button>
            <button data-tone="light">Light</button>
            <button data-tone="wood">Wood</button>
            <button data-tone="stone">Stone</button>
            <button data-tone="dark">Dark</button>
          </div>
        </div>

        <div class="uv-premium-grid" id="uv-premium-grid" aria-live="polite"></div>
        <div class="uv-empty-state" id="uv-empty-state" hidden>
          <span>NO MATCH YET</span>
          <h3>Try another mood.</h3>
          <p>Search “walnut”, “gold”, “grey”, “marble” or reset the filters.</p>
          <button id="uv-reset-search">Show all finishes</button>
        </div>

        <div class="uv-collection-footer reveal">
          <p><strong>See it before you choose it.</strong> Screen colours vary — visit UV INTERIO to compare the actual shade, texture and line detail.</p>
          <a href="contact.html">Bring your room photo <span>↗</span></a>
        </div>
      </div>`;

    const grid = $('#uv-premium-grid');
    const count = $('#uv-result-count');
    const empty = $('#uv-empty-state');

    function draw() {
      const list = filteredPanels();
      count.textContent = String(list.length);
      empty.hidden = list.length !== 0;
      grid.innerHTML = list.map((p, i) => `
        <article class="uv-material-card ${(i % 7 === 0 || i % 11 === 0) ? 'uv-material-feature' : ''}" tabindex="0" data-panel-id="${p.id}">
          <div class="uv-material-media">
            <img src="${p.image}" alt="${p.name} fluted panel in ${p.color}" loading="lazy">
            <div class="uv-material-hover"><span>VIEW TEXTURE</span><i>↗</i></div>
          </div>
          <div class="uv-material-meta">
            <div class="uv-material-topline"><span>${p.id}</span><span>${String(i+1).padStart(2,'0')}</span></div>
            <h3>${p.name}</h3>
            <p>${p.color}</p>
            <div class="uv-material-tags"><span>${p.finish}</span><span>${p.tone.toUpperCase()}</span></div>
          </div>
        </article>`).join('');

      $$('.uv-material-card', grid).forEach(card => {
        const open = () => openPanel(card.dataset.panelId);
        card.addEventListener('click', open);
        card.addEventListener('keydown', e => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
        });
      });
    }

    $('#uv-collection-search').addEventListener('input', e => {
      activeQuery = e.target.value;
      syncHeroSearch(e.target.value);
      draw();
    });
    $('#uv-collection-search').addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        e.currentTarget.value = '';
        activeQuery = '';
        draw();
      }
    });

    $$('.uv-tone-filters button').forEach(btn => btn.addEventListener('click', () => {
      $$('.uv-tone-filters button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeTone = btn.dataset.tone;
      draw();
    }));

    $('#uv-reset-search').addEventListener('click', () => {
      activeTone = 'all';
      activeQuery = '';
      $('#uv-collection-search').value = '';
      $$('.uv-tone-filters button').forEach(b => b.classList.toggle('active', b.dataset.tone === 'all'));
      draw();
    });

    draw();
  }

  function openPanel(id) {
    const p = panels.find(x => x.id === id);
    if (!p) return;

    let modal = $('#uv-panel-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'uv-panel-modal';
      modal.className = 'uv-panel-modal';
      modal.innerHTML = `
        <button class="uv-modal-close" aria-label="Close panel preview">×</button>
        <div class="uv-modal-dialog">
          <div class="uv-modal-image"><img alt=""></div>
          <div class="uv-modal-copy">
            <span class="uv-modal-code"></span>
            <h3></h3>
            <p class="uv-modal-color"></p>
            <p class="uv-modal-finish"></p>
            <a href="contact.html">See this finish in showroom <span>↗</span></a>
          </div>
        </div>`;
      document.body.appendChild(modal);
      $('.uv-modal-close', modal).addEventListener('click', closePanel);
      modal.addEventListener('click', e => { if (e.target === modal) closePanel(); });
      addEventListener('keydown', e => { if (e.key === 'Escape') closePanel(); });
    }

    $('.uv-modal-image img', modal).src = p.image;
    $('.uv-modal-image img', modal).alt = `${p.name} — ${p.color}`;
    $('.uv-modal-code', modal).textContent = p.id;
    $('.uv-modal-copy h3', modal).textContent = p.name;
    $('.uv-modal-color', modal).textContent = p.color;
    $('.uv-modal-finish', modal).textContent = p.finish;
    modal.classList.add('open');
    document.body.classList.add('uv-modal-open');
  }

  function closePanel() {
    $('#uv-panel-modal')?.classList.remove('open');
    document.body.classList.remove('uv-modal-open');
  }

  function buildFirstPageSearch() {
    const stage = $('.uv-wall-stage');
    if (!stage || $('.uv-first-search', stage)) return;

    const wrap = document.createElement('div');
    wrap.className = 'uv-first-search';
    wrap.innerHTML = `
      <div class="uv-first-search-label"><span>FIND YOUR WALL</span><span>26 MATERIALS ↘</span></div>
      <label>
        <span class="uv-search-icon">⌕</span>
        <input type="search" id="uv-hero-panel-search" placeholder="Search a panel — walnut, grey, marble, gold..." autocomplete="off">
        <button type="button" aria-label="Search panels">↘</button>
      </label>
      <div class="uv-search-suggestions" id="uv-search-suggestions"></div>`;
    stage.appendChild(wrap);

    const input = $('#uv-hero-panel-search');
    const suggestions = $('#uv-search-suggestions');

    function suggest() {
      const q = normalise(input.value);
      if (!q) {
        suggestions.classList.remove('open');
        suggestions.innerHTML = '';
        return;
      }
      const matches = panels.filter(p => normalise(`${p.name} ${p.color} ${p.finish}`).includes(q)).slice(0,5);
      suggestions.innerHTML = matches.length ? matches.map(p => `
        <button type="button" data-search="${p.name}">
          <span><i style="background-image:url('${p.image}')"></i><strong>${p.name}</strong></span>
          <small>${p.color}</small>
        </button>`).join('') : `<div class="uv-no-suggest">Try “walnut”, “marble”, “grey” or “gold”.</div>`;
      suggestions.classList.add('open');
      $$('button[data-search]', suggestions).forEach(btn => btn.addEventListener('click', () => runHeroSearch(btn.dataset.search)));
    }

    function runHeroSearch(value = input.value) {
      activeQuery = value;
      input.value = value;
      const collectionInput = $('#uv-collection-search');
      if (collectionInput) collectionInput.value = value;
      suggestions.classList.remove('open');
      document.querySelector('#panel-lab')?.scrollIntoView({behavior: reduced ? 'auto' : 'smooth'});
      setTimeout(() => {
        const event = new Event('input', {bubbles:true});
        collectionInput?.dispatchEvent(event);
      }, reduced ? 0 : 500);
    }

    input.addEventListener('input', suggest);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') runHeroSearch(); });
    $('label button', wrap).addEventListener('click', () => runHeroSearch());
  }

  function syncHeroSearch(value) {
    const input = $('#uv-hero-panel-search');
    if (input && document.activeElement !== input) input.value = value;
  }

  function replaceLightingCollection() {
    const section = $('#lighting-edit');
    const strip = $('#light-strip');
    if (!section || !strip) return;
    section.classList.add('uv-jhumar-collection');

    const heading = $('.section-title-row', section);
    if (heading) heading.innerHTML = `
      <div>
        <p class="eyebrow">THE JHUMAR EDIT / NEW ARRIVALS</p>
        <h2>Light that doesn’t just hang.<br><em>It owns the room.</em></h2>
      </div>
      <a class="ghost-link" href="contact.html">See them in showroom <span>↗</span></a>`;

    strip.className = 'uv-jhumar-grid';
    strip.innerHTML = jhumars.map((j,i) => `
      <article class="uv-jhumar-card ${i===0 || i===3 ? 'uv-jhumar-feature' : ''}">
        <div class="uv-jhumar-media"><img src="${j.image}" alt="${j.name} chandelier" loading="lazy"></div>
        <div class="uv-jhumar-meta"><span>${String(i+1).padStart(2,'0')} / ${j.type}</span><h3>${j.name}</h3><p>Statement lighting · Showroom selection</p></div>
      </article>`).join('');
  }

  function cleanFloatingJhumarsAndAddTwo() {
    // Remove all earlier experimental floating jhumars.
    $$('.uv-floating-jhumar, .uv-lower-jhumar, .uv-big-jhumar').forEach(el => el.remove());

    const stage = $('.uv-wall-stage');
    if (!stage) return;
    if ($('.uv-roof-jhumar', stage)) return;

    const left = document.createElement('div');
    left.className = 'uv-roof-jhumar uv-roof-jhumar-left';
    left.innerHTML = `<span class="uv-roof-wire"></span><img src="jhumar-roof-left.png" alt="" aria-hidden="true">`;

    const right = document.createElement('div');
    right.className = 'uv-roof-jhumar uv-roof-jhumar-right';
    right.innerHTML = `<span class="uv-roof-wire"></span><img src="jhumar-roof-right.png" alt="" aria-hidden="true">`;

    stage.append(left,right);
    requestAnimationFrame(() => {
      left.classList.add('show');
      right.classList.add('show');
    });
  }


  /* IDEA 5 — animated stripe/profile lights across sections */
  function addStripeLights() {
    const targets = $$('main section').filter(sec => !sec.classList.contains('uv-final-signature'));
    targets.forEach((sec, index) => {
      if (sec.querySelector('.uv-led-rail')) return;
      const count = index % 3 === 0 ? 2 : 1;
      for (let i = 0; i < count; i++) {
        const rail = document.createElement('span');
        rail.className = 'uv-led-rail ' + (i === 0 ? 'uv-led-rail-a' : 'uv-led-rail-b');
        rail.style.setProperty('--uv-led-delay', `${(index * .35) + (i * .7)}s`);
        rail.style.setProperty('--uv-led-top', `${10 + ((index*13 + i*21) % 74)}%`);
        rail.style.setProperty('--uv-led-left', `${4 + ((index*17 + i*29) % 86)}%`);
        rail.style.setProperty('--uv-led-width', `${120 + ((index*41 + i*37) % 220)}px`);
        rail.style.setProperty('--uv-led-rotate', `${[-24,-12,-6,6,12,18][(index+i)%6]}deg`);
        sec.appendChild(rail);
      }
      sec.classList.add('uv-has-led-rails');
    });
  }

  /* IDEA 6 — final colorful panel signature */
  function addFinalSignatureSection() {
    const footer = $('footer.site-footer');
    const main = $('main');
    if (!footer || !main || $('#uv-final-signature')) return;

    const colors = panels.slice(0, 16);
    const leftItems = colors.slice(0, 8).map((p, i) => `
      <div class="uv-final-panel uv-from-left" style="--uv-final-delay:${i * .07}s">
        <img src="${p.image}" alt="${p.name}">
        <span>${p.name}</span>
      </div>`).join('');

    const rightItems = colors.slice(8, 16).map((p, i) => `
      <div class="uv-final-panel uv-from-right" style="--uv-final-delay:${i * .07}s">
        <img src="${p.image}" alt="${p.name}">
        <span>${p.color.split('+')[0].trim()}</span>
      </div>`).join('');

    const section = document.createElement('section');
    section.id = 'uv-final-signature';
    section.className = 'uv-final-signature section-pad';
    section.innerHTML = `
      <div class="container uv-final-shell">
        <div class="uv-final-topline reveal">
          <span>THE LAST IMPRESSION</span>
          <span>COLOUR / TEXTURE / LIGHT / UV INTERIO</span>
        </div>
        <div class="uv-final-stage">
          <div class="uv-final-lane uv-final-left">${leftItems}</div>
          <div class="uv-final-center">
            <p class="eyebrow dark">MADE WITH COLOURFUL PANELS</p>
            <h2><span>UV</span> <span>INTERIO</span></h2>
            <p>Panels slide in from both sides and build the final signature — a colourful close for a premium showroom experience.</p>
          </div>
          <div class="uv-final-lane uv-final-right">${rightItems}</div>
        </div>
      </div>`;
    main.insertBefore(section, footer);

    if (!reduced && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      }, {threshold: 0.2});
      io.observe(section);
    } else {
      section.classList.add('is-visible');
    }
  }

  function updateCollectionBento() {
    const panelCard = $('.bento-panels img');
    if (panelCard) panelCard.src = 'fluted-14.webp';
    const lightCard = $('.bento-light img');
    if (lightCard) lightCard.src = 'jhumar-collection-01.webp';
  }

  function init() {
    renderPremiumCollection();
    buildFirstPageSearch();
    replaceLightingCollection();
    cleanFloatingJhumarsAndAddTwo();
    updateCollectionBento();
    addStripeLights();
    addFinalSignatureSection();

    // Some earlier scripts add jhumars with a short delay; clean once more.
    setTimeout(cleanFloatingJhumarsAndAddTwo, 350);
    setTimeout(cleanFloatingJhumarsAndAddTwo, 1200);
    setTimeout(addStripeLights, 420);
    setTimeout(addFinalSignatureSection, 500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(init,80), {once:true});
  } else {
    setTimeout(init,80);
  }
})();
