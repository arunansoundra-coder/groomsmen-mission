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
