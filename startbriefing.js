import { codenames } from "./codenames.js";

export function startBriefing(app, { next, agentName }) {
  const codename = codenames[agentName] || "Unknown";

  app.innerHTML = `
    <div class="screen briefing-screen">
      <h1>OPERATION: GROOMSMEN</h1>

      <p class="meta">
        Agent: ${agentName} <br/>
        Codename: ${codename}
      </p>

      <p class="line">
        Your mission briefing is classified.
      </p>

      <button id="startBtn">BEGIN BRIEFING</button>
    </div>
  `;

  document.getElementById("startBtn").onclick = next;
}
