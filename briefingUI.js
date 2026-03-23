export function startBriefing(app, agentName, onContinue){

  const roleMap = {
    "Jason": "Best Man",
    "Josh": "Groomsman",
    "Duran": "Groomsman",
    "Taylor": "Groomsman",
    "Gill": "Groomsman",
    "Prathap": "Groomsman"
  };

  let roleLine = "";

  if (agentName === "Arunan") {
    roleLine = `<p>You are the principal asset. All operations center around you.</p>`;
  } else {
    const role = roleMap[agentName] || "Groomsman";

    roleLine = `
      <p>
        Agent ${agentName}, you are formally requested to serve as 
        <strong>${role}</strong> for this operation.
      </p>
    `;
  }

  app.innerHTML = `
    <div class="briefing">
      <h1>MI6 SECURE CHANNEL</h1>
      <h2>MISSION BRIEFING</h2>

      ${roleLine}

      <p>
        A high-stakes poker engagement is scheduled for 
        <strong>1200 hours, September 18, 2026</strong>.
      </p>

      <p>
        Your covert attire will be a <strong>navy suit</strong>, to be acquired through 
        <strong>The Suit Shop</strong>. Further instructions will follow via secure transmission.
      </p>

      <p>
        The designated safe house is located at:<br/>
        <strong>6233 Muirfield Dr SW, Cedar Rapids, IA 52404</strong>
      </p>

      <p>
        Should accommodations be required, coordinate directly with 
        <strong>Agent Ghost</strong>.
      </p>

      <p>
        Independent lodging is authorized. A nearby option includes:<br/>
        <strong>The Hotel at Kirkwood Center</strong><br/>
        7725 Kirkwood Blvd SW, Cedar Rapids, IA 52404
      </p>

      <p class="final-line">
        Confirm your readiness. The table awaits.
      </p>

      <button id="continueBtn">ACCEPT MISSION</button>
    </div>
  `;

  document.getElementById("continueBtn").addEventListener("click", () => {
    onContinue();
  });
}
