// script.js

function checkPuzzle() {
  const answer = document.getElementById('answer').value.trim().toLowerCase();
  const result = document.getElementById('result');
  if (answer === 'royal flush' || answer === 'royal flush in spades') {
    result.innerText = 'Correct! Mission Puzzle Complete.';
  } else {
    result.innerText = 'Incorrect. Try again.';
  }
}

// Handle response
function acceptMission(button) {

  const response = button.innerText;

  const formURL =
  "https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse";

  const agentField = "entry.111111111";
  const responseField = "entry.222222222";
  const codeField = "entry.333333333";

  const missionCode = Math.random().toString(36).substring(2,8).toUpperCase();

  fetch(`${formURL}?${agentField}=${agentName}&${responseField}=${response}&${codeField}=${missionCode}`, {
    method: "POST",
    mode: "no-cors"
  });

  document.getElementById('acceptMissionStage').style.display = 'none';
  document.getElementById('missionComplete').style.display = 'block';
  recordScore();
}

// Countdown to poker showdown
function updateCountdown() {
  const now = new Date();
  const showdown = new Date('2026-09-18T12:00:00'); // September 18, 2026, 12:00 PM
  const diff = showdown - now;
  if (diff < 0) {
    document.getElementById("missionCode").innerText = missionCode;
    return;
  }
  const hours = Math.floor(diff / (1000*60*60));
  const minutes = Math.floor((diff % (1000*60*60)) / (1000*60));
  const seconds = Math.floor((diff % (1000*60)) / 1000);
  const countdown = document.getElementById('countdown');
  if(countdown) countdown.innerText = `Time until high-stakes poker: ${hours}h ${minutes}m ${seconds}s`;
}

setInterval(updateCountdown, 1000);

if(agentName.toLowerCase()=="jason"){
document.getElementById("agentWelcome").innerText=
"Agent Jason — 00 Clearance Level\nBest Man Assignment Authorized";
}

let startTime=Date.now();

function recordScore(){

let endTime=Date.now();

let seconds=Math.floor((endTime-startTime)/1000);

let scores=JSON.parse(localStorage.getItem("mi6scores"))||[];

scores.push({agent:agentName,time:seconds});

scores.sort((a,b)=>a.time-b.time);

localStorage.setItem("mi6scores",JSON.stringify(scores));

displayLeaderboard();

}

function displayLeaderboard(){

let scores=JSON.parse(localStorage.getItem("mi6scores"))||[];

let html="<h3>Agent Leaderboard</h3>";

scores.slice(0,5).forEach(s=>{
html+=s.agent+" — "+s.time+"s<br>";
});

document.getElementById("leaderboard").innerHTML=html;

}


