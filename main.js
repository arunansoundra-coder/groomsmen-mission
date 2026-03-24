import { startQuestions } from "./questionsUI.js";
import { startBriefing } from "./briefingUI.js";
import { startMissionObjective } from "./missionObjectiveUI.js";
import { startPoker } from "./pokerUI.js";

const app = document.getElementById("app");

const params = new URLSearchParams(window.location.search);
const agentName = params.get("agent") || "Agent";

// Step 1 → Questions
startQuestions(app, () => {

  // Step 2 → Briefing (for THIS agent only)
  startBriefing(app, agentName, () => {

    // Step 3 → Mission Objective (NEW SCREEN)
    startMissionObjective(app, agentName, () => {

      // Step 4 → Poker
      startPoker(app);

    });

  });

}, agentName);
