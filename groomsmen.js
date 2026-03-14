// Get agent name from URL
function getAgentName(){
  const params = new URLSearchParams(window.location.search);
  let name = params.get("name") || "Agent";
  document.getElementById("agentName").innerHTML = "Agent " + name;
}

// Start mission / terminal
function startMission(){
  document.getElementById("intro").style.display="none";
  let terminal = document.getElementById("terminal");
  let lines = [
    "Initializing MI6 secure channel...",
    "Authenticating groomsmen credentials...",
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
      initDragDrop();
    }
  }
  typeLine();
}

// Initialize Drag & Drop for mission items
function initDragDrop(){
  const cards = document.querySelectorAll('.card');
  const dropzone = document.getElementById('dropzone');
  let completed = [];

  cards.forEach(card=>{
    card.addEventListener('dragstart', e=>{
      e.dataTransfer.setData('text', card.dataset.item);
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
    const item = e.dataTransfer.getData('text');
    if(!completed.includes(item)){
      completed.push(item);
      addToDossier(item);
    }
    checkCompletion(completed);
  });
}

// Add item to agent dossier list
function addToDossier(item){
  const list = document.getElementById('missionList');
  const li = document.createElement('li');
  li.textContent = item;
  list.appendChild(li);
}

// Check if all items completed
function checkCompletion(completed){
  if(completed.length === 3){
    document.getElementById('result').innerHTML="All mission items secured!";
    document.getElementById('mission').classList.remove('hidden');
  }else{
    document.getElementById('result').innerHTML = completed.length + "/3 items secured";
  }
}

// Run name loader on page load
window.onload = getAgentName;
