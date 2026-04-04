export function startMissionObjective(app, { next, agentName }) {
  app.innerHTML = `
    <div class="screen">
      <h2>MISSION OBJECTIVE</h2>
      <p>Prepare for high stakes operation, ${agentName}</p>

      <p><b>Objective:</b> Survive the interrogation phase.</p>

      <button id="acceptBtn">Accept Mission</button>
    </div>
  `;

  document.getElementById("acceptBtn").onclick = next;
}
