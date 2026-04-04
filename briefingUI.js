import { roles } from "./roles.js";
import { codenames } from "./codenames.js";

export function startBriefing(app, state, onComplete) {
  const agentName = state.agent;

  const role = roles[agentName] || "Groomsman";
  const codename = codenames[agentName] || "Unknown";

  const roleText =
    role === "Best Man"
      ? "Will you stand as my Best Man in this operation?"
      : role === "Groom"
      ? "This is your operation. All outcomes depend on you."
      : "Will you stand with me as a Groomsman in this operation?";

  app.innerHTML = `
    <div class="briefing">
      <h2>Operation: Always and Forever</h2>

      <p id="message"></p>

      <p class="meta">
        Codename: ${codename} <br/>
        Role: ${role}
      </p>

      <button id="acceptBtn" style="opacity: 0; pointer-events: none;">
        ACCEPT MISSION
      </button>
    </div>
  `;

  const messageEl = document.getElementById("message");
  const acceptBtn = document.getElementById("acceptBtn");

  const fullText = `
Agent ${agentName},

Codename: ${codename}

You are tasked with assisting the Groom in an upcoming operation.

${roleText}
  `;

  function typeWriterEffect(element, text, speed = 25, onDone) {
    element.innerHTML = "";
    let i = 0;

    const interval = setInterval(() => {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
      } else {
        clearInterval(interval);
        onDone && onDone();
      }
    }, speed);
  }

  typeWriterEffect(messageEl, fullText, 25, () => {
    acceptBtn.style.opacity = "1";
    acceptBtn.style.pointerEvents = "auto";
  });

  acceptBtn.onclick = () => {
    app.innerHTML = `
      <div class="briefing">
        <h2>MISSION ACCEPTED</h2>
        <p>Initializing deployment...</p>
      </div>
    `;

    setTimeout(() => {
      onComplete();
    }, 900);
  };
}
