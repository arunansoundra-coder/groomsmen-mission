// Start MI6 Mission
function startMission(){
  document.getElementById("intro").style.display="none";
  let terminal=document.getElementById("terminal");
  let lines=[
    "Initializing MI6 secure channel...",
    "Authenticating Agent Jason...",
    "Accessing classified wedding operation...",
    "Codename: OPERATION FOREVER...",
    "Verification required..."
  ];
  let i=0;
  function typeLine(){
    if(i<lines.length){
      terminal.innerHTML += lines[i] + "\n";
      i++;
      setTimeout(typeLine,900);
    }else{
      document.getElementById("puzzle").classList.remove("hidden");
      document.getElementById("bondTheme").play();
      initDragDrop();
    }
  }
  typeLine();
}

// Initialize Drag & Drop
function initDragDrop(){
  const cards = document.querySelectorAll('.card');
  const dropzone = document.getElementById('dropzone');
  
  cards.forEach(card=>{
    card.addEventListener('dragstart', e=>{
      e.dataTransfer.setData('text', card.dataset.hand);
    });
  });
  
  dropzone.addEventListener('dragover', e=>{
    e.preventDefault();
    dropzone.classList.add('dragover');
  });
  
  dropzone.addEventListener('dragleave', e=>{
    dropzone.classList.remove('dragover');
  });
  
  dropzone.addEventListener('drop', e=>{
    e.preventDefault();
    dropzone.classList.remove('dragover');
    const hand = e.dataTransfer.getData('text');
    checkHand(hand);
  });
}

// Check poker hand
function checkHand(hand){
  if(hand==="royal"){
    document.getElementById('result').innerHTML="Correct Agent.";
    document.getElementById("challenge").classList.remove("hidden");
  }else{
    document.getElementById('result').innerHTML="Incorrect. Try again.";
  }
}

// Countdown Timer for Poker Showdown
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
    countdown.innerHTML = h+"h "+m+"m "+s+"s until showdown";
  },1000);
}

// Get agent name from localStorage
const agentName = localStorage.getItem("bestManName") || "Agent";

const missionText = document.getElementById("missionText");
const missionButtons = document.getElementById("missionButtons");
const missionResult = document.getElementById("missionResult");
const followup = document.getElementById("followup");
const countdownEl = document.getElementById("countdown");

// Show initial mission text
setTimeout(() => {
  missionText.textContent = `Agent ${agentName.toUpperCase()}, will you be my Best Man?`;
  missionButtons.classList.remove("hidden");
}, 1000);

function acceptMission(){
  missionResult.textContent = "🎉 Mission Accepted! You are officially the Best Man! 🥳";
  missionButtons.classList.add("hidden");

  // Show further instructions after short delay
  setTimeout(() => {
    followup.classList.remove("hidden");
    startCountdown();
  }, 1500);
}

function declineMission(){
  missionResult.textContent = "💀 Mission Failed... But the secret mission lives on.";
  missionButtons.classList.add("hidden");
}

// Countdown to September 18, 2026 at noon
function startCountdown(){
  const targetDate = new Date("September 18, 2026 12:00:00").getTime();

  const interval = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if(distance < 0){
      clearInterval(interval);
      countdownEl.textContent = "⏰ The poker game is happening now!";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownEl.textContent = `⏳ Time until poker showdown: ${days}d ${hours}h ${minutes}m ${seconds}s`;
  }, 1000);
}
