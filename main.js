const app = document.getElementById('app');

app.innerHTML = "<h1 style='color:white'>App Loaded ✅</h1>";

console.log("MAIN JS LOADED");

import { startQuestions } from './questionsUI.js';
import { startPoker } from './pokerUI.js';

const app = document.getElementById('app');

function loadScreen(screen) {
  console.log("Loading screen:", screen);
  app.innerHTML = '';

  if (screen === 'questions') startQuestions(app, () => {
    loadScreen('poker');
  });

  if (screen === 'poker') startPoker(app);
}

// Decide starting screen
loadScreen('questions');
