
// =========================
// AUTH QUESTION
// =========================
export function renderAuth(app, next) {

  const q = {
    question: "What poker hand did James Bond win with in Montenegro?",
    options: ["Royal Flush", "Straight Flush", "Full House", "Four of a Kind"],
    correct: "Straight Flush"
  };

  app.innerHTML = `
    <div class="screen">
      <h1>Agent Authentication</h1>
      <p>${q.question}</p>
      ${q.options.map(o => `<button class="opt">${o}</button>`).join("")}
    </div>
  `;

  document.querySelectorAll(".opt").forEach(btn => {
    btn.onclick = () => {
      if (btn.innerText === q.correct) {
        next();
      } else {
        btn.style.background = "red";
      }
    };
  });
}

// =========================
// BRIEFING SCREEN
// =========================
export function renderBriefing(app, agent, next) {

  app.innerHTML = `
    <div class="briefing">
      <h1>Operation: Always and Forever</h1>

      <p>Agent ${agent}, you are cleared for briefing.</p>
      <p>You are entering a controlled environment.</p>

      <button id="accept">Accept Mission</button>
      <button id="decline">Decline</button>
    </div>
  `;

  document.getElementById("accept").onclick = () => {
    next();
  };

  document.getElementById("decline").onclick = () => {
    app.innerHTML = `<h1>ACCESS DENIED</h1>`;
  };
}
