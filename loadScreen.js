import { startDashboard } from "./dashboard.js";
import { startBriefing } from "./briefingUI.js";
import { startMissionObjective } from "./missionObjective.js";
import { startPoker } from "./pokerUI.js";
import { startProposal } from "./proposal.js";

export function loadScreen(screenName, state = {}) {
  const app = document.getElementById("app");

  const next = (nextScreen, newState = {}) => {
    loadScreen(nextScreen, { ...state, ...newState });
  };

  switch (screenName) {

    case "dashboard":
      startDashboard(app, {
        loadScreen: (screen, s) => loadScreen(screen, s || state)
      });
      break;

    case "briefing":
      startBriefing(app, {
        next: () => next("mission"),
        agentName: state.agent
      });
      break;

    case "mission":
      startMissionObjective(app, {
        state,
        next: () => next("poker")
      });
      break;

    case "poker":
      startPoker(app, {
        state,
        next: () => next("proposal")
      });
      break;

    case "proposal":
      startProposal(app, {
        state,
        next: () => next("dashboard")
      });
      break;

    case "questions":
      app.innerHTML = "<h2>Questions Screen (deprecated - replace with module)</h2>";
      break;

    default:
      app.innerHTML = "<h2>Unknown Screen</h2>";
  }
}
