import { roles } from "./roles.js";
import { codenames } from "./codenames.js";

export function startMissionObjective(app, { state, next }) {
  const agent = state.agent;

  const role = roles[agent] || "Groomsman";
  const codename = codenames[agent] || "Unknown";

  app.innerHTML = `
    <div class="screen mission">
      <h2>MISSION OBJECTIVE</h2>

      <p class="meta">
        Agent ${agent} | Codename: ${codename} | Role: ${role}
      </p>

      <p class="objective">
        Prepare for a high-stakes emotional operation.
      </p>

      <p><b>Primary Objective:</b> Secure loyalty clearance through all phases.</p>

      <p><b>Secondary Objective:</b> Survive the interrogation phase.</p>

      <button id="acceptBtn">ACCEPT MISSION</button>
    </div>
  `;

  document.getElementById("acceptBtn").onclick = next;
}
