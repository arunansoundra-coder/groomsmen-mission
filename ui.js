// =========================
// AUTH
// =========================
export function renderAuth(app, next, agent) {
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
// BRIEFING
// =========================
export function renderBriefing(app, agent, next) {
  app.innerHTML = `
    <div class="screen">
      <h1>Operation: Always and Forever</h1>
      <p>Agent ${agent}, will you accept your mission?</p>
      <button id="accept">Accept</button>
      <button id="decline">Decline</button>
    </div>
  `;

  document.getElementById("accept").onclick = () => {
    window.MI6_REGISTRY.activeAgents.add(agent);
    next();
  };

  document.getElementById("decline").onclick = () => {
    app.innerHTML = `<h1>ACCESS DENIED</h1>`;
  };
}

// =========================
// SAFEHOUSE
// =========================
export function renderSafehouse(app, agent, next) {

  const address = "6233 Muirfield Dr SW Cedar Rapids, Iowa 52404";

  let state = { attending: null, staying: null };

  app.innerHTML = `
    <div class="screen">
      <h2>SAFEHOUSE ACCESS</h2>
      <p>${address}</p>

      <p>Attending?</p>
      <button data-f="attending" data-v="true">YES</button>
      <button data-f="attending" data-v="false">NO</button>

      <p>Staying?</p>
      <button data-f="staying" data-v="true">YES</button>
      <button data-f="staying" data-v="false">NO</button>

      <button id="confirm">CONFIRM</button>
    </div>
  `;

  document.querySelectorAll("[data-f]").forEach(btn => {
    btn.onclick = () => {
      state[btn.dataset.f] = btn.dataset.v === "true";
    };
  });

  document.getElementById("confirm").onclick = () => {
    window.MI6_REGISTRY.responses[agent] = state;

    if (state.attending) {
      window.MI6_REGISTRY.activeAgents.add(agent);
    }

    next();
  };
}
