import { state, loadState, saveState } from "./state.js";

import { startIdentity, startSecurity } from "./questionsUI.js";
import { startBriefing } from "./briefingUI.js";
import { startPoker } from "./pokerUI.js";

const app = document.getElementById("app");

function getAgent() {
  const params = new URLSearchParams(window.location.search);
  return params.get("agent") || "Unknown";
}

function render() {
  app.innerHTML = "";
  saveState();

  switch (state.stage) {
    case "identity":
      startIdentity(app, {
        state,
        onComplete: () => {
          state.identityComplete = true;
          state.stage = "security";
          saveState();
          render();
        }
      });
      break;

    case "security":
      startSecurity(app, {
        state,
        onComplete: () => {
          state.securityComplete = true;
          state.stage = "briefing";
          saveState();
          render();
        }
      });
      break;

    case "briefing":
      startBriefing(app, state, () => {
        state.missionAccepted = true;
        state.stage = "poker";
        saveState();
        render();
      });
      break;

    case "poker":
      startPoker(app, {
        state,
        onComplete: (result) => {
          state.poker.result = result;
          saveState();
          render();
        }
      });
      break;

    default:
      state.stage = "identity";
      render();
  }
}

function init() {
  const agent = getAgent();

  loadState(agent);

  state.agent = agent;

  saveState();
  render();
}

init();
