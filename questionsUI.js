export function startQuestions(app, onComplete) {

  const answer = "FOREVER";
  const revealed = ["F", "R"];
  let guessed = [...revealed];
  let attempts = 6;

  app.innerHTML = `
    <div class="terminal">
      <div class="terminal-header">MI6 SECURE SYSTEM</div>

      <div class="terminal-body">
        <div class="prompt">> Initiating Level 5 Clearance...</div>
        <div class="prompt">> Decryption Required</div>

        <div class="question-text">
          Loyalty makes a family, and family is ____.
        </div>

        <div id="word" class="word"></div>

        <div id="letters" class="letters"></div>

        <div id="status" class="status"></div>
      </div>
    </div>
  `;

  const wordEl = document.getElementById("word");
  const lettersEl = document.getElementById("letters");
  const statusEl = document.getElementById("status");

  // 🔊 Sounds
  const typeSound = new Audio("https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3");
  const correctSound = new Audio("https://assets.mixkit.co/active_storage/sfx/270/270-preview.mp3");
  const wrongSound = new Audio("https://assets.mixkit.co/active_storage/sfx/171/171-preview.mp3");

  function renderWord() {
    wordEl.innerHTML = answer
      .split("")
      .map(letter => (
        guessed.includes(letter)
          ? `<span class="letter reveal">${letter}</span>`
          : `<span class="letter blank">_</span>`
      ))
      .join("");
  }

  function checkWin() {
    const isComplete = answer
      .split("")
      .every(letter => guessed.includes(letter));

    if (isComplete) {
      statusEl.innerHTML = `<span class="granted">ACCESS GRANTED</span>`;
      
      document.body.classList.add("glitch");

      setTimeout(() => {
        onComplete();
      }, 1200);
    }
  }

  function checkLose() {
    if (attempts <= 0) {
      statusEl.innerHTML = `<span class="denied">ACCESS DENIED</span>`;
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
        typeSound.currentTime = 0;
        typeSound.play().catch(()=>{});

        if (answer.includes(letter)) {
          guessed.push(letter);
          correctSound.play().catch(()=>{});
          renderWord();
          checkWin();
        } else {
          attempts--;
          wrongSound.play().catch(()=>{});
          statusEl.innerText = `Attempts remaining: ${attempts}`;

          // ⚠️ screen flicker
          document.body.classList.add("flicker");
          setTimeout(() => {
            document.body.classList.remove("flicker");
          }, 150);

          checkLose();
        }
      });
    });
  }

  renderWord();
  renderLetters();
}
