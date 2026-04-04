 import { questions } from "./questions.js";

export function startQuestions(app, onComplete, agentName){

  let index = 0;
  let stage = "Identity Authentication";

  // =========================
  // DEV MODE SWITCH
  // =========================
  const DEV_MODE = true;

  const normalize = str =>
    (str || "").toLowerCase().replace(/[^a-z0-9]/g, "");

  function getAgent(){
    const params = new URLSearchParams(window.location.search);
    return params.get("agent") || "Agent";
  }

  function render(){

    const filtered = questions.filter(q => q.stage === stage);
    const q = filtered[index];

    if (!q){
      onComplete();
      return;
    }

    const isFinal =
      q.stage === "Security Clearance" && q.level === 3;

    const agent = getAgent();

    app.innerHTML = `
      <div class="question-screen ${isFinal ? "final-question" : ""}">
        <h2>Welcome Agent ${agent}</h2>
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
                ${q.options.map(o =>
                  `<button class="option-btn">${o}</button>`
                ).join("")}
              </div>
            `
        }
      </div>
    `;

    // =========================
    // NORMAL MODE
    // =========================
    if (!isFinal){

      document.querySelectorAll(".option-btn").forEach(btn => {
        btn.onclick = () => {

          if (normalize(btn.innerText) === normalize(q.answer)){
            next();
          } else {
            btn.style.background = "red";
          }
        };
      });

      return;
    }

    // =========================
    // FINAL MODE (KEYBOARD)
    // =========================

    const answer = normalize(q.answer);
    let displayed = q.answerMask;

    const answerBox = document.getElementById("answerBox");
    const keyboard = document.getElementById("keyboard");

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    keyboard.innerHTML = letters
      .map(l => `<button class="key">${l}</button>`)
      .join("");

    function renderText(){
      answerBox.innerText = displayed;
    }

    renderText();

    // LETTER INPUT
    document.querySelectorAll(".key").forEach(btn => {
      btn.onclick = () => {

        const letter = btn.innerText.toLowerCase();

        let updated = "";

        for (let i = 0; i < displayed.length; i++){
          const correctChar = answer[i] || "";

          if (correctChar === letter){
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

    function reset(){
      displayed = q.answerMask;
      renderText();
      document.querySelectorAll(".key").forEach(b => {
        b.disabled = false;
        b.classList.remove("used");
      });
    }

    document.getElementById("reset").onclick = reset;
    document.getElementById("clear").onclick = reset;

    // =========================
    // SUBMIT
    // =========================
    document.getElementById("submit").onclick = () => {

      if (DEV_MODE){
        next();
        return;
      }

      if (normalize(displayed) === answer){
        answerBox.classList.add("glitch");
        setTimeout(() => next(), 900);
      } else {
        alert("Access Denied");
      }
    };

    // =========================
    // DEV SKIP BUTTON
    // =========================
    document.getElementById("skip").onclick = () => {
      next();
    };

    // =========================
    // KEYBOARD SHORTCUT (CTRL + ENTER)
    // =========================
    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.key === "Enter"){
        next();
      }
    });
  }

  // =========================
  // NEXT QUESTION LOGIC
  // =========================
  function next(){

    index++;

    const filtered = questions.filter(q => q.stage === stage);

    if (index >= filtered.length){

      if (stage === "Identity Authentication"){
        stage = "Security Clearance";
        index = 0;
      } else {
        onComplete();
        return;
      }
    }

    render();
  }

  render();
}
