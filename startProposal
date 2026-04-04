export function startBriefing(app, agentName, onComplete){

  const isJason = agentName === "Jason";
  const role = isJason ? "Best Man" : "Groomsman";
  const roleText = isJason 
    ? "Will you be my Best Man?" 
    : "Will you be my Groomsman?";

  app.innerHTML = `
    <div class="briefing fade-in">
      <h2 class="mission-title">Operation: Always and Forever</h2>

      <div id="message" class="terminal-text"></div>

      <div class="role-box">
        <span>ASSIGNED ROLE:</span>
        <strong>${role}</strong>
      </div>

      <button id="acceptBtn" class="primary-btn hidden">
        ACCEPT MISSION
      </button>
    </div>
  `;

  const messageEl = document.getElementById("message");
  const acceptBtn = document.getElementById("acceptBtn");

  const fullText = `
Agent ${agentName},

You are tasked with assisting the Groom in a high-priority operation.

${roleText}
  `;

  function typeWriterEffect(element, text, speed = 20, onDone) {
    let i = 0;
    element.innerHTML = "";

    function type() {
      if (i < text.length) {
        const char = text.charAt(i);

        if (char === "\n") {
          element.innerHTML += "<br/>";
        } else {
          element.innerHTML += char;
        }

        i++;
        setTimeout(type, speed);
      } else {
        onDone && onDone();
      }
    }

    type();
  }

  typeWriterEffect(messageEl, fullText, 20, () => {
    acceptBtn.classList.remove("hidden");
  });

  acceptBtn.onclick = () => {
    app.innerHTML = `
      <div class="fade-in">
        <h2 class="success-text">Mission Accepted</h2>
      </div>
    `;

    setTimeout(() => onComplete(), 1000);
  };
}
