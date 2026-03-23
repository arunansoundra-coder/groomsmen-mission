import { startQuestions } from './questionsUI.js';
import { startPoker } from './pokerUI.js';

console.log("MAIN JS LOADED");

const app = document.getElementById('app');

function loadScreen(screen) {
  console.log("Loading screen:", screen);

  app.innerHTML = '';

  if (screen === 'questions') {
    startQuestions(app, () => {
      loadScreen('poker');
    });
  }

  if (screen === 'poker') {
    startPoker(app);
  }
}

loadScreen('questions');
