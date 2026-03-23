import { startQuestions } from './questionsUI.js';
import { startPoker } from './pokerUI.js';
import { startBriefing } from './briefingUI.js';
// Optional: sound system hook (safe to ignore if not implemented)
import { playAmbient } from './sounds.js';
import { startDashboard } from './dashboard.js';

const app = document.getElementById('app');

// 🔗 Get agent from URL
function getAgentFromURL(){
  const params = new URLSearchParams(window.location.search);
  return params.get("agent") || "Agent";
}

// 🎬 Cinematic transition helper
function transitionToScreen(callback) {
  app.classList.add('fade-out');

  setTimeout(() => {
    app.innerHTML = '';
    app.classList.remove('fade-out');
    app.classList.add('fade-in');

    callback();

    setTimeout(() => {
      app.classList.remove('fade-in');
    }, 500);

  }, 400); // fade duration
}

// 🎯 Screen Loader
function loadScreen(screen) {
  if (screen === 'questions') {
    transitionToScreen(() => {
      startQuestions(app, () => {
        loadScreen('briefing');
      });
    });
  }

  if (screen === 'briefing') {
    const agentName = getAgentFromURL();

    transitionToScreen(() => {
      startBriefing(app, agentName, () => {
        loadScreen('poker');
      });
    });
  }

  if (screen === 'poker') {
    transitionToScreen(() => {
      startPoker(app);
    });
  }
}

// 🎬 Initialize Experience
function init() {
  // Optional ambient sound (safe if file exists)
  try {
    playAmbient && playAmbient();
  } catch (e) {
    console.log("Ambient sound not available");
  }

  loadScreen('questions');
}

init();
