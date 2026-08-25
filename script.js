const navServices = document.querySelector('.nav-services');
const navDropdown = document.querySelector('.nav-dropdown');
const navDropdownItems = document.querySelectorAll('.nav-dropdown-item');
let dropdownCloseTimer;

function openDropdown() {
  clearTimeout(dropdownCloseTimer);
  navDropdown.classList.add('open');
}

function scheduleCloseDropdown() {
  dropdownCloseTimer = setTimeout(() => {
    navDropdown.classList.remove('open');
  }, 250);
}

/* Na pravni strani teh elementov ni, zato najprej preverimo. */
if (navServices && navDropdown) {
  navServices.addEventListener('mouseenter', openDropdown);
  navServices.addEventListener('mouseleave', scheduleCloseDropdown);
  navDropdown.addEventListener('mouseenter', openDropdown);
  navDropdown.addEventListener('mouseleave', scheduleCloseDropdown);
}

navDropdownItems.forEach((item) => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    navDropdown.classList.remove('open');
  });
});

/* POJAVNO OKNO ZA STORITVE */
const modal = document.getElementById('serviceModal');
const modalBody = document.getElementById('modalBody');

/* Vsebina vsake storitve v obeh jezikih, na enem mestu za lazje urejanje. */
const storitve = {
  mobile: {
    stack: 'Flutter · Dart',
    ikona: '<rect x="6.5" y="2" width="11" height="20" rx="3" style="stroke:#ffffff; stroke-width:2.5; fill:none;"/><rect x="10.3" y="3.4" width="3.4" height="1.1" rx="0.55" style="fill:#ffffff; stroke:none;"/><line x1="10.3" y1="19.3" x2="13.7" y2="19.3" style="stroke:#ffffff; stroke-width:2.5;"/>',
    naslovEn: 'Mobile App Development',
    naslovSlo: 'Razvoj mobilnih aplikacij',
    opisEn: 'I build mobile apps for Android and iOS from a single codebase, so you get both platforms without paying twice. Every app is made for smooth performance and a clean, modern interface.',
    opisSlo: 'Izdelam mobilne aplikacije za Android in iOS iz ene same kode, tako da dobite obe platformi brez dvojnih stroškov. Vsaka aplikacija je narejena za tekoče delovanje in čist, sodoben vmesnik.',
    tocke: [
      ['Custom apps built to your needs', 'Aplikacije, izdelane po vaših potrebah'],
      ['One codebase for Android and iOS', 'Ena koda za Android in iOS'],
      ['Clean and responsive interface', 'Čist in odziven vmesnik'],
      ['Publishing to Google Play and App Store', 'Objava v Google Play in App Store'],
      ['Maintenance and later updates', 'Vzdrževanje in kasnejše dopolnitve']
    ]
  },
  web: {
    stack: 'HTML · CSS · JavaScript',
    ikona: '<circle cx="12" cy="12" r="10" style="stroke:#ffffff; stroke-width:2.2; fill:none;"/><line x1="2" y1="12" x2="22" y2="12" style="stroke:#ffffff; stroke-width:2.2;"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" style="stroke:#ffffff; stroke-width:2.2; fill:none;"/>',
    naslovEn: 'Web Development',
    naslovSlo: 'Spletni razvoj',
    opisEn: 'Modern websites that load fast, look good on every screen and are easy to maintain. Written by hand, without heavy tools, so nothing slows the page down.',
    opisSlo: 'Sodobne spletne strani, ki se hitro naložijo, dobro izgledajo na vsakem zaslonu in jih je enostavno vzdrževati. Napisane ročno, brez težkih orodij, zato strani nič ne upočasnjuje.',
    tocke: [
      ['Presentation sites and portfolios', 'Predstavitvene strani in portfelji'],
      ['Responsive design for phone, tablet and desktop', 'Odziven dizajn za telefon, tablico in računalnik'],
      ['Speed and SEO optimization', 'Optimizacija hitrosti in SEO'],
      ['Contact forms connected to your email', 'Kontaktni obrazci, povezani z vašo e-pošto'],
      ['Maintenance and later updates', 'Vzdrževanje in kasnejše dopolnitve']
    ]
  },
  scripts: {
    stack: 'Linux · Python · Bash',
    ikona: '<polyline points="4 17 10 11 4 5" style="stroke:#ffffff; stroke-width:2.5; fill:none;"/><line x1="12" y1="19" x2="20" y2="19" style="stroke:#ffffff; stroke-width:2.5;"/>',
    naslovEn: 'Scripts & Automation',
    naslovSlo: 'Skripte in avtomatizacija',
    opisEn: 'Repetitive work done by a program instead of by hand. I write scripts and small tools that process data, run tasks on schedule and save you hours every week.',
    opisSlo: 'Ponavljajoče se delo namesto ročno opravi program. Pišem skripte in majhna orodja, ki obdelujejo podatke, izvajajo naloge ob določenem času in vam prihranijo ure vsak teden.',
    tocke: [
      ['Task automation and scheduling', 'Avtomatizacija in načrtovanje nalog'],
      ['Data processing and reports', 'Obdelava podatkov in poročila'],
      ['Linux server administration', 'Administracija strežnikov Linux'],
      ['Custom tools for your workflow', 'Orodja po meri za vaš potek dela'],
      ['Backup and monitoring', 'Varnostne kopije in nadzor']
    ]
  }
};

