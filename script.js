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
    /* Prave povezave pustimo delovati, prazne ustavimo. */
    if (item.getAttribute('href') === '#') e.preventDefault();
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

/* ZVEZDE V PROSTORU — znaki kode, ki lebdijo za vsebino. */
const prostor = document.querySelector('.space');
const nebo = document.getElementById('spaceStars');
const tlaDalec = document.querySelector('.space-grid-far');
const tlaBlizu = document.querySelector('.space-grid-near');

if (prostor && nebo && tlaDalec && tlaBlizu && !manjGibanja) {
  /* Vsak znak: [besedilo, x v %, y v %, velikost, globina 1-4]. */
  const znaki = [
    ['{ }', 7, 13, 36, 4],
    ['</>', 84, 18, 29, 4],
    ['$_', 15, 60, 31, 4],
    ['_', 13, 88, 27, 4],
    ['=>', 67, 72, 24, 3],
    ['@', 90, 53, 26, 3],
    ['~', 53, 44, 24, 3],
    ['&&', 5, 78, 22, 3],
    ['->', 38, 53, 23, 3],
    ['0x', 9, 24, 20, 3],
    ['!=', 63, 90, 19, 2],
    ['//', 87, 76, 20, 2],
    ['<>', 50, 31, 20, 2],
    ['==', 79, 86, 18, 2],
    ['()', 33, 84, 21, 2],
    ['[ ]', 73, 9, 18, 2],
    [';', 45, 8, 16, 1],
    ['#', 11, 38, 19, 1],
    ['||', 91, 32, 17, 1],
    ['++', 27, 31, 16, 1],
    ['/*', 46, 62, 16, 1],
    ['::', 77, 42, 17, 1],
    ['?.', 22, 7, 17, 1],
    ['*/', 58, 16, 16, 1],
    ['%', 70, 58, 16, 1],
    ['^', 30, 68, 17, 1],
    ['[]', 18, 45, 15, 1],
    ['|>', 41, 76, 17, 1]
  ];

  const zvezde = [];

  znaki.forEach((z) => {
    const s = document.createElement('span');
    s.className = 'space-star';
    s.textContent = z[0];
    s.style.left = z[1] + '%';
    s.style.top = z[2] + '%';
    s.style.fontSize = z[3] + 'px';

    const motnost = 0.09 + z[4] * 0.055;
    s.style.opacity = motnost;

    /* Kar je dlje, je mehkejse — tako oko prebere razdaljo. */
    if (z[4] <= 2) {
      s.style.filter = 'blur(' + (z[4] === 1 ? 0.9 : 0.45) + 'px)';
    }

    nebo.appendChild(s);
    zvezde.push({ el: s, x: z[1], y: z[2], globina: z[4], motnost: motnost });
  });

  const cilj = { x: 0, y: 0 };
  const zdaj = { x: 0, y: 0 };
  let imaMis = false;
  let drsenje = 0;
  let tece = false;

  function narisi() {
    /* Prostor lovi misko postopoma, zato ima tezo in ni prilepljen nanjo. */
    zdaj.x += (cilj.x - zdaj.x) * 0.075;
    zdaj.y += (cilj.y - zdaj.y) * 0.075;

    const sirina = window.innerWidth;
    const visina = window.innerHeight;
    const pas = visina + 340;

    tlaDalec.style.transform =
      'perspective(1500px) rotateX(70.5deg) translate3d(' + -zdaj.x * 10 + 'px, 0, 0)';
    tlaBlizu.style.transform =
      'perspective(820px) rotateX(65deg) translate3d(' + -zdaj.x * 26 + 'px, 0, 0)';

    const misX = cilj.x * sirina + sirina / 2;
    const misY = cilj.y * visina + visina / 2;

    zvezde.forEach((zv) => {
      const osnovaX = (zv.x / 100) * sirina;
      const osnovaY = (zv.y / 100) * visina;
      const hitrost = zv.globina * 0.05;
      const novaY = ((((osnovaY - drsenje * hitrost) % pas) + pas) % pas) - 170;

      let px = -zdaj.x * zv.globina * 7;
      let py = novaY - osnovaY - zdaj.y * zv.globina * 4;
      let velikost = 1;
      let motnost = zv.motnost;

      if (imaMis) {
        const razX = osnovaX + px - misX;
        const razY = novaY - misY;
        const razdalja = Math.sqrt(razX * razX + razY * razY);
        if (razdalja < 130) {
          const moc = 1 - razdalja / 130;
          px += (razX / (razdalja || 1)) * moc * 44;
          py += (razY / (razdalja || 1)) * moc * 44;
          velikost = 1 + moc * 0.5;
          motnost = zv.motnost + moc * 0.55;
        }
      }

      zv.el.style.transform =
        'translate3d(' + px.toFixed(1) + 'px,' + py.toFixed(1) + 'px,0) scale(' + velikost.toFixed(2) + ')';
      zv.el.style.opacity = motnost.toFixed(3);
    });

    /* Ko se nic vec ne premika, se risanje ustavi in ne jemlje baterije. */
    if (Math.abs(cilj.x - zdaj.x) > 0.0005 || Math.abs(cilj.y - zdaj.y) > 0.0005) {
      requestAnimationFrame(narisi);
    } else {
      tece = false;
    }
  }

  function zbudi() {
    if (!tece) {
      tece = true;
      requestAnimationFrame(narisi);
    }
  }

  window.addEventListener('scroll', () => {
    drsenje = window.scrollY;
    zbudi();
  }, { passive: true });

  window.addEventListener('resize', zbudi);

  /* Na dotik miske ni, zato se ta del sploh ne vklopi. */
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    window.addEventListener('mousemove', (e) => {
      cilj.x = e.clientX / window.innerWidth - 0.5;
      cilj.y = e.clientY / window.innerHeight - 0.5;
      imaMis = true;
      zbudi();
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
      cilj.x = 0;
      cilj.y = 0;
      imaMis = false;
      zbudi();
    });
  }

  narisi();
}

