const typeSound = new Audio("https://assets.mixkit.co/active_storage/sfx/2353/2353-preview.mp3");
typeSound.volume = 0.4;

export function startBriefing(app, agentName, onComplete){

  const isJason = agentName === "Jason";
  const role = isJason ? "Best Man" : "Groomsman";

  app.innerHTML = `
    <div class="briefing bond-style">

      <!-- DRAMATIC FILE REVEAL (JASON ONLY) -->
      ${isJason ? `
        <div class="dossier-reveal">
          <div class="scanline"></div>
          <h1 class="classified">CLASSIFIED</h1>
          <p class="file-number">FILE #007-REDACTED</p>
        </div>
      ` : ""}

      <div class="dossier">

        <h2>TOP SECRET FILE</h2>

        <p><strong>Agent:</strong> ${agentName}</p>

        <p><strong>Assignment:</strong> ${role}</p>

        <p class="divider">--------------------------</p>

        <p>
          You have been selected for a mission of personal significance.
          Discretion is expected. Excellence is required.
        </p>

        <p>
          <strong>Mission Designation:</strong><br/>
          Operation: Always and Forever
        </p>

        <p>
          <strong>Primary Location:</strong><br/>
          6233 Muirfield Dr SW<br/>
          Cedar Rapids, IA 52404
        </p>

        <p>
          <strong>Dress Code:</strong> Navy
        </p>

        <p>
          Further instructions regarding your attire will be delivered via secure communication.
        </p>

        <p>
          Confirm your attendance with <strong>Agent Ghost</strong>.
        </p>

        <p>
          If accommodations are required, you may consider<br/>
          <strong>The Hotel at Kirkwood Center</strong>.
        </p>

        <p class="divider">--------------------------</p>

        <p class="accept-text">
          ${
            isJason
              ? "Agent, this is a position of honor. You will lead the mission alongside the Groom. Do you accept your role as Best Man?"
              : "Agent, you are essential to the success of this mission. Do you accept your role as Groomsman?"
          }
        </p>

        <button id="acceptBtn">ACCEPT</button>

      </div>
    </div>
  `;

  document.getElementById("acceptBtn").onclick = () => {
    onComplete && onComplete();
  };
}
