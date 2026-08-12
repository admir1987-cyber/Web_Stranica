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

navServices.addEventListener('mouseenter', openDropdown);
navServices.addEventListener('mouseleave', scheduleCloseDropdown);
navDropdown.addEventListener('mouseenter', openDropdown);
navDropdown.addEventListener('mouseleave', scheduleCloseDropdown);

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

// Otvara i zatvara mobilni meni na klik hamburger gumba
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

// Zatvara meni čim korisnik klikne na neki link unutra
document.querySelectorAll('.mobile-nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
});