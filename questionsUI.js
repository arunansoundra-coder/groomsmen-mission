import { questions } from "./questions.js";

export function startQuestions(app, { next, agentName }) {

  console.log("QUESTIONS SCREEN LOADED");

  if (!questions) {
    console.error("QUESTIONS IS UNDEFINED");
    app.innerHTML = "<h2>Questions missing</h2>";
    return;
  }

  app.innerHTML = `
    <div class="question-screen">
      <h2>Welcome ${agentName}</h2>
      <button id="start">BEGIN</button>
    </div>
  `;

  const btn = document.getElementById("start");

  if (!btn) {
    console.error("START BUTTON NOT FOUND");
    return;
  }

  btn.onclick = () => {
    console.log("BEGIN CLICKED → moving to proposal");
    next();
  };
}
