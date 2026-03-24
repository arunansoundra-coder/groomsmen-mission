import { startQuestions } from "./questionsUI.js";
import { startBriefing } from "./briefingUI.js";
import { startPoker } from "./pokerUI.js";

const app = document.getElementById("app");

const params = new URLSearchParams(window.location.search);
const agentName = params.get("agent") || "Agent";
