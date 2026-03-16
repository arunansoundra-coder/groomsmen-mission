let agentName = "Best Man";

function startMission(){

const intro = document.getElementById("intro");
const terminal = document.getElementById("terminal");

intro.style.display = "none";

let lines = [
"Initializing MI6 secure channel...",
"Scanning agent registry...",
"Identity requires multi-factor authentication...",
"3 verification challenges detected..."
];

let i = 0;

function typeLine(){

if(i < lines.length){

terminal.innerHTML += lines[i] + "<br>";
i++;

setTimeout(typeLine,800);

}else{

document.getElementById("puzzle1").classList.remove("hidden");

}

}

typeLine();

}



function checkPuzzle1(answer){

const result = document.getElementById("p1result");

if(answer === "correct"){

result.innerHTML = "Authentication 1 Passed";

document.getElementById("puzzle2").classList.remove("hidden");

}else{

result.innerHTML = "Incorrect Agent";

}

}



function checkPuzzle2(){

const answer = document.getElementById("mathAnswer").value;

if(answer === "7"){

document.getElementById("p2result").innerHTML = "Authentication 2 Passed";

document.getElementById("puzzle3").classList.remove("hidden");

initDragDrop();

}else{

document.getElementById("p2result").innerHTML = "Access Denied";

}

}



function initDragDrop(){

const cards = document.querySelectorAll(".card");
const dropzone = document.getElementById("dropzone");

cards.forEach(card => {

card.addEventListener("dragstart", e => {

e.dataTransfer.setData("text", card.dataset.hand);

});

});

dropzone.addEventListener("dragover", e => {

e.preventDefault();

});

dropzone.addEventListener("drop", e => {

e.preventDefault();

const hand = e.dataTransfer.getData("text");

if(hand === "royal"){

document.getElementById("p3result").innerHTML = "Authentication Complete";

verifyAgent();

}else{

document.getElementById("p3result").innerHTML = "Incorrect Hand";

}

});

}



function verifyAgent(){

document.getElementById("verified").classList.remove("hidden");

document.getElementById("welcomeAgent").innerHTML =
"Welcome Agent " + agentName;

}



function startCountdown(){

const countdown = document.getElementById("countdown");

setInterval(function(){

const now = new Date();

const noon = new Date();

noon.setHours(12,0,0,0);

const diff = noon - now;

const h = Math.floor(diff/1000/60/60);
const m = Math.floor(diff/1000/60)%60;
const s = Math.floor(diff/1000)%60;

countdown.innerHTML =
h + "h " + m + "m " + s + "s until showdown";

},1000);

}
