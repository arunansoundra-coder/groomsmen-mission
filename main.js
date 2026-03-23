import { startQuestions } from './questionsUI.js';
import { startPoker } from './pokerUI.js';
import { startBriefing } from './briefingUI.js';
import { startDashboard } from './dashboard.js';

const app = document.getElementById('app');

if (!app) {
  console.error("❌ #app element not found");
}

function getAgentFromURL(){
  const params = new URLSearchParams(window.location.search);
  return params.get("agent") || "Agent";
}

function getViewFromURL(){
  const params = new URLSearchParams(window.location.search);
  return params.get("view");
}

function loadScreen(screen) {
  try {
    app.innerHTML = '';

    if (screen === 'questions') {
      startQuestions(app, () => {
        loadScreen('briefing');
      });
    }

    else if (screen === 'briefing') {
      const agentName = getAgentFromURL();

      startBriefing(app, agentName, () => {
        loadScreen('poker');
      });
    }

    else if (screen === 'poker') {
      startPoker(app);
    }

    else if (screen === 'dashboard') {
      startDashboard(app);
    }

  } catch (err) {
    console.error("❌ Error loading screen:", err);
    app.innerHTML = `<pre style="color:red;">${err.message}</pre>`;
  }
}

const view = getViewFromURL();

if (view === "dashboard") {
  loadScreen("dashboard");
} else {
  loadScreen("questions");
}
