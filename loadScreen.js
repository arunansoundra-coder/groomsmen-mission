import { startBriefing } from "./briefingUI.js";
import { startMissionObjective } from "./missionObjective.js";
import { startPoker } from "./pokerUI.js";

export function loadScreen(screenName, state = {}) {
  const app = document.getElementById("app");

  const next = (nextScreen) => {
    loadScreen(nextScreen, state);
  };

  switch (screenName) {
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
        next: () => next("end")
      });
      break;

    case "end":
      app.innerHTML = `
        <div class="screen">
          <h2>MISSION COMPLETE</h2>
          <p>Operation concluded successfully.</p>
        </div>
      `;
      break;

    default:
      app.innerHTML = "<h2>Unknown Screen</h2>";
  }
}
