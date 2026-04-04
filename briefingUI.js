import { roles } from "./roles.js";
import { codenames } from "./codenames.js";

export function startBriefing(app, state, onComplete) {
  const agent = state.agent;

  const role = roles[agent] || "Groomsman";
  const codename = codenames[agent] || "Unknown";

  const roleText =
    role === "Best Man"
      ? "Will you stand as my Best Man in this operation?"
      : role === "Groom"
      ? "This is your operation. Everything depends on you."
      : "Will you stand with me as a Groomsman in this operation?";

  app.innerHTML = `
    <div class="briefing cinematic">
      <h2>OPERATION: ALWAYS AND FOREVER</h2>

      <p id="message"></p>

      <p class="meta">
        Codename: ${codename} <br/>
        Role: ${role}
      </p>

      <button id="acceptBtn" style="opacity:0; pointer-events:none;">
        ACCEPT MISSION
      </button>
    </div>
  `;

  const messageEl = document.getElementById("message");
  const btn = document.getElementById("acceptBtn");

  const text = `
Agent ${agent},

Codename: ${codename}

You are being called upon for a classified friendship operation involving the Groom.

${roleText}

This is not a request.
It is trust.
It is loyalty.
It is forever.
  `;

  function typeWriter(el, txt, speed = 20, done) {
    let i = 0;
    el.innerHTML = "";

    const interval = setInterval(() => {
      if (i < txt.length) {
        el.innerHTML += txt[i++];
      } else {
        clearInterval(interval);
        done?.();
      }
    }, speed);
  }

  typeWriter(messageEl, text, 20, () => {
    btn.style.opacity = "1";
    btn.style.pointerEvents = "auto";
  });

  btn.onclick = () => {
    app.innerHTML = `
      <div class="briefing">
        <h2>MISSION ACCEPTED</h2>
        <p>Initializing deployment...</p>
      </div>
    `;

    setTimeout(onComplete, 900);
  };
}
