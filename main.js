import { startQuestions } from './questionsUI.js';
import { startPoker } from './pokerUI.js';
import { startBriefing } from './briefingUI.js';

const app = document.getElementById('app');

// 🔗 Get agent from URL
function getAgentFromURL(){
  const params = new URLSearchParams(window.location.search);
  return params.get("agent") || "Agent";
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
}

loadScreen('questions');
