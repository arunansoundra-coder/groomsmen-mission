const params = new URLSearchParams(window.location.search);
const agentName = params.get("agent") || "Agent";

import { startQuestions } from "./questionsUI.js";
import { startBriefing } from "./briefingUI.js";
import { startPoker } from "./pokerUI.js";

const app = document.getElementById("app");

let agents = ["Jason","Josh","Duran","Taylor","Gill","Prathap"];
let index = 0;

startQuestions(app, () => {
  nextAgent();
}, agentName);

function nextAgent(){
  if (index < agents.length){
    app.innerHTML = "";

    startBriefing(app, agents[index], () => {
      index++;
      nextAgent();
    });

  } else {
    startPoker(app);
  }
}

startFlow();
