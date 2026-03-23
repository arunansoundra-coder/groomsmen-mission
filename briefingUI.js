export function startBriefing(app, agentName, onComplete){

  app.innerHTML = `
    <div class="briefing">
      <h2>MISSION BRIEFING</h2>
      <div id="typewriter"></div>
      <button id="continueBtn" style="display:none;">CONTINUE</button>
    </div>
  `;

  const text = `Agent ${agentName},

Your mission is about to begin.

Complete the challenge. Stay sharp.

This message will self-destruct...`;

  const typewriter = document.getElementById("typewriter");
  const btn = document.getElementById("continueBtn");

  if (!typewriter) return;

  let i = 0;

  function type(){
    if (i < text.length){
      typewriter.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, 25);
    } else {
      btn.style.display = "inline-block";
    }
  }

  btn.onclick = () => {
    onComplete();
  };

  type();
}
