export function startBriefing(app, onContinue){

  app.innerHTML = `
    <div class="briefing">
      <h1>MI6 SECURE CHANNEL</h1>
      <h2>MISSION BRIEFING</h2>

      <p>
        Agent, your presence is requested for a high-stakes operation.
      </p>

      <p>
        You are to accept your role as either <strong>Best Man</strong> or <strong>Groomsman</strong> 
        and prepare accordingly. Your loyalty and execution will be critical to mission success.
      </p>

      <p>
        A high-stakes poker engagement is scheduled for <strong>1200 hours, September 18, 2026</strong>.
      </p>

      <p>
        Your covert attire will be a <strong>navy suit</strong>, to be acquired through 
        <strong>The Suit Shop</strong>. Further intel regarding attire specifications 
        will be transmitted via secure email.
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
