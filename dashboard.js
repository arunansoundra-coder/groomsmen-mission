import { codenames } from "./codenames.js";

export function startDashboard(app, { loadScreen }) {
  app.innerHTML = `
    <div class="dashboard">
      <h1>🛰 MISSION CONTROL</h1>
      <div id="agentList"></div>
    </div>
  `;

  renderAgents(loadScreen);
}

function renderAgents(loadScreen) {
  const agents = [
    "Jason",
    "Josh",
    "Duran",
    "Taylor",
    "Gill",
    "Prathap"
  ];

  const container = document.getElementById("agentList");

  container.innerHTML = agents.map(name => {
    const codename = codenames[name] || "Unknown";

    const status = localStorage.getItem(`mission_${name}`) 
      ? "COMPLETED" 
      : "PENDING";

    return `
      <div class="agent-card ${status.toLowerCase()}" data-agent="${name}">
        <div class="name">${name}</div>
        <div class="codename">Codename: ${codename}</div>
        <div class="status">${status}</div>
      </div>
    `;
  }).join("");

  document.querySelectorAll(".agent-card").forEach(card => {
    card.onclick = () => {
      const agentName = card.dataset.agent;

      localStorage.setItem("active_agent", agentName);

      loadScreen("briefing", {
        agent: agentName
      });
    };
  });
}
