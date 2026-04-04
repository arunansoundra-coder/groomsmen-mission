import { codenames } from "./codenames.js";

export function startProposal(app, { next, state }) {
  const agent = state.agent;
  const codename = codenames[agent] || "Unknown";

  app.innerHTML = `
    <div class="screen proposal-screen">
      <h2>FINAL QUESTION</h2>

      <p class="meta">
        Agent: ${agent} <br/>
        Codename: ${codename}
      </p>

      <p class="line">
        Will you stand as my Groomsman in this operation?
      </p>

      <button id="yesBtn">YES</button>
    </div>
  `;

  document.getElementById("yesBtn").onclick = () => {
    localStorage.setItem(`mission_${agent}`, "accepted");

    app.innerHTML = `
      <div class="screen">
        <h2>OATH ACCEPTED</h2>
        <p>Agent ${agent} has entered the operation.</p>
      </div>
    `;

    setTimeout(() => next(), 800);
  };
}
