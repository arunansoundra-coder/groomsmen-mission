export function startBriefing(app, { next, agentName }) {
  app.innerHTML = `
    <div class="screen">
      <h1>OPERATION: GROOMSMEN</h1>
      <p>Agent ${agentName}, your mission awaits.</p>
      <button id="startBtn">Begin Briefing</button>
    </div>
  `;

  document.getElementById("startBtn").onclick = next;
}
