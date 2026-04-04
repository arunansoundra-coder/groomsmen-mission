export function startProposal(app, agentName, onComplete){

  const isJason = agentName === "Jason";
  const role = isJason ? "Best Man" : "Groomsman";
  const roleText = isJason 
    ? "Will you stand by my side as my Best Man?"
    : "Will you stand by my side as my Groomsman?";

  app.innerHTML = `
    <div class="proposal fade-in">

      <h2 class="operation-title">Operation: Always & Forever</h2>

      <div class="terminal-text" id="message"></div>

      <div class="role-box">
        <span>ROLE OFFERED</span>
        <strong>${role}</strong>
      </div>

      <div class="proposal-actions">
        <button id="acceptBtn" class="primary-btn hidden">ACCEPT</button>
        <button id="declineBtn" class="secondary-btn hidden">DECLINE</button>
      </div>

    </div>
  `;

  const messageEl = document.getElementById("message");
  const acceptBtn = document.getElementById("acceptBtn");
  const declineBtn = document.getElementById("declineBtn");

  const fullText = `
Agent ${agentName},

From the beginning, you’ve been part of the journey.

Through every mission, every challenge, every moment —
you’ve stood beside me.

Now, there’s one final mission…

${roleText}
  `;

  function typeWriterEffect(element, text, speed = 18, onDone) {
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

  typeWriterEffect(messageEl, fullText, 18, () => {
    acceptBtn.classList.remove("hidden");
    declineBtn.classList.remove("hidden");
  });

  acceptBtn.onclick = () => {
    app.innerHTML = `
      <div class="fade-in center">
        <h2 class="success-text">Mission Accepted</h2>
        <p>Suit up. We move at dawn.</p>
      </div>
    `;

    setTimeout(() => onComplete(), 1200);
  };

  declineBtn.onclick = () => {
    app.innerHTML = `
      <div class="fade-in center">
        <h2 class="fail-text">Mission Declined</h2>
        <p>…that’s not an option 😏</p>
      </div>
    `;

    setTimeout(() => {
      startProposal(app, agentName, onComplete);
    }, 1500);
  };
}
