import { questions } from "./questions.js";

export function startQuestions(app, onComplete, agentName){

  let index = 0;
  let stage = "Identity Authentication";

  // ✅ Helper (DEFINED ONCE — FIXES YOUR ERROR)
  const normalize = str => str.replace(/[^a-z0-9]/g, "");

  function render(){

    const filteredQuestions = questions.filter(q => q.stage === stage);
    const q = filteredQuestions[index];

    // ✅ END
    if (!q){
      onComplete();
      return;
    }

    const agent = getAgent();

    // ✅ Detect final question
    const isFinal = (q.stage === "Security Clearance" && q.level === 3);

    // 🧠 TEXT INPUT
   if (q.type === "text"){

  const isFinal = (q.stage === "Security Clearance" && q.level === 3);

  app.innerHTML = `
    <div class="question-screen ${isFinal ? "final-question" : ""}">
      <h2>Welcome Agent ${agent}</h2>
      <div class="level">${q.stage} - Level ${q.level}</div>

      ${isFinal ? `<div class="warning">⚠ FINAL CLEARANCE KEYBOARD REQUIRED</div>` : ""}

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

  const normalize = str => str.replace(/[^a-z0-9]/g, "");

  function handleSubmit(value){
    const val = value.toLowerCase().trim();

    const user = normalize(val);
    const correct = normalize(q.answer);

    const similarity = user.length / correct.length;

    if (user === correct || (user.includes(correct) && similarity > 0.9)){
      next();
    } else {
      alert("Access Denied");
    }
  }

  // =========================
  // FINAL MODE (KEYBOARD)
  // =========================
  if (isFinal){

    let current = "";

    const answerBox = document.getElementById("answerBox");
    const keyboard = document.getElementById("keyboard");

    // build A-Z keyboard
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    keyboard.innerHTML = letters.map(l =>
      `<button class="key">${l}</button>`
    ).join("");

    function renderAnswer(){
      answerBox.innerText = current;
    }

    document.querySelectorAll(".key").forEach(btn=>{
      btn.onclick = () => {
        current += btn.innerText.toLowerCase();
        renderAnswer();
      };
    });

    document.getElementById("backspace").onclick = () => {
      current = current.slice(0, -1);
      renderAnswer();
    };

    document.getElementById("clear").onclick = () => {
      current = "";
      renderAnswer();
    };

    document.getElementById("submit").onclick = () => {
      handleSubmit(current);
    };

  }

  // =========================
  // NORMAL MODE
  // =========================
  else {
    const inputEl = document.getElementById("input");
    const submitBtn = document.getElementById("submit");

    function handleNormal(){
      handleSubmit(inputEl.value);
    }

    submitBtn.onclick = handleNormal;

    inputEl.addEventListener("keypress", (e) => {
      if (e.key === "Enter"){
        handleNormal();
      }
    });
  }

  return;
}

    // 🧠 MULTIPLE CHOICE
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

    // ✅ Move to next stage
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

    setTimeout(() => {
      render();
    }, 1500);
  }

  function getAgent(){
    const params = new URLSearchParams(window.location.search);
    return params.get("agent") || "Agent";
  }

  render();
}
