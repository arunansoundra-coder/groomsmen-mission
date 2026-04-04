export function startQuestions(app, { next }) {
  const questions = [
    "How did you meet the groom?",
    "What is your funniest memory?",
    "Will you survive the bachelor party?"
  ];

  let index = 0;

  function render() {
    if (index >= questions.length) {
      next();
      return;
    }

    app.innerHTML = `
      <div class="screen">
        <h2>INTERROGATION</h2>
        <p>${questions[index]}</p>
        <button id="nextBtn">Answer</button>
      </div>
    `;

    document.getElementById("nextBtn").onclick = () => {
      index++;
      render();
    };
  }

  render();
}