/* PROJEKTI — kartici prideta v pogled, podrobnosti se odprejo v istem oknu. */
const projektneKartice = document.querySelectorAll('.project-card');

if (projektneKartice.length) {
  /* Vsebina obeh projektov na enem mestu, v obeh jezikih. */
  const projekti = {
    tekton: {
      naslov: 'Tekton',
      povezava: 'https://play.google.com/store/apps/details?id=com.tekton.app',
      povezavaEn: 'Open on Google Play',
      povezavaSlo: 'Odprite v trgovini Google Play',
      ikona: '<path fill="#00A0FF" d="M1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087L1.337.924z"/><path fill="#00F076" d="M13.544 10.989l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.179l11.04 10.973z"/><path fill="#FFCE00" d="M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594z"/><path fill="#FF3A44" d="M13.544 13.056l-11 10.933c.298.036.612-.016.906-.183l13.324-7.54-3.23-3.21z"/>',      oznakaEn: 'Construction Diary App',
      oznakaSlo: 'Aplikacija za gradbeni dnevnik',
      opisEn: 'Tekton is an AI app that automates the construction site diary. The site manager simply describes what was done on site — Tekton turns it into a structured daily report and an official PDF, linked with photos and audio recordings from the field. No typing, no paperwork, no wasted time at the end of the shift.',
      opisSlo: 'Tekton je AI aplikacija, ki avtomatizira gradbeni dnevnik. Vodja gradbišča preprosto pove, kaj je bilo narejeno na gradbišču — Tekton to spremeni v strukturirano dnevno poročilo in uradni PDF, povezan s fotografijami in avdio posnetki s terena. Brez tipkanja, brez papirja, brez izgubljanja časa ob koncu izmene.',
      tocke: [
        ['AI integration (Google Gemini)', 'AI integracija (Google Gemini)'],
        ['Voice input instead of typing', 'Glasovni vnos namesto tipkanja'],
        ['Automatic PDF reports', 'Samodejna PDF poročila'],
        ['Cloud sync for photos and audio', 'Sinhronizacija fotografij in zvoka v oblaku'],
        ['Multi-device, multi-project support', 'Podpora za več naprav in projektov'],
        ['Secure user authentication', 'Varna avtentikacija uporabnikov'],
        ['Support for 6 languages', 'Podpora za 6 jezikov'],
        ['Day-by-day view — ready evidence if disputes arise', 'Pregled po dnevih — pripravljen dokaz ob morebitnem sporu']
      ]
    },
    kaden: {
      naslov: 'Kaden Digital',
      povezava: 'https://github.com/admir1987-cyber/Web_Stranica',
      povezavaEn: 'View the code on GitHub',
      povezavaSlo: 'Poglejte kodo na GitHubu',
      ikona: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
            ikona: '<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>',
      oznakaSlo: 'Predstavitvena spletna stran',
      opisEn: 'No framework, no page builder, no plugins — only HTML, CSS and JavaScript. The 3D space in the background, the animations and the language switch are all built from basic parts, which is why the whole site stays under one megabyte and opens in less than a second. What you see here is the same standard I apply to client work.',
      opisSlo: 'Brez ogrodij, brez urejevalnikov strani, brez vtičnikov — samo HTML, CSS in JavaScript. 3D prostor v ozadju, animacije in preklop med jezikoma so sestavljeni iz osnovnih gradnikov, zato vsa stran ostane pod enim megabajtom in se odpre v manj kot sekundi. To, kar vidite tukaj, je isti standard, ki ga uporabim pri delu za naročnike.',
      tocke: [
        ['No frameworks, no build tools', 'Brez ogrodij in brez orodij za gradnjo'],
        ['Bilingual with a language switch', 'Dvojezična, s preklopnikom jezika'],
        ['Fluid from 375px to 4K screens', 'Tekoča od 375px do 4K zaslonov'],
        ['3D space in pure CSS and SVG', '3D prostor v čistem CSS in SVG'],
        ['Images in WebP — whole site under 1 MB', 'Slike v WebP — vsa stran pod 1 MB'],
        ['Contact form without a server', 'Kontaktni obrazec brez strežnika'],
        ['Sitemap, robots and JSON-LD for Google', 'Sitemap, robots in JSON-LD za Google'],
        ['Published through GitHub Pages', 'Objavljeno prek GitHub Pages']
      ]
    }
  };

  function odpriProjekt(kljuc) {
    const p = projekti[kljuc];
    if (!p || !modal) return;

    /* Tocke razdelimo v dva stolpca, kot je bilo prej. */
    const pol = Math.ceil(p.tocke.length / 2);
    const stolpec = (od, do_) =>
      '<ul>' +
      p.tocke.slice(od, do_).map((t) => `<li data-en="${t[0]}" data-slo="${t[1]}">${t[0]}</li>`).join('') +
      '</ul>';

    modalBody.innerHTML = `
      <div class="modal-head">
        <div>
          <h3 class="modal-title">${p.naslov}</h3>
          <p class="project-tag" data-en="${p.oznakaEn}" data-slo="${p.oznakaSlo}">${p.oznakaEn}</p>
        </div>
      </div>
      <p class="project-desc" data-en="${p.opisEn}" data-slo="${p.opisSlo}">${p.opisEn}</p>
      <p class="modal-label" data-en="What is inside" data-slo="Kaj je notri">What is inside</p>
      <div class="project-features">${stolpec(0, pol)}${stolpec(pol, p.tocke.length)}</div>
      <div class="modal-actions">
        <a href="#contact" class="btn btn-primary" data-en="Ask about this project" data-slo="Vprašajte o tem projektu">Ask about this project</a>
        ${p.povezava ? `<a href="${p.povezava}" class="btn btn-secondary btn-ikona" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" aria-hidden="true">${p.ikona}</svg><span data-en="${p.povezavaEn}" data-slo="${p.povezavaSlo}">${p.povezavaEn}</span></a>` : ''}
      </div>
    `;

    /* Okno zapremo le pri povezavah znotraj strani, ne pri zunanjih. */
    modalBody.querySelectorAll('.modal-actions a[href^="#"]').forEach((a) => {
      a.addEventListener('click', closeModal);
    });

    setLanguage(document.documentElement.lang === 'sl' ? 'slo' : 'en');
    modal.hidden = false;
    document.body.classList.add('modal-open');
  }

  projektneKartice.forEach((k) => {
    k.addEventListener('click', () => odpriProjekt(k.dataset.project));
  });

  /* Kdor ima animacije izklopljene, dobi kartici takoj. */
  if (manjGibanja) {
    projektneKartice.forEach((k) => k.classList.add('vidna'));
  } else {
    const opazovalec = new IntersectionObserver((vnosi) => {
      vnosi.forEach((v) => {
        if (!v.isIntersecting) return;
        const i = [...projektneKartice].indexOf(v.target);
        setTimeout(() => v.target.classList.add('vidna'), i * 70);
        opazovalec.unobserve(v.target);
      });
    }, { threshold: 0.2 });

    projektneKartice.forEach((k) => opazovalec.observe(k));
  }
}

/* TIPKOVNICA — kartice se odprejo tudi brez miske. */
const gumbneKartice = document.querySelectorAll('.service-card, .project-card');
const okno = document.getElementById('serviceModal');

gumbneKartice.forEach((k) => {
  /* Brez skripte kartica sploh ni gumb, zato ji vlogo damo sele tukaj. */
  k.setAttribute('role', 'button');
  k.setAttribute('tabindex', '0');

  k.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      k.click();
    }
  });
});

if (okno) {
  let vrniFokus = null;

  gumbneKartice.forEach((k) => {
    k.addEventListener('click', () => {
      vrniFokus = k;
    });
  });

  /* Ko se okno odpre, gre fokus vanj; ko se zapre, se vrne na kartico. */
  const opazovalecOkna = new MutationObserver(() => {
    if (!okno.hidden) {
      const zapri = okno.querySelector('.modal-close');
      if (zapri) zapri.focus();
    } else if (vrniFokus) {
      vrniFokus.focus();
      vrniFokus = null;
    }
  });

  opazovalecOkna.observe(okno, { attributes: true, attributeFilter: ['hidden'] });

  /* Tabulator ostane ujet v oknu, dokler je to odprto. */
  okno.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;

    const dosegljivi = okno.querySelectorAll('a[href], button, [tabindex]:not([tabindex="-1"])');
    if (!dosegljivi.length) return;

    const prvi = dosegljivi[0];
    const zadnji = dosegljivi[dosegljivi.length - 1];

    if (e.shiftKey && document.activeElement === prvi) {
      e.preventDefault();
      zadnji.focus();
    } else if (!e.shiftKey && document.activeElement === zadnji) {
      e.preventDefault();
      prvi.focus();
    }
  });
}

/* SKLAD NAPRAV V HERO SEKCIJI */
const sklad = document.getElementById('heroStack');

if (sklad) {
  const naprave = [...sklad.querySelectorAll('.hero-dev')];
  const pike = [...sklad.querySelectorAll('.hero-pike button')];
  const oznaka = document.getElementById('heroOznaka');

  /* Ime storitve pod skladom, v obeh jezikih. */
  const imena = [
    ['Mobile apps', 'Mobilne aplikacije'],
    ['Websites', 'Spletne strani'],
    ['Scripts & automation', 'Skripte in avtomatizacija']
  ];

  const koliko = naprave.length;
  let spredaj = 0;
  let zaklep = false;

  function narisiSklad() {
    naprave.forEach((el, i) => {
      const globina = (i - spredaj + koliko) % koliko;

      /* Naprave stojijo na loku: prva naravnost, vsaka naslednja bolj obrnjena. */
      /* Polozaj na loku in zasuk naprave sta loceni stvari. */
      const kot = globina * 28;
      const zasuk = globina * 11;
      const rad = (kot * Math.PI) / 180;
      /* Polmer raste z zaslonom, da lok ostane enak na vsaki sirini. */
      const polmer = sklad.clientWidth * 0.95;
      /* Vsak naslednji dobi se dodaten sunek v levo, zadnji najvec. */
      const x = -polmer * Math.sin(rad) - globina * globina * 45;
      const z = -polmer * (1 - Math.cos(rad)) - globina * 190;

      el.style.transform =
        'translate(-50%, -50%)' +
        ' translateX(' + x.toFixed(1) + 'px)' +
        ' translateY(' + -globina * 10 + 'px)' +
        ' translateZ(' + z.toFixed(1) + 'px)' +
        ' rotateY(' + -zasuk + 'deg)' +
        ' scale(' + (1 - globina * 0.15).toFixed(2) + ')';

      el.style.opacity = 1;
      el.style.setProperty('--megla', (globina * 0.34).toFixed(2));
      el.style.zIndex = koliko - globina;
      el.style.filter = globina ? 'blur(' + globina * 0.7 + 'px)' : 'none';
    });

    pike.forEach((b, i) => b.classList.toggle('on', i === spredaj));
    osveziOznako();
  }

  function osveziOznako() {
    if (!oznaka) return;
    const slo = document.documentElement.lang === 'sl';
    oznaka.style.opacity = 0;
    setTimeout(() => {
      oznaka.textContent = (slo ? imena[spredaj][1] : imena[spredaj][0]).toUpperCase();
      oznaka.style.opacity = 1;
    }, 170);
  }

  function premakni(korak) {
    if (zaklep) return;
    zaklep = true;
    spredaj += korak;
    narisiSklad();
    setTimeout(() => { zaklep = false; }, 400);
  }

  /* Kolesce dela povsod v Hero sekciji, ne le nad samimi napravami. */
  const herojSekcija = document.getElementById('hero') || sklad;

  herojSekcija.addEventListener('wheel', (e) => {
    const navzdol = e.deltaY > 0;
    if (navzdol && spredaj >= koliko - 1) return;
    if (!navzdol && spredaj <= 0) return;
    e.preventDefault();
    premakni(navzdol ? 1 : -1);
  }, { passive: false });

  /* Na dotik isto, samo s potegom prsta. */
  let zacetekY = null;

  sklad.addEventListener('touchstart', (e) => {
    zacetekY = e.touches[0].clientY;
  }, { passive: true });

  sklad.addEventListener('touchend', (e) => {
    if (zacetekY === null) return;
    const razlika = zacetekY - e.changedTouches[0].clientY;
    zacetekY = null;
    if (Math.abs(razlika) < 40) return;
    if (razlika > 0 && spredaj < koliko - 1) premakni(1);
    if (razlika < 0 && spredaj > 0) premakni(-1);
  }, { passive: true });

  pike.forEach((b, i) => {
    b.addEventListener('click', () => {
      if (i === spredaj) return;
      spredaj = i;
      narisiSklad();
    });
  });

  /* Ob menjavi jezika se napis pod skladom prevede takoj. */
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.addEventListener('click', () => setTimeout(osveziOznako, 10));
  });

  narisiSklad();
}

/* KARTICE, KI SE OBRNEJO — klik pokaze hrbtno stran. */
document.querySelectorAll('.obrnljiva').forEach((k) => {
  k.addEventListener('click', () => k.classList.toggle('obrnjena'));
  k.addEventListener('mouseleave', () => k.classList.remove('obrnjena'));
});

/* SKROL HERO — drsenje premika animacijo in menja naslove. */
const skrolHero = document.getElementById('skrolHero');
const skrolVideo = document.getElementById('skrolVideo');

if (skrolHero && skrolVideo) {
  const bloki = [...skrolHero.querySelectorAll('.skrol-blok')];

  /* Na telefonih premikanje videa z drsenjem ne dela zanesljivo. */
  const naDotik = window.matchMedia('(hover: none), (max-width: 900px)').matches;

  if (naDotik) {
    skrolVideo.loop = true;
    skrolVideo.play().catch(() => {});
  }

  let cakam = false;

  function osveziHero() {
    const visina = skrolHero.offsetHeight - window.innerHeight;
    const prevozeno = Math.min(Math.max(-skrolHero.getBoundingClientRect().top, 0), visina);
    const delez = visina > 0 ? prevozeno / visina : 0;

    /* Vsak kader ima svoje mesto na poti drsenja. */
    if (!naDotik && skrolVideo.duration) {
      skrolVideo.currentTime = delez * skrolVideo.duration;
    }

    /* Pot razdelimo na toliko delov, kolikor je naslovov. */
    const naVrsti = Math.min(Math.floor(delez * bloki.length), bloki.length - 1);

    bloki.forEach((b, i) => {
      b.classList.toggle('viden', i === naVrsti);
      b.classList.toggle('mimo', i < naVrsti);
    });

    cakam = false;
  }

  window.addEventListener('scroll', () => {
    if (cakam) return;
    cakam = true;
    requestAnimationFrame(osveziHero);
  }, { passive: true });

  window.addEventListener('resize', osveziHero);
  skrolVideo.addEventListener('loadedmetadata', osveziHero);
  osveziHero();
}