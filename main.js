import { startBriefing } from "./briefingUI.js";
import { startPoker } from "./pokerUI.js";

const app = document.getElementById("app");

const agents = ["Jason","Josh","Duran","Taylor","Gill","Prathap"];

let index = 0;

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
