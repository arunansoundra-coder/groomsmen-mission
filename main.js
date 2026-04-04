import { startQuestions } from "./questionsUI.js";
import { startProposal } from "./proposalUI.js";
import { startMissionObjective } from "./missionObjectiveUI.js";
import { startPoker } from "./pokerUI.js";

const app = document.getElementById("app");

const params = new URLSearchParams(window.location.search);
const agentName = params.get("agent") || "Agent";

/* =========================
   SCREEN WRAPPER
========================= */
function render(screenFn, nextFn = null) {
  app.innerHTML = "";

  screenFn(app, {
    next: nextFn,
    agentName
  });
}

/* =========================
   FLOW
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
  render(startPoker, null);
}

/* =========================
   START
========================= */
goToQuestions();
