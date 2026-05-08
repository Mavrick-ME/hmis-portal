/* =============================================
   TSNMC — Main JavaScript
   News Slider + Interactions
   ============================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ─── NEWS SLIDER ─── */
  const slides     = document.querySelectorAll('.news-slide');
  const dotsWrap   = document.getElementById('newsDots');
  const prevBtn    = document.getElementById('newsPrev');
  const nextBtn    = document.getElementById('newsNext');

  let current   = 0;
  let autoTimer = null;
  const INTERVAL = 5000; // 5 seconds

  // Build dots
  slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  function goTo(index) {
    slides[current].classList.remove('active');
    dotsWrap.children[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dotsWrap.children[current].classList.add('active');
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function startAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(next, INTERVAL);
  }

  function resetAuto() {
    clearInterval(autoTimer);
    startAuto();
  }

  prevBtn.addEventListener('click', () => { prev(); resetAuto(); });
  nextBtn.addEventListener('click', () => { next(); resetAuto(); });

  // Pause on hover
  const sliderWrapper = document.querySelector('.news-slider-wrapper');
  sliderWrapper.addEventListener('mouseenter', () => clearInterval(autoTimer));
  sliderWrapper.addEventListener('mouseleave', startAuto);

  startAuto();


  /* ─── NAVBAR ACTIVE STATE ─── */
  const navLinks = document.querySelectorAll('.nav-list > li > a');
  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });


  /* ─── SEAL FALLBACK ─── */
  // If seal image fails, show text fallback (already handled via onerror in HTML)


  /* ─── SMOOTH SCROLL for anchor links ─── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


  /* ─── STICKY NAV shadow on scroll ─── */
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      navbar.style.boxShadow = '0 4px 20px rgba(91,63,160,0.25)';
    } else {
      navbar.style.boxShadow = '';
    }
  });

});