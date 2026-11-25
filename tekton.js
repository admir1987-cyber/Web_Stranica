/* TEKTON: listi v heroju rahlo sledijo miški. Samo z miško in ne pri zmanjšanem gibanju. */
(function () {
  const hero = document.querySelector('.tk-hero');
  const listi = document.querySelector('.tk-hero-listovi');
  const miska = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const mirno = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!hero || !listi || !miska || mirno) return;

  hero.addEventListener('mousemove', function (e) {
    const r = hero.getBoundingClientRect();
    listi.style.setProperty('--mx', ((e.clientX - r.left) / r.width - 0.5) * 2);
    listi.style.setProperty('--my', ((e.clientY - r.top) / r.height - 0.5) * 2);
  });

  hero.addEventListener('mouseleave', function () {
    listi.style.setProperty('--mx', 0);
    listi.style.setProperty('--my', 0);
  });
})();


/* TEKTON: ozadje strani je ista fotografija kot v heroju. Ob drsenju se počasi pomika navzdol, proti načrtom na tleh. */
(function () {
  const slika = document.querySelector('.tk-pozadina-slika');
  const hero = document.querySelector('.tk-hero');
  const mirno = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!slika || !hero) return;

  let zacetek = 0;
  let razpon = 0;
  let caka = false;

  function narisi() {
    caka = false;
    const pomik = mirno ? Math.min(razpon, 300) : Math.min(razpon, window.scrollY * 0.5);
    slika.style.transform = 'translate3d(-50%, ' + -(zacetek + pomik) + 'px, 0)';
  }

  /* Na vrhu strani se mora ozadje ujemati s sliko v heroju, zato se začne na njeni sredini. */
  function izmeri() {
    const prosto = Math.max(0, slika.offsetHeight - window.innerHeight);
    zacetek = Math.min(prosto, Math.max(0, (slika.offsetHeight - hero.offsetHeight) / 2));
    razpon = prosto - zacetek;
    narisi();
  }

  function sprozi() {
    if (!caka) {
      caka = true;
      requestAnimationFrame(narisi);
    }
  }

  if (!mirno) window.addEventListener('scroll', sprozi, { passive: true });
  window.addEventListener('resize', izmeri);
  if (window.ResizeObserver) new ResizeObserver(izmeri).observe(hero);
  izmeri();
})();


/* TEKTON: koraki v odseku "Kako deluje" se pri drsenju zlagajo ena čez drugo. Kartica, ki jo prekrije naslednja, se rahlo zmanjša in potemni. */
(function () {
  const koraki = Array.from(document.querySelectorAll('.tk-korak'));
  const mirno = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (koraki.length < 2 || mirno) return;

  const kartice = koraki.map(function (korak) {
    return korak.querySelector('.tk-korak-kartica');
  });
  let caka = false;

  function narisi() {
    caka = false;

    /* Ko so naslov in kartice v oknu čez cel zaslon, kartice vodi skripta za ta prikaz (spodaj). */
    if (koraki[0].closest('.tk-koraki').classList.contains('tk-koraki-aktivno')) return;

    /* Če kartice niso lepljive (prenizek zaslon), ni prekrivanja. */
    if (getComputedStyle(koraki[0]).position !== 'sticky') {
      kartice.forEach(function (kartica) {
        kartica.style.setProperty('--pokrito', 0);
      });
      return;
    }

    const mesta = koraki.map(function (korak) {
      return korak.getBoundingClientRect();
    });
    const vrhovi = koraki.map(function (korak) {
      return parseFloat(getComputedStyle(korak).top) || 0;
    });

    kartice.forEach(function (kartica, i) {
      let pokrito = 0;

      for (let j = i + 1; j < koraki.length; j++) {
        /* Naslednja kartica pokriva prejšnjo od trenutka, ko doseže njeno dno, do trenutka, ko pride na svoje mesto. */
        const pot = mesta[j - 1].bottom - vrhovi[j];
        if (pot > 0) pokrito += Math.min(1, Math.max(0, (mesta[j - 1].bottom - mesta[j].top) / pot));
      }

      kartica.style.setProperty('--pokrito', pokrito.toFixed(3));
    });
  }

  function sprozi() {
    if (!caka) {
      caka = true;
      requestAnimationFrame(narisi);
    }
  }

  window.addEventListener('scroll', sprozi, { passive: true });
  window.addEventListener('resize', sprozi);
  narisi();
})();


