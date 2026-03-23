import { startQuestions } from './questionsUI.js';
import { startPoker } from './pokerUI.js';
const agentName = "Jason"; // 👈 change per person (or make dynamic later)

startBriefing(app, agentName, () => {
  loadScreen('poker');
});

const app = document.getElementById('app');

function loadScreen(screen) {
  app.innerHTML = '';

  if (screen === 'questions') {
    startQuestions(app, () => {
      loadScreen('briefing'); // 👈 NEW STEP
    });
  }

  if (screen === 'briefing') {
    startBriefing(app, () => {
      loadScreen('poker');
    });
  }

  if (screen === 'poker') {
    startPoker(app);
  }
}

loadScreen('questions');
