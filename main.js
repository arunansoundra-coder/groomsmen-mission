import { renderAuth, renderBriefing } from "./ui.js";
import { renderPoker } from "./poker.js";

const app = document.getElementById("app");

// ✅ SINGLE SOURCE OF TRUTH (URL controls everything)
const urlParams = new URLSearchParams(window.location.search);
const agent = urlParams.get("agent") || "Arunan";

renderAuth(app, () => {
  renderBriefing(app, agent, () => {
    renderPoker(app, agent);
  }, agent);
});