/* TEKTON: odsek "Kako deluje" v oknu čez cel zaslon. Naslov in kartice so vidni naenkrat, ko se odsek zalepi, pa se kartice ena za drugo zložijo. Če zaslon ni dovolj velik, ostane prejšnji prikaz. */
(function () {
  const odsek = document.querySelector('.tk-koraki');
  const mirno = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!odsek || mirno) return;

  const okno = odsek.querySelector('.tk-sekcija-in');
  const koraki = Array.from(odsek.querySelectorAll('.tk-korak'));
  const kartice = koraki.map(function (korak) {
    return korak.querySelector('.tk-korak-kartica');
  });
  const slike = koraki.map(function (korak) {
    return korak.querySelector('.tk-korak-slika');
  });
  let caka = false;

  function narisi() {
    caka = false;

    if (!odsek.classList.contains('tk-koraki-aktivno')) return;

    const mesto = odsek.getBoundingClientRect();
    const pot = mesto.height - okno.offsetHeight;
    const delez = pot > 0 ? Math.min(1, Math.max(0, -mesto.top / pot)) : 0;
    /* Zadnja kartica ostane nekaj časa vidna. */
    const p = Math.min(koraki.length - 1, delez * (koraki.length - 1) * 1.12);

    koraki.forEach(function (korak, i) {
      /* Vsaka kartica od druge naprej pride od spodaj čez prejšnjo. */
      const t = i === 0 ? 1 : Math.min(1, Math.max(0, p - (i - 1)));
      const vstop = 1 - t * t * (3 - 2 * t);

      korak.style.setProperty('--vstop', vstop.toFixed(3));
      korak.style.visibility = t <= 0 ? 'hidden' : 'visible';
      kartice[i].style.setProperty('--pokrito', Math.min(koraki.length - 1 - i, Math.max(0, p - i)).toFixed(3));
    });
  }

  /* Ali besedilo in slika vseh kartic stojita v kartici. */
  function stane() {
    return okno.clientHeight >= 560 && kartice.every(function (kartica, i) {
      const slog = getComputedStyle(kartica);
      const prostor = kartica.clientHeight - parseFloat(slog.paddingTop) - parseFloat(slog.paddingBottom);

      return kartica.querySelector('.tk-korak-besedilo').offsetHeight <= prostor + 1 && slike[i].clientHeight >= 200;
    });
  }

  /* Prikaz deluje le, če se naslov in vse kartice vidijo naenkrat. Če besedilo ne stane, se črke zmanjšajo do 85 %. Sicer ostane prejšnji prikaz. */
  function preveri() {
    const pisave = [1, 0.95, 0.9, 0.85];
    let ustreza = false;

    odsek.classList.add('tk-koraki-aktivno');

    for (let i = 0; i < pisave.length && !ustreza; i++) {
      odsek.style.setProperty('--tk-pisava', pisave[i]);
      ustreza = stane();
    }

    if (!ustreza) {
      odsek.style.removeProperty('--tk-pisava');
      odsek.classList.remove('tk-koraki-aktivno');
      koraki.forEach(function (korak, i) {
        korak.style.removeProperty('--vstop');
        korak.style.visibility = '';
        kartice[i].style.removeProperty('--pokrito');
      });
      /* Prejšnji prikaz se osveži. */
      window.dispatchEvent(new Event('scroll'));
      return;
    }

    narisi();
  }

  function sprozi() {
    if (!caka) {
      caka = true;
      requestAnimationFrame(narisi);
    }
  }

  window.addEventListener('scroll', sprozi, { passive: true });
  window.addEventListener('resize', preveri);
  window.addEventListener('load', preveri);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(preveri);
  preveri();
})();


