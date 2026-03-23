import { playAmbient } from "./sounds.js";

export function startBriefing(app, agentName, onComplete){

  const isJason = agentName === "Jason";
  const role = isJason ? "Best Man" : "Groomsman";

  app.classList.add("briefing");
  app.classList.toggle("jason-zoom", isJason);

  app.innerHTML = `
    <div class="briefing-container">
      <h1>FILE DOSSIER</h1>
      <div class="dossier">
        <p class="typed-text"></p>
      </div>
      <button id="acceptBtn" class="hidden">ACCEPT MISSION</button>
    </div>
  `;

  const typedText = document.querySelector(".typed-text");
  const acceptBtn = document.getElementById("acceptBtn");

  const textContent = `
AGENT: ${agentName}

STATUS: ACTIVE

MISSION: Operation: Always and Forever

ROLE ASSIGNED: ${role}

LOCATION:
6233 Muirfield Dr SW
Cedar Rapids, IA 52404

ATTIRE:
Covert Navy

INSTRUCTIONS:
Further instructions will be sent via secure transmission.

CONTACT:
Confirm attendance with Agent Ghost.

ACCOMMODATIONS:
The Hotel at Kirkwood Center is available if needed.
  `;

  typeWriterSafe(typedText, textContent, () => {
    acceptBtn.classList.remove("hidden");
  });

  acceptBtn.onclick = () => {
    acceptBtn.innerText = isJason
      ? "Jason, do you accept this mission as Best Man?"
      : `${agentName}, do you accept this mission as Groomsman?`;

    setTimeout(() => {
      if (onComplete) onComplete();
    }, 800);
  };

  // start ambient sound safely
  playAmbient();
}

function typeWriterSafe(el, text, callback){
  let i = 0;

  function type(){
    if (i < text.length){
      el.textContent += text.charAt(i); // SAFE: no HTML injection
      i++;
      setTimeout(type, 25);
    } else {
      if (callback) callback();
    }
  }

  type();
}
