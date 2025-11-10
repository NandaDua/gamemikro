const cards = document.querySelectorAll('.card');
const groupModal = document.getElementById('groupModal');
const questionModal = document.getElementById('questionModal');
const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('options');
const notification = document.getElementById('notification');
const scoreboard = document.getElementById('scoreboard');

let currentCard = null;
let currentGroup = null;
let answeredCards = 0;

let score = { 1: 0, 2: 0 };

const questions = [
  { question: "Apa tujuan utama dari UX Design?", options: ["Tampilan indah", "Pengalaman pengguna optimal", "Menambah animasi", "Menulis kode"], correct: 1 },
  { question: "CX berfokus pada...", options: ["Interaksi pengguna dengan brand", "Desain warna", "Backend", "Ukuran tombol"], correct: 0 },
  { question: "Wireframe berguna untuk...", options: ["Menentukan struktur halaman", "Menentukan logo", "Menambah efek", "Menulis API"], correct: 0 },
  { question: "Empathy dalam UX artinya...", options: ["Memahami pengguna", "Memahami server", "Memilih font", "Menambah fitur"], correct: 0 },
  { question: "UX yang baik adalah...", options: ["Navigasi mudah", "Desain rumit", "Banyak warna", "Loading lama"], correct: 0 },
  { question: "CX yang buruk menyebabkan...", options: ["Kehilangan pelanggan", "Loyalitas naik", "Feedback positif", "Retensi tinggi"], correct: 0 }
];

cards.forEach(card => {
  card.addEventListener('click', () => {
    currentCard = card;
    groupModal.classList.add('show');
  });
});

document.querySelectorAll('.group-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    currentGroup = btn.dataset.group;
    groupModal.classList.remove('show');
    showQuestion(currentCard.dataset.question);
  });
});

function showQuestion(index) {
  const q = questions[index];
  questionText.textContent = q.question;
  optionsContainer.innerHTML = "";
  const wrongHues = [];
  while (wrongHues.length < q.options.length - 1) {
    let hue;
    do {
      hue = Math.floor(Math.random() * 240) + 60; // 60 to 300 degrees
    } while (wrongHues.includes(hue));
    wrongHues.push(hue);
  }
  let wrongIndex = 0;
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    if (i === q.correct) {
      btn.style.backgroundColor = 'hotpink';
      btn.style.color = 'black';
    } else {
      const hue = wrongHues[wrongIndex++];
      btn.style.backgroundColor = `hsl(${hue}, 40%, 50%)`;
      btn.style.color = 'white';
    }
    btn.onclick = () => handleAnswer(i === q.correct);
    optionsContainer.appendChild(btn);
  });
  questionModal.classList.add('show');
}

function handleAnswer(correct) {
  questionModal.classList.remove('show');
  currentCard.classList.add('disabled');
  answeredCards++;

  if (correct) score[currentGroup]++;

  showNotification(correct);

  if (answeredCards === cards.length) {
    showScoreboard();
  }
}

function showNotification(correct) {
  notification.textContent = correct ? "✅ Benar! Hebat Kelompok " + currentGroup + "!" : "❌ Salah, coba lagi!";
  notification.style.borderColor = correct ? "#0f0" : "#f0f";
  notification.style.color = correct ? "#0f0" : "#f0f";
  notification.classList.add('show');
  shakeScreen();
  setTimeout(() => notification.classList.remove('show'), 1500);
}

function showScoreboard() {
  scoreboard.innerHTML = `
    <div>🏁 HASIL AKHIR 🏁</div>
    <br>
    <div>Kelompok 1: ${score[1]} Jawaban Benar</div>
    <div>Kelompok 2: ${score[2]} Jawaban Benar</div>
  `;
  scoreboard.classList.add('show');
}

function shakeScreen() {
  document.body.style.animation = 'shake 0.3s';
  setTimeout(() => (document.body.style.animation = ''), 300);
}
