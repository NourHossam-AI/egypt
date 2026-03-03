// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  },
  { threshold: 0.15 }
);
reveals.forEach((el) => observer.observe(el));

// Animated counters
const counters = document.querySelectorAll('.counter');
const animateCounter = (counter) => {
  const target = Number(counter.dataset.target);
  const speed = 45;
  let current = 0;

  const update = () => {
    const increment = Math.max(1, Math.ceil((target - current) / speed));
    current += increment;
    if (current >= target) {
      current = target;
      counter.textContent = `${current}+`;
      return;
    }
    counter.textContent = `${current}+`;
    requestAnimationFrame(update);
  };

  update();
};

const counterObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.45 }
);
counters.forEach((counter) => counterObserver.observe(counter));

// Lightbox
const galleryImages = document.querySelectorAll('.gallery-item img');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const closeLightbox = document.getElementById('close-lightbox');

galleryImages.forEach((img) => {
  img.addEventListener('click', () => {
    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;
    lightbox.classList.add('show');
    lightbox.setAttribute('aria-hidden', 'false');
  });
});

const closeBox = () => {
  lightbox.classList.remove('show');
  lightbox.setAttribute('aria-hidden', 'true');
};

closeLightbox.addEventListener('click', closeBox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeBox();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeBox();
});

// Quiz
const questions = [
  {
    question: 'أي نهر كان أساس قيام الحضارة المصرية القديمة؟',
    answers: ['نهر دجلة', 'نهر النيل', 'نهر الفرات'],
    correct: 1,
  },
  {
    question: 'من صاحب الهرم الأكبر في الجيزة؟',
    answers: ['خوفو', 'رمسيس الثاني', 'توت عنخ آمون'],
    correct: 0,
  },
  {
    question: 'أي معركة ارتبطت باسم رمسيس الثاني؟',
    answers: ['قادش', 'حطين', 'عين جالوت'],
    correct: 0,
  },
];

let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById('question');
const answersContainer = document.getElementById('answers');
const resultElement = document.getElementById('quiz-result');
const nextButton = document.getElementById('next-btn');

function renderQuestion() {
  const q = questions[currentQuestion];
  questionElement.textContent = q.question;
  answersContainer.innerHTML = '';
  resultElement.textContent = `السؤال ${currentQuestion + 1} من ${questions.length}`;

  q.answers.forEach((answer, index) => {
    const button = document.createElement('button');
    button.className = 'answer-btn';
    button.textContent = answer;
    button.addEventListener('click', () => checkAnswer(index, button));
    answersContainer.appendChild(button);
  });
}

function checkAnswer(selectedIndex, clickedButton) {
  const q = questions[currentQuestion];
  const answerButtons = answersContainer.querySelectorAll('.answer-btn');

  answerButtons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === q.correct) btn.classList.add('correct');
  });

  if (selectedIndex !== q.correct) {
    clickedButton.classList.add('wrong');
    resultElement.textContent = 'إجابة غير صحيحة، حاول في السؤال التالي.';
  } else {
    score += 1;
    resultElement.textContent = 'إجابة ممتازة!';
  }
}

nextButton.addEventListener('click', () => {
  if (currentQuestion < questions.length - 1) {
    currentQuestion += 1;
    renderQuestion();
    return;
  }

  questionElement.textContent = 'انتهى الاختبار!';
  answersContainer.innerHTML = '';
  resultElement.textContent = `نتيجتك: ${score} / ${questions.length}`;
  nextButton.style.display = 'none';
});

renderQuestion();
