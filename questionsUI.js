import { questions } from './questions.js';

let currentQ = 0;

export function startQuestions(app, onComplete){

  currentQ = 0;

  function render(){
    const q = questions[currentQ];

    if (!q) {
      app.innerHTML = "<p>No question found</p>";
      return;
    }

    app.innerHTML = `
      <div class="question-screen">
        <h2 class="level">MISSION LEVEL ${currentQ+1}</h2>
        <p class="question-text">${q.q}</p>
        <div id="options" class="options"></div>
        <div id="feedback" class="feedback"></div>
      </div>
    `;

    const optionsDiv = document.getElementById("options");
    if (!optionsDiv) return;

    q.options.forEach(option => {
      const btn = document.createElement("button");
      btn.innerText = option;
      btn.classList.add("option-btn");

      btn.onclick = () => checkAnswer(option);

      optionsDiv.appendChild(btn);
    });
  }

  function checkAnswer(ans){
    const q = questions[currentQ];
    const fb = document.getElementById("feedback");

    if (!fb) return;

    if(ans === q.answer){
      currentQ++;

      if(currentQ >= questions.length){
        fb.innerText = "✓ Access Granted";
        setTimeout(onComplete, 800);
      } else {
        fb.innerText = "✓ Correct";
        setTimeout(render, 500);
      }

    } else {
      fb.innerText = "✖ Try Again";
    }
  }

  render();
}