/* TEKTON: odsek "Kaj zna". Kartice so zložene kot kup, pri drsenju zgornja odleti vstran in se zavrti ter odkrije naslednjo. */
(function () {
  const odsek = document.querySelector('.tk-zna');
  const mirno = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!odsek || mirno) return;

  const oder = odsek.querySelector('.tk-zna-oder');
  const okno = odsek.querySelector('.tk-zna-okno');
  const naslov = odsek.querySelector('.tk-sekcija-in');
  const vsebina = odsek.querySelector('.tk-zna-vsebina');
  const kartice = Array.from(odsek.querySelectorAll('.tk-zna-kartica'));
  const stevilka = odsek.querySelector('.tk-zna-stevilka');
  const crtice = Array.from(odsek.querySelectorAll('.tk-zna-crtice span'));
  let caka = false;

  function narisi() {
    caka = false;

    if (!odsek.classList.contains('tk-zna-aktivno')) return;

    const mesto = oder.getBoundingClientRect();
    const pot = mesto.height - okno.offsetHeight;
    const delez = pot > 0 ? Math.min(1, Math.max(0, -mesto.top / pot)) : 0;
    /* Zadnja kartica ostane nekaj časa vidna. */
    const p = Math.min(kartice.length - 1, delez * (kartice.length - 1) * 1.12);
    const trenutna = Math.min(kartice.length - 1, Math.floor(p + 0.5));

    kartice.forEach(function (kartica, i) {
      const smer = i % 2 === 0 ? 1 : -1;

      /* Prva kartica je zgoraj, zadnja na dnu kupa. */
      kartica.style.zIndex = kartice.length - i;

      if (p >= i) {
        const t = Math.min(1, p - i);
        kartica.style.transform = 'translate(' + smer * t * 118 + '%, ' + -t * 8 + '%) rotate(' + smer * t * 17 + 'deg)';
        kartica.style.opacity = 1 - Math.min(1, Math.max(0, (t - 0.6) / 0.4));
        kartica.style.setProperty('--tamno', 0);
      } else {
        const d = Math.min(i - p, 3);
        kartica.style.transform = 'translateY(' + d * 4 + '%) scale(' + (1 - 0.045 * d) + ')';
        kartica.style.opacity = i - p > 3 ? 0 : 1;
        kartica.style.setProperty('--tamno', (d * 0.16).toFixed(3));
      }
    });

    stevilka.textContent = String(trenutna + 1).padStart(2, '0');
    crtice.forEach(function (crtica, i) {
      crtica.classList.toggle('tk-aktivna', i <= trenutna);
    });
  }

  /* Kup deluje le, če je zaslon dovolj visok, da se naslov in kartice vidijo naenkrat. Sicer so kartice navadna mreža. */
  function preveri() {
    odsek.classList.add('tk-zna-aktivno');

    if (naslov.offsetHeight + vsebina.offsetHeight > okno.clientHeight - 32 || okno.clientHeight < 560) {
      odsek.classList.remove('tk-zna-aktivno');
      kartice.forEach(function (kartica) {
        kartica.style.transform = '';
        kartica.style.opacity = '';
        kartica.style.zIndex = '';
        kartica.style.removeProperty('--tamno');
      });
    }

    narisi();
  }

  function sprozi() {
    if (!caka) {
      caka = true;
      requestAnimationFrame(narisi);
    }
  }

  window.addEventListener('scroll', sprozi, { passive: true });
  window.addEventListener('resize', preveri);
  preveri();
})();


/* TEKTON: na telefonu se pri dnu zaslona pokaže vrstica z gumbom za prenos, ko drugega gumba ni videti. Med odsekoma s karticami se skrije, da jih ne pokrije. */
(function () {
  const vrstica = document.getElementById('tk-vrstica');

  if (!vrstica || !('IntersectionObserver' in window)) return;

  const gumbi = Array.from(document.querySelectorAll('main .tk-gumb-play'));
  const odseki = Array.from(document.querySelectorAll('.tk-koraki, .tk-zna'));
  const vidni = new Set();

  const opazovalec = new IntersectionObserver(function (vnosi) {
    vnosi.forEach(function (vnos) {
      if (vnos.isIntersecting) {
        vidni.add(vnos.target);
      } else {
        vidni.delete(vnos.target);
      }
    });

    vrstica.classList.toggle('tk-vidna', vidni.size === 0);
  });

  gumbi.concat(odseki).forEach(function (element) {
    opazovalec.observe(element);
  });
})();


/* TEKTON: gumb "Poglej, kako deluje" odpre video v oknu čez stran. */
(function () {
  const gumb = document.getElementById('odpri-video');
  const okno = document.getElementById('tk-video');

  if (!gumb || !okno || typeof okno.showModal !== 'function') return;

  const video = okno.querySelector('video');
  const zapri = okno.querySelector('.tk-video-zapri');

  gumb.addEventListener('click', function (e) {
    e.preventDefault();
    okno.showModal();
    video.play().catch(function () {});
  });

  zapri.addEventListener('click', function () {
    okno.close();
  });

  okno.addEventListener('click', function (e) {
    if (e.target === okno) okno.close();
  });

  okno.addEventListener('close', function () {
    video.pause();
    if (video.currentTime > 0) video.currentTime = 0;
  });
})();