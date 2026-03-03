const revealElements = document.querySelectorAll('.reveal');
const counters = document.querySelectorAll('.counter');
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const closeLightbox = document.getElementById('closeLightbox');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');

      if (entry.target.classList.contains('counter') && !entry.target.dataset.done) {
        animateCounter(entry.target);
        entry.target.dataset.done = '1';
      }
    }
  });
}, { threshold: 0.2 });

revealElements.forEach((el) => observer.observe(el));
counters.forEach((counter) => observer.observe(counter));

function animateCounter(el) {
  const target = Number(el.dataset.target);
  let current = 0;
  const increment = Math.max(1, Math.ceil(target / 90));

  const ticker = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(ticker);
    }
    el.textContent = current.toLocaleString('ar-EG');
  }, 18);
}

galleryItems.forEach((img) => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('open');
  });
});

closeLightbox.addEventListener('click', () => lightbox.classList.remove('open'));
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) lightbox.classList.remove('open');
});

const quiz = [
  {
    q: 'ما النهر الذي قامت عليه الحضارة المصرية القديمة؟',
    options: ['نهر الفرات', 'نهر النيل', 'نهر دجلة'],
    answer: 1,
  },
  {
    q: 'من أشهر المعارك في عهد رمسيس الثاني؟',
    options: ['قادش', 'اليرموك', 'حطين'],
    answer: 0,
  },
  {
    q: 'أي كتابة استخدمها المصريون القدماء؟',
    options: ['المسمارية', 'اللاتينية', 'الهيروغليفية'],
    answer: 2,
  },
];

const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const nextBtn = document.getElementById('nextBtn');
const resultEl = document.getElementById('quizResult');

let currentQ = 0;
let score = 0;
let locked = false;

function renderQuestion() {
  locked = false;
  const item = quiz[currentQ];
  questionEl.textContent = `${currentQ + 1}) ${item.q}`;
  answersEl.innerHTML = '';
  item.options.forEach((option, index) => {
    const btn = document.createElement('button');
    btn.className = 'answer-btn';
    btn.textContent = option;
    btn.addEventListener('click', () => selectAnswer(btn, index));
    answersEl.appendChild(btn);
  });
}

function selectAnswer(button, index) {
  if (locked) return;
  locked = true;
  const correctIndex = quiz[currentQ].answer;

  [...answersEl.children].forEach((btn, i) => {
    if (i === correctIndex) btn.classList.add('correct');
  });

  if (index === correctIndex) {
    score += 1;
  } else {
    button.classList.add('wrong');
  }
}

nextBtn.addEventListener('click', () => {
  if (!locked) {
    resultEl.textContent = 'اختر إجابة أولًا ثم انتقل.';
    return;
  }

  currentQ += 1;
  if (currentQ >= quiz.length) {
    questionEl.textContent = 'انتهى الاختبار!';
    answersEl.innerHTML = '';
    resultEl.textContent = `نتيجتك: ${score} / ${quiz.length}`;
    nextBtn.disabled = true;
    nextBtn.style.opacity = '.6';
  } else {
    resultEl.textContent = '';
    renderQuestion();
  }
});

renderQuestion();
