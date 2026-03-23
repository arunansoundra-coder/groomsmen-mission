export function startDashboard(app) {
  app.innerHTML = `
    <div class="dashboard">
      <h1>🛰 MISSION CONTROL</h1>
      <div id="agentList"></div>
    </div>
  `;

  renderAgents();
}

function renderAgents() {
  const agents = [
    { name: "Jason", role: "Best Man" },
    { name: "Josh", role: "Groomsman" },
    { name: "Duran", role: "Groomsman" },
    { name: "Taylor", role: "Groomsman" },
    { name: "Gill", role: "Groomsman" },
    { name: "Prathap", role: "Groomsman" }
  ];

  const container = document.getElementById("agentList");

  container.innerHTML = agents.map(agent => {
    const status = localStorage.getItem(`mission_${agent.name}`) 
      ? "accepted" 
      : "pending";

    return `
      <div class="agent ${status}">
        <div class="name">${agent.name}</div>
        <div class="role">${agent.role}</div>
        <div class="status">${status.toUpperCase()}</div>
      </div>
    `;
  }).join("");
}