function openModal(kljuc) {
  if (!modal) return;
  const s = storitve[kljuc];
  if (!s) return;

  /* Vsako tocko zapisemo v obeh jezikih, da preklopnik deluje tudi tukaj. */
  const seznam = s.tocke
    .map((t) => `<li data-en="${t[0]}" data-slo="${t[1]}">${t[0]}</li>`)
    .join('');

  modalBody.innerHTML = `
    <div class="modal-head">
      <div class="service-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">${s.ikona}</svg>
      </div>
      <div>
        <h3 class="modal-title" data-en="${s.naslovEn}" data-slo="${s.naslovSlo}">${s.naslovEn}</h3>
        <p class="service-stack">${s.stack}</p>
      </div>
    </div>
    <p class="modal-desc" data-en="${s.opisEn}" data-slo="${s.opisSlo}">${s.opisEn}</p>
    <p class="modal-label" data-en="What it includes" data-slo="Kaj vključuje">What it includes</p>
    <ul class="service-checklist">${seznam}</ul>
    <div class="modal-actions">
      <a href="#contact" class="btn btn-primary" data-en="Send an inquiry" data-slo="Pošljite povpraševanje">Send an inquiry</a>
      <a href="#projects" class="btn btn-secondary" data-en="View my work" data-slo="Poglejte moje delo">View my work</a>
    </div>
  `;

  /* Ko kliknemo gumb v oknu, se okno zapre in stran skoci na razdelek. */
  modalBody.querySelectorAll('.modal-actions a').forEach((a) => {
    a.addEventListener('click', closeModal);
  });

  /* Novo vsebino takoj prevedemo v jezik, ki je izbran na strani. */
  setLanguage(document.documentElement.lang === 'sl' ? 'slo' : 'en');

  modal.hidden = false;
  document.body.classList.add('modal-open');
}

function closeModal() {
  if (!modal) return;
  modal.hidden = true;
  document.body.classList.remove('modal-open');
}

if (modal) {
  modal.querySelector('.modal-close').addEventListener('click', closeModal);
  modal.querySelector('.modal-overlay').addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hidden) closeModal();
  });
}

/* Odpre se iz spustnega menija in iz kartic v razdelku Storitve. */
document.querySelectorAll('[data-service]').forEach((el) => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(el.dataset.service);
  });
});

/* PREKLOPNIK JEZIKA — EN / SLO */
function setLanguage(lang) {
  document.querySelectorAll('[data-en]').forEach((el) => {
    el.innerHTML = el.dataset[lang];
  });

  /* Besedilo v praznih poljih obrazca ni vsebina, ampak atribut. */
  document.querySelectorAll('[data-en-ph]').forEach((el) => {
    el.placeholder = el.dataset[lang + 'Ph'];
  });

  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  document.documentElement.lang = lang === 'slo' ? 'sl' : 'en';
}

