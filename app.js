import { startAuthFlow, renderBriefing, renderPoker } from "./ui.js";

const app = document.getElementById("app");

const params = new URLSearchParams(window.location.search);
const agent = params.get("agent") || "Agent";

const roles = {
  Jason: "Best Man",
  Arunan: "Groom"
};

function getRole(name) {
  return roles[name] || "Groomsman";
}

let stage = "auth";

function nextStage() {
  if (stage === "auth") {
    stage = "briefing";
    renderBriefing(app, agent, getRole(agent), nextStage);
  } else if (stage === "briefing") {
    stage = "poker";
    renderPoker(app, agent, getRole(agent));
  }
}

/* =========================
   START APP
========================= */

startAuthFlow(app, agent, () => {
  nextStage();
});
