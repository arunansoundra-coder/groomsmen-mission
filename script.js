let agentName = "Agent";

const bondQuestions = [
  { question: "What poker hand did James Bond win in Montenegro?", answer: "royal flush" },
  { question: "What is James Bond's favorite drink?", answer: "vodka martini" }
];

const clearanceQuestions = [
  { question: "What was the name of Arunan's horse?", answer: "maya" },
  { question: "Arunan had a 2023 BMW 330i Grey. What was his name?", answer: "arunan" },
  { question: "Fill in the blank: Blood makes us related and loyalty makes us family and family is ________", answer: "forever" }
];

const missionType = window.location.href.includes("bestman.html") ? "Best Man" : "Groomsman";

function startMission() {
  const intro = document.getElementById("intro");
  const terminal = document.getElementById("terminal");
  intro.style.display = "none";
  terminal.innerHTML = "";

  let stage = 0;
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
        stage = 2;
        feedback.innerHTML = "<p>Security clearance granted!</p>";
        setTimeout(missionBriefing, 1500);
      } else {
        feedback.innerHTML = "<p>Correct! Next question...</p>";
        setTimeout(askQuestion, 1000);
      }
    } else {
      feedback.innerHTML = "<p>Incorrect. Try again.</p>";
    }
  };

  function missionBriefing() {
    const pokerDate = new Date("September 18, 2026 12:00:00").getTime();

    terminal.innerHTML = `
      <h2>Mission: ${missionType}</h2>
      <p>Congratulations, Agent ${agentName}. You have successfully passed verification and security clearance.</p>
      <p>Your mission is to serve as the <strong>${missionType}</strong>. Accept this mission?</p>
      <button id="acceptMission">ACCEPT MISSION</button>
    `;

    document.getElementById("acceptMission").addEventListener("click", () => {
      terminal.innerHTML = `
        <h2>Mission Accepted</h2>
        <p>Await further information on suits and apparel.</p>
        <p>Safe House: 6233 Muirfield Dr SW, Cedar Rapids, IA 52404. Contact the groom in advance to confirm if accommodations are required.</p>
        <p>The mission begins at the Midnight Gem's Bachelor Lounge with a high stakes poker game to beat the groom.</p>
        <p>Countdown to poker game:</p>
        <p id="countdown" style="font-weight:bold; font-size:1.2rem;"></p>
      `;

      const countdownEl = document.getElementById("countdown");
      const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = pokerDate - now;

        if (distance < 0) {
          clearInterval(timer);
          countdownEl.innerHTML = "Mission in progress! Poker game has started!";
        } else {
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);
          countdownEl.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }
      }, 1000);
    });
  }

  askQuestion();
}