document.querySelectorAll('.lang-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    setLanguage(btn.dataset.lang);
  });
});

/* Stran se odpre v slovenscini, obiskovalec lahko preklopi na anglescino. */
setLanguage('slo');

/* Poslje obrazec brez osvezitve strani in izpise sporocilo. */
const cForm = document.getElementById('contactForm');
const cStatus = document.getElementById('formStatus');

if (cForm) {
  cForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const slo = document.documentElement.lang === 'sl';
    cStatus.className = 'form-status';
    cStatus.textContent = slo ? 'Posiljam...' : 'Sending...';

    try {
      const r = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(cForm)))
      });
      const data = await r.json();
      if (data.success) {
        cStatus.className = 'form-status ok';
        cStatus.textContent = slo ? 'Hvala! Sporocilo je poslano.' : 'Thank you! Your message was sent.';
        cForm.reset();
      } else {
        throw new Error();
      }
    } catch {
      cStatus.className = 'form-status err';
      cStatus.textContent = slo
        ? 'Napaka pri posiljanju. Pisite mi neposredno na e-posto.'
        : 'Sending failed. Please email me directly.';
    }
  });
}

/* Sestavi e-posto in telefon sele v brskalniku, da ju roboti ne poberejo. */
document.querySelectorAll('.js-mail').forEach((el) => {
  const adresa = el.dataset.u + '@' + el.dataset.d;
  el.textContent = adresa;
  el.href = 'mailto:' + adresa;
});

document.querySelectorAll('.js-tel').forEach((el) => {
  const broj = el.dataset.a + ' ' + el.dataset.b;
  el.textContent = broj;
  el.href = 'tel:' + broj.replace(/\s/g, '');
});

/* Gumb hamburger odpre in zapre meni na telefonu. */
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
}

/* Meni se zapre takoj, ko obiskovalec klikne povezavo v njem. */
document.querySelectorAll('.mobile-nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
});

/* RAZLAGE ORODIJ — besedilo se pokaze, ko gres z misko cez logotip. */
const orodja = {
  Flutter: ['One build — the app runs on both Android and iPhone.', 'Ena izdelava — aplikacija deluje na Androidu in iPhonu.'],
  Dart: ['The language behind Flutter. Fast, and fewer bugs.', 'Jezik za Flutterjem. Hiter, z manj napakami.'],
  Supabase: ['Cloud database. Logins, data and backups included.', 'Baza v oblaku. Prijava, podatki in varnostne kopije.'],
  HTML5: ['The skeleton of the page. Clean structure Google understands.', 'Ogrodje strani. Čista struktura, ki jo Google razume.'],
  CSS: ['The look. Fits every screen, from phone to 4K.', 'Videz. Prilagodi se vsakemu zaslonu, od telefona do 4K.'],
  JavaScript: ['Brings the page alive. Forms, motion, interaction.', 'Oživi stran. Obrazci, gibanje, interakcija.'],
  Git: ['Every change is saved. Going back is always possible.', 'Vsaka sprememba je shranjena. Vrnitev nazaj je vedno možna.'],
  Linux: ['Servers run on Linux. The terminal is home ground.', 'Strežniki tečejo na Linuxu. Terminal je moj teren.'],
  Python: ['Data processing and automation of repetitive work.', 'Obdelava podatkov in avtomatizacija ponavljajočega se dela.'],
  Bash: ['Scripts that do the job for you — same time, every day.', 'Skripte, ki delo opravijo namesto vas — vsak dan ob isti uri.'],
  PostgreSQL: ['Data kept in order and fast to reach, even when there is a lot.', 'Podatki urejeni in hitro dosegljivi, tudi ko jih je veliko.']
};

