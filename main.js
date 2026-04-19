import { renderAuth, renderBriefing } from "./ui.js";
import { renderPoker } from "./poker.js";

const app = document.getElementById("app");

// change per user
const agent = "Jason";

renderAuth(app, () => {
  renderBriefing(app, agent, () => {
    renderPoker(app);
  }, agent);
});
