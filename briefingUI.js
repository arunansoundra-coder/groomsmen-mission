export function startBriefing(app, agentName, onComplete) {

  const roleMap = {
    "Jason": "Best Man",
    "Josh": "Groomsman",
    "Duran": "Groomsman",
    "Taylor": "Groomsman",
    "Gill": "Groomsman",
    "Prathap": "Groomsman"
  };

  const role = roleMap[agentName] || "Agent";
  const isBestMan = agentName === "Jason";

  const message = `
🛰 MI6 SECURE CHANNEL

ACCESS GRANTED

----------------------------------------

Agent: ${agentName}
Assignment: ${role}

----------------------------------------

This is not a routine operation.

It is a high-stakes game.

Every seat at the table matters.

----------------------------------------

${isBestMan 
  ? `You are being asked to take your place as Best Man.`
  : `You are being asked to take your place as a Groomsman.`
}

----------------------------------------

🏠 SAFE HOUSE:
Location to be disclosed.

📅 OPERATION DATE:
[INSERT DATE]

----------------------------------------

Your seat has been reserved.

Your presence is expected.

----------------------------------------

The table awaits.
`;

  app.innerHTML = `
    <div class="briefing">
      <h1>CLASSIFIED</h1>
      <h2>FINAL BRIEFING</h2>
      <div id="typewriter"></div>
      <button id="continueBtn" style="display:none;">ACCEPT MISSION</button>
    </div>
  `;

  const typeEl = document.getElementById("typewriter");
  const btn = document.getElementById("continueBtn");

  let i = 0;

  function typeWriter() {
    if (i < message.length) {
      typeEl.innerHTML += message.charAt(i);

      const currentText = message.slice(0, i);

      i++;

      // 🎬 Dynamic pacing (THIS is what made it feel cinematic)
      let delay = 14;

      if (currentText.endsWith("ACCESS GRANTED")) delay = 300;
      else if (currentText.endsWith("high-stakes game.")) delay = 300;
      else if (currentText.endsWith("Every seat at the table matters.")) delay = 300;
      else if (currentText.endsWith("Your presence is expected.")) delay = 300;
      else if (currentText.endsWith("The table awaits.")) delay = 500;

      setTimeout(typeWriter, delay);

    } else {
      btn.style.display = "block";
    }
  }

  typeWriter();

  btn.addEventListener("click", () => {
    // ✅ log acceptance
    localStorage.setItem(`mission_${agentName}`, "accepted");

    // 🎬 cinematic transition
    app.classList.add("fade-out");

    setTimeout(() => {
      onComplete();
      app.classList.remove("fade-out");
      app.classList.add("fade-in");
    }, 400);
  });
}
