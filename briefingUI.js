  export function startBriefing(app, agentName, onContinue){

  const roleMap = {
    "Jason": "Best Man",
    "Josh": "Groomsman",
    "Duran": "Groomsman",
    "Taylor": "Groomsman",
    "Gill": "Groomsman",
    "Prathap": "Groomsman"
  };

  let roleText = "";

  if (agentName === "Arunan") {
    roleText = "You are the principal asset. All operations revolve around you.";
  } else {
    const role = roleMap[agentName] || "Groomsman";
    roleText = `Agent ${agentName}, you are requested to serve as ${role}.`;
  }

  app.innerHTML = `
    <div class="briefing">
      <div id="typewriter"></div>
      <button id="continueBtn" style="display:none;">ACCEPT MISSION</button>
    </div>
  `;

  const lines = [
    "MI6 SECURE CHANNEL INITIATED...",
    "Decrypting transmission...",
    "",
    roleText,
    "",
    "A high-stakes poker engagement is scheduled for 1200 hours, September 18, 2026.",
    "",
    "Dress code: Navy suit.",
    "Procurement available via The Suit Shop.",
    "Further instructions will be transmitted via secure email.",
    "",
    "Safe house location:",
    "6233 Muirfield Dr SW, Cedar Rapids, IA 52404",
    "",
    "Accommodation protocol:",
    "Coordinate with Agent Ghost if required.",
    "",
    "Alternate lodging:",
    "The Hotel at Kirkwood Center",
    "7725 Kirkwood Blvd SW, Cedar Rapids, IA",
    "",
    "Confirm readiness...",
    "The table awaits."
  ];

  const el = document.getElementById("typewriter");
  const btn = document.getElementById("continueBtn");

  let lineIndex = 0;
  let charIndex = 0;

  function typeLine(){
    if (lineIndex >= lines.length) {
      btn.style.display = "block";
      return;
    }

    let currentLine = lines[lineIndex];

    if (charIndex < currentLine.length) {
      el.innerHTML += currentLine.charAt(charIndex);
      charIndex++;
      setTimeout(typeLine, 25);
    } else {
      el.innerHTML += "<br/>";
      lineIndex++;
      charIndex = 0;
      setTimeout(typeLine, 400);
    }
  }

  typeLine();

  btn.addEventListener("click", () => {
    onContinue();
  });
}
