import { startQuestions } from "./questionsUI.js";
import { startProposal } from "./proposalUI.js";
import { startMissionObjective } from "./missionObjectiveUI.js";
import { startPoker } from "./pokerUI.js";
import { loadScreen } from "./screenManager.js";

const app = document.getElementById("app");

const params = new URLSearchParams(window.location.search);
const agentName = params.get("agent") || "Agent";

/* NAVIGATION FLOW */

function goToQuestions() {
  loadScreen(app, startQuestions, goToBriefing, agentName);
}

function goToBriefing() {
  loadScreen(app, startBriefing, agentName, goToMission);
}

function goToMission() {
  loadScreen(app, startMissionObjective, agentName, goToPoker);
}

function goToPoker() {
  loadScreen(app, startPoker);
}

/* START */
goToQuestions();