document.querySelectorAll('.skill-panel').forEach((plosca) => {
  const opis = plosca.querySelector('.skill-panel-desc');
  if (!opis) return;

  plosca.querySelectorAll('.skill-logo').forEach((logo) => {
    const ime = logo.querySelector('span').textContent.trim();
    const razlaga = orodja[ime];
    if (!razlaga) return;

    /* Pokaze razlago orodja namesto osnovnega opisa. */
    function pokazi() {
      const slo = document.documentElement.lang === 'sl';
      opis.textContent = slo ? razlaga[1] : razlaga[0];
      opis.classList.add('is-orodje');
    }

    /* Vrne osnovni opis, ki je zapisan v atributih same plosce. */
    function vrni() {
      const slo = document.documentElement.lang === 'sl';
      opis.textContent = slo ? opis.dataset.slo : opis.dataset.en;
      opis.classList.remove('is-orodje');
    }

    logo.addEventListener('mouseenter', pokazi);
    logo.addEventListener('mouseleave', vrni);
    logo.addEventListener('click', pokazi);
  });
});

/* ENERGIJA PO POTI PROCESA */
const pot = document.getElementById('wavePath');
const krogla = document.getElementById('waveOrb');
const kroglaSij = document.getElementById('waveOrbGlow');
const iskre = document.getElementById('waveSparks');

/* Kdor v sistemu izklopi animacije, dobi mirno crto brez energije. */
const manjGibanja = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Na pravni strani tega razdelka ni, zato najprej preverimo. */
if (pot && krogla && !manjGibanja) {
  const NS = 'http://www.w3.org/2000/svg';
  const dolzina = pot.getTotalLength();
  const trajanje = 5600;

  krogla.setAttribute('opacity', '1');
  kroglaSij.setAttribute('opacity', '1');

  let delci = [];
  let zacetek = null;
  let vidno = false;

  /* Ustvari eno iskro ob trenutni legi energije. */
  function iskra(x, y) {
    if (delci.length > 14) return;
    const c = document.createElementNS(NS, 'circle');
    c.setAttribute('r', (Math.random() * 1.6 + 0.8).toFixed(2));
    c.setAttribute('fill', Math.random() < 0.5 ? '#FFF3C4' : '#ffffff');
    c.setAttribute('cx', x);
    c.setAttribute('cy', y);
    iskre.appendChild(c);
    delci.push({
      el: c, x: x, y: y,
      vx: (Math.random() - 0.2) * 2.4,
      vy: (Math.random() - 0.5) * 3.4,
      zivljenje: 1
    });
  }

  function korak(cas) {
    if (!vidno) return;
    if (zacetek === null) zacetek = cas;

    const preteceno = ((cas - zacetek) % trajanje) / trajanje;
    const d = preteceno * dolzina;
    const tocka = pot.getPointAtLength(d);

    krogla.setAttribute('transform', 'translate(' + tocka.x + ',' + tocka.y + ')');
    kroglaSij.setAttribute('transform', 'translate(' + tocka.x + ',' + tocka.y + ')');

    if (Math.random() < 0.85) iskra(tocka.x, tocka.y);

    /* Iskre se razletijo, padajo in ugasnejo. */
    for (let i = delci.length - 1; i >= 0; i--) {
      const q = delci[i];
      q.zivljenje -= 0.05;
      q.x += q.vx;
      q.y += q.vy;
      q.vy += 0.09;
      if (q.zivljenje <= 0) {
        iskre.removeChild(q.el);
        delci.splice(i, 1);
        continue;
      }
      q.el.setAttribute('cx', q.x);
      q.el.setAttribute('cy', q.y);
      q.el.setAttribute('opacity', q.zivljenje.toFixed(2));
    }

    requestAnimationFrame(korak);
  }

  /* Ko razdelek ni na zaslonu, animacija miruje in ne jemlje baterije. */
  const opazovalec = new IntersectionObserver((vnosi) => {
    vnosi.forEach((v) => {
      if (v.isIntersecting && !vidno) {
        vidno = true;
        zacetek = null;
        requestAnimationFrame(korak);
      } else if (!v.isIntersecting) {
        vidno = false;
      }
    });
  }, { threshold: 0.1 });

  opazovalec.observe(pot.closest('.process-steps'));
}