export function startMissionObjective(app, { next, agentName }) {

  app.innerHTML = `
    <div class="mission">
      <h2>MISSION OBJECTIVE</h2>
      <p>Prepare for high stakes operation, ${agentName}</p>

      <button id="continue">CONTINUE</button>
    </div>
  `;

  document.getElementById("continue").onclick = () => {
    if (typeof next === "function") {
      next();
    }
  };
}


/* ================================
   MISSION DOSSIER TYPEWRITER SCREEN
================================ */

export function startMissionDossier(app, agentName, onAccept) {

  app.innerHTML = `
    <div class="mission-dossier">
      <div id="typewriter"></div>
      <button id="acceptBtn" class="hidden">Accept Mission</button>
    </div>
  `;

  const textEl = document.getElementById("typewriter");
  const btn = document.getElementById("acceptBtn");

  const dossierText = [
    `Agent ${agentName},`,
    ``,
    `Mission Begins: September 18, 2026 - 12:00 PM`,
    `High Stakes Poker Game`,
    `Objective: Defeat the Groom`,
    `Prize: MI6 Poker Champion`,
    ``,
    `Await further instructions via email.`,
    `Safe House: 6233 Muirfield Dr SW, Cedar Rapids, IA`,
    `Confirm with Agent Ghost`,
    ``,
    `The table awaits.`
  ];

  let line = 0;
  let char = 0;

  function type() {
    if (line >= dossierText.length) {
      btn.classList.remove("hidden");
      return;
    }

    const currentLine = dossierText[line];

    if (char < currentLine.length) {
      textEl.innerHTML += currentLine.charAt(char);
      char++;
      setTimeout(type, 25);
    } else {
      textEl.innerHTML += "<br/>";
      line++;
      char = 0;
      setTimeout(type, 500);
    }
  }

  type();

  btn.onclick = () => {
    app.innerHTML = "";

    if (typeof onAccept === "function") {
      onAccept();
    }
  };
}
