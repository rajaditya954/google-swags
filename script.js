/* ===== LOADER ===== */
window.addEventListener('load', () => {
  setTimeout(() => document.querySelector('.loader-wrap').classList.add('hidden'), 1200);
});

/* ===== PARTICLES ===== */
(function initParticles() {
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let w, h, dots = [];
  const COLORS = ['#4285F4', '#EA4335', '#FBBC05', '#34A853'];

  function resize() { w = canvas.width = innerWidth; h = canvas.height = innerHeight; }
  resize(); window.addEventListener('resize', resize);

  for (let i = 0; i < 60; i++) {
    dots.push({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 2 + 0.5, vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4, c: COLORS[i % 4] });
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    dots.forEach(d => {
      d.x += d.vx; d.y += d.vy;
      if (d.x < 0) d.x = w; if (d.x > w) d.x = 0;
      if (d.y < 0) d.y = h; if (d.y > h) d.y = 0;
      ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = d.c; ctx.globalAlpha = 0.25; ctx.fill();
    });
    // draw lines between nearby dots
    for (let i = 0; i < dots.length; i++) {
      for (let j = i + 1; j < dots.length; j++) {
        const dx = dots[i].x - dots[j].x, dy = dots[i].y - dots[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          ctx.beginPath(); ctx.moveTo(dots[i].x, dots[i].y); ctx.lineTo(dots[j].x, dots[j].y);
          ctx.strokeStyle = dots[i].c; ctx.globalAlpha = 0.06 * (1 - dist / 140); ctx.lineWidth = 0.8; ctx.stroke();
        }
      }
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ===== NAVBAR HIDE ON SCROLL ===== */
(function () {
  let last = 0;
  const nav = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    const cur = window.scrollY;
    nav.classList.toggle('hide', cur > last && cur > 80);
    last = cur;
  });
})();

/* ===== SCROLL REVEAL ===== */
(function () {
  const els = document.querySelectorAll('.reveal, .step-card, .test-card');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 100);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  els.forEach(el => obs.observe(el));
})();

/* ===== PROGRESS BAR ===== */
(function () {
  const fill = document.querySelector('.progress-fill');
  if (!fill) return;
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { fill.style.width = '100%'; obs.unobserve(fill); }
  }, { threshold: 0.3 });
  obs.observe(fill);
})();

/* ===== COUNTER ANIMATION ===== */
(function () {
  const counters = document.querySelectorAll('[data-count]');
  counters.forEach(el => {
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        const target = +el.dataset.count;
        let cur = 0;
        const step = Math.ceil(target / 60);
        const timer = setInterval(() => {
          cur += step;
          if (cur >= target) { cur = target; clearInterval(timer); }
          el.textContent = cur.toLocaleString() + '+';
        }, 25);
        obs.unobserve(el);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
  });
})();

/* ===== FAQ ACCORDION ===== */
document.querySelectorAll('.faq-q').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.parentElement;
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});

/* ===== SMOOTH ANCHOR SCROLL ===== */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ===== LIVE COUNTER TICKER ===== */
(function () {
  const el = document.getElementById('live-count');
  if (!el) return;
  let count = 12847;
  setInterval(() => {
    count += Math.floor(Math.random() * 3) + 1;
    el.textContent = count.toLocaleString() + '+';
  }, 4000);
})();
