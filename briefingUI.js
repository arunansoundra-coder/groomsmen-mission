export function startBriefing(app, agentName, onComplete){

  const isJason = agentName === "Jason";
  const role = isJason ? "Best Man" : "Groomsman";
  const roleText = isJason 
    ? "Will you be my Best Man?" 
    : "Will you be my Groomsman?";

  app.innerHTML = `
    <div class="briefing">
      <h2>Operation: Always and Forever</h2>

      <p id="message"></p>

      <p><strong>Role: ${role}</strong></p>

      <button id="acceptBtn" style="opacity: 0; pointer-events: none;">
        ACCEPT MISSION
      </button>
    </div>
  `;

  const messageEl = document.getElementById("message");
  const acceptBtn = document.getElementById("acceptBtn");

  const fullText = `
Agent ${agentName},

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
    app.innerHTML = `<h2>Mission Accepted</h2>`;
    setTimeout(() => onComplete(), 1000);
  };

}
