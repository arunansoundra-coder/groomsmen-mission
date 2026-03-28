import { questions } from "./questions.js";

export function startQuestions(app, onComplete, agentName){

  let index = 0;
  let stage = "Identity Authentication";

  const normalize = str => str.replace(/[^a-z0-9]/g, "");

  function render(){

    const filteredQuestions = questions.filter(q => q.stage === stage);
    const q = filteredQuestions[index];

    if (!q){
      onComplete();
      return;
    }

    const agent = getAgent();
    const isFinal = (q.stage === "Security Clearance" && q.level === 3);

    // =========================
    // TEXT QUESTION
    // =========================
    if (q.type === "text"){

      app.innerHTML = `
        <div class="question-screen ${isFinal ? "final-question" : ""}">
          <h2>Welcome Agent ${agent}</h2>
          <div class="level">${q.stage} - Level ${q.level}</div>

          ${isFinal ? `<div class="warning">⚠ FINAL CLEARANCE REQUIRED</div>` : ""}

          <div class="question-text">${q.q}</div>

          ${isFinal ? `
            <div id="answerBox" class="answer-box"></div>

            <div class="keyboard" id="keyboard"></div>

            <div class="keyboard-controls">
              <button id="backspace">⌫</button>
              <button id="clear">Clear</button>
              <button id="submit">Submit</button>
            </div>
          ` : `
            <input id="input" placeholder="Type answer..." />
            <button id="submit">Submit</button>
          `}
        </div>
      `;

      function handleSubmit(value){
        const user = normalize(value.toLowerCase().trim());
        const correct = normalize(q.answer);

        if (user === correct || user.includes(correct)){
          next();
        } else {
          alert("Access Denied");
        }
      }

      // =========================
      // FINAL MODE (KEYBOARD)
      // =========================
     // =========================
// FINAL MODE (KEYBOARD FIXED)
// =========================
// =========================
// FINAL MODE (GLOBAL REVEAL)
// =========================
if (isFinal){

  const answer = normalize(q.answer);
  let current = Array(answer.length).fill("_");

  const answerBox = document.getElementById("answerBox");
  const keyboard = document.getElementById("keyboard");

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  keyboard.innerHTML = letters.map(l =>
    `<button class="key">${l}</button>`
  ).join("");

  function renderAnswer(){
    answerBox.innerText = current.join(" ");
  }

  renderAnswer();

  document.querySelectorAll(".key").forEach(btn => {
    btn.onclick = () => {

      const letter = btn.innerText.toLowerCase();

      let found = false;

      // 🔥 reveal ALL matching letters
      for (let i = 0; i < answer.length; i++){
        if (answer[i] === letter){
          current[i] = letter;
          found = true;
        }
      }

      renderAnswer();

      // disable key after use
      btn.disabled = true;

      // optional feedback
      if (!found){
        btn.style.background = "red";
        setTimeout(() => btn.style.background = "", 300);
      }
    };
  });

  document.getElementById("backspace").onclick = () => {
    current = Array(answer.length).fill("_");
    document.querySelectorAll(".key").forEach(b => b.disabled = false);
    renderAnswer();
  };

  document.getElementById("clear").onclick = () => {
    current = Array(answer.length).fill("_");
    document.querySelectorAll(".key").forEach(b => b.disabled = false);
    renderAnswer();
  };

  document.getElementById("submit").onclick = () => {
    const final = current.join("");

    if (normalize(final) === answer){
      next();
    } else {
      alert("Access Denied");
    }
  };

}

      // =========================
      // NORMAL MODE
      // =========================
      const inputEl = document.getElementById("input");
      const submitBtn = document.getElementById("submit");

      submitBtn.onclick = () => handleSubmit(inputEl.value);

      inputEl.addEventListener("keypress", (e) => {
        if (e.key === "Enter"){
          handleSubmit(inputEl.value);
        }
      });

      return;
    }

    // =========================
    // MULTIPLE CHOICE (FIXED LOCATION)
    // =========================
    app.innerHTML = `
      <div class="question-screen">
        <h2>Welcome Agent ${agent}</h2>
        <div class="level">${q.stage} - Level ${q.level}</div>
        <div class="question-text">${q.q}</div>
        ${q.options.map(o => `<button class="option-btn">${o}</button>`).join("")}
      </div>
    `;

    document.querySelectorAll(".option-btn").forEach(btn=>{
      btn.onclick = () => {
        if (btn.innerText === q.answer){
          next();
        } else {
          btn.style.background = "red";
        }
      };
    });
  }

  function next(){
    index++;

    const filteredQuestions = questions.filter(q => q.stage === stage);

    if (index >= filteredQuestions.length){
      if (stage === "Identity Authentication"){
        changeStage("Security Clearance");
      } else {
        onComplete();
      }
      return;
    }

    render();
  }

  function changeStage(newStage){
    stage = newStage;
    index = 0;

    const agent = getAgent();

    app.innerHTML = `
      <div class="question-screen">
        <h2>Access Granted</h2>
        <p>${stage} complete</p>
        <p>Welcome Agent ${agent}</p>
      </div>
    `;

    setTimeout(() => render(), 1500);
  }

  function getAgent(){
    const params = new URLSearchParams(window.location.search);
    return params.get("agent") || "Agent";
  }

  render();
}
