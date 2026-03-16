let agentName = "Best Man";

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

terminal.innerHTML = "";

let index = 0;

function showNextLine() {

if (index < lines.length) {

terminal.innerHTML += lines[index] + "<br>";
index++;

setTimeout(showNextLine, 800);

} else {

const puzzle1 = document.getElementById("puzzle1");
if (puzzle1) puzzle1.style.display = "block";

}

}

showNextLine();
}



function checkPuzzle1(answer) {

const result = document.getElementById("p1result");

if (answer === "correct") {

result.innerHTML = "Authentication 1 Passed";

document.getElementById("puzzle2").style.display = "block";

} else {

result.innerHTML = "Incorrect Agent";

}

}



function checkPuzzle2() {

const value = document.getElementById("mathAnswer").value;

if (value === "7") {

document.getElementById("p2result").innerHTML = "Authentication 2 Passed";

document.getElementById("puzzle3").style.display = "block";

} else {

document.getElementById("p2result").innerHTML = "Access Denied";

}

}



function verifyAgent() {

document.getElementById("verified").style.display = "block";

document.getElementById("welcomeAgent").innerHTML =
"Welcome Agent " + agentName;

}
