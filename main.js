import { renderAuth, renderBriefing } from "./ui.js";
import { renderPoker } from "./poker.js";

const app = document.getElementById("app");

// ✅ SINGLE SOURCE OF TRUTH
const params = new URLSearchParams(window.location.search);

const agents = [
  "Arunan",
  "Jason",
  "Gill",
  "Prathap",
  "Taylor",
  "Duran",
  "Josh"
];

const agent =
  agents.find(a => a.toLowerCase() === (params.get("agent") || "").toLowerCase())
  || "Arunan";

renderAuth(app, () => {
  renderBriefing(app, agent, () => {
    renderPoker(app, agent);
  });
});
