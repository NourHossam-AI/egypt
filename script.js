// تأثير شاشة التحميل
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => loader.classList.add("hidden"), 700);
});

// حركات الظهور عند التمرير
const revealItems = document.querySelectorAll(".reveal-up");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);
revealItems.forEach((item) => observer.observe(item));

// تأثير بارالاكس للواجهة
const hero = document.querySelector(".hero");
const sun = document.querySelector(".sun");
const duneFront = document.querySelector(".dune-front");
window.addEventListener("scroll", () => {
  const y = window.scrollY;
  if (!hero) return;
  sun.style.transform = `translateX(50%) translateY(${y * 0.12}px)`;
  duneFront.style.transform = `translateY(${y * 0.08}px)`;
});

// عدادات قسم مصر الحديثة
const numbers = document.querySelectorAll(".num");
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.target);
      const duration = 1700;
      const startTime = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target).toLocaleString("ar-EG");
        if (progress < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
      statsObserver.unobserve(el);
    });
  },
  { threshold: 0.6 }
);
numbers.forEach((n) => statsObserver.observe(n));

// تأثير ميلان ثلاثي الأبعاد للبطاقات
const tiltCards = document.querySelectorAll(".tilt");
tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 14;
    const rotateX = ((y / rect.height) - 0.5) * -14;
    card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(700px) rotateX(0) rotateY(0) translateY(0)";
  });
});

// زر العودة للأعلى
const scrollTopBtn = document.getElementById("scrollTop");
window.addEventListener("scroll", () => {
  if (window.scrollY > 420) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// جسيمات متحركة في الخلفية
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d", { alpha: true });
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createParticles() {
  const count = Math.min(90, Math.floor(window.innerWidth / 16));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2.2 + 0.5,
    vx: (Math.random() - 0.5) * 0.25,
    vy: (Math.random() - 0.5) * 0.25,
    alpha: Math.random() * 0.7 + 0.2
  }));
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    ctx.beginPath();
    ctx.fillStyle = `rgba(255, 214, 140, ${p.alpha})`;
    ctx.shadowColor = "rgba(255, 205, 120, 0.35)";
    ctx.shadowBlur = 8;
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  });
  requestAnimationFrame(drawParticles);
}

resizeCanvas();
createParticles();
drawParticles();
window.addEventListener("resize", () => {
  resizeCanvas();
  createParticles();
});
