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
   SAFE RENDER FUNCTION
========================= */
function render(screenFn, nextFn = null) {
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
  render(startPoker);
}

/* =========================
   START APP
========================= */
goToQuestions();
