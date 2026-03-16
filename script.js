const params = new URLSearchParams(window.location.search);

let agentName = params.get("name") || "Agent";
let role = params.get("role") || "Groomsman";

function startMission() {

const intro = document.getElementById("intro");
const terminal = document.getElementById("terminal");

intro.style.display = "none";

const lines = [
"Initializing MI6 secure channel...",
"Scanning agent registry...",
"Identity requires multi-factor authentication...",
"3 verification challenges detected..."
];

let index = 0;

function showNextLine(){

if(index < lines.length){

terminal.innerHTML += "<p>" + lines[index] + "</p>";

index++;

setTimeout(showNextLine,1000);

}
else{

document.getElementById("questions").style.display = "block";

}

}

showNextLine();

}

function verify(){

const a1 = document.getElementById("q1").value.toLowerCase();
const a2 = document.getElementById("q2").value.toLowerCase();
const a3 = document.getElementById("q3").value.toLowerCase();

if(
a1.includes("flush") &&
a2.includes("martini") &&
a3 === "m"
){

document.getElementById("result").innerHTML = `

<h2>Access Granted</h2>

<p>Agent ${agentName},</p>

<p>Your mission, should you choose to accept it, is to serve as <strong>${role}</strong> at Arunan's wedding.</p>

<p>This message will not self destruct... but your RSVP is required.</p>

<button onclick="acceptMission()">ACCEPT MISSION</button>

`;

}
else{

document.getElementById("result").innerHTML =
"<p>Authentication Failed. Agent denied.</p>";

}

}

function acceptMission(){

alert("Mission Accepted. Welcome to the team, Agent.");

}
