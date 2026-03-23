export function startBriefing(app, agentName, onComplete){

  const missionObjective = `
MISSION OBJECTIVE:

Secure the operation.
Maintain cover.
Ensure all agents complete their roles.

Failure is not an option.
`;

  app.innerHTML = `
    <div class="briefing">
      <h2>🛰 MISSION BRIEFING</h2>

      <div id="typewriter"></div>

      <pre id="objective" style="margin-top:20px; opacity:0;"></pre>

      <button id="continueBtn" style="display:none;">CONTINUE</button>
    </div>
  `;

  const text = `Agent ${agentName},

You have been selected for this operation.

Your role is critical.

Await further instructions...`;

  const typewriter = document.getElementById("typewriter");
  const objective = document.getElementById("objective");
  const btn = document.getElementById("continueBtn");

  let i = 0;

  function type(){
    if (i < text.length){
      typewriter.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, 25);
    } else {
      // reveal mission objective
      objective.innerText = missionObjective;
      objective.style.opacity = 1;

      btn.style.display = "inline-block";
    }
  }

  btn.onclick = () => {
    onComplete();
  };

  type();
}
