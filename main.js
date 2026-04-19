// =========================
// GLOBAL STATE (MI6 REGISTRY)
// =========================
window.MI6_REGISTRY = {
  activeAgents: new Set(),
  responses: {}
};

// =========================
// IMPORT SCREENS
// =========================
import { renderAuth, renderBriefing, renderSafehouse } from "./ui.js";
import { renderPoker } from "./poker.js";

// =========================
// APP INIT
// =========================
const app = document.getElementById("app");

// 🔥 CHANGE THIS PER PERSON
const agent = "Jason";

// =========================
// FLOW
// =========================
renderAuth(app, () => {
  renderBriefing(app, agent, () => {
    renderSafehouse(app, agent, () => {
      renderPoker(app);
    });
  });
}, agent);
