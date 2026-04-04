import { startQuestions } from "./questionsUI.js";
import { startProposal } from "./proposalUI.js";
import { startMissionObjective } from "./missionObjectiveUI.js";
import { startPoker } from "./pokerUI.js";

const app = document.getElementById("app");

/* =========================
   GET AGENT NAME
========================= */
const params = new URLSearchParams(window.location.search);
const agentName = params.get("agent") || "Agent";

/* =========================
   SAFE RENDER
========================= */
function render(screenFn, nextFn = null) {
  app.innerHTML = ""; // 🔥 IMPORTANT: always clear screen before render

  if (nextFn) {
    screenFn(app, nextFn, agentName);
  } else {
    screenFn(app, agentName);
  }
}

/* =========================
   FLOW CONTROL
========================= */

function goToQuestions() {
  render(startQuestions, goToProposal);
}

function goToProposal() {
  render(startProposal, goToMission);
}

function goToMission() {
  render(startMissionObjective, goToPoker);
}

function goToPoker() {
  app.innerHTML = ""; // extra safety for poker transition
  startPoker(app, agentName);
}

/* =========================
   START APP
========================= */
goToQuestions();
