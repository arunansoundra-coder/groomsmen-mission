export function renderAuth(app, next) {
  app.innerHTML = `
    <h1>Agent Authentication</h1>
    <p>Identity confirmed: ${new URLSearchParams(window.location.search).get("agent") || "Agent"}</p>

    <button id="startBtn">Start Clearance</button>
  `;

  document.getElementById("startBtn").onclick = next;
}

export function renderBriefing(app, agent, role, next) {
  app.innerHTML = `
    <h1>Mission Briefing</h1>
    <h2>Agent ${agent}</h2>
    <p>Role: ${role}</p>

    <p>Operation Always and Forever</p>

    <button id="accept">Pour the whiskey. (Accept Mission)</button>
  `;

  document.getElementById("accept").onclick = next;
}

export function renderPoker(app, agent, role) {
  const players = [
    { name: "Josh", code: "Mirage" },
    { name: "Taylor", code: "Shadow" },
    { name: "Duran", code: "Anomaly" },
    { name: "Gill", code: "Architect" },
    { name: "Prathap", code: "Midnight" },
    { name: "Jason", code: "Viper" },
    { name: "Arunan", code: "Ghost" }
  ];

  app.innerHTML = `
    <h1>Poker Table</h1>
    <p>High Stakes Mission: Defeat the Groom</p>

    <h3>Agent: ${agent} (${role})</h3>

    <div>
      ${players.map(p => `
        <div class="card">
          <b>${p.name}</b><br/>
          ${p.code}
        </div>
      `).join("")}
    </div>

    <p style="margin-top:20px;">
      The mission will begin at noon on September 18, 2026.
    </p>

    <p>
      Safe House: 6233 Muirfield Dr SW, Cedar Rapids, IA
    </p>
  `;
}
