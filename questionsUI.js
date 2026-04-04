import { questions } from "./questions.js";

export function startQuestions(app, { next, agentName }) {

  app.innerHTML = `
    <div class="question-screen">
      <h2>Welcome ${agentName}</h2>

      <button id="start">BEGIN</button>
    </div>
  `;

  document.getElementById("start").onclick = () => {
    if (typeof next === "function") {
      next();
    }
  };
}

  function render() {

    const filtered = questions.filter(q => q.stage === stage);
    const q = filtered[index];

    if (!q) {
      if (typeof onComplete === "function") {
        onComplete();
      }
      return;
    }

    const isFinal =
      q.stage === "Security Clearance" && q.level === 3;

    app.innerHTML = `
      <div class="question-screen ${isFinal ? "final-question" : ""}">
        <h2>Welcome Agent ${agentName}</h2>
        <div class="level">${q.stage} - Level ${q.level}</div>

        ${isFinal ? `<div class="warning">⚠ FINAL CLEARANCE REQUIRED</div>` : ""}

        <div class="question-text">${q.q}</div>

        ${
          isFinal
            ? `
              <div class="terminal-line">DECRYPTING MESSAGE...</div>

              <div id="answerBox" class="answer-box">
                ${q.answerMask}
              </div>

              <div class="status-line" id="status">SIGNAL LOCKED</div>

              <div class="keyboard" id="keyboard"></div>

              <div class="keyboard-controls">
                <button id="reset">RESET</button>
                <button id="clear">CLEAR</button>
                <button id="submit">SUBMIT</button>
                <button id="skip">DEV SKIP</button>
              </div>
            `
            : `
              <div class="options">
                ${q.options
                  .map(o => `<button class="option-btn">${o}</button>`)
                  .join("")}
              </div>
            `
        }
      </div>
    `;

    /* =========================
       NORMAL MODE
    ========================= */
    if (!isFinal) {

      document.querySelectorAll(".option-btn").forEach(btn => {
        btn.onclick = () => {
          if (normalize(btn.innerText) === normalize(q.answer)) {
            next();
          } else {
            btn.style.background = "red";
          }
        };
      });

      return;
    }

    /* =========================
       FINAL MODE
    ========================= */

    const answer = normalize(q.answer);
    let displayed = q.answerMask;

    const answerBox = document.getElementById("answerBox");
    const keyboard = document.getElementById("keyboard");

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    keyboard.innerHTML = letters
      .map(l => `<button class="key">${l}</button>`)
      .join("");

    function renderText() {
      answerBox.innerText = displayed;
    }

    renderText();

    document.querySelectorAll(".key").forEach(btn => {
      btn.onclick = () => {

        const letter = btn.innerText.toLowerCase();

        let updated = "";

        for (let i = 0; i < displayed.length; i++) {
          const correctChar = answer[i] || "";

          if (correctChar === letter) {
            updated += letter;
          } else {
            updated += displayed[i];
          }
        }

        displayed = updated;
        renderText();

        btn.disabled = true;
        btn.classList.add("used");
      };
    });

    function reset() {
      displayed = q.answerMask;
      renderText();

      document.querySelectorAll(".key").forEach(b => {
        b.disabled = false;
        b.classList.remove("used");
      });
    }

    document.getElementById("reset").onclick = reset;
    document.getElementById("clear").onclick = reset;

    document.getElementById("submit").onclick = () => {

      if (DEV_MODE) {
        next();
        return;
      }

      if (normalize(displayed) === answer) {
        answerBox.classList.add("glitch");
        setTimeout(() => next(), 900);
      } else {
        alert("Access Denied");
      }
    };

    document.getElementById("skip").onclick = () => next();

    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.key === "Enter") {
        next();
      }
    });
  }

  /* =========================
     NEXT QUESTION LOGIC
  ========================= */
  function next() {

    index++;

    const filtered = questions.filter(q => q.stage === stage);

    if (index >= filtered.length) {

      if (stage === "Identity Authentication") {
        stage = "Security Clearance";
        index = 0;
      } else {
        if (typeof onComplete === "function") {
          onComplete();
        }
        return;
      }
    }

    render();
  }

  render();
}
