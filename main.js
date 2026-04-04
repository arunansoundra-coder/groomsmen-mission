import { startBriefing } from "./briefing.js";
import { startMissionObjective } from "./missionObjective.js";
import { startQuestions } from "./questionsUI.js";
import { startProposal } from "./proposalUI.js";
import { startPoker } from "./pokerUI.js";

const app = document.getElementById("app");

const state = {
  agentName: "Agent",
};

function next(screen) {
  switch (screen) {
    case "mission":
      startMissionObjective(app, { next, ...state });
      break;

    case "questions":
      startQuestions(app, { next, ...state });
      break;

    case "proposal":
      startProposal(app, { next, ...state });
      break;

    case "poker":
      startPoker(app, { next, ...state });
      break;
  }
}

// INIT
startBriefing(app, {
  next: () => next("mission"),
  agentName: state.agentName
});
