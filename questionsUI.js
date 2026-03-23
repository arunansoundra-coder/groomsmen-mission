console.log("questionsUI loaded");

import { questions } from './questions.js';

let currentQ = 0;

export function startQuestions(app, onComplete){

 function render(){
  const q = questions[currentQ];

  if (!q) {
    console.error("No question found at index:", currentQ);
    return;
  }

    app.innerHTML = `
      <h2>MISSION LEVEL ${currentQ+1}</h2>
      <p>${q.q}</p>
      <div id="options"></div>
      <div id="feedback"></div>
    `;

    const optionsDiv = document.getElementById("options");

    q.options.forEach(option => {
      const btn = document.createElement("button");
      btn.innerText = option;

      btn.addEventListener("click", () => checkAnswer(option));

      optionsDiv.appendChild(btn);
    });
  }

  function checkAnswer(ans){
    const q = questions[currentQ];
    const fb = document.getElementById("feedback");

    if(ans === q.answer){
      currentQ++;

      if(currentQ === questions.length){
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
