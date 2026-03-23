export function startQuestions(app, onComplete) {

  const answer = "FOREVER";
  const revealed = ["F", "R"];
  let guessed = [...revealed];
  let attempts = 6;

  app.innerHTML = `
    <div class="question-screen">
      <div class="level">🔐 SECURITY CLEARANCE</div>
      <div class="question-text">
        Loyalty makes a family, and family is ____.
      </div>

      <div id="word" class="word"></div>

      <div id="letters" class="letters"></div>

      <div id="status" class="feedback"></div>
    </div>
  `;

  const wordEl = document.getElementById("word");
  const lettersEl = document.getElementById("letters");
  const statusEl = document.getElementById("status");

  function renderWord() {
    wordEl.innerHTML = answer
      .split("")
      .map(letter => (
        guessed.includes(letter)
          ? `<span class="letter">${letter}</span>`
          : `<span class="letter blank">_</span>`
      ))
      .join("");
  }

  function checkWin() {
    const isComplete = answer
      .split("")
      .every(letter => guessed.includes(letter));

    if (isComplete) {
      statusEl.innerText = "✅ ACCESS GRANTED";
      setTimeout(onComplete, 1000);
    }
  }

  function checkLose() {
    if (attempts <= 0) {
      statusEl.innerText = "❌ ACCESS DENIED";
    }
  }

  function renderLetters() {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    lettersEl.innerHTML = alphabet.map(letter => `
      <button class="letter-btn" data-letter="${letter}">
        ${letter}
      </button>
    `).join("");

    document.querySelectorAll(".letter-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const letter = btn.dataset.letter;

        btn.disabled = true;

        if (answer.includes(letter)) {
          guessed.push(letter);
          renderWord();
          checkWin();
        } else {
          attempts--;
          statusEl.innerText = `Attempts left: ${attempts}`;
          checkLose();
        }
      });
    });
  }

  renderWord();
  renderLetters();
}
