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
      app.innerHTML = `
        <div class="question-screen ${isFinal ? "final-question" : ""}">
          <h2>Welcome Agent ${agent}</h2>
          <div class="level">${q.stage} - Level ${q.level}</div>

          ${isFinal ? `<div class="warning">⚠ FINAL CLEARANCE REQUIRED</div>` : ""}

          <div class="question-text">${q.q}</div>
          <input id="input" placeholder="Type answer..." />
          <button id="submit">Submit</button>
        </div>
      `;

      const inputEl = document.getElementById("input");
      const submitBtn = document.getElementById("submit");

      function handleSubmit(){
        const val = inputEl.value.toLowerCase().trim();

        const user = normalize(val);
        const correct = normalize(q.answer);

        const similarity = user.length / correct.length;

        if (user === correct || (user.includes(correct) && similarity > 0.9)){
          next();
        } else {
          alert("Access Denied");
        }
      }

      submitBtn.onclick = handleSubmit;

      // ✅ ENTER KEY SUPPORT
      inputEl.addEventListener("keypress", (e) => {
        if (e.key === "Enter"){
          handleSubmit();
        }
      });

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
