import { startQuestions } from "./questionsUI.js";
import { startBriefing } from "./briefingUI.js";
import { startPoker } from "./pokerUI.js";

const app = document.getElementById("app");

const params = new URLSearchParams(window.location.search);
const agentName = params.get("agent") || "Agent";

let index = 0;
const agents = ["Jason","Josh","Duran","Taylor","Gill","Prathap"];

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

nextAgent();
