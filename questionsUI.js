import { questions } from "./questions.js";

export function startQuestions(app, onComplete, agentName){

  let index = 0;
  let stage = "Identity Authentication";

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
              <div id="answerBox" class="answer-box">
                ${q.answerMask}
              </div>

              <div class="keyboard" id="keyboard"></div>

              <div class="keyboard-controls">
                <button id="reset">RESET</button>
                <button id="clear">CLEAR</button>
                <button id="submit">SUBMIT</button>
              </div>
            `
            : `
              <input id="input" placeholder="Type answer..." />
              <button id="submit">Submit</button>
            `
        }
      </div>
    `;

    // =========================
    // NORMAL QUESTIONS
    // =========================
    if (!isFinal){

      const input = document.getElementById("input");

      document.getElementById("submit").onclick = () => {
        const val = normalize(input.value);
        const correct = normalize(q.answer);

        if (val === correct) next();
        else alert("Access Denied");
      };

      input.addEventListener("keypress", e => {
        if (e.key === "Enter") {
          document.getElementById("submit").click();
        }
      });

      return;
    }

    // =========================
    // FINAL MODE (SECURITY CLEARANCE)
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
      };
    });

    function reset(){
      displayed = q.answerMask;
      renderText();
      document.querySelectorAll(".key").forEach(b => b.disabled = false);
    }

    document.getElementById("reset").onclick = reset;
    document.getElementById("clear").onclick = reset;

    document.getElementById("submit").onclick = () => {

      if (normalize(displayed) === answer){

        answerBox.classList.add("glitch");

        document.querySelectorAll(".key")
          .forEach(b => b.disabled = true);

        setTimeout(() => {
          next(); // 🔥 PROCEED TO NEXT SCREEN
        }, 900);

      } else {
        alert("Access Denied");
      }
    };
  }

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
