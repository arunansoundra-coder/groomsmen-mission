/* =========================
   AUTH SCREEN
========================= */
export function renderAuth(app, next) {
  app.innerHTML = `
    <div class="screen">
      <h1>Identity Authentication</h1>
      <p>Agent, proceed with identity authentication</p>
      <button id="start">Begin</button>
    </div>
  `;

  document.getElementById("start").onclick = next;
}

/* =========================
   BRIEFING SCREEN
========================= */
export function renderBriefing(app, agent, role, next) {
  const isJason = agent === "Jason";

  const roleText = isJason
    ? "Will you assist the groom in Operation Always and Forever as Best Man?"
    : "Will you assist the groom in Operation Always and Forever as Groomsman?";

  app.innerHTML = `
    <div class="briefing">
      <h1>Operation Always and Forever</h1>

      <p class="subtitle">Mission Briefing</p>

      <h2>Welcome Agent ${agent}</h2>
      <p class="role">Role: ${role}</p>

      <div class="mission-box">
        <p>Agents are tasked with assisting the groom in an upcoming high-stakes operation.</p>
        <p class="prompt">${roleText}</p>
      </div>

      <div class="options">
        <button id="accept">Accept Mission</button>
        <button id="decline">Decline</button>
      </div>
    </div>
  `;

  document.getElementById("accept").onclick = next;

  document.getElementById("decline").onclick = () => {
    showDeclineSequence();
  };

  function showDeclineSequence() {
    let countdown = 5;

    app.innerHTML = `
      <div class="decline-screen">
        <h1 class="warning">⚠ ACCESS DENIED</h1>
        <p>Agent ${agent}, you have declined the mission.</p>
        <p class="fade">Self-destruct sequence in</p>
        <h2 id="countdown">${countdown}</h2>
        <p class="fade small">(Just kidding… or are we?)</p>
      </div>
    `;

    const timer = setInterval(() => {
      countdown--;
      const el = document.getElementById("countdown");
      if (el) el.innerText = countdown;

      if (countdown === 0) {
        clearInterval(timer);

        app.innerHTML = `
          <div class="decline-screen">
            <h1 class="terminated">💀 SESSION TERMINATED</h1>
            <p>Mission access revoked.</p>
            <button id="retry">Request Reinstatement</button>
          </div>
        `;

        document.getElementById("retry").onclick = () => {
          renderBriefing(app, agent, role, next);
        };
      }
    }, 1000);
  }
}

/* =========================
   POKER SCREEN (PLACEHOLDER)
========================= */
export function renderPoker(app, agent, role) {
  const agents = [
const agents = [
  { name: "Arunan", codename: "Ghost", role: "Groom", chips: 1500 },
  { name: "Jason", codename: "Viper", role: "Best Man", chips: 1200 },
  { name: "Gill", codename: "Architect", role: "Groomsman", chips: 1100 },
  { name: "Prathap", codename: "Midnight", role: "Groomsman", chips: 1000 },
  { name: "Taylor", codename: "Shadow", role: "Groomsman", chips: 1000 },
  { name: "Duran", codename: "Anomaly", role: "Groomsman", chips: 950 },
  { name: "Josh", codename: "Mirage", role: "Groomsman", chips: 900 }
];

  const communityCards = ["A♠", "K♦", "10♣", "7♥", "3♠"];

  const hands = {
    Jason: ["A♥", "A♦"],
    Arunan: ["K♠", "Q♠"],
    Mia: ["10♦", "9♣"],
    Alex: ["7♠", "7♦"]
  };

  const results = {
    Jason: "WINNER 🏆 Full House",
    Arunan: "Strong Hand – Pair of Kings",
    Mia: "Straight Draw",
    Alex: "Pair of Sevens"
  };

  function renderAgent(a, index) {
    return `
      <div class="seat seat-${index}">
        <div class="agent-card">
          <h3>${a.name}</h3>
          <p class="codename">Codename: ${a.codename}</p>
          <p class="role">${a.role}</p>

          <div class="chips">💰 ${a.chips}</div>

          <div class="cards">
            ${(hands[a.name] || ["?", "?"]).map(c => `<div class="card">${c}</div>`).join("")}
          </div>

          <div class="result">${results[a.name]}</div>
        </div>
      </div>
    `;
  }

  app.innerHTML = `
    <div class="poker-table-container">

      <h1 class="table-title">Operation: Final Showdown</h1>

      <div class="poker-table">

        <!-- COMMUNITY CARDS -->
        <div class="community">
          <h3>Community Cards</h3>
          <div class="community-cards">
            ${communityCards.map(c => `<div class="card">${c}</div>`).join("")}
          </div>
        </div>

        <!-- PLAYERS -->
        ${agents.map(renderAgent).join("")}

      </div>

    </div>
  `;
}
