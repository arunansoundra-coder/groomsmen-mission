
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
// BRIEFING SCREEN (FIXED)
// =========================
export function renderBriefing(app, agent, next) {

  // ✅ FIX: no hardcoded Jason logic
  const role = agent === "Arunan" ? "Groom" :
               agent === "Jason" ? "Best Man" :
               "Groomsman";

  app.innerHTML = `
    <div class="briefing-container">

      <div class="briefing-card">

        <h1>Operation: Always and Forever</h1>

        <p><b>Agent ${agent}</b>, you are cleared for briefing.</p>
        <p>You are entering a controlled environment.</p>

        <hr/>

        <p>
          🎯 <b>Mission Objective:</b><br/>
          Participate in a poker game on <b>September 18th, 2026 at 12:00 PM</b>  
          with the objective of beating the groom.
        </p>

        <p>
          🏠 <b>Safe House Protocol:</b><br/>
          A secure residence is available for all agents during the mission.
          You are advised to stay on-site for coordination and readiness.
        </p>

        <p>
          ⚠️ You must confirm whether you will be staying at the safe house.
        </p>

        <p>
          Do you accept the mission of serving as <b>${role}</b>?
        </p>

        <div class="button-group">
          <button id="accept">Accept Mission</button>
          <button id="decline">Decline</button>
        </div>

      </div>

    </div>
  `;

  document.getElementById("accept").onclick = () => {
    next();
  };

  document.getElementById("decline").onclick = () => {
    app.innerHTML = `
      <div class="decline-screen">
        <h1>ACCESS DENIED</h1>
        <p>Mission rejected.</p>
      </div>
    `;
  };
}
