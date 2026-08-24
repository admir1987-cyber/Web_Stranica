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

// Otvara i zatvara mobilni meni na klik hamburger gumba
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
}

// Zatvara meni čim korisnik klikne na neki link unutra
document.querySelectorAll('.mobile-nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
});