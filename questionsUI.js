console.log("questionsUI loaded");

import { questions } from './questions.js';

let currentQ = 0;

export function startQuestions(app, onComplete){

  function render(){
    const q = questions[currentQ];

    app.innerHTML = `
      <h2>MISSION LEVEL ${currentQ+1}</h2>
      <p>${q.q}</p>

      ${q.options.map(o=>`
        <button onclick="checkAnswer('${o}')">${o}</button>
      `).join('')}

      <div id="feedback"></div>
    `;
  }

  window.checkAnswer = function(ans){
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
  };

  render();
}
