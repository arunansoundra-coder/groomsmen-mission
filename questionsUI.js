import { questions } from "./questions.js";

export function startQuestions(app, { next, agentName }) {

  let index = 0;

  function render() {
    const q = questions[index];

    // End of questions → go to next screen
    if (!q) {
      next();
      return;
    }

    app.innerHTML = `
      <div class="question-screen">
        <h2>Welcome Agent ${agentName}</h2>

        <div class="question-text">${q.q}</div>

        <div class="options">
          ${q.options
            .map(
              o => `<button class="option-btn">${o}</button>`
            )
            .join("")}
        </div>
      </div>
    `;

    document.querySelectorAll(".option-btn").forEach(btn => {
      btn.onclick = () => {

        // correct answer → move forward
        if (btn.innerText === q.answer) {
          index++;
          render();
        } 
        // wrong answer → feedback
        else {
          btn.style.background = "red";
        }
      };
    });
  }

  render();
}
