 import { startQuestions } from './questionsUI.js';
import { startPoker } from './pokerUI.js';
import { startBriefing } from './briefingUI.js';
import { startDashboard } from './dashboard.js';

const app = document.getElementById('app');

// 🔗 Get agent from URL
function getAgentFromURL(){
  const params = new URLSearchParams(window.location.search);
  return params.get("agent") || "Agent";
}

// 🔗 Get view from URL
function getViewFromURL(){
  const params = new URLSearchParams(window.location.search);
  return params.get("view");
}

function loadScreen(screen) {
  app.innerHTML = '';

  if (screen === 'questions') {
    startQuestions(app, () => {
      loadScreen('briefing');
    });
  }

  if (screen === 'briefing') {
    const agentName = getAgentFromURL();

    startBriefing(app, agentName, () => {
      loadScreen('poker');
    });
  }

  if (screen === 'poker') {
    startPoker(app);
  }

  if (screen === 'dashboard') {
    startDashboard(app);
  }
}

// 🚨 Route handling (dashboard override)
const view = getViewFromURL();

if (view === "dashboard") {
  loadScreen("dashboard");
} else {
  loadScreen('questions');
}
