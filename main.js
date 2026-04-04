import { startQuestions } from "./questionsUI.js";
import { startProposal } from "./proposalUI.js";
import { startMissionObjective } from "./missionObjectiveUI.js";
import { startPoker } from "./pokerUI.js";

const app = document.getElementById("app");

const params = new URLSearchParams(window.location.search);
const agentName = params.get("agent") || "Agent";

/* SIMPLE SCREEN SWITCHER */
function render(screenFn, nextFn) {
  app.innerHTML = "";
  screenFn(app, nextFn, agentName);
}

/* FLOW */

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

/* START */
goToQuestions();
