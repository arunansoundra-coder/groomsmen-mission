import { startQuestions } from './questionsUI.js';
import { startPoker } from './pokerUI.js';
import { startBriefing } from './briefingUI.js';
// Optional: sound system hook (safe to ignore if not implemented)
import { chipSound } from './sounds.js';

const app = document.getElementById('app');

let isTransitioning = false;

// 🔗 Get agent from URL (sanitized)
function getAgentFromURL(){
  const params = new URLSearchParams(window.location.search);
  return (params.get("agent") || "Agent")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// 🎬 Cinematic transition helper
function transitionToScreen(callback) {
  if (isTransitioning) return;
  isTransitioning = true;

  app.classList.add('fade-out');

  setTimeout(() => {
    app.innerHTML = '';
    app.classList.remove('fade-out');
    app.classList.add('fade-in');

    // Small cinematic pause before rendering next screen
    setTimeout(() => {
      callback();

      setTimeout(() => {
        app.classList.remove('fade-in');
        isTransitioning = false;
      }, 500);

    }, 100);

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
  else if (screen === 'briefing') {
    const agentName = getAgentFromURL();

    transitionToScreen(() => {
      startBriefing(app, agentName, () => {
        loadScreen('poker');
      });
    });
  } 
  else if (screen === 'poker') {
    transitionToScreen(() => {
      startPoker(app);
    });
  } 
  else {
    console.warn("Unknown screen:", screen);
    loadScreen('questions'); // safe fallback
  }
}

// 🎬 Initialize Experience
function init() {
  try {
    if (typeof playAmbient === "function") {
      playAmbient();
    }
  } catch (e) {
    console.log("Ambient sound not available");
  }

  loadScreen('questions');
}

init();
