let agentName = "Best Man";

const bondQuestions = [
  {
    question: "What poker hand did James Bond win in Montenegro?",
    answer: "royal flush"
  },
  {
    question: "What is James Bond's favorite drink?",
    answer: "vodka martini"
  }
];

const clearanceQuestions = [
  {
    question: "What was the name of Arunan's horse?",
    answer: "maya"
  },
  {
    question: "Arunan had a 2023 BMW 330i Grey. What was his name?",
    answer: "arunan"
  },
  {
    question: "Fill in the blank: Blood makes us related and loyalty makes us family and family is ________",
    answer: "forever"
  }
];

function startMission() {
  const intro = document.getElementById("intro");
  const terminal = document.getElementById("terminal");
  intro.style.display = "none";
  terminal.innerHTML = "";

  let stage = 0; // 0 = bond questions, 1 = clearance questions
  let questionIndex = 0;

  function askQuestion() {
    let currentQ = stage === 0 ? bondQuestions[questionIndex] : clearanceQuestions[questionIndex];
    terminal.innerHTML = `
      <p>${currentQ.question}</p>
      <input type="text" id="answerInput" placeholder="Your answer here">
      <button onclick="checkAnswer()">SUBMIT</button>
      <p id="feedback"></p>
    `;
    document.getElementById("answerInput").focus();
  }

  window.checkAnswer = function() {
    const input = document.getElementById("answerInput").value.trim().toLowerCase();
    let currentQ = stage === 0 ? bondQuestions[questionIndex] : clearanceQuestions[questionIndex];
    const feedback = document.getElementById("feedback");

    if (input === currentQ.answer.toLowerCase()) {
      questionIndex++;
      if (stage === 0 && questionIndex >= bondQuestions.length) {
        stage = 1;
        questionIndex = 0;
        feedback.innerHTML = "<p>Agent verified! Proceeding to security clearance...</p>";
        setTimeout(askQuestion, 1500);
      } else if (stage === 1 && questionIndex >= clearanceQuestions.length) {
        terminal.innerHTML = `<p>Access granted! Welcome, Agent ${agentName}.</p>`;
      } else {
        feedback.innerHTML = "<p>Correct! Next question...</p>";
        setTimeout(askQuestion, 1000);
      }
    } else {
      feedback.innerHTML = "<p>Incorrect. Try again.</p>";
    }
  };

  askQuestion();
}
