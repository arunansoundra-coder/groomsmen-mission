// Get name from URL

function getAgentName(){

const params = new URLSearchParams(window.location.search)

const name = params.get("name")

if(name){

document.getElementById("agentName").innerHTML = "Agent " + name

}

}

// Start terminal animation

function startMission(){

document.getElementById("intro").style.display="none"

let terminal = document.getElementById("terminal")

let lines = [

"Initializing MI6 secure channel...",
"Authenticating agent credentials...",
"Accessing classified wedding operation...",
"Codename: OPERATION FOREVER...",
"Verification required..."

]

let i = 0

function typeLine(){

if(i < lines.length){

terminal.innerHTML += lines[i] + "\n"

i++

setTimeout(typeLine,900)

}

else{

document.getElementById("puzzle").classList.remove("hidden")

}

}

typeLine()

}


// Puzzle check

function checkAnswer(){

let answer = document.getElementById("answer").value.toLowerCase()

if(answer === "stirred"){

document.getElementById("result").innerHTML = "Access Granted"

document.getElementById("mission").classList.remove("hidden")

}

else{

document.getElementById("result").innerHTML = "Incorrect. Try again."

}

}


// Run name loader

window.onload = getAgentName
