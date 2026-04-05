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
export function renderPoker(app) {
  app.innerHTML = `
    <div class="screen">
      <h1>Poker Table</h1>
      <p>Mission in progress...</p>
    </div>
  `;
}
