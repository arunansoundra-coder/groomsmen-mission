let agentName = "Jason"; // change name here

function startMission(){

document.getElementById("intro").style.display="none";

let terminal=document.getElementById("terminal");

let lines=[
"Initializing MI6 secure channel...",
"Scanning agent registry...",
"Identity requires multi-factor authentication...",
"3 verification challenges detected..."
];

let i=0;

function typeLine(){

if(i<lines.length){
terminal.innerHTML+=lines[i]+"\n";
i++;
setTimeout(typeLine,900);
}

else{
document.getElementById("puzzle1").classList.remove("hidden");
}

}

typeLine();
}

function checkPuzzle1(answer){

if(answer==="correct"){
document.getElementById("p1result").innerHTML="Authentication 1 Passed";
document.getElementById("puzzle2").classList.remove("hidden");
}
else{
document.getElementById("p1result").innerHTML="Incorrect Agent.";
}

}

function checkPuzzle2(){

let val=document.getElementById("mathAnswer").value;

if(val==="7"){
document.getElementById("p2result").innerHTML="Authentication 2 Passed";
document.getElementById("puzzle3").classList.remove("hidden");
initDragDrop();
}
else{
document.getElementById("p2result").innerHTML="Access Denied";
}

}

function initDragDrop(){

const cards=document.querySelectorAll('.card');
const dropzone=document.getElementById('dropzone');

cards.forEach(card=>{

card.addEventListener('dragstart',e=>{
e.dataTransfer.setData('text',card.dataset.hand);
});

});

dropzone.addEventListener('dragover',e=>{
e.preventDefault();
});

dropzone.addEventListener('drop',e=>{

e.preventDefault();

let hand=e.dataTransfer.getData('text');

if(hand==="royal"){

document.getElementById("p3result").innerHTML="Authentication Complete";

verifyAgent();

}
else{

document.getElementById("p3result").innerHTML="Incorrect Hand";

}

let agentName = "Jason"; // change name here

function startMission(){

document.getElementById("intro").style.display="none";

let terminal=document.getElementById("terminal");

let lines=[
"Initializing MI6 secure channel...",
"Scanning agent registry...",
"Identity requires multi-factor authentication...",
"3 verification challenges detected..."
];

let i=0;

function typeLine(){

if(i<lines.length){
terminal.innerHTML+=lines[i]+"\n";
i++;
setTimeout(typeLine,900);
}

else{
document.getElementById("puzzle1").classList.remove("hidden");
}

}

typeLine();
}

function checkPuzzle1(answer){

if(answer==="correct"){
document.getElementById("p1result").innerHTML="Authentication 1 Passed";
document.getElementById("puzzle2").classList.remove("hidden");
}
else{
document.getElementById("p1result").innerHTML="Incorrect Agent.";
}

}

function checkPuzzle2(){

let val=document.getElementById("mathAnswer").value;

if(val==="7"){
document.getElementById("p2result").innerHTML="Authentication 2 Passed";
document.getElementById("puzzle3").classList.remove("hidden");
initDragDrop();
}
else{
document.getElementById("p2result").innerHTML="Access Denied";
}

}

function initDragDrop(){

const cards=document.querySelectorAll('.card');
const dropzone=document.getElementById('dropzone');

cards.forEach(card=>{

card.addEventListener('dragstart',e=>{
e.dataTransfer.setData('text',card.dataset.hand);
});

});

dropzone.addEventListener('dragover',e=>{
e.preventDefault();
});

dropzone.addEventListener('drop',e=>{

e.preventDefault();

let hand=e.dataTransfer.getData('text');

if(hand==="royal"){

document.getElementById("p3result").innerHTML="Authentication Complete";

verifyAgent();

}
else{

document.getElementById("p3result").innerHTML="Incorrect Hand";

}

});

}

function verifyAgent(){

document.getElementById("verified").classList.remove("hidden");

document.getElementById("welcomeAgent").innerHTML=
"Welcome Agent " + agentName;

}

function startCountdown(){

let countdown=document.getElementById("countdown");

setInterval(function(){

let now=new Date();

let noon=new Date();

noon.setHours(12,0,0,0);

let diff=noon-now;

let h=Math.floor(diff/1000/60/60);
let m=Math.floor(diff/1000/60)%60;
let s=Math.floor(diff/1000)%60;

countdown.innerHTML =
h+"h "+m+"m "+s+"s until showdown";

},1000);

}