// تأثير شاشة التحميل
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => loader.classList.add('hide'), 900);
});

// كشف العناصر عند التمرير
const revealItems = document.querySelectorAll('.reveal');
const counters = document.querySelectorAll('.counter');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    entry.target.classList.add('show');

    if (entry.target.classList.contains('counter') && !entry.target.dataset.counted) {
      animateCounter(entry.target);
      entry.target.dataset.counted = '1';
    }
  });
}, { threshold: 0.24 });

revealItems.forEach((item) => revealObserver.observe(item));
counters.forEach((counter) => revealObserver.observe(counter));

function animateCounter(element) {
  const target = Number(element.dataset.target || 0);
  const duration = 1700;
  const start = performance.now();

  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(target * eased);

    element.textContent = value.toLocaleString('ar-EG');
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

// حركة بارالاكس ناعمة للمشهد الرئيسي
const hero = document.querySelector('.hero');
const sunrise = document.querySelector('.sunrise');
const pyramids = document.querySelector('.pyramids');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  sunrise.style.transform = `translateX(50%) translateY(${scrollY * 0.12}px)`;
  pyramids.style.transform = `translateY(${scrollY * 0.09}px)`;
});

hero.addEventListener('mousemove', (event) => {
  const x = (event.clientX / window.innerWidth - 0.5) * 18;
  const y = (event.clientY / window.innerHeight - 0.5) * 12;
  hero.style.backgroundPosition = `${50 + x * 0.5}% ${50 + y * 0.45}%`;
});

// بطاقات ثلاثية الأبعاد عند المرور
const tiltCards = document.querySelectorAll('.tilt');

tiltCards.forEach((card) => {
  card.addEventListener('mousemove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateY = ((x / rect.width) - 0.5) * 11;
    const rotateX = ((y / rect.height) - 0.5) * -11;

    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translateY(0)';
  });
});

// جسيمات ذهبية متحركة في الخلفية
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
const particles = [];
let particleCount = 90;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  particleCount = window.innerWidth < 700 ? 45 : 90;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

for (let i = 0; i < particleCount; i += 1) {
  particles.push(createParticle());
}

function createParticle() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2.2 + 0.4,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    a: Math.random() * 0.6 + 0.2,
  };
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < -10 || p.x > canvas.width + 10 || p.y < -10 || p.y > canvas.height + 10) {
      Object.assign(p, createParticle());
    }

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(233, 191, 107, ${p.a})`;
    ctx.shadowBlur = 14;
    ctx.shadowColor = 'rgba(233,191,107,0.5)';
    ctx.fill();
  });

  requestAnimationFrame(drawParticles);
}

drawParticles();
