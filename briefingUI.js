export function startBriefing(app, agentName, onComplete){

  const isJason = agentName === "Jason";
  const role = isJason ? "Best Man" : "Groomsman";

  app.innerHTML = `
    <div class="briefing">
      <h2>Operation: Always and Forever</h2>

      <p>
      Agent ${agentName},<br><br>
      You are being called upon for a mission of great importance.<br><br>
      Will you assist the Groom as ${role}?
      </p>

      <div class="choices">
        <button class="choice">Pour the whiskey.</button>
        <button class="choice">For King and Country.</button>
        <button class="choice">Sounds like a job for 007.</button>
        <button class="choice">The name’s Bond… let’s do it.</button>
      </div>
    </div>
  `;

  document.querySelectorAll(".choice").forEach(btn=>{
    btn.onclick = () => {
      app.innerHTML = `<h2>Mission Accepted</h2>`;
      setTimeout(() => onComplete(), 1000);
    };
  });
}
