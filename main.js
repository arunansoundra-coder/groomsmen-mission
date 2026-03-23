import { startQuestions } from './questionsUI.js';
import { startPoker } from './pokerUI.js';
import { startBriefing } from './briefingUI.js';

const app = document.getElementById('app');

function loadScreen(screen) {
  app.innerHTML = '';

  if (screen === 'questions') {
    startQuestions(app, () => {
      loadScreen('briefing');
    });
  }

  if (screen === 'briefing') {
    const agentName = "Jason"; // 👈 change per person

    startBriefing(app, agentName, () => {
      loadScreen('poker');
    });
  }

  if (screen === 'poker') {
    startPoker(app);
  }
}

loadScreen('questions');
