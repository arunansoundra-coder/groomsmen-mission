function startMission(){

document.getElementById("intro").style.display="none"

let terminal=document.getElementById("terminal")

let lines=[

"Initializing MI6 Secure Channel...",
"Authenticating Agent Jason...",
"Loading classified wedding operation...",
"Codename: OPERATION FOREVER...",
"Verification required..."

]

let i=0

function typeLine(){

if(i<lines.length){

terminal.innerHTML+=lines[i]+"\n"

i++

setTimeout(typeLine,900)

}else{

document.getElementById("puzzle").classList.remove("hidden")

document.getElementById("bondTheme").play()

}

}

typeLine()

}

function selectCard(choice){

if(choice==="royal"){

document.getElementById("result").innerHTML="Correct Agent."

document.getElementById("challenge").classList.remove("hidden")

}

else{

document.getElementById("result").innerHTML="Incorrect. Try again."

}

}


function startCountdown(){

let countdown=document.getElementById("countdown")

setInterval(function(){

let now=new Date()

let noon=new Date()

noon.setHours(12)
noon.setMinutes(0)
noon.setSeconds(0)

let diff=noon-now

let h=Math.floor(diff/1000/60/60)
let m=Math.floor(diff/1000/60)%60
let s=Math.floor(diff/1000)%60

countdown.innerHTML=h+"h "+m+"m "+s+"s until showdown"

},1000)

}
