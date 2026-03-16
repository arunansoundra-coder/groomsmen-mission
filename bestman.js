let agentName = "Best Man";

function startMission(){

const intro = document.getElementById("intro");
const terminal = document.getElementById("terminal");

if(intro) intro.style.display = "none";

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

setTimeout(typeLine,900);

}else{

const p1 = document.getElementById("puzzle1");

if(p1){
p1.classList.remove("hidden");
}

}

}

typeLine();

}



function checkPuzzle1(answer){

const result = document.getElementById("p1result");

if(!result) return;

if(answer === "correct"){

result.innerHTML = "Authentication 1 Passed";

const p2 = document.getElementById("puzzle2");

if(p2){
p2.classList.remove("hidden");
}

}else{

result.innerHTML = "Incorrect Agent";

}

}



function checkPuzzle2(){

const input = document.getElementById("mathAnswer");
const result = document.getElementById("p2result");

if(!input || !result) return;

if(input.value === "7"){

result.innerHTML = "Authentication 2 Passed";

const p3 = document.getElementById("puzzle3");

if(p3){
p3.classList.remove("hidden");
initDragDrop();
}

}else{

result.innerHTML = "Access Denied";

}

}



function initDragDrop(){

const cards = document.querySelectorAll(".card");
const dropzone = document.getElementById("dropzone");

if(!cards || !dropzone) return;

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

const result = document.getElementById("p3result");

if(result){
result.innerHTML = "Authentication Complete";
}

verifyAgent();

}else{

const result = document.getElementById("p3result");

if(result){
result.innerHTML = "Incorrect Hand";
}

}

});

}



function verifyAgent(){

const verified = document.getElementById("verified");
const welcome = document.getElementById("welcomeAgent");

if(verified) verified.classList.remove("hidden");

if(welcome){
welcome.innerHTML = "Welcome Agent " + agentName;
}

}



function startCountdown(){

const countdown = document.getElementById("countdown");

if(!countdown) return;

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
