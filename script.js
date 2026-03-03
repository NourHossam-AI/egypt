const reveals = document.querySelectorAll('.reveal');
const counters = document.querySelectorAll('.counter');
const galleryItems = document.querySelectorAll('.gallery-item img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeLightbox = document.getElementById('close-lightbox');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  },
  { threshold: 0.16 }
);

reveals.forEach((el) => revealObserver.observe(el));

const counterObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const element = entry.target;
      const target = Number(element.dataset.target);
      let current = 0;
      const step = Math.ceil(target / 80);

      const interval = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(interval);
        }
        element.textContent = current.toLocaleString('ar-EG');
      }, 20);

      observer.unobserve(element);
    });
  },
  { threshold: 0.5 }
);

counters.forEach((counter) => counterObserver.observe(counter));

galleryItems.forEach((img) => {
  img.addEventListener('click', () => {
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
  });
});

const closeModal = () => {
  lightbox.classList.remove('active');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImg.src = '';
};

closeLightbox.addEventListener('click', closeModal);
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) closeModal();
});

const quizData = [
  {
    question: 'ما النهر الذي قامت عليه الحضارة المصرية القديمة؟',
    options: ['نهر دجلة', 'نهر النيل', 'نهر الفرات'],
    answer: 1,
  },
  {
    question: 'من هو الملك المرتبط بالهرم الأكبر؟',
    options: ['خوفو', 'تحتمس الثالث', 'سنفرو'],
    answer: 0,
  },
  {
    question: 'أي معركة ارتبطت برمسيس الثاني؟',
    options: ['معركة قادش', 'معركة اليرموك', 'معركة مجدو الحديثة'],
    answer: 0,
  },
];

const quizQuestion = document.getElementById('quiz-question');
const quizOptions = document.getElementById('quiz-options');
const quizFeedback = document.getElementById('quiz-feedback');
const nextQuestionBtn = document.getElementById('next-question');

let currentQuestion = 0;

function renderQuestion() {
  const item = quizData[currentQuestion];
  quizQuestion.textContent = item.question;
  quizOptions.innerHTML = '';
  quizFeedback.textContent = '';

  item.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.className = 'quiz-option';
    button.type = 'button';
    button.textContent = option;
    button.addEventListener('click', () => {
      if (index === item.answer) {
        quizFeedback.textContent = '✅ إجابة صحيحة! رائع.';
        quizFeedback.style.color = '#1d7e43';
      } else {
        quizFeedback.textContent = '❌ إجابة غير صحيحة. حاول مرة أخرى.';
        quizFeedback.style.color = '#b32424';
      }
    });
    quizOptions.appendChild(button);
  });
}

nextQuestionBtn.addEventListener('click', () => {
  currentQuestion = (currentQuestion + 1) % quizData.length;
  renderQuestion();
});

renderQuestion();
