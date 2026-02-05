/* Floating hearts */
setInterval(() => {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerText = "💖";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = 4 + Math.random() * 3 + "s";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 7000);
}, 500);

/* Heart Clicker */
let score = 0;
const heartBtn = document.getElementById("heartBtn");
const scoreText = document.getElementById("score");

heartBtn.addEventListener("click", () => {
  score++;
  scoreText.innerText = score;
  heartBtn.style.transform = "scale(1.4)";
  setTimeout(() => heartBtn.style.transform = "scale(1)", 120);

  if (score === 100) {
    alert("💖 You clicked my heart enough times to steal it forever 💖");
  }
});

/* Love Quiz */
function checkAnswer() {
  const answer = document.getElementById("quizAnswer").value.toLowerCase();
  const correct = "23.02.2025"; // CHANGE THIS
  document.getElementById("quizResult").innerText =
    answer.includes(correct)
      ? "💘 Correct! You know us so well!"
      : "😝 Try again!";
}

/* Heart Sweeper */
const gridSize = 10;
const brokenHeartsCount = 20;
let heartGrid = [];
let gameOver = false;

function initHeartGame() {
  const game = document.getElementById("heartGame");
  const status = document.getElementById("heartGameStatus");

  game.innerHTML = "";
  status.innerText = "";
  heartGrid = [];
  gameOver = false;

  for (let i = 0; i < gridSize * gridSize; i++) {
    heartGrid.push({ broken: false, revealed: false });
  }

  let placed = 0;
  while (placed < brokenHeartsCount) {
    const index = Math.floor(Math.random() * heartGrid.length);
    if (!heartGrid[index].broken) {
      heartGrid[index].broken = true;
      placed++;
    }
  }

  heartGrid.forEach((cell, index) => {
    const div = document.createElement("div");
    div.className = "heart-cell";
    div.onclick = () => revealHeart(index, div);
    game.appendChild(div);
  });
}

function revealHeart(index, el) {
  if (gameOver || heartGrid[index].revealed) return;

  heartGrid[index].revealed = true;
  el.classList.add("revealed");

  if (heartGrid[index].broken) {
    el.innerText = "💔";
    document.getElementById("heartGameStatus").innerText =
      "💔 Oh no! You broke my heart!";
    revealAllBroken();
    gameOver = true;
  } else {
    el.innerText = "💗";
    checkWin();
  }
}

function revealAllBroken() {
  document.querySelectorAll(".heart-cell").forEach((cell, i) => {
    if (heartGrid[i].broken) {
      cell.innerText = "💔";
      cell.classList.add("revealed");
    }
  });
}

function checkWin() {
  const safe = heartGrid.filter(c => !c.broken);
  const revealed = safe.filter(c => c.revealed);
  if (safe.length === revealed.length) {
    document.getElementById("heartGameStatus").innerText =
      "💖 You found all my hearts! They’re yours forever 💖";
    gameOver = true;
  }
}

function resetHeartGame() {
  initHeartGame();
}

initHeartGame();
