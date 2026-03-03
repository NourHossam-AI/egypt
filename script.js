const reveals = document.querySelectorAll('.reveal');
const counters = document.querySelectorAll('[data-counter]');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  },
  { threshold: 0.15 }
);

reveals.forEach((item) => revealObserver.observe(item));

const counterObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const element = entry.target;
      const target = Number(element.dataset.counter);
      const duration = 1400;
      const start = performance.now();

      const update = (time) => {
        const progress = Math.min((time - start) / duration, 1);
        element.textContent = Math.floor(progress * target).toLocaleString('ar-EG');
        if (progress < 1) {
          requestAnimationFrame(update);
        }
      };

      requestAnimationFrame(update);
      observer.unobserve(element);
    });
  },
  { threshold: 0.5 }
);

counters.forEach((counter) => counterObserver.observe(counter));

const quizButtons = document.querySelectorAll('.quiz-options button');
const quizResult = document.getElementById('quiz-result');

quizButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const correct = button.dataset.answer === 'correct';
    quizResult.textContent = correct ? 'إجابة صحيحة! أحسنت 👏' : 'إجابة غير صحيحة، حاول مرة أخرى.';
    quizResult.style.color = correct ? '#17643a' : '#9f1c1c';
  });
});

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxClose = document.getElementById('lightbox-close');
const galleryImages = document.querySelectorAll('.gallery-item img');

galleryImages.forEach((image) => {
  image.addEventListener('click', () => {
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
  });
});

const closeLightbox = () => {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
};

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeLightbox();
});
